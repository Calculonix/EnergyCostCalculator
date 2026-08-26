import { calculateElectricityCost } from './calculator-engine.js?v=2026-10-01';
import { defaultElectricityPrice, siteConfig } from './data.js?v=2026-10-01';
import { formatCurrency, formatKwh, formatNumber } from './formatting.js';

const setText = (selector, value) => {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
};

const worked = calculateElectricityCost({ watts: 3000, hoursPerDay: 0.05, daysPerWeek: 3, electricityPrice: defaultElectricityPrice }, siteConfig.annualisation);
setText('[data-kettle="price"]', `${formatNumber(defaultElectricityPrice, 2)}p/kWh`);
setText('[data-kettle="hourly"]', formatCurrency(worked.hourlyCost));
setText('[data-kettle="boil"]', formatCurrency(worked.dailyCost));
setText('[data-kettle="day"]', formatCurrency(worked.dailyCost));
setText('[data-kettle="week"]', formatCurrency(worked.weeklyCost));
setText('[data-kettle="month"]', formatCurrency(worked.monthlyCost));
setText('[data-kettle="year"]', formatCurrency(worked.annualCost));
setText('[data-kettle="energy"]', formatKwh(worked.annualKwh));

[2000, 2400, 3000].forEach((watts) => {
  const result = calculateElectricityCost({ watts, hoursPerDay: 0.05, daysPerWeek: 3, electricityPrice: defaultElectricityPrice }, siteConfig.annualisation);
  setText(`[data-kettle-power="${watts}"][data-value="boil"]`, formatCurrency(result.dailyCost));
  setText(`[data-kettle-power="${watts}"][data-value="year"]`, formatCurrency(result.annualCost));
});
