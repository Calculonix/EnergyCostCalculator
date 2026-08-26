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
const sourcedExamples = [
  { key: 'beko-condenser', fullKwh: 4.75, partialKwh: 2.53, fullMinutes: 142, partialMinutes: 80 },
  { key: 'beko-heat-pump', fullKwh: 1.82, partialKwh: 0.97, fullMinutes: 220, partialMinutes: 125 },
];

exampleValues.price.textContent = `${formatNumber(defaultElectricityPrice, 2)}p/kWh`;
exampleValues.hourly.textContent = formatCurrency(result.hourlyCost);
exampleValues.cycle.textContent = formatCurrency(result.dailyCost);
exampleValues.week.textContent = formatCurrency(result.weeklyCost);
exampleValues.month.textContent = formatCurrency(result.monthlyCost);
exampleValues.year.textContent = formatCurrency(result.annualCost);
exampleValues.kwh.textContent = formatKwh(result.annualKwh);
if (reviewDate) reviewDate.textContent = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(siteConfig.electricityTariff.reviewDate));
if (tariffInput) tariffInput.placeholder = 'e.g. your rate';

sourcedExamples.forEach((example) => {
  const row = document.querySelector(`[data-sourced-example="${example.key}"]`);
  if (!row) return;
  const fullLoad = calculateElectricityCost({ watts: example.fullKwh * 1000, hoursPerDay: 1, daysPerWeek: 1, electricityPrice: defaultElectricityPrice }, siteConfig.annualisation);
  const partialLoad = calculateElectricityCost({ watts: example.partialKwh * 1000, hoursPerDay: 1, daysPerWeek: 1, electricityPrice: defaultElectricityPrice }, siteConfig.annualisation);
  row.querySelector('[data-value="full-energy"]').textContent = `${example.fullKwh.toFixed(2)} kWh / ${formatCurrency(fullLoad.dailyCost)}`;
  row.querySelector('[data-value="partial-energy"]').textContent = `${example.partialKwh.toFixed(2)} kWh / ${formatCurrency(partialLoad.dailyCost)}`;
  row.querySelector('[data-value="duration"]').textContent = `${example.fullMinutes} min full / ${example.partialMinutes} min partial`;
});
