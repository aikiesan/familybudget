import { Category } from '@/types/finance';

export const CATEGORIES: Category[] = [
  { id: 'housing', name: 'Housing', icon: '🏠', color: '#3B82F6' },
  { id: 'utilities', name: 'Utilities', icon: '⚡', color: '#FBBF24' },
  { id: 'food-groceries', name: 'Food & Groceries', icon: '🍔', color: '#10B981' },
  { id: 'dining-out', name: 'Dining Out & Restaurants', icon: '🍽️', color: '#F59E0B' },
  { id: 'transportation', name: 'Transportation', icon: '🚗', color: '#8B5CF6' },
  { id: 'healthcare', name: 'Healthcare & Pharmacy', icon: '🏥', color: '#EF4444' },
  { id: 'education', name: 'Education & Research', icon: '🎓', color: '#6366F1' },
  { id: 'subscriptions', name: 'Subscriptions', icon: '📱', color: '#EC4899' },
  { id: 'shopping', name: 'Shopping & Personal Care', icon: '🛍️', color: '#F472B6' },
  { id: 'entertainment', name: 'Entertainment & Leisure', icon: '🎮', color: '#A855F7' },
  { id: 'sports', name: 'Sports & Fitness', icon: '🚴', color: '#14B8A6' },
  { id: 'travel', name: 'Travel & Tourism', icon: '✈️', color: '#06B6D4' },
  { id: 'books', name: 'Books & Learning', icon: '📚', color: '#8B5CF6' },
  { id: 'technology', name: 'Technology & Gadgets', icon: '💻', color: '#6366F1' },
  { id: 'gifts', name: 'Gifts & Donations', icon: '🎁', color: '#EC4899' },
  { id: 'maintenance', name: 'Maintenance & Repairs', icon: '🔧', color: '#94A3B8' },
  { id: 'pets', name: 'Pets', icon: '🐾', color: '#F97316' },
  { id: 'bank-fees', name: 'Bank Fees & Taxes', icon: '💳', color: '#64748B' },
  { id: 'other', name: 'Other', icon: '📦', color: '#9CA3AF' },
];

export const getCategoryById = (id: string): Category | undefined => {
  return CATEGORIES.find(cat => cat.id === id);
};

export const getCategoryByName = (name: string): Category | undefined => {
  return CATEGORIES.find(cat => cat.name === name);
};

