'use client';

import React from 'react';
import { useFinance } from '@/contexts/FinanceContext';
import { Cloud, CloudOff } from 'lucide-react';

export const SupabaseStatus: React.FC = () => {
  const { isSupabaseConnected } = useFinance();

  if (!isSupabaseConnected) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg border border-gray-200">
        <CloudOff className="w-4 h-4 text-gray-500" />
        <span className="text-xs text-gray-600">Local Only</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg border border-green-200">
      <Cloud className="w-4 h-4 text-green-600" />
      <span className="text-xs text-green-700">Synced</span>
    </div>
  );
};

