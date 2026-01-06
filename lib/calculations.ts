import { Expense, RecurringExpense, AnyExpense, FinanceData } from '@/types/finance';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval, differenceInMonths, differenceInDays, parseISO } from 'date-fns';

/**
 * Calculate monthly total from recurring expenses
 */
export const calculateRecurringMonthlyTotal = (recurringExpenses: RecurringExpense[]): number => {
  return recurringExpenses.reduce((total, expense) => {
    if (!expense.active) return total;
    
    if (expense.frequency === 'monthly') {
      return total + expense.amount;
    } else if (expense.frequency === 'weekly') {
      // Average weeks per month: 4.33
      return total + (expense.amount * 4.33);
    }
    return total;
  }, 0);
};

/**
 * Get expenses for a specific date range
 */
export const getExpensesInRange = (
  expenses: Expense[],
  startDate: Date,
  endDate: Date
): Expense[] => {
  return expenses.filter(expense => {
    const expenseDate = parseISO(expense.date);
    return isWithinInterval(expenseDate, { start: startDate, end: endDate });
  });
};

/**
 * Calculate total expenses for a date range
 */
export const calculateTotalExpenses = (
  expenses: Expense[],
  recurringExpenses: RecurringExpense[],
  startDate: Date,
  endDate: Date
): number => {
  // One-time expenses in range
  const oneTimeTotal = getExpensesInRange(expenses, startDate, endDate).reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // Recurring expenses (prorated for the period)
  const daysInPeriod = differenceInDays(endDate, startDate) + 1;
  const recurringTotal = recurringExpenses.reduce((total, expense) => {
    if (!expense.active) return total;
    
    if (expense.frequency === 'monthly') {
      // Prorate monthly expenses based on days
      return total + (expense.amount * daysInPeriod / 30);
    } else if (expense.frequency === 'weekly') {
      // Calculate weeks in period
      const weeksInPeriod = daysInPeriod / 7;
      return total + (expense.amount * weeksInPeriod);
    }
    return total;
  }, 0);

  return oneTimeTotal + recurringTotal;
};

/**
 * Calculate expenses by category
 */
export const getExpensesByCategory = (
  expenses: Expense[],
  recurringExpenses: RecurringExpense[],
  startDate?: Date,
  endDate?: Date
): Record<string, number> => {
  const categoryTotals: Record<string, number> = {};

  // Filter expenses by date range if provided
  const filteredExpenses = startDate && endDate 
    ? getExpensesInRange(expenses, startDate, endDate)
    : expenses;

  // Add one-time expenses
  filteredExpenses.forEach(expense => {
    categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
  });

  // Add recurring expenses (full monthly amount)
  recurringExpenses.forEach(expense => {
    if (expense.active) {
      const amount = expense.frequency === 'monthly' 
        ? expense.amount 
        : expense.amount * 4.33;
      
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + amount;
    }
  });

  return categoryTotals;
};

/**
 * Get top N spending categories
 */
export const getTopCategories = (
  categoryTotals: Record<string, number>,
  limit: number = 5
): Array<{ category: string; amount: number }> => {
  return Object.entries(categoryTotals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);
};

/**
 * Calculate Germany trip savings metrics
 */
export const calculateTripSavingsMetrics = (data: FinanceData) => {
  const { tripSavings } = data;
  const deadline = parseISO(tripSavings.deadline);
  const today = new Date();
  
  const monthsRemaining = Math.max(0, differenceInMonths(deadline, today));
  const daysRemaining = Math.max(0, differenceInDays(deadline, today));
  const remaining = tripSavings.target - tripSavings.saved;
  const percentage = (tripSavings.saved / tripSavings.target) * 100;
  
  const recommendedMonthlySavings = monthsRemaining > 0 
    ? remaining / monthsRemaining 
    : remaining;
  
  // Determine if on track (green), close (yellow), or behind (red)
  const currentMonthsPassed = differenceInMonths(today, parseISO('2026-01-01'));
  const expectedSaved = (tripSavings.target / differenceInMonths(deadline, parseISO('2026-01-01'))) * currentMonthsPassed;
  
  let status: 'on-track' | 'close' | 'behind';
  if (tripSavings.saved >= expectedSaved) {
    status = 'on-track';
  } else if (tripSavings.saved >= expectedSaved * 0.8) {
    status = 'close';
  } else {
    status = 'behind';
  }

  return {
    saved: tripSavings.saved,
    target: tripSavings.target,
    remaining,
    percentage,
    monthsRemaining,
    daysRemaining,
    recommendedMonthlySavings,
    status,
  };
};

/**
 * Calculate balance (income - expenses)
 */
export const calculateBalance = (
  income: number,
  expenses: Expense[],
  recurringExpenses: RecurringExpense[],
  startDate: Date,
  endDate: Date
): number => {
  const totalExpenses = calculateTotalExpenses(expenses, recurringExpenses, startDate, endDate);
  return income - totalExpenses;
};

/**
 * Get current week date range
 */
export const getCurrentWeek = (): { start: Date; end: Date } => {
  const now = new Date();
  return {
    start: startOfWeek(now, { weekStartsOn: 0 }), // Sunday
    end: endOfWeek(now, { weekStartsOn: 0 }),
  };
};

/**
 * Get current month date range
 */
export const getCurrentMonth = (): { start: Date; end: Date } => {
  const now = new Date();
  return {
    start: startOfMonth(now),
    end: endOfMonth(now),
  };
};

