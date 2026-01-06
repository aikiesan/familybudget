'use client';

import React, { useState } from 'react';
import { useFinance } from '@/contexts/FinanceContext';
import { formatCurrency } from '@/lib/currency';
import { getCategoryByName } from '@/lib/categories';
import { Trash2, Edit2, Repeat, Calendar } from 'lucide-react';
import { AnyExpense } from '@/types/finance';

export const ExpenseList: React.FC = () => {
  const { data, deleteExpense, deleteRecurringExpense, updateRecurringExpense } = useFinance();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Combine and sort all expenses
  const allExpenses: AnyExpense[] = [
    ...data.expenses,
    ...data.recurringExpenses,
  ].sort((a, b) => {
    const dateA = 'date' in a ? a.date : a.startDate;
    const dateB = 'date' in b ? b.date : b.startDate;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  // Filter by category if selected
  const filteredExpenses = selectedCategory
    ? allExpenses.filter(exp => exp.category === selectedCategory)
    : allExpenses;

  const handleDelete = (expense: AnyExpense) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      if (expense.recurring) {
        deleteRecurringExpense(expense.id);
      } else {
        deleteExpense(expense.id);
      }
    }
  };

  const toggleRecurringActive = (expense: AnyExpense) => {
    if (expense.recurring) {
      updateRecurringExpense(expense.id, { active: !expense.active });
    }
  };

  const getUniqueCategories = () => {
    const categories = new Set(allExpenses.map(exp => exp.category));
    return Array.from(categories).sort();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Expense History</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-gray-900 text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            All
          </button>
        </div>
      </div>

      {/* Category Filter Chips */}
      {getUniqueCategories().length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {getUniqueCategories().map((category) => {
            const cat = getCategoryByName(category);
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                {cat?.icon} {category}
              </button>
            );
          })}
        </div>
      )}

      {/* Expense List */}
      <div className="space-y-3">
        {filteredExpenses.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-medium">No expenses yet</p>
            <p className="text-sm">Start by adding your first expense above</p>
          </div>
        ) : (
          filteredExpenses.map((expense) => {
            const category = getCategoryByName(expense.category);
            const isRecurring = expense.recurring;
            const date = isRecurring ? expense.startDate : expense.date;
            const isActive = isRecurring ? expense.active : true;

            return (
              <div
                key={expense.id}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  isActive
                    ? 'border-gray-100 hover:border-gray-200 bg-white'
                    : 'border-gray-100 bg-gray-50 opacity-50'
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                    style={{ backgroundColor: category?.color + '15' }}
                  >
                    {category?.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm">{expense.category}</h3>
                      {isRecurring && (
                        <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-xs font-medium rounded-md flex items-center gap-1 border border-purple-100">
                          <Repeat className="w-3 h-3" />
                          {expense.frequency}
                        </span>
                      )}
                      {isRecurring && !isActive && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                          Paused
                        </span>
                      )}
                    </div>
                    {expense.description && (
                      <p className="text-sm text-gray-600 mb-1">{expense.description}</p>
                    )}
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {new Date(date).toLocaleDateString('pt-BR')}
                      {isRecurring && (
                        <span className="ml-2 text-gray-400">
                          • {formatCurrency(expense.frequency === 'monthly' ? expense.amount : expense.amount * 4.33)}/mo
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-lg font-bold text-gray-900">
                    {formatCurrency(expense.amount)}
                  </p>
                  <div className="flex gap-1">
                    {isRecurring && (
                      <button
                        onClick={() => toggleRecurringActive(expense)}
                        className={`p-2 rounded-lg transition-colors ${
                          isActive
                            ? 'hover:bg-yellow-50 text-yellow-600'
                            : 'hover:bg-green-50 text-green-600'
                        }`}
                        title={isActive ? 'Pause' : 'Resume'}
                      >
                        {isActive ? '⏸️' : '▶️'}
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(expense)}
                      className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

