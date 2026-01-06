/**
 * Format number to Brazilian Real currency format
 * @param amount - The amount to format
 * @returns Formatted string in R$ format (e.g., R$ 1.234,56)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
};

/**
 * Parse Brazilian Real currency string to number
 * @param value - Currency string to parse
 * @returns Parsed number value
 */
export const parseCurrency = (value: string): number => {
  // Remove R$, spaces, and dots (thousand separators)
  // Replace comma with dot for decimal
  const cleanValue = value
    .replace(/R\$\s?/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
  
  const parsed = parseFloat(cleanValue);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Format number to compact format (e.g., 1.2K, 1.5M)
 * @param amount - The amount to format
 * @returns Compact formatted string
 */
export const formatCompactCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `R$ ${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `R$ ${(amount / 1000).toFixed(1)}K`;
  }
  return formatCurrency(amount);
};

