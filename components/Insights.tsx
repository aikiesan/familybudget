'use client';

import React, { useMemo } from 'react';
import { useFinance } from '@/contexts/FinanceContext';
import { 
  getExpensesByCategory, 
  getTopCategories, 
  calculateRecurringMonthlyTotal,
  getCurrentMonth,
  getExpensesInRange,
  calculateTripSavingsMetrics
} from '@/lib/calculations';
import { formatCurrency } from '@/lib/currency';
import { TrendingUp, TrendingDown, AlertCircle, Lightbulb, Target, Calendar } from 'lucide-react';
import { format, subMonths } from 'date-fns';

export const Insights: React.FC = () => {
  const { data } = useFinance();

  const insights = useMemo(() => {
    const { start, end } = getCurrentMonth();
    const currentMonth = format(new Date(), 'yyyy-MM');
    const lastMonth = format(subMonths(new Date(), 1), 'yyyy-MM');

    // Current month totals
    const categoryTotals = getExpensesByCategory(data.expenses, data.recurringExpenses);
    const topCategories = getTopCategories(categoryTotals, 1);
    const recurringTotal = calculateRecurringMonthlyTotal(data.recurringExpenses);
    const oneTimeExpenses = getExpensesInRange(data.expenses, start, end);
    const oneTimeTotal = oneTimeExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const totalExpenses = recurringTotal + oneTimeTotal;

    // Average daily spending
    const daysInMonth = end.getDate();
    const dailyAverage = totalExpenses / daysInMonth;

    // Compare with last month
    const currentSnapshot = data.monthlySnapshots[currentMonth];
    const lastSnapshot = data.monthlySnapshots[lastMonth];
    const difference = currentSnapshot && lastSnapshot 
      ? currentSnapshot.expenses - lastSnapshot.expenses 
      : 0;

    // Trip savings insights
    const tripMetrics = calculateTripSavingsMetrics(data);

    // Balance insight
    const balance = data.salary - totalExpenses;
    const balancePercentage = data.salary > 0 ? (balance / data.salary) * 100 : 0;

    const insightsList = [];

    // Top spending category
    if (topCategories.length > 0) {
      const topCat = topCategories[0];
      const percentage = totalExpenses > 0 ? (topCat.amount / totalExpenses * 100).toFixed(1) : 0;
      insightsList.push({
        icon: TrendingUp,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        title: 'Top Spending Category',
        description: `Your highest expense is ${topCat.category} at ${formatCurrency(topCat.amount)} (${percentage}% of total)`,
      });
    }

    // Monthly comparison
    if (difference !== 0) {
      const isIncrease = difference > 0;
      insightsList.push({
        icon: isIncrease ? TrendingUp : TrendingDown,
        color: isIncrease ? 'text-red-600' : 'text-green-600',
        bg: isIncrease ? 'bg-red-50' : 'bg-green-50',
        title: 'Monthly Comparison',
        description: `You spent ${formatCurrency(Math.abs(difference))} ${isIncrease ? 'more' : 'less'} than last month`,
      });
    }

    // Daily average
    if (dailyAverage > 0) {
      insightsList.push({
        icon: Calendar,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        title: 'Daily Average',
        description: `You're spending ${formatCurrency(dailyAverage)} per day on average`,
      });
    }

    // Trip savings recommendation
    if (tripMetrics.remaining > 0) {
      insightsList.push({
        icon: Target,
        color: 'text-pink-600',
        bg: 'bg-pink-50',
        title: 'Germany Trip Goal',
        description: `To reach your goal, save ${formatCurrency(tripMetrics.recommendedMonthlySavings)} per month`,
      });
    }

    // Balance warning or congratulation
    if (balance < 0) {
      insightsList.push({
        icon: AlertCircle,
        color: 'text-red-600',
        bg: 'bg-red-50',
        title: 'Budget Alert',
        description: `You're ${formatCurrency(Math.abs(balance))} over budget this month`,
      });
    } else if (balancePercentage > 30) {
      insightsList.push({
        icon: Lightbulb,
        color: 'text-green-600',
        bg: 'bg-green-50',
        title: 'Great Job!',
        description: `You have ${formatCurrency(balance)} (${balancePercentage.toFixed(0)}%) of your income remaining`,
      });
    }

    // Savings suggestion
    if (topCategories.length > 0 && totalExpenses > 0) {
      const topCat = topCategories[0];
      const savings20Percent = topCat.amount * 0.2;
      insightsList.push({
        icon: Lightbulb,
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        title: 'Savings Opportunity',
        description: `You could save ${formatCurrency(savings20Percent)} by reducing ${topCat.category} spending by 20%`,
      });
    }

    return insightsList;
  }, [data]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-yellow-50 rounded-xl">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Insights & Recommendations</h2>
      </div>

      {insights.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-sm font-medium text-gray-900 mb-1">No insights yet</p>
          <p className="text-xs text-gray-500">Add your income and expenses to see personalized insights</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`${insight.bg} rounded-xl p-4 border ${insight.color.replace('text-', 'border-').replace('600', '200')}`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${insight.bg}`}>
                  <insight.icon className={`w-4 h-4 ${insight.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium text-sm ${insight.color} mb-1`}>
                    {insight.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

