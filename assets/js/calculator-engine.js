import { annualisation } from './data.js';

export function calculateElectricityCost({ watts, hoursPerDay, daysPerWeek, electricityPrice }, calculationConfig = annualisation) {
  const values = [watts, hoursPerDay, daysPerWeek, electricityPrice];
  if (!values.every((value) => Number.isFinite(value) && value >= 0)) {
    throw new RangeError('Calculator values must be finite, non-negative numbers.');
  }

  const kilowatts = watts / 1000;
  const hourlyKwh = kilowatts;
  const dailyKwh = hourlyKwh * hoursPerDay;
  const weeklyKwh = dailyKwh * daysPerWeek;
  const annualKwh = weeklyKwh * calculationConfig.weeksPerYear;
  const pricePerKwh = electricityPrice / 100;
  const hourlyCost = hourlyKwh * pricePerKwh;
  const dailyCost = dailyKwh * pricePerKwh;
  const weeklyCost = weeklyKwh * pricePerKwh;
  const annualCost = annualKwh * pricePerKwh;

  return {
    hourlyCost,
    dailyCost,
    weeklyCost,
    monthlyCost: annualCost / calculationConfig.monthsPerYear,
    annualCost,
    hourlyKwh,
    dailyKwh,
    weeklyKwh,
    annualKwh,
    annualDays: calculationConfig.daysPerYear,
  };
}

export function compareElectricityCosts(first, second) {
  const annualCostDifference = second.annualCost - first.annualCost;
  const annualEnergyDifference = second.annualKwh - first.annualKwh;
  return {
    annualCostDifference,
    annualEnergyDifference,
    percentageDifference: first.annualCost === 0 ? null : (annualCostDifference / first.annualCost) * 100,
  };
}

export function sumElectricityCosts(results) {
  return results.reduce((total, result) => Object.fromEntries(Object.keys(total).map((key) => [key, total[key] + result[key]])), {
    hourlyCost: 0,
    dailyCost: 0,
    weeklyCost: 0,
    monthlyCost: 0,
    annualCost: 0,
    hourlyKwh: 0,
    dailyKwh: 0,
    weeklyKwh: 0,
    annualKwh: 0,
    annualDays: results[0]?.annualDays ?? annualisation.daysPerYear,
  });
}
