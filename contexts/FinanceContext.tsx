'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FinanceData, Expense, RecurringExpense, TripSavingsEntry } from '@/types/finance';
import { loadFinanceData, saveFinanceData } from '@/lib/storage';
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
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<FinanceData>(() => loadFinanceData());

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveFinanceData(data);
    
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
    
    setData(prev => ({
      ...prev,
      monthlySnapshots: {
        ...prev.monthlySnapshots,
        [currentMonth]: {
          income: data.salary,
          expenses: totalExpenses,
          balance,
        },
      },
    }));
  }, [data.salary, data.expenses, data.recurringExpenses]);

  const updateSalary = (salary: number, date: string) => {
    setData(prev => ({ ...prev, salary, salaryDate: date }));
  };

  const addExpense = (expense: Omit<Expense, 'id' | 'recurring'>) => {
    const newExpense: Expense = {
      ...expense,
      id: uuidv4(),
      recurring: false,
    };
    setData(prev => ({ ...prev, expenses: [...prev.expenses, newExpense] }));
  };

  const updateExpense = (id: string, updates: Partial<Expense>) => {
    setData(prev => ({
      ...prev,
      expenses: prev.expenses.map(exp => 
        exp.id === id ? { ...exp, ...updates } : exp
      ),
    }));
  };

  const deleteExpense = (id: string) => {
    setData(prev => ({
      ...prev,
      expenses: prev.expenses.filter(exp => exp.id !== id),
    }));
  };

  const addRecurringExpense = (expense: Omit<RecurringExpense, 'id' | 'recurring'>) => {
    const newExpense: RecurringExpense = {
      ...expense,
      id: uuidv4(),
      recurring: true,
    };
    setData(prev => ({
      ...prev,
      recurringExpenses: [...prev.recurringExpenses, newExpense],
    }));
  };

  const updateRecurringExpense = (id: string, updates: Partial<RecurringExpense>) => {
    setData(prev => ({
      ...prev,
      recurringExpenses: prev.recurringExpenses.map(exp =>
        exp.id === id ? { ...exp, ...updates } : exp
      ),
    }));
  };

  const deleteRecurringExpense = (id: string) => {
    setData(prev => ({
      ...prev,
      recurringExpenses: prev.recurringExpenses.filter(exp => exp.id !== id),
    }));
  };

  const addTripSavings = (amount: number) => {
    const entry: TripSavingsEntry = {
      date: new Date().toISOString().split('T')[0],
      amount,
    };
    setData(prev => ({
      ...prev,
      tripSavings: {
        ...prev.tripSavings,
        saved: prev.tripSavings.saved + amount,
        entries: [...prev.tripSavings.entries, entry],
      },
    }));
  };

  const updateTripSavings = (target: number, deadline: string) => {
    setData(prev => ({
      ...prev,
      tripSavings: {
        ...prev.tripSavings,
        target,
        deadline,
      },
    }));
  };

  const refreshData = () => {
    setData(loadFinanceData());
  };

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

