'use client';

import React from 'react';
import { useFinance } from '@/contexts/FinanceContext';
import { formatCurrency } from '@/lib/currency';
import { 
  calculateRecurringMonthlyTotal, 
  getCurrentMonth,
  getExpensesInRange,
  calculateTripSavingsMetrics
} from '@/lib/calculations';
import { DollarSign, TrendingDown, Wallet, Target } from 'lucide-react';

export const SummaryCards: React.FC = () => {
  const { data } = useFinance();
  const { start, end } = getCurrentMonth();

  // Calculate monthly totals
  const monthlyRecurringTotal = calculateRecurringMonthlyTotal(data.recurringExpenses);
  const monthlyOneTimeExpenses = getExpensesInRange(data.expenses, start, end);
  const monthlyOneTimeTotal = monthlyOneTimeExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalExpenses = monthlyRecurringTotal + monthlyOneTimeTotal;
  const balance = data.salary - totalExpenses;

  const tripMetrics = calculateTripSavingsMetrics(data);

  const cards = [
    {
      title: 'Total Income',
      value: data.salary,
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-600',
      subtext: 'This month',
    },
    {
      title: 'Total Expenses',
      value: totalExpenses,
      icon: TrendingDown,
      gradient: 'from-red-500 to-rose-600',
      subtext: `${monthlyOneTimeExpenses.length} transactions`,
    },
    {
      title: 'Balance Remaining',
      value: balance,
      icon: Wallet,
      gradient: balance >= 0 ? 'from-blue-500 to-cyan-600' : 'from-gray-500 to-gray-600',
      subtext: balance >= 0 ? 'Available' : 'Over budget',
    },
    {
      title: 'Germany Trip',
      value: tripMetrics.saved,
      icon: Target,
      gradient: 'from-purple-500 to-pink-600',
      subtext: `${tripMetrics.percentage.toFixed(1)}% of ${formatCurrency(tripMetrics.target)}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const isPositive = index === 0 || (index === 2 && balance >= 0);
        const isNegative = index === 1 || (index === 2 && balance < 0);
        
        return (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2.5 rounded-xl ${
                isPositive ? 'bg-green-50' : 
                isNegative ? 'bg-red-50' : 
                index === 3 ? 'bg-purple-50' : 'bg-blue-50'
              }`}>
                <card.icon className={`w-5 h-5 ${
                  isPositive ? 'text-green-600' : 
                  isNegative ? 'text-red-600' : 
                  index === 3 ? 'text-purple-600' : 'text-blue-600'
                }`} />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(card.value)}</p>
              <p className="text-xs text-gray-500">{card.subtext}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

