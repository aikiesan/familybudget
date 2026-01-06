'use client';

import React, { useState } from 'react';
import { ViewPeriod } from '@/types/finance';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { format, addWeeks, subWeeks, addMonths, subMonths, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

interface PeriodNavigationProps {
  onPeriodChange?: (start: Date, end: Date, period: ViewPeriod) => void;
}

export const PeriodNavigation: React.FC<PeriodNavigationProps> = ({ onPeriodChange }) => {
  const [viewPeriod, setViewPeriod] = useState<ViewPeriod>('monthly');
  const [currentDate, setCurrentDate] = useState(new Date());

  const getPeriodDates = (date: Date, period: ViewPeriod) => {
    if (period === 'weekly') {
      return {
        start: startOfWeek(date, { weekStartsOn: 0 }),
        end: endOfWeek(date, { weekStartsOn: 0 }),
      };
    } else {
      return {
        start: startOfMonth(date),
        end: endOfMonth(date),
      };
    }
  };

  const { start, end } = getPeriodDates(currentDate, viewPeriod);

  const handlePrevious = () => {
    const newDate = viewPeriod === 'weekly' 
      ? subWeeks(currentDate, 1) 
      : subMonths(currentDate, 1);
    setCurrentDate(newDate);
    const dates = getPeriodDates(newDate, viewPeriod);
    onPeriodChange?.(dates.start, dates.end, viewPeriod);
  };

  const handleNext = () => {
    const newDate = viewPeriod === 'weekly' 
      ? addWeeks(currentDate, 1) 
      : addMonths(currentDate, 1);
    setCurrentDate(newDate);
    const dates = getPeriodDates(newDate, viewPeriod);
    onPeriodChange?.(dates.start, dates.end, viewPeriod);
  };

  const handleToday = () => {
    const newDate = new Date();
    setCurrentDate(newDate);
    const dates = getPeriodDates(newDate, viewPeriod);
    onPeriodChange?.(dates.start, dates.end, viewPeriod);
  };

  const handlePeriodChange = (period: ViewPeriod) => {
    setViewPeriod(period);
    const dates = getPeriodDates(currentDate, period);
    onPeriodChange?.(dates.start, dates.end, period);
  };

  const formatPeriodLabel = () => {
    if (viewPeriod === 'weekly') {
      return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
    } else {
      return format(currentDate, 'MMMM yyyy');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Period Toggle */}
        <div className="flex bg-gray-50 rounded-xl p-1 border border-gray-100">
          <button
            onClick={() => handlePeriodChange('weekly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewPeriod === 'weekly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => handlePeriodChange('monthly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewPeriod === 'monthly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrevious}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center gap-2 min-w-[200px] justify-center">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="font-semibold text-gray-900 text-sm">
              {formatPeriodLabel()}
            </span>
          </div>

          <button
            onClick={handleNext}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Today Button */}
        <button
          onClick={handleToday}
          className="px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          Today
        </button>
      </div>
    </div>
  );
};

