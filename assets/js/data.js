export const siteConfig = {
  electricityTariff: {
    value: 30,
    unit: 'p/kWh',
    sourceName: 'NEEDS RESEARCH BEFORE PUBLISHING',
    sourceUrl: 'NEEDS RESEARCH BEFORE PUBLISHING',
    effectiveDate: 'NEEDS RESEARCH BEFORE PUBLISHING',
    reviewDate: 'NEEDS RESEARCH BEFORE PUBLISHING',
  },
  calculatorDefaults: {
    watts: 2000,
    hoursPerDay: 2,
    daysPerWeek: 7,
  },
  annualisation: {
    weeksPerYear: 52,
    monthsPerYear: 12,
    daysPerYear: 365,
  },
  ads: { enabled: false },
};

export const defaultElectricityPrice = siteConfig.electricityTariff.value;
export const calculatorDefaults = siteConfig.calculatorDefaults;
export const annualisation = siteConfig.annualisation;

export const appliancePresets = [
  { id: 'kettle', name: 'Kettle', watts: 3000, range: '2,000–3,000 W', description: 'High power, usually used for a few minutes at a time.', sourceName: 'NEEDS RESEARCH BEFORE PUBLISHING', sourceUrl: 'NEEDS RESEARCH BEFORE PUBLISHING', effectiveDate: 'NEEDS RESEARCH BEFORE PUBLISHING', reviewDate: 'NEEDS RESEARCH BEFORE PUBLISHING' },
  { id: 'tumble-dryer', name: 'Tumble dryer', watts: 2500, range: '2,000–3,000 W', description: 'Heating element and cycle length make a big difference.', sourceName: 'NEEDS RESEARCH BEFORE PUBLISHING', sourceUrl: 'NEEDS RESEARCH BEFORE PUBLISHING', effectiveDate: 'NEEDS RESEARCH BEFORE PUBLISHING', reviewDate: 'NEEDS RESEARCH BEFORE PUBLISHING' },
  { id: 'washing-machine', name: 'Washing machine', watts: 2100, range: '1,500–2,500 W', description: 'The average draw is lower than its maximum rating.', sourceName: 'NEEDS RESEARCH BEFORE PUBLISHING', sourceUrl: 'NEEDS RESEARCH BEFORE PUBLISHING', effectiveDate: 'NEEDS RESEARCH BEFORE PUBLISHING', reviewDate: 'NEEDS RESEARCH BEFORE PUBLISHING' },
  { id: 'dishwasher', name: 'Dishwasher', watts: 1800, range: '1,200–2,400 W', description: 'Eco cycles generally use less energy than intensive cycles.', sourceName: 'NEEDS RESEARCH BEFORE PUBLISHING', sourceUrl: 'NEEDS RESEARCH BEFORE PUBLISHING', effectiveDate: 'NEEDS RESEARCH BEFORE PUBLISHING', reviewDate: 'NEEDS RESEARCH BEFORE PUBLISHING' },
  { id: 'fridge-freezer', name: 'Fridge-freezer', watts: 150, range: '100–300 W', description: 'Cycles on and off, so its average draw is much lower.', sourceName: 'NEEDS RESEARCH BEFORE PUBLISHING', sourceUrl: 'NEEDS RESEARCH BEFORE PUBLISHING', effectiveDate: 'NEEDS RESEARCH BEFORE PUBLISHING', reviewDate: 'NEEDS RESEARCH BEFORE PUBLISHING' },
  { id: 'television', name: 'Television', watts: 100, range: '50–200 W', description: 'Power varies with screen size, brightness and technology.', sourceName: 'NEEDS RESEARCH BEFORE PUBLISHING', sourceUrl: 'NEEDS RESEARCH BEFORE PUBLISHING', effectiveDate: 'NEEDS RESEARCH BEFORE PUBLISHING', reviewDate: 'NEEDS RESEARCH BEFORE PUBLISHING' },
  { id: 'gaming-pc', name: 'Gaming PC', watts: 500, range: '300–800 W', description: 'Gaming load can be very different from idle or browsing.', sourceName: 'NEEDS RESEARCH BEFORE PUBLISHING', sourceUrl: 'NEEDS RESEARCH BEFORE PUBLISHING', effectiveDate: 'NEEDS RESEARCH BEFORE PUBLISHING', reviewDate: 'NEEDS RESEARCH BEFORE PUBLISHING' },
  { id: 'electric-heater', name: 'Electric heater', watts: 2000, range: '1,000–3,000 W', description: 'Often thermostatically controlled, so it may cycle on and off.', sourceName: 'NEEDS RESEARCH BEFORE PUBLISHING', sourceUrl: 'NEEDS RESEARCH BEFORE PUBLISHING', effectiveDate: 'NEEDS RESEARCH BEFORE PUBLISHING', reviewDate: 'NEEDS RESEARCH BEFORE PUBLISHING' },
  { id: 'fan', name: 'Fan', watts: 50, range: '20–100 W', description: 'A low-power appliance designed for longer use.', sourceName: 'NEEDS RESEARCH BEFORE PUBLISHING', sourceUrl: 'NEEDS RESEARCH BEFORE PUBLISHING', effectiveDate: 'NEEDS RESEARCH BEFORE PUBLISHING', reviewDate: 'NEEDS RESEARCH BEFORE PUBLISHING' },
  { id: 'dehumidifier', name: 'Dehumidifier', watts: 300, range: '200–500 W', description: 'Compressor models can cycle depending on humidity.', sourceName: 'NEEDS RESEARCH BEFORE PUBLISHING', sourceUrl: 'NEEDS RESEARCH BEFORE PUBLISHING', effectiveDate: 'NEEDS RESEARCH BEFORE PUBLISHING', reviewDate: 'NEEDS RESEARCH BEFORE PUBLISHING' },
  { id: 'air-fryer', name: 'Air fryer', watts: 1500, range: '1,200–2,000 W', description: 'Short cooking cycles usually keep total use modest.', sourceName: 'NEEDS RESEARCH BEFORE PUBLISHING', sourceUrl: 'NEEDS RESEARCH BEFORE PUBLISHING', effectiveDate: 'NEEDS RESEARCH BEFORE PUBLISHING', reviewDate: 'NEEDS RESEARCH BEFORE PUBLISHING' },
];
