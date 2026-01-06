import { FinanceData, Expense, RecurringExpense } from '@/types/finance';
import { supabase, isSupabaseConfigured, DbExpense } from '@/lib/supabase';
import { loadFinanceData as loadFromLocalStorage, saveFinanceData as saveToLocalStorage } from '@/lib/storage';

/**
 * Hybrid storage: Uses localStorage as primary, Supabase as backup/sync
 */

// Sync to Supabase in the background
export const syncToSupabase = async (data: FinanceData): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, skipping sync');
    return;
  }

  try {
    // Sync expenses
    for (const expense of data.expenses) {
      const dbExpense: DbExpense = {
        id: expense.id,
        category: expense.category,
        amount: expense.amount,
        description: expense.description,
        date: expense.date,
        recurring: false,
      };

      await supabase
        .from('expenses')
        .upsert(dbExpense, { onConflict: 'id' });
    }

    // Sync recurring expenses
    for (const expense of data.recurringExpenses) {
      const dbExpense: DbExpense = {
        id: expense.id,
        category: expense.category,
        amount: expense.amount,
        description: expense.description,
        date: expense.startDate,
        recurring: true,
        frequency: expense.frequency,
        start_date: expense.startDate,
        active: expense.active,
      };

      await supabase
        .from('expenses')
        .upsert(dbExpense, { onConflict: 'id' });
    }

    // Sync trip savings
    await supabase
      .from('trip_savings')
      .upsert({
        id: 'default', // Using a fixed ID for single user
        target: data.tripSavings.target,
        deadline: data.tripSavings.deadline,
        saved: data.tripSavings.saved,
        entries: data.tripSavings.entries,
      }, { onConflict: 'id' });

    // Sync finance data
    await supabase
      .from('finance_data')
      .upsert({
        id: 'default', // Using a fixed ID for single user
        salary: data.salary,
        salary_date: data.salaryDate,
        monthly_snapshots: data.monthlySnapshots,
      }, { onConflict: 'id' });

    console.log('✅ Synced to Supabase successfully');
  } catch (error) {
    console.error('❌ Error syncing to Supabase:', error);
    // Don't throw - we don't want to break the app if sync fails
  }
};

// Load from Supabase (fallback if localStorage is empty)
export const loadFromSupabase = async (): Promise<FinanceData | null> => {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    // Load expenses
    const { data: expensesData, error: expensesError } = await supabase
      .from('expenses')
      .select('*')
      .order('date', { ascending: false });

    if (expensesError) throw expensesError;

    // Separate one-time and recurring
    const expenses: Expense[] = [];
    const recurringExpenses: RecurringExpense[] = [];

    expensesData?.forEach((exp: DbExpense) => {
      if (exp.recurring) {
        recurringExpenses.push({
          id: exp.id,
          category: exp.category,
          amount: exp.amount,
          description: exp.description,
          frequency: exp.frequency || 'monthly',
          startDate: exp.start_date || exp.date,
          active: exp.active ?? true,
          recurring: true,
        });
      } else {
        expenses.push({
          id: exp.id,
          category: exp.category,
          amount: exp.amount,
          description: exp.description,
          date: exp.date,
          recurring: false,
        });
      }
    });

    // Load trip savings
    const { data: tripData } = await supabase
      .from('trip_savings')
      .select('*')
      .eq('id', 'default')
      .single();

    // Load finance data
    const { data: financeData } = await supabase
      .from('finance_data')
      .select('*')
      .eq('id', 'default')
      .single();

    const result: FinanceData = {
      salary: financeData?.salary || 0,
      salaryDate: financeData?.salary_date || new Date().toISOString().split('T')[0],
      expenses,
      recurringExpenses,
      tripSavings: {
        target: tripData?.target || 20000,
        deadline: tripData?.deadline || '2026-07-01',
        saved: tripData?.saved || 0,
        entries: tripData?.entries || [],
      },
      monthlySnapshots: financeData?.monthly_snapshots || {},
    };

    console.log('✅ Loaded from Supabase successfully');
    return result;
  } catch (error) {
    console.error('❌ Error loading from Supabase:', error);
    return null;
  }
};

// Delete an expense from Supabase
export const deleteExpenseFromSupabase = async (id: string): Promise<void> => {
  if (!isSupabaseConfigured()) return;

  try {
    await supabase
      .from('expenses')
      .delete()
      .eq('id', id);
  } catch (error) {
    console.error('Error deleting expense from Supabase:', error);
  }
};

// Hybrid save: localStorage + Supabase
export const saveFinanceData = async (data: FinanceData): Promise<void> => {
  // Always save to localStorage first (fast)
  saveToLocalStorage(data);

  // Sync to Supabase in background (slower, optional)
  syncToSupabase(data).catch(console.error);
};

// Hybrid load: localStorage first, Supabase as fallback
export const loadFinanceData = async (): Promise<FinanceData> => {
  // Try localStorage first
  const localData = loadFromLocalStorage();

  // If localStorage has data, use it
  if (localData.salary > 0 || localData.expenses.length > 0) {
    return localData;
  }

  // If localStorage is empty, try Supabase
  const supabaseData = await loadFromSupabase();
  if (supabaseData) {
    // Save to localStorage for next time
    saveToLocalStorage(supabaseData);
    return supabaseData;
  }

  // Return default if both are empty
  return localData;
};

// Test Supabase connection
export const testSupabaseConnection = async (): Promise<boolean> => {
  if (!isSupabaseConfigured()) {
    return false;
  }

  try {
    const { error } = await supabase.from('expenses').select('count').limit(1);
    return !error;
  } catch {
    return false;
  }
};

