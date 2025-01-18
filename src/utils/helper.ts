export const formatMoney = (amount: number, locale = 'en-US', currency = 'PHP') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  };