import { calculateElectricityCost } from './calculator-engine.js';
import { appliancePresets, siteConfig } from './data.js';
import { formatCurrency, formatKwh, formatNumber } from './formatting.js';
import { validateInput } from './validation.js';

const form = document.querySelector('#calculator-form');
const presetSelect = document.querySelector('#preset');
const presetDescription = document.querySelector('#preset-description');
const powerUnit = document.querySelector('#power-unit');
const fields = { watts: document.querySelector('#watts'), hours: document.querySelector('#hours'), days: document.querySelector('#days'), price: document.querySelector('#price') };
const outputs = { hourlyCost: document.querySelector('#hourly-cost'), dailyCost: document.querySelector('#daily-cost'), weeklyCost: document.querySelector('#weekly-cost'), monthlyCost: document.querySelector('#monthly-cost'), annualCost: document.querySelector('#annual-cost'), annualKwh: document.querySelector('#annual-kwh'), assumption: document.querySelector('#assumption-text') };

function populatePresets() {
  appliancePresets.forEach((preset) => presetSelect.add(new Option(preset.name, preset.id)));
  const list = document.querySelector('#preset-list');
  list.innerHTML = appliancePresets.map((preset) => `<button class="preset-card" type="button" data-preset="${preset.id}"><span class="preset-icon" aria-hidden="true">${preset.name.slice(0, 1)}</span><span><strong>${preset.name}</strong><small>${preset.range}</small></span><span class="preset-arrow" aria-hidden="true">↗</span></button>`).join('');
  list.addEventListener('click', (event) => { const button = event.target.closest('[data-preset]'); if (button) { presetSelect.value = button.dataset.preset; applyPreset(); document.querySelector('#calculator').scrollIntoView({ behavior: 'smooth', block: 'start' }); } });
}

function applyPreset() {
  const preset = appliancePresets.find((item) => item.id === presetSelect.value);
  if (!preset) { presetDescription.textContent = 'Or enter the wattage from your appliance label.'; return updateResults(); }
  fields.watts.value = powerUnit.value === 'kilowatts' ? preset.watts / 1000 : preset.watts;
  presetDescription.textContent = `${preset.description} Typical estimate: ${preset.range}. You can adjust the power above.`;
  updateResults();
}

function getValues() {
  const validated = Object.fromEntries(Object.entries(fields).map(([name, field]) => [name, validateInput(name, field.value)]));
  Object.entries(validated).forEach(([name, result]) => { document.querySelector(`#${name}-error`).textContent = result.error; fields[name].setAttribute('aria-invalid', String(Boolean(result.error))); });
  if (Object.values(validated).some((result) => result.error)) return null;
  return { watts: validated.watts.value * (powerUnit.value === 'kilowatts' ? 1000 : 1), hoursPerDay: validated.hours.value, daysPerWeek: validated.days.value, electricityPrice: validated.price.value };
}

function updateResults() {
  const values = getValues();
  if (!values) return;
  const result = calculateElectricityCost(values);
  Object.entries(outputs).forEach(([key, element]) => {
    if (key in result) element.textContent = key === 'annualKwh' ? `${formatKwh(result[key])} of electricity` : formatCurrency(result[key]);
  });
  outputs.assumption.textContent = `Based on ${formatNumber(values.electricityPrice)}p/kWh, ${formatNumber(values.hoursPerDay)} hours a day and ${formatNumber(values.daysPerWeek)} days a week.`;
}

function reset() {
  form.reset();
  fields.price.value = siteConfig.defaultElectricityPrice;
  fields.watts.value = 2000;
  fields.hours.value = 2;
  fields.days.value = 7;
  presetSelect.value = '';
  powerUnit.value = 'watts';
  applyPreset();
}

populatePresets();
form.addEventListener('input', updateResults);
presetSelect.addEventListener('change', applyPreset);
powerUnit.addEventListener('change', () => { const watts = Number(fields.watts.value); fields.watts.value = powerUnit.value === 'kilowatts' ? watts / 1000 : watts * 1000; updateResults(); });
document.querySelector('#reset-button').addEventListener('click', reset);
updateResults();
