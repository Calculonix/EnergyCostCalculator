import { calculateElectricityCost, sumElectricityCosts } from './calculator-engine.js?v=2026-10-01';
import { defaultElectricityPrice, siteConfig } from './data.js?v=2026-10-01';
import { formatCurrency, formatKwh, formatNumber } from './formatting.js';

const result = calculateElectricityCost({ watts: 2000, hoursPerDay: 1, daysPerWeek: 3, electricityPrice: defaultElectricityPrice }, siteConfig.annualisation);

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

if (exampleValues.price) exampleValues.price.textContent = `${formatNumber(defaultElectricityPrice, 2)}p/kWh`;
if (exampleValues.hourly) exampleValues.hourly.textContent = formatCurrency(result.hourlyCost);
if (exampleValues.cycle) exampleValues.cycle.textContent = formatCurrency(result.dailyCost);
if (exampleValues.week) exampleValues.week.textContent = formatCurrency(result.weeklyCost);
if (exampleValues.month) exampleValues.month.textContent = formatCurrency(result.monthlyCost);
if (exampleValues.year) exampleValues.year.textContent = formatCurrency(result.annualCost);
if (exampleValues.kwh) exampleValues.kwh.textContent = formatKwh(result.annualKwh);
if (reviewDate) reviewDate.textContent = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(siteConfig.electricityTariff.reviewDate));
if (tariffInput) tariffInput.placeholder = 'e.g. your rate';

const comparisonRows = document.querySelectorAll('[data-cycle-frequency]');
comparisonRows.forEach((row) => {
  const cyclesPerWeek = Number(row.dataset.cycleFrequency);
  const cycleResult = calculateElectricityCost({ watts: 2000, hoursPerDay: 1, daysPerWeek: cyclesPerWeek, electricityPrice: defaultElectricityPrice }, siteConfig.annualisation);
  const annualCost = cycleResult.annualCost;
  row.querySelector('[data-value="annual-cost"]').textContent = formatCurrency(annualCost);
  row.querySelector('[data-value="annual-kwh"]').textContent = formatKwh(cycleResult.annualKwh);
  row.querySelector('[data-value="weekly-cost"]').textContent = formatCurrency(cycleResult.weeklyCost);
});

const wasteRows = document.querySelectorAll('[data-wash-temperature]');
for (const row of wasteRows) {
  const temp = row.dataset.washTemperature;
  const annualCost = calculateElectricityCost({ watts: 2000, hoursPerDay: 1, daysPerWeek: 3, electricityPrice: defaultElectricityPrice }, siteConfig.annualisation).annualCost;
  row.querySelector('[data-value="annual-cost"]').textContent = temp === '20°C' ? 'Lower than hotter programmes' : temp === '30°C' ? 'Usually lower than 40°C and 60°C' : temp === '40°C' ? 'Typical mid-range programme' : 'Usually the most demanding heat setting';
  row.querySelector('[data-value="annual-kwh"]').textContent = temp === '20°C' ? 'Often lower than hotter cycles' : temp === '30°C' ? 'Usually moderate' : temp === '40°C' ? 'Common medium setting' : 'Often highest hot-water demand';

  if (temp === '60°C' && row.querySelector('[data-value="annual-cost"]')) {
    row.querySelector('[data-value="annual-cost"]').textContent = 'Can be noticeably higher due to water heating';
  }
  if (temp === '20°C' && row.querySelector('[data-value="annual-kwh"]')) {
    row.querySelector('[data-value="annual-kwh"]').textContent = 'Often lower than hotter cycles';
  }
  row.querySelector('[data-value="usage-note"]').textContent = temp === '20°C' ? 'Usually lighter heating demand' : temp === '30°C' ? 'Balance of cleaning and energy use' : temp === '40°C' ? 'A common setting for everyday loads' : 'A demanding setting that generally heats more water';
}

const annualComparison = document.querySelector('[data-annual-comparison]');
if (annualComparison) {
  const values = [2, 3, 5, 7].map((cycles) => {
    const resultForCycle = calculateElectricityCost({ watts: 2000, hoursPerDay: 1, daysPerWeek: cycles, electricityPrice: defaultElectricityPrice }, siteConfig.annualisation);
    return { cycles, annualCost: resultForCycle.annualCost };
  });
  annualComparison.textContent = values.map(({ cycles, annualCost }) => `${cycles}/week: ${formatCurrency(annualCost)}`).join(' • ');
}
