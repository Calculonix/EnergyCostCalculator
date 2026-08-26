import { calculateElectricityCost } from './calculator-engine.js?v=2026-10-01';
import { defaultElectricityPrice, siteConfig } from './data.js?v=2026-10-01';
import { formatCurrency, formatKwh, formatNumber } from './formatting.js';

const result = calculateElectricityCost({ watts: 2500, hoursPerDay: 1, daysPerWeek: 3, electricityPrice: defaultElectricityPrice }, siteConfig.annualisation);
const exampleValues = {
  price: document.querySelector('[data-example="price"]'),
  hourly: document.querySelector('[data-example="hourly"]'),
  cycle: document.querySelector('[data-example="cycle"]'),
  week: document.querySelector('[data-example="week"]'),
  month: document.querySelector('[data-example="month"]'),
  year: document.querySelector('[data-example="year"]'),
  kwh: document.querySelector('[data-example="kwh"]'),
};
const reviewDate = document.querySelector('[data-source-review]');
const tariffInput = document.querySelector('[name="price"]');

exampleValues.price.textContent = `${formatNumber(defaultElectricityPrice, 2)}p/kWh`;
exampleValues.hourly.textContent = formatCurrency(result.hourlyCost);
exampleValues.cycle.textContent = formatCurrency(result.dailyCost);
exampleValues.week.textContent = formatCurrency(result.weeklyCost);
exampleValues.month.textContent = formatCurrency(result.monthlyCost);
exampleValues.year.textContent = formatCurrency(result.annualCost);
exampleValues.kwh.textContent = formatKwh(result.annualKwh);
if (reviewDate) reviewDate.textContent = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(siteConfig.electricityTariff.reviewDate));
if (tariffInput) tariffInput.placeholder = 'e.g. your rate';
