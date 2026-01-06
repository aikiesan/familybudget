export interface Expense {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: string;
  recurring: false;
}

export interface RecurringExpense {
  id: string;
  category: string;
  amount: number;
  description: string;
  frequency: 'monthly' | 'weekly';
  startDate: string;
  active: boolean;
  recurring: true;
}

export type AnyExpense = Expense | RecurringExpense;

export interface TripSavingsEntry {
  date: string;
  amount: number;
}

export interface TripSavings {
  target: number;
  deadline: string;
  saved: number;
  entries: TripSavingsEntry[];
}

export interface MonthlySnapshot {
  income: number;
  expenses: number;
  balance: number;
}

export interface FinanceData {
  salary: number;
  salaryDate: string;
  expenses: Expense[];
  recurringExpenses: RecurringExpense[];
  tripSavings: TripSavings;
  monthlySnapshots: Record<string, MonthlySnapshot>;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export type ViewPeriod = 'weekly' | 'monthly';

export interface PeriodData {
  startDate: Date;
  endDate: Date;
  label: string;
}

