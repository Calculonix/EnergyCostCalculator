import { initApplianceCalculatorPage } from './appliance-calculator-page.js?v=2026-10-01';
import { calculateElectricityCost } from './calculator-engine.js?v=2026-10-01';
import { defaultElectricityPrice, siteConfig } from './data.js?v=2026-10-01';
import { formatCurrency, formatKwh, formatNumber } from './formatting.js';

const form = document.querySelector('#calculator-form');
const exampleWatts = 300;
const exampleHours = 8;
const exampleDays = 7;

initApplianceCalculatorPage({ defaultPresetId: 'dehumidifier' });

if (form) {
  const setDefaults = () => {
    form.querySelector('#watts').value = String(exampleWatts);
    form.querySelector('#hours').value = String(exampleHours);
    form.querySelector('#days').value = String(exampleDays);
    form.querySelector('#price').value = String(defaultElectricityPrice);
    form.querySelector('#hours-slider').value = String(exampleHours);
    form.querySelector('#days-slider').value = String(exampleDays);
    form.querySelector('#hours').dispatchEvent(new Event('input', { bubbles: true }));
  };

  setDefaults();
  document.querySelector('#reset-button')?.addEventListener('click', setDefaults);
}

const result = calculateElectricityCost({ watts: exampleWatts, hoursPerDay: exampleHours, daysPerWeek: exampleDays, electricityPrice: defaultElectricityPrice }, siteConfig.annualisation);
const values = {
  hourly: document.querySelector('[data-example="hourly"]'),
  hourlyKwh: document.querySelector('[data-example="hourly-kwh"]'),
  daily: document.querySelector('[data-example="daily"]'),
  dailyKwh: document.querySelector('[data-example="daily-kwh"]'),
  week: document.querySelector('[data-example="week"]'),
  weekKwh: document.querySelector('[data-example="week-kwh"]'),
  month: document.querySelector('[data-example="month"]'),
  monthKwh: document.querySelector('[data-example="month-kwh"]'),
  year: document.querySelector('[data-example="year"]'),
  yearKwh: document.querySelector('[data-example="year-kwh"]'),
};

if (values.hourly) values.hourly.textContent = formatCurrency(result.hourlyCost);
if (values.hourlyKwh) values.hourlyKwh.textContent = formatKwh(result.hourlyKwh);
if (values.daily) values.daily.textContent = formatCurrency(result.dailyCost);
if (values.dailyKwh) values.dailyKwh.textContent = formatKwh(result.dailyKwh);
if (values.week) values.week.textContent = formatCurrency(result.weeklyCost);
if (values.weekKwh) values.weekKwh.textContent = formatKwh(result.weeklyKwh);
if (values.month) values.month.textContent = formatCurrency(result.monthlyCost);
if (values.monthKwh) values.monthKwh.textContent = `${formatNumber(result.annualKwh / siteConfig.annualisation.monthsPerYear, 2)} kWh`;
if (values.year) values.year.textContent = formatCurrency(result.annualCost);
if (values.yearKwh) values.yearKwh.textContent = formatKwh(result.annualKwh);
