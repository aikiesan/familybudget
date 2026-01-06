'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FinanceData, Expense, RecurringExpense, TripSavingsEntry } from '@/types/finance';
import { loadFinanceData, saveFinanceData } from '@/lib/supabaseStorage'; // Changed to hybrid storage
import { testSupabaseConnection } from '@/lib/supabaseStorage';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

interface FinanceContextType {
  data: FinanceData;
  updateSalary: (salary: number, date: string) => void;
  addExpense: (expense: Omit<Expense, 'id' | 'recurring'>) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  addRecurringExpense: (expense: Omit<RecurringExpense, 'id' | 'recurring'>) => void;
  updateRecurringExpense: (id: string, expense: Partial<RecurringExpense>) => void;
  deleteRecurringExpense: (id: string) => void;
  addTripSavings: (amount: number) => void;
  updateTripSavings: (target: number, deadline: string) => void;
  refreshData: () => void;
  isSupabaseConnected: boolean;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<FinanceData | null>(null);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load data on mount (async)
  useEffect(() => {
    const loadData = async () => {
      const financeData = await loadFinanceData();
      setData(financeData);

      // Check Supabase connection
      const connected = await testSupabaseConnection();
      setIsSupabaseConnected(connected);
      if (connected) {
        console.log('✅ Supabase connected - auto-sync enabled');
      } else {
        console.log('ℹ️ Supabase not configured - using localStorage only');
      }
      
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Save to localStorage and Supabase whenever data changes
  useEffect(() => {
    if (!data || isLoading) return;
    
    // Update monthly snapshot
    const currentMonth = format(new Date(), 'yyyy-MM');
    const monthlyRecurringTotal = data.recurringExpenses.reduce((total, exp) => {
      if (!exp.active) return total;
      return total + (exp.frequency === 'monthly' ? exp.amount : exp.amount * 4.33);
    }, 0);
    
    const monthlyOneTimeTotal = data.expenses
      .filter(exp => exp.date.startsWith(currentMonth))
      .reduce((total, exp) => total + exp.amount, 0);
    
    const totalExpenses = monthlyRecurringTotal + monthlyOneTimeTotal;
    const balance = data.salary - totalExpenses;
    
    const updatedData: FinanceData = {
      ...data,
      monthlySnapshots: {
        ...data.monthlySnapshots,
        [currentMonth]: {
          income: data.salary,
          expenses: totalExpenses,
          balance,
        },
      },
    };
    
    setData(updatedData);
    saveFinanceData(updatedData); // This now syncs to both localStorage and Supabase
  }, [data?.salary, data?.expenses, data?.recurringExpenses]);

  const updateSalary = (salary: number, date: string) => {
    if (!data) return;
    setData({ ...data, salary, salaryDate: date });
  };

  const addExpense = (expense: Omit<Expense, 'id' | 'recurring'>) => {
    if (!data) return;
    const newExpense: Expense = {
      ...expense,
      id: uuidv4(),
      recurring: false,
    };
    setData({ ...data, expenses: [...data.expenses, newExpense] });
  };

  const updateExpense = (id: string, updates: Partial<Expense>) => {
    if (!data) return;
    setData({
      ...data,
      expenses: data.expenses.map(exp => 
        exp.id === id ? { ...exp, ...updates } : exp
      ),
    });
  };

  const deleteExpense = (id: string) => {
    if (!data) return;
    setData({
      ...data,
      expenses: data.expenses.filter(exp => exp.id !== id),
    });
  };

  const addRecurringExpense = (expense: Omit<RecurringExpense, 'id' | 'recurring'>) => {
    if (!data) return;
    const newExpense: RecurringExpense = {
      ...expense,
      id: uuidv4(),
      recurring: true,
    };
    setData({
      ...data,
      recurringExpenses: [...data.recurringExpenses, newExpense],
    });
  };

  const updateRecurringExpense = (id: string, updates: Partial<RecurringExpense>) => {
    if (!data) return;
    setData({
      ...data,
      recurringExpenses: data.recurringExpenses.map(exp =>
        exp.id === id ? { ...exp, ...updates } : exp
      ),
    });
  };

  const deleteRecurringExpense = (id: string) => {
    if (!data) return;
    setData({
      ...data,
      recurringExpenses: data.recurringExpenses.filter(exp => exp.id !== id),
    });
  };

  const addTripSavings = (amount: number) => {
    if (!data) return;
    const entry: TripSavingsEntry = {
      date: new Date().toISOString().split('T')[0],
      amount,
    };
    setData({
      ...data,
      tripSavings: {
        ...data.tripSavings,
        saved: data.tripSavings.saved + amount,
        entries: [...data.tripSavings.entries, entry],
      },
    });
  };

  const updateTripSavings = (target: number, deadline: string) => {
    if (!data) return;
    setData({
      ...data,
      tripSavings: {
        ...data.tripSavings,
        target,
        deadline,
      },
    });
  };

  const refreshData = async () => {
    const financeData = await loadFinanceData();
    setData(financeData);
  };

  // Show loading state while data is being fetched
  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-[#FAFBFC] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading your finances...</p>
        </div>
      </div>
    );
  }

  return (
    <FinanceContext.Provider
      value={{
        data,
        updateSalary,
        addExpense,
        updateExpense,
        deleteExpense,
        addRecurringExpense,
        updateRecurringExpense,
        deleteRecurringExpense,
        addTripSavings,
        updateTripSavings,
        refreshData,
        isSupabaseConnected,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = (): FinanceContextType => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};

