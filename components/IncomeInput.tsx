'use client';

import React, { useState } from 'react';
import { useFinance } from '@/contexts/FinanceContext';
import { formatCurrency } from '@/lib/currency';
import { DollarSign, Calendar } from 'lucide-react';

export const IncomeInput: React.FC = () => {
  const { data, updateSalary } = useFinance();
  const [isEditing, setIsEditing] = useState(false);
  const [salary, setSalary] = useState(data.salary.toString());
  const [salaryDate, setSalaryDate] = useState(data.salaryDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(salary);
    if (!isNaN(amount) && amount >= 0) {
      updateSalary(amount, salaryDate);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setSalary(data.salary.toString());
    setSalaryDate(data.salaryDate);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-50 rounded-xl">
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Monthly Income</h2>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
              Salary Amount
            </label>
            <input
              type="number"
              step="0.01"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter salary amount"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
              Payment Date
            </label>
            <input
              type="date"
              value={salaryDate}
              onChange={(e) => setSalaryDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {formatCurrency(data.salary)}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Received on {new Date(data.salaryDate).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

