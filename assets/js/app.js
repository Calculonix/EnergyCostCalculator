import { calculateElectricityCost, sumElectricityCosts } from './calculator-engine.js';
import { appliancePresets, calculatorDefaults, defaultElectricityPrice, siteConfig } from './data.js';
import { calculatorRegistry } from './calculator-registry.js';
import { createCalculatorPageController } from './calculator-page-controller.js';
import { formatCurrency, formatKwh, formatNumber } from './formatting.js';
import { validateInput } from './validation.js';

const applianceList = document.querySelector('#appliance-list');
const totalOutputs = { hourlyCost: document.querySelector('#hourly-cost'), dailyCost: document.querySelector('#daily-cost'), weeklyCost: document.querySelector('#weekly-cost'), monthlyCost: document.querySelector('#monthly-cost'), annualCost: document.querySelector('#annual-cost'), annualKwh: document.querySelector('#annual-kwh'), assumption: document.querySelector('#assumption-text') };
const resultsHeading = document.querySelector('#results-heading');
const applianceSummary = document.querySelector('#appliance-summary');
const applianceCalculator = calculatorRegistry.register({ id: 'appliance-cost', category: 'electricity', title: 'Appliance Running Cost Calculator', url: './', calculator: calculateElectricityCost });
const instances = [];

function getFields(form) {
  return { watts: form.querySelector('[name="watts"]'), hours: form.querySelector('[name="hours"]'), days: form.querySelector('[name="days"]'), price: form.querySelector('[name="price"]') };
}

function getSliders(form) {
  const sliders = form.querySelectorAll('.usage-slider');
  return { hours: sliders[0], days: sliders[1] };
}

function updateCloneIds(form, index) {
  form.querySelectorAll('[id]').forEach((element) => { const oldId = element.id; element.id = `${oldId}-${index}`; form.querySelectorAll(`[for="${oldId}"]`).forEach((label) => { label.htmlFor = element.id; }); form.querySelectorAll(`[aria-describedby~="${oldId}"]`).forEach((field) => { field.setAttribute('aria-describedby', field.getAttribute('aria-describedby').replace(oldId, element.id)); }); });
}

function addIndividualResult(form) {
  const result = document.createElement('p');
  result.className = 'individual-result';
  result.setAttribute('aria-live', 'polite');
  result.innerHTML = '<strong>Estimated annual cost</strong> <span data-result="annual">£0.00</span>';
  form.append(result);
}

function createInstance(form, index) {
  const fields = getFields(form);
  const sliders = getSliders(form);
  const presetSelect = form.querySelector('[name="preset"]');
  const powerUnit = form.querySelector('[name="power-unit"]');
  const description = form.querySelector('.field-hint');
  const heading = form.querySelector('.appliance-heading h3');
  heading.textContent = index ? `Appliance ${index + 1}` : '';
  form.id = `calculator-form-${index + 1}`;
  form.dataset.applianceIndex = String(index);
  if (index > 0) {
    updateCloneIds(form, index + 1);
    const remove = document.createElement('button');
    remove.className = 'remove-appliance-button';
    remove.type = 'button';
    remove.textContent = 'Remove';
    remove.addEventListener('click', () => removeInstance(instances.indexOf(instance)));
    form.querySelector('.appliance-heading').append(remove);
  }
  presetSelect.length = 1;
  appliancePresets.forEach((preset) => presetSelect.add(new Option(preset.name, preset.id)));
  addIndividualResult(form);

  function getValues() {
    const defaults = { watts: calculatorDefaults.watts, hours: calculatorDefaults.hoursPerDay, days: calculatorDefaults.daysPerWeek, price: defaultElectricityPrice };
    const validated = Object.fromEntries(Object.entries(fields).map(([name, field]) => [name, validateInput(name, field.value || defaults[name])]));
    Object.entries(validated).forEach(([name, result]) => { form.querySelector(`[id^="${name}-error"]`).textContent = result.error; fields[name].setAttribute('aria-invalid', String(Boolean(result.error))); });
    if (Object.values(validated).some((result) => result.error)) return null;
    return { watts: validated.watts.value * (powerUnit.value === 'kilowatts' ? 1000 : 1), hoursPerDay: validated.hours.value, daysPerWeek: validated.days.value, electricityPrice: validated.price.value };
  }

  function update() {
    const values = getValues();
    if (!values) return null;
    const result = applianceCalculator.calculator(values, siteConfig.annualisation);
    form.querySelector('[data-result="annual"]').textContent = formatCurrency(result.annualCost);
    instance.result = result;
    updateTotals();
    return result;
  }

  function applyPreset() {
    const preset = appliancePresets.find((item) => item.id === presetSelect.value);
    if (!preset) { description.textContent = 'Or enter the wattage from your appliance label.'; return update(); }
    fields.watts.value = powerUnit.value === 'kilowatts' ? preset.watts / 1000 : preset.watts;
    description.textContent = `${preset.description} Typical estimate: ${preset.range}. You can adjust the power above.`;
    return update();
  }

  const instance = { form, fields, sliders, presetSelect, getName: () => appliancePresets.find((preset) => preset.id === presetSelect.value)?.name || `Appliance ${index + 1}`, result: null, update, applyPreset };
  createCalculatorPageController({ form, fields, sliders, onChange: update }).bind();
  presetSelect.addEventListener('change', applyPreset);
  powerUnit.addEventListener('change', () => { const watts = Number(fields.watts.value); fields.watts.value = powerUnit.value === 'kilowatts' ? watts / 1000 : watts * 1000; update(); });
  sliders.hours.value = calculatorDefaults.hoursPerDay;
  sliders.days.value = calculatorDefaults.daysPerWeek;
  presetSelect.value = '';
  powerUnit.value = 'watts';
  instances.push(instance);
  update();
  return instance;
}

function updateTotals() {
  const results = instances.map((instance) => instance.result).filter(Boolean);
  if (!results.length) return;
  const total = sumElectricityCosts(results);
  const multiple = results.length > 1;
  Object.entries(totalOutputs).forEach(([key, element]) => { if (key in total) element.textContent = key === 'annualKwh' ? `${formatKwh(total[key])} of electricity` : formatCurrency(total[key]); });
  resultsHeading.textContent = multiple ? 'Your estimated total' : 'Your estimated cost';
  const defaults = { watts: calculatorDefaults.watts, hours: calculatorDefaults.hoursPerDay, days: calculatorDefaults.daysPerWeek, price: defaultElectricityPrice };
  totalOutputs.assumption.textContent = multiple ? `${results.length} appliances included in this estimate.` : `Based on ${formatNumber(Number(instances[0].fields.price.value || defaults.price), 2)}p/kWh, ${formatNumber(Number(instances[0].fields.hours.value || defaults.hours))} hours a day and ${formatNumber(Number(instances[0].fields.days.value || defaults.days))} days a week.`;
  applianceSummary.hidden = !multiple;
  applianceSummary.innerHTML = multiple ? instances.map((instance) => `<div class="summary-row"><span>${instance.getName()}</span><strong>${formatCurrency(instance.result?.annualCost || 0)} / year</strong></div>`).join('') : '';
  instances.forEach((instance, index) => { instance.form.querySelector('.appliance-heading').hidden = !multiple && index === 0; instance.form.querySelector('.appliance-heading h3').textContent = multiple ? `Appliance ${index + 1}` : ''; });
}

function removeInstance(index) {
  if (instances.length === 1) return;
  const [instance] = instances.splice(index, 1);
  instance.form.remove();
  instances.forEach((item, itemIndex) => { item.form.querySelector('.appliance-heading h3').textContent = itemIndex ? `Appliance ${itemIndex + 1}` : ''; item.form.dataset.applianceIndex = String(itemIndex); });
  updateTotals();
}

function populatePresets() {
  const list = document.querySelector('#preset-list');
  list.innerHTML = appliancePresets.map((preset) => `<button class="preset-card" type="button" data-preset="${preset.id}"><span class="preset-icon" aria-hidden="true">${preset.name.slice(0, 1)}</span><span><strong>${preset.name}</strong><small>${preset.range}</small></span><span class="preset-arrow" aria-hidden="true">↗</span></button>`).join('');
  list.addEventListener('click', (event) => { const button = event.target.closest('[data-preset]'); if (button) { instances[0].presetSelect.value = button.dataset.preset; instances[0].applyPreset(); document.querySelector('#calculator').scrollIntoView({ behavior: 'smooth', block: 'start' }); } });
}

const firstForm = document.querySelector('#calculator-form');
createInstance(firstForm, 0);
populatePresets();
const addApplianceButton = document.querySelector('#add-appliance');
let lastTouchTime = 0;
function addAppliance(event) { if (event.type === 'touchend') { event.preventDefault(); lastTouchTime = Date.now(); } else if (Date.now() - lastTouchTime < 500) return; const clone = firstForm.cloneNode(true); clone.querySelector('.individual-result')?.remove(); clone.querySelector('.remove-appliance-button')?.remove(); applianceList.append(clone); createInstance(clone, instances.length); clone.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
addApplianceButton.addEventListener('click', addAppliance);
addApplianceButton.addEventListener('touchend', addAppliance, { passive: false });
document.querySelector('#reset-button').addEventListener('click', () => { while (instances.length > 1) removeInstance(instances.length - 1); const instance = instances[0]; instance.form.reset(); instance.fields.watts.value = ''; instance.fields.hours.value = ''; instance.fields.days.value = ''; instance.fields.price.value = ''; instance.sliders.hours.value = calculatorDefaults.hoursPerDay; instance.sliders.days.value = calculatorDefaults.daysPerWeek; instance.presetSelect.value = ''; instance.fields.watts.dispatchEvent(new Event('input', { bubbles: true })); });
document.querySelector('#hero-watts').textContent = `${formatNumber(calculatorDefaults.watts, 0)} W`;
document.querySelector('#hero-usage').textContent = `used for ${formatNumber(calculatorDefaults.hoursPerDay)} hours a day`;
document.querySelector('#hero-price').textContent = `at ${formatNumber(defaultElectricityPrice, 2)}p per kWh`;
document.querySelector('#price-hint').textContent = `Default: ${formatNumber(defaultElectricityPrice, 2)}p/kWh — Ofgem's average electricity unit rate (Direct Debit) for 1 Jul to 30 Sep 2026. Replace this with your own tariff for a closer estimate.`;
