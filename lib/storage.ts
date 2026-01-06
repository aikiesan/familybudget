import { FinanceData } from '@/types/finance';

const STORAGE_KEY = 'finance-data';

const getDefaultData = (): FinanceData => ({
  salary: 0,
  salaryDate: new Date().toISOString().split('T')[0],
  expenses: [],
  recurringExpenses: [],
  tripSavings: {
    target: 20000,
    deadline: '2026-07-01',
    saved: 0,
    entries: [],
  },
  monthlySnapshots: {},
});

/**
 * Load finance data from localStorage
 */
export const loadFinanceData = (): FinanceData => {
  if (typeof window === 'undefined') {
    return getDefaultData();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return getDefaultData();
    }
    
    const data = JSON.parse(stored);
    // Ensure all required fields exist (for backward compatibility)
    return {
      ...getDefaultData(),
      ...data,
      tripSavings: {
        ...getDefaultData().tripSavings,
        ...(data.tripSavings || {}),
      },
    };
  } catch (error) {
    console.error('Error loading finance data:', error);
    return getDefaultData();
  }
};

/**
 * Save finance data to localStorage
 */
export const saveFinanceData = (data: FinanceData): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving finance data:', error);
  }
};

/**
 * Export finance data as JSON file
 */
export const exportFinanceData = (data: FinanceData): void => {
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `finance-data-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Import finance data from JSON file
 */
export const importFinanceData = (file: File): Promise<FinanceData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        // Validate and merge with defaults
        const validatedData: FinanceData = {
          ...getDefaultData(),
          ...data,
        };
        resolve(validatedData);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsText(file);
  });
};

/**
 * Clear all finance data
 */
export const clearFinanceData = (): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.removeItem(STORAGE_KEY);
};

