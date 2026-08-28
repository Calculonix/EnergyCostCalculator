import { calculateElectricityCost } from './calculator-engine.js?v=2026-10-01';
import { initApplianceCalculatorPage } from './appliance-calculator-page.js?v=2026-10-01';
import { defaultElectricityPrice, siteConfig } from './data.js?v=2026-10-01';
import { formatCurrency, formatKwh, formatNumber } from './formatting.js';

const ratedWatts = 150;
const dutyCycle = 0.3;
const averageWatts = ratedWatts * dutyCycle;
const defaultHoursPerDay = 24;
const defaultDaysPerWeek = 7;

const form = document.querySelector('#calculator-form');
if (form) {
  const wattsField = form.querySelector('#watts');
  const hoursField = form.querySelector('#hours');
  const daysField = form.querySelector('#days');
  const priceField = form.querySelector('#price');
  const hoursSlider = form.querySelector('#hours-slider');
  const daysSlider = form.querySelector('#days-slider');

  if (wattsField) wattsField.value = String(averageWatts);
  if (hoursField) hoursField.value = String(defaultHoursPerDay);
  if (daysField) daysField.value = String(defaultDaysPerWeek);
  if (priceField) priceField.value = String(defaultElectricityPrice);
  if (hoursSlider) hoursSlider.value = String(defaultHoursPerDay);
  if (daysSlider) daysSlider.value = String(defaultDaysPerWeek);

  const presetDescription = form.querySelector('#preset-description');
  if (presetDescription) {
    presetDescription.textContent = 'Illustrative example: a 150 W fridge compressor may average about 45 W if it runs for roughly 30% of the time.';
  }
}

initApplianceCalculatorPage();

if (form) {
  form.querySelector('#hours-slider').value = String(defaultHoursPerDay);
  form.querySelector('#days-slider').value = String(defaultDaysPerWeek);
  form.querySelector('#watts').dispatchEvent(new Event('input', { bubbles: true }));
  document.querySelector('#reset-button')?.addEventListener('click', () => {
    form.querySelector('#watts').value = String(averageWatts);
    form.querySelector('#hours').value = String(defaultHoursPerDay);
    form.querySelector('#days').value = String(defaultDaysPerWeek);
    form.querySelector('#price').value = String(defaultElectricityPrice);
    form.querySelector('#hours-slider').value = String(defaultHoursPerDay);
    form.querySelector('#days-slider').value = String(defaultDaysPerWeek);
    form.querySelector('#watts').dispatchEvent(new Event('input', { bubbles: true }));
  });
}

const averageResult = calculateElectricityCost({
  watts: averageWatts,
  hoursPerDay: defaultHoursPerDay,
  daysPerWeek: defaultDaysPerWeek,
  electricityPrice: defaultElectricityPrice,
}, siteConfig.annualisation);

const continuousResult = calculateElectricityCost({
  watts: ratedWatts,
  hoursPerDay: defaultHoursPerDay,
  daysPerWeek: defaultDaysPerWeek,
  electricityPrice: defaultElectricityPrice,
}, siteConfig.annualisation);

const exampleValues = {
  price: document.querySelector('[data-example="price"]'),
  hourly: document.querySelector('[data-example="hourly"]'),
  daily: document.querySelector('[data-example="daily"]'),
  week: document.querySelector('[data-example="week"]'),
  month: document.querySelector('[data-example="month"]'),
  year: document.querySelector('[data-example="year"]'),
  kwh: document.querySelector('[data-example="kwh"]'),
};

if (exampleValues.price) exampleValues.price.textContent = `${formatNumber(defaultElectricityPrice, 2)}p/kWh`;
if (exampleValues.hourly) exampleValues.hourly.textContent = formatCurrency(averageResult.hourlyCost);
if (exampleValues.daily) exampleValues.daily.textContent = formatCurrency(averageResult.dailyCost);
if (exampleValues.week) exampleValues.week.textContent = formatCurrency(averageResult.weeklyCost);
if (exampleValues.month) exampleValues.month.textContent = formatCurrency(averageResult.monthlyCost);
if (exampleValues.year) exampleValues.year.textContent = formatCurrency(averageResult.annualCost);
if (exampleValues.kwh) exampleValues.kwh.textContent = formatKwh(averageResult.annualKwh);
const monthlyEnergyCell = document.querySelector('[data-example="month"]')?.parentElement.querySelector('td:last-child');
if (monthlyEnergyCell) monthlyEnergyCell.textContent = `${formatNumber(averageResult.annualKwh / siteConfig.annualisation.monthsPerYear, 2)} kWh per month`;

const comparisonRows = document.querySelectorAll('[data-fridge-scenario]');
comparisonRows.forEach((row) => {
  const scenario = row.dataset.fridgeScenario;
  const result = scenario === 'rated' ? continuousResult : averageResult;
  const annualCost = row.querySelector('[data-value="annual-cost"]');
  const annualKwh = row.querySelector('[data-value="annual-kwh"]');
  if (annualCost) annualCost.textContent = formatCurrency(result.annualCost);
  if (annualKwh) annualKwh.textContent = formatKwh(result.annualKwh);
});
