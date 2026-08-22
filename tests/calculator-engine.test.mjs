import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateElectricityCost, compareElectricityCosts } from '../assets/js/calculator-engine.js';

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
