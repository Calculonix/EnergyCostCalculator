import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateElectricityCost, compareElectricityCosts, sumElectricityCosts } from '../assets/js/calculator-engine.js';
import { siteConfig } from '../assets/js/data.js';

test('uses the current Ofgem reference tariff quarter', () => {
  assert.equal(siteConfig.electricityTariff.rate, 26.32);
  assert.equal(siteConfig.electricityTariff.unit, 'p/kWh');
  assert.equal(siteConfig.electricityTariff.effectiveDate, '2026-10-01');
  assert.equal(siteConfig.electricityTariff.reviewDate, '2026-12-31');
  assert.equal(siteConfig.electricityTariff.sourceName, 'Ofgem');
  assert.match(siteConfig.electricityTariff.description, /reference rate/);
});

test('calculates 1000W for one hour at 30p as 30p', () => {
  const result = calculateElectricityCost({ watts: 1000, hoursPerDay: 1, daysPerWeek: 7, electricityPrice: 30 });
  assert.equal(result.hourlyCost, 0.3);
});

test('calculates a 2000W appliance for two hours per day', () => {
  const result = calculateElectricityCost({ watts: 2000, hoursPerDay: 2, daysPerWeek: 7, electricityPrice: 30 });
  assert.equal(result.dailyCost, 1.2);
  assert.equal(result.annualCost, 436.8);
  // 2 hours/day * 7 days/week * 52 weeks/year = 728 hours/year; at 2kW that is 1456 kWh.
  // The model is week-based (52 weeks/year), so this is mathematically consistent
  // with dailyCost * 7 * 52, not with a calendar 365-day year.
  assert.equal(result.annualKwh, 1456);
});

test('supports zero usage', () => {
  const result = calculateElectricityCost({ watts: 2000, hoursPerDay: 0, daysPerWeek: 7, electricityPrice: 30 });
  assert.equal(result.annualCost, 0);
});

test('rejects invalid values', () => {
  assert.throws(() => calculateElectricityCost({ watts: -1, hoursPerDay: 1, daysPerWeek: 7, electricityPrice: 30 }), RangeError);
  assert.throws(() => calculateElectricityCost({ watts: Infinity, hoursPerDay: 1, daysPerWeek: 7, electricityPrice: 30 }), RangeError);
});

test('compares annual cost and energy', () => {
  const first = calculateElectricityCost({ watts: 1000, hoursPerDay: 1, daysPerWeek: 7, electricityPrice: 30 });
  const second = calculateElectricityCost({ watts: 2000, hoursPerDay: 1, daysPerWeek: 7, electricityPrice: 30 });
  const comparison = compareElectricityCosts(first, second);
  assert.equal(comparison.annualCostDifference, 109.2);
  assert.equal(comparison.annualEnergyDifference, 364);
});

test('sums existing appliance results into combined totals', () => {
  const first = calculateElectricityCost({ watts: 1000, hoursPerDay: 1, daysPerWeek: 7, electricityPrice: 30 });
  const second = calculateElectricityCost({ watts: 2000, hoursPerDay: 2, daysPerWeek: 5, electricityPrice: 30 });
  const total = sumElectricityCosts([first, second]);
  assert.equal(total.dailyCost, 1.5);
  assert.equal(total.annualCost, 421.2);
  assert.equal(total.annualKwh, 1404);
});
