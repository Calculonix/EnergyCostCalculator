import { initApplianceCalculatorPage } from './appliance-calculator-page.js?v=2026-10-01';
import { calculateElectricityCost } from './calculator-engine.js?v=2026-10-01';
import { calculatorDefaults, defaultElectricityPrice, siteConfig } from './data.js?v=2026-10-01';
import { formatCurrency } from './formatting.js';

initApplianceCalculatorPage();

const heroResult = document.querySelector('#hero-cost');
if (heroResult) {
	const result = calculateElectricityCost({ watts: calculatorDefaults.watts, hoursPerDay: calculatorDefaults.hoursPerDay, daysPerWeek: 1, electricityPrice: defaultElectricityPrice }, siteConfig.annualisation);
	heroResult.textContent = `${formatCurrency(result.dailyCost)} / day`;
}
