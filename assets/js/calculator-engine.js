const WEEKS_PER_YEAR = 52;
const DAYS_PER_YEAR = 365;

export function calculateElectricityCost({ watts, hoursPerDay, daysPerWeek, electricityPrice }) {
  const values = [watts, hoursPerDay, daysPerWeek, electricityPrice];
  if (!values.every((value) => Number.isFinite(value) && value >= 0)) {
    throw new RangeError('Calculator values must be finite, non-negative numbers.');
  }

  const kilowatts = watts / 1000;
  const hourlyKwh = kilowatts;
  const dailyKwh = hourlyKwh * hoursPerDay;
  const weeklyKwh = dailyKwh * daysPerWeek;
  const annualKwh = weeklyKwh * WEEKS_PER_YEAR;
  const pricePerKwh = electricityPrice / 100;
  const hourlyCost = hourlyKwh * pricePerKwh;
  const dailyCost = dailyKwh * pricePerKwh;
  const weeklyCost = weeklyKwh * pricePerKwh;
  const annualCost = annualKwh * pricePerKwh;

  return {
    hourlyCost,
    dailyCost,
    weeklyCost,
    monthlyCost: annualCost / 12,
    annualCost,
    hourlyKwh,
    dailyKwh,
    weeklyKwh,
    annualKwh,
    annualDays: DAYS_PER_YEAR,
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
