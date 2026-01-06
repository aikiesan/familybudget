'use client';

import React, { useMemo } from 'react';
import { useFinance } from '@/contexts/FinanceContext';
import { getExpensesByCategory, getTopCategories, calculateRecurringMonthlyTotal } from '@/lib/calculations';
import { getCategoryByName } from '@/lib/categories';
import { formatCurrency } from '@/lib/currency';
import { Pie, Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const Charts: React.FC = () => {
  const { data } = useFinance();

  // Calculate category data
  const categoryTotals = useMemo(
    () => getExpensesByCategory(data.expenses, data.recurringExpenses),
    [data.expenses, data.recurringExpenses]
  );

  const topCategories = useMemo(
    () => getTopCategories(categoryTotals, 5),
    [categoryTotals]
  );

  // Pie Chart Data - All categories
  const pieData = useMemo(() => {
    const categories = Object.keys(categoryTotals);
    const amounts = Object.values(categoryTotals);
    const colors = categories.map(cat => getCategoryByName(cat)?.color || '#9CA3AF');

    return {
      labels: categories,
      datasets: [
        {
          data: amounts,
          backgroundColor: colors,
          borderColor: colors.map(c => c),
          borderWidth: 2,
        },
      ],
    };
  }, [categoryTotals]);

  // Bar Chart Data - Top 5 categories
  const barData = useMemo(() => {
    const categories = topCategories.map(t => t.category);
    const amounts = topCategories.map(t => t.amount);
    const colors = categories.map(cat => getCategoryByName(cat)?.color || '#9CA3AF');

    return {
      labels: categories,
      datasets: [
        {
          label: 'Amount (R$)',
          data: amounts,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 2,
          borderRadius: 8,
        },
      ],
    };
  }, [topCategories]);

  // Line Chart Data - Monthly trend (last 6 months)
  const lineData = useMemo(() => {
    const months = Object.keys(data.monthlySnapshots).sort().slice(-6);
    const expenses = months.map(month => data.monthlySnapshots[month]?.expenses || 0);
    
    return {
      labels: months.map(m => {
        const [year, month] = m.split('-');
        return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
      }),
      datasets: [
        {
          label: 'Monthly Expenses',
          data: expenses,
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
          borderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    };
  }, [data.monthlySnapshots]);

  // Doughnut Chart Data - Recurring vs One-time
  const doughnutData = useMemo(() => {
    const recurringTotal = calculateRecurringMonthlyTotal(data.recurringExpenses);
    const oneTimeTotal = data.expenses.reduce((sum, exp) => sum + exp.amount, 0);

    return {
      labels: ['Recurring', 'One-time'],
      datasets: [
        {
          data: [recurringTotal, oneTimeTotal],
          backgroundColor: ['#8B5CF6', '#10B981'],
          borderColor: ['#8B5CF6', '#10B981'],
          borderWidth: 2,
        },
      ],
    };
  }, [data.expenses, data.recurringExpenses]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.parsed.y ?? context.parsed;
            return `${label}: ${formatCurrency(value)}`;
          },
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pie Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-6">Expense Distribution</h3>
        <div className="h-80">
          {Object.keys(categoryTotals).length > 0 ? (
            <Pie data={pieData} options={chartOptions} />
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-gray-400">
              No expenses to display
            </div>
          )}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-6">Top 5 Categories</h3>
        <div className="h-80">
          {topCategories.length > 0 ? (
            <Bar data={barData} options={chartOptions} />
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-gray-400">
              No expenses to display
            </div>
          )}
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-6">Monthly Spending Trend</h3>
        <div className="h-80">
          {Object.keys(data.monthlySnapshots).length > 0 ? (
            <Line data={lineData} options={chartOptions} />
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-gray-400">
              No historical data yet
            </div>
          )}
        </div>
      </div>

      {/* Doughnut Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-6">Recurring vs One-time</h3>
        <div className="h-80">
          {(data.expenses.length > 0 || data.recurringExpenses.length > 0) ? (
            <Doughnut data={doughnutData} options={chartOptions} />
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-gray-400">
              No expenses to display
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

