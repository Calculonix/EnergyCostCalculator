import { calculateElectricityCost } from './calculator-engine.js';
import { defaultElectricityPrice, siteConfig } from './data.js';
import { formatCurrency, formatKwh, formatNumber } from './formatting.js';

const examples = [
  { key: 'kettle', name: 'Kettle', watts: 3000, hours: 0.1, days: 7 },
  { key: 'tumble-dryer', name: 'Tumble dryer', watts: 2500, hours: 1, days: 3 },
  { key: 'television', name: 'Television', watts: 100, hours: 4, days: 7 },
  { key: 'electric-heater', name: 'Electric heater', watts: 2000, hours: 3, days: 5 },
];

const price = document.querySelector('[data-guide="price"]');
const workedCost = document.querySelector('[data-guide="worked-cost"]');
const workedEnergy = document.querySelector('[data-guide="worked-energy"]');

if (price) price.textContent = `${formatNumber(defaultElectricityPrice, 2)}p/kWh`;
if (workedCost && workedEnergy) {
  const worked = calculateElectricityCost({ watts: 2000, hoursPerDay: 2, daysPerWeek: 7, electricityPrice: defaultElectricityPrice }, siteConfig.annualisation);
  workedCost.textContent = formatCurrency(worked.annualCost);
  workedEnergy.textContent = formatKwh(worked.annualKwh);
}

examples.forEach((example) => {
  const result = calculateElectricityCost({ watts: example.watts, hoursPerDay: example.hours, daysPerWeek: example.days, electricityPrice: defaultElectricityPrice }, siteConfig.annualisation);
  const row = document.querySelector(`[data-example-row="${example.key}"]`);
  if (!row) return;
  row.querySelector('[data-value="power"]').textContent = `${formatNumber(example.watts, 0)} W`;
  row.querySelector('[data-value="usage"]').textContent = `${formatNumber(example.hours)} h/day, ${formatNumber(example.days)} days/week`;
  row.querySelector('[data-value="weekly-kwh"]').textContent = formatKwh(result.weeklyKwh);
  row.querySelector('[data-value="annual-cost"]').textContent = formatCurrency(result.annualCost);
});
