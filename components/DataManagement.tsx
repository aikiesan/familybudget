'use client';

import React, { useRef } from 'react';
import { useFinance } from '@/contexts/FinanceContext';
import { exportFinanceData, importFinanceData, clearFinanceData } from '@/lib/storage';
import { Download, Upload, Trash2 } from 'lucide-react';

export const DataManagement: React.FC = () => {
  const { data, refreshData } = useFinance();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    exportFinanceData(data);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const importedData = await importFinanceData(file);
      localStorage.setItem('finance-data', JSON.stringify(importedData));
      refreshData();
      alert('Data imported successfully!');
    } catch (error) {
      alert('Error importing data. Please check the file format.');
      console.error(error);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      if (confirm('This will delete ALL your financial data. Are you absolutely sure?')) {
        clearFinanceData();
        refreshData();
        alert('All data has been cleared.');
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Data Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Export */}
        <button
          onClick={handleExport}
          className="flex items-center gap-3 px-5 py-4 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors border border-blue-100"
        >
          <Download className="w-5 h-5" />
          <div className="text-left">
            <p className="font-medium text-sm">Export Data</p>
            <p className="text-xs text-blue-600">Download JSON</p>
          </div>
        </button>

        {/* Import */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-3 px-5 py-4 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors border border-green-100"
        >
          <Upload className="w-5 h-5" />
          <div className="text-left">
            <p className="font-medium text-sm">Import Data</p>
            <p className="text-xs text-green-600">Upload JSON</p>
          </div>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />

        {/* Clear */}
        <button
          onClick={handleClear}
          className="flex items-center gap-3 px-5 py-4 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-colors border border-red-100"
        >
          <Trash2 className="w-5 h-5" />
          <div className="text-left">
            <p className="font-medium text-sm">Clear Data</p>
            <p className="text-xs text-red-600">Delete all</p>
          </div>
        </button>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
        <p className="text-xs text-yellow-800">
          <strong>Note:</strong> All data is stored locally. Export regularly to prevent loss.
        </p>
      </div>
    </div>
  );
};

