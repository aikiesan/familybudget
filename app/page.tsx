'use client';

import React, { useState } from 'react';
import { IncomeInput } from '@/components/IncomeInput';
import { SummaryCards } from '@/components/SummaryCards';
import { ExpenseForm } from '@/components/ExpenseForm';
import { GermanyTripTracker } from '@/components/GermanyTripTracker';
import { Charts } from '@/components/Charts';
import { ExpenseList } from '@/components/ExpenseList';
import { Insights } from '@/components/Insights';
import { PeriodNavigation } from '@/components/PeriodNavigation';
import { DataManagement } from '@/components/DataManagement';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { SupabaseStatus } from '@/components/SupabaseStatus';
import { Wallet, Menu, X } from 'lucide-react';

export default function Home() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gray-900 rounded-xl">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Personal Finance
                </h1>
                <p className="text-xs text-gray-500">
                  Track expenses & reach goals
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <SupabaseStatus />
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {showMobileMenu ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Summary Cards */}
          <SummaryCards />

          {/* Period Navigation */}
          <PeriodNavigation />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Input Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Income Input */}
              <IncomeInput />

              {/* Expense Form */}
              <ExpenseForm />

              {/* Charts */}
              <Charts />

              {/* Insights */}
              <Insights />

              {/* Data Management */}
              <DataManagement />
            </div>

            {/* Right Column - Trip Tracker & Expense List */}
            <div className="space-y-6">
              {/* Germany Trip Tracker */}
              <GermanyTripTracker />
            </div>
          </div>

          {/* Full Width Expense List */}
          <ExpenseList />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Personal Finance Manager
            </p>
            <p className="mt-2 text-xs text-gray-500">
              All data stored locally • Export regularly to prevent loss
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button (Mobile) */}
      <FloatingActionButton />
    </div>
  );
}
