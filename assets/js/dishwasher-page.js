import { calculateElectricityCost } from './calculator-engine.js?v=2026-10-01';
import { initApplianceCalculatorPage } from './appliance-calculator-page.js?v=2026-10-01';
import { defaultElectricityPrice, siteConfig } from './data.js?v=2026-10-01';
import { formatCurrency, formatKwh, formatNumber } from './formatting.js';

const form = document.querySelector('#calculator-form');
const exampleHours = 1.5;
const exampleCycles = 3;

initApplianceCalculatorPage({ defaultPresetId: 'dishwasher' });

if (form) {
  const setDefaults = () => {
    form.querySelector('#watts').value = '1800';
    form.querySelector('#hours').value = String(exampleHours);
    form.querySelector('#days').value = String(exampleCycles);
    form.querySelector('#price').value = String(defaultElectricityPrice);
    form.querySelector('#hours-slider').value = String(exampleHours);
    form.querySelector('#days-slider').value = String(exampleCycles);
    form.querySelector('#hours').dispatchEvent(new Event('input', { bubbles: true }));
  };

  setDefaults();
  document.querySelector('#reset-button')?.addEventListener('click', setDefaults);
}

const result = calculateElectricityCost({
  watts: 1800,
  hoursPerDay: exampleHours,
  daysPerWeek: exampleCycles,
  electricityPrice: defaultElectricityPrice,
}, siteConfig.annualisation);

const values = {
  hourly: document.querySelector('[data-example="hourly"]'),
  hourlyKwh: document.querySelector('[data-example="hourly-kwh"]'),
  cycle: document.querySelector('[data-example="cycle"]'),
  cycleKwh: document.querySelector('[data-example="cycle-kwh"]'),
  week: document.querySelector('[data-example="week"]'),
  weekKwh: document.querySelector('[data-example="week-kwh"]'),
  month: document.querySelector('[data-example="month"]'),
  monthKwh: document.querySelector('[data-example="month-kwh"]'),
  year: document.querySelector('[data-example="year"]'),
  yearKwh: document.querySelector('[data-example="year-kwh"]'),
};

if (values.hourly) values.hourly.textContent = formatCurrency(result.hourlyCost);
if (values.hourlyKwh) values.hourlyKwh.textContent = formatKwh(result.hourlyKwh);
if (values.cycle) values.cycle.textContent = formatCurrency(result.dailyCost);
if (values.cycleKwh) values.cycleKwh.textContent = formatKwh(result.dailyKwh);
if (values.week) values.week.textContent = formatCurrency(result.weeklyCost);
if (values.weekKwh) values.weekKwh.textContent = formatKwh(result.weeklyKwh);
if (values.month) values.month.textContent = formatCurrency(result.monthlyCost);
if (values.monthKwh) values.monthKwh.textContent = formatNumber(result.annualKwh / siteConfig.annualisation.monthsPerYear, 2) + ' kWh';
if (values.year) values.year.textContent = formatCurrency(result.annualCost);
if (values.yearKwh) values.yearKwh.textContent = formatKwh(result.annualKwh);
