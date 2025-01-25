export const formatMoney = (amount: number, locale = 'en-US', currency = 'PHP') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  };

export const parseMoney = (formattedMoney: string) => {
  const numericString = formattedMoney
    .replace(/[^\d.-]/g, ''); // Keep digits, minus, and dot

  return parseFloat(numericString);
};