'use client';

import React, { useState } from 'react';
import { useFinance } from '@/contexts/FinanceContext';
import { CATEGORIES } from '@/lib/categories';
import { Plus, X, Repeat } from 'lucide-react';
import { Expense, RecurringExpense } from '@/types/finance';

interface ExpenseFormProps {
  onClose?: () => void;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onClose }) => {
  const { addExpense, addRecurringExpense } = useFinance();
  const [isRecurring, setIsRecurring] = useState(false);
  
  const [formData, setFormData] = useState({
    category: CATEGORIES[0].name,
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    frequency: 'monthly' as 'monthly' | 'weekly',
    startDate: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (isRecurring) {
      addRecurringExpense({
        category: formData.category,
        amount,
        description: formData.description,
        frequency: formData.frequency,
        startDate: formData.startDate,
        active: true,
      });
    } else {
      addExpense({
        category: formData.category,
        amount,
        description: formData.description,
        date: formData.date,
      });
    }

    // Reset form
    setFormData({
      category: CATEGORIES[0].name,
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      frequency: 'monthly',
      startDate: new Date().toISOString().split('T')[0],
    });

    if (onClose) onClose();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-xl">
            <Plus className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Add Expense</h2>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </div>

      {/* Recurring Toggle */}
      <div className="mb-6 flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
        <input
          type="checkbox"
          id="recurring-toggle"
          checked={isRecurring}
          onChange={(e) => setIsRecurring(e.target.checked)}
          className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 border-gray-300"
        />
        <label htmlFor="recurring-toggle" className="flex items-center gap-2 cursor-pointer flex-1">
          <Repeat className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-gray-700">Recurring Expense</span>
        </label>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            required
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
            Amount (R$)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
            placeholder="0.00"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
            Description (optional)
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
            placeholder="Add a note..."
          />
        </div>

        {/* Conditional Fields */}
        {isRecurring ? (
          <>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                Frequency
              </label>
              <select
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value as 'monthly' | 'weekly' })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              />
            </div>
          </>
        ) : (
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              required
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

