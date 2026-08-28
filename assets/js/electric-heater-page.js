import { initApplianceCalculatorPage } from './appliance-calculator-page.js?v=2026-10-01';
import { calculateElectricityCost } from './calculator-engine.js?v=2026-10-01';
import { defaultElectricityPrice, siteConfig } from './data.js?v=2026-10-01';
import { formatCurrency, formatNumber } from './formatting.js';

const form = document.querySelector('#calculator-form');
const defaultWatts = 2000;
const defaultHours = 3;
const defaultDays = 5;

initApplianceCalculatorPage({ defaultPresetId: 'electric-heater' });

if (form) {
  const setDefaults = () => {
    form.querySelector('#watts').value = String(defaultWatts);
    form.querySelector('#hours').value = String(defaultHours);
    form.querySelector('#days').value = String(defaultDays);
    form.querySelector('#price').value = String(defaultElectricityPrice);
    form.querySelector('#hours-slider').value = String(defaultHours);
    form.querySelector('#days-slider').value = String(defaultDays);
    form.querySelector('#hours').dispatchEvent(new Event('input', { bubbles: true }));
  };

  setDefaults();
  document.querySelector('#reset-button')?.addEventListener('click', setDefaults);
}

const worked = calculateElectricityCost({ watts: defaultWatts, hoursPerDay: defaultHours, daysPerWeek: defaultDays, electricityPrice: defaultElectricityPrice }, siteConfig.annualisation);
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
