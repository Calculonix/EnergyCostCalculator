export function formatCurrency(value) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}

export function formatKwh(value) {
  return `${new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 }).format(value)} kWh`;
}

export function formatNumber(value, maximumFractionDigits = 1) {
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits }).format(value);
}
