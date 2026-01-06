'use client';

import React, { useState } from 'react';
import { useFinance } from '@/contexts/FinanceContext';
import { calculateTripSavingsMetrics } from '@/lib/calculations';
import { formatCurrency } from '@/lib/currency';
import { Plane, Target, Calendar, TrendingUp, Plus, Settings } from 'lucide-react';

export const GermanyTripTracker: React.FC = () => {
  const { data, addTripSavings, updateTripSavings } = useFinance();
  const [showAddSavings, setShowAddSavings] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [savingsAmount, setSavingsAmount] = useState('');
  const [target, setTarget] = useState(data.tripSavings.target.toString());
  const [deadline, setDeadline] = useState(data.tripSavings.deadline);

  const metrics = calculateTripSavingsMetrics(data);

  const handleAddSavings = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(savingsAmount);
    if (!isNaN(amount) && amount > 0) {
      addTripSavings(amount);
      setSavingsAmount('');
      setShowAddSavings(false);
    }
  };

  const handleUpdateSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const newTarget = parseFloat(target);
    if (!isNaN(newTarget) && newTarget > 0) {
      updateTripSavings(newTarget, deadline);
      setShowSettings(false);
    }
  };

  const statusColors = {
    'on-track': 'from-green-500 to-emerald-600',
    'close': 'from-yellow-500 to-orange-600',
    'behind': 'from-red-500 to-rose-600',
  };

  const statusLabels = {
    'on-track': 'On Track! 🎉',
    'close': 'Almost There! 💪',
    'behind': 'Behind Schedule ⚠️',
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-xl">
            <Plane className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Germany Trip 2026</h2>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Settings className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {showSettings ? (
        <form onSubmit={handleUpdateSettings} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
              Target Amount (R$)
            </label>
            <input
              type="number"
              step="0.01"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
              Deadline
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
              required
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowSettings(false)}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-end mb-3">
              <div>
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(metrics.saved)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Target</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatCurrency(metrics.target)}
                </p>
              </div>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  metrics.status === 'on-track' ? 'bg-green-500' :
                  metrics.status === 'close' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${Math.min(metrics.percentage, 100)}%` }}
              />
            </div>
            <p className="text-right text-xs font-medium text-gray-600 mt-2">
              {metrics.percentage.toFixed(1)}%
            </p>
          </div>

          {/* Status Badge */}
          <div className={`rounded-xl p-3 mb-4 ${
            metrics.status === 'on-track' ? 'bg-green-50 border border-green-200' :
            metrics.status === 'close' ? 'bg-yellow-50 border border-yellow-200' :
            'bg-red-50 border border-red-200'
          }`}>
            <p className={`text-center font-medium text-sm ${
              metrics.status === 'on-track' ? 'text-green-700' :
              metrics.status === 'close' ? 'text-yellow-700' :
              'text-red-700'
            }`}>
              {statusLabels[metrics.status]}
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-purple-600" />
                <p className="text-xs text-gray-500 uppercase tracking-wide">Remaining</p>
              </div>
              <p className="text-base font-bold text-gray-900">
                {formatCurrency(metrics.remaining)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                <p className="text-xs text-gray-500 uppercase tracking-wide">Time Left</p>
              </div>
              <p className="text-base font-bold text-gray-900">
                {metrics.monthsRemaining} months
              </p>
            </div>
          </div>

          {/* Recommended Savings */}
          <div className="bg-purple-50 rounded-xl p-4 mb-4 border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <p className="text-xs font-medium text-purple-900 uppercase tracking-wide">Recommended Monthly</p>
            </div>
            <p className="text-xl font-bold text-purple-600">
              {formatCurrency(metrics.recommendedMonthlySavings)}
            </p>
            <p className="text-xs text-purple-700 mt-1">
              To reach your goal by {new Date(data.tripSavings.deadline).toLocaleDateString('pt-BR')}
            </p>
          </div>

          {/* Add Savings Button */}
          {showAddSavings ? (
            <form onSubmit={handleAddSavings} className="space-y-3">
              <input
                type="number"
                step="0.01"
                value={savingsAmount}
                onChange={(e) => setSavingsAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                placeholder="Enter amount to save"
                autoFocus
                required
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
                >
                  Add Savings
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddSavings(false);
                    setSavingsAmount('');
                  }}
                  className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowAddSavings(true)}
              className="w-full py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Savings
            </button>
          )}
        </>
      )}
    </div>
  );
};

