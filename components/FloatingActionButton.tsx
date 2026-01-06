'use client';

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { ExpenseForm } from './ExpenseForm';

export const FloatingActionButton: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {/* Mobile FAB */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 z-40 lg:hidden w-14 h-14 bg-gray-900 text-white rounded-2xl shadow-xl flex items-center justify-center hover:bg-gray-800 active:scale-95 transition-all"
        aria-label="Add expense"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          />
          
          {/* Modal Content */}
          <div className="absolute inset-x-4 top-20 bottom-20 overflow-auto">
            <div className="relative max-w-lg mx-auto">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white rounded-xl shadow-lg border border-gray-100"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              <ExpenseForm onClose={() => setShowForm(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

