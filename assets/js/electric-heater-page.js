import { calculateElectricityCost } from './calculator-engine.js?v=2026-10-01';
import { defaultElectricityPrice, siteConfig } from './data.js?v=2026-10-01';
import { formatCurrency, formatNumber } from './formatting.js';

const worked = calculateElectricityCost({ watts: 2000, hoursPerDay: 2, daysPerWeek: 7, electricityPrice: defaultElectricityPrice }, siteConfig.annualisation);
const setText = (selector, value) => { const element = document.querySelector(selector); if (element) element.textContent = value; };
setText('[data-heater="price"]', `${formatNumber(defaultElectricityPrice, 2)}p/kWh`);
setText('[data-heater="worked-hour"]', formatCurrency(worked.hourlyCost));
setText('[data-heater="worked-day"]', formatCurrency(worked.dailyCost));
setText('[data-heater="worked-week"]', formatCurrency(worked.weeklyCost));
setText('[data-heater="worked-month"]', formatCurrency(worked.monthlyCost));
setText('[data-heater="worked-year"]', formatCurrency(worked.annualCost));

const models = [
  { key: 'dimplex-fan', watts: 3000 },
  { key: 'bush-convector', watts: 2000 },
  { key: 'delonghi-oil', watts: 2500 },
  { key: 'bush-oil', watts: 1500 },
];
models.forEach(({ key, watts }) => {
  const result = calculateElectricityCost({ watts, hoursPerDay: 1, daysPerWeek: 1, electricityPrice: defaultElectricityPrice }, siteConfig.annualisation);
  setText(`[data-heater-model="${key}"][data-value="hour"]`, formatCurrency(result.hourlyCost));
  setText(`[data-heater-model="${key}"][data-value="eight-hours"]`, formatCurrency(result.hourlyCost * 8));
});
