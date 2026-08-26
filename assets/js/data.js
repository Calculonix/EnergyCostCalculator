export const siteConfig = {
  // Ofgem energy price cap: average electricity unit rate for Direct Debit
  // customers in England, Scotland and Wales, VAT inclusive. Not every
  // household pays this exact rate — it varies by region, tariff and payment method.
  electricityTariff: {
    rate: 26.32,
    unit: 'p/kWh',
    description: 'Ofgem average electricity unit rate for Direct Debit customers in England, Scotland and Wales, including VAT. This is a reference rate, not a universal household tariff.',
    sourceName: 'Ofgem',
    sourceUrl: 'https://www.ofgem.gov.uk/information-consumers/energy-advice-households/energy-price-cap-unit-rates-and-standing-charges',
    effectiveDate: '2026-10-01',
    reviewDate: '2026-12-31',
  },
  calculatorDefaults: {
    watts: 2000,
    hoursPerDay: 2,
    daysPerWeek: 7,
  },
  // The model is week-based (usage is entered as days per week), so daysPerYear
  // is derived from weeksPerYear rather than the calendar constant of 365, to
  // keep all annual figures mathematically consistent with each other.
  annualisation: {
    weeksPerYear: 52,
    monthsPerYear: 12,
    daysPerYear: 52 * 7,
  },
  ads: { enabled: false },
};

export const defaultElectricityPrice = siteConfig.electricityTariff.rate;
export const calculatorDefaults = siteConfig.calculatorDefaults;
export const annualisation = siteConfig.annualisation;

export const appliancePresets = [
  { id: 'kettle', name: 'Kettle', watts: 3000, range: '2,000–3,000 W', description: 'High power, usually used for a few minutes at a time.', sourceStatus: 'illustrative', sourceName: null, sourceUrl: null, effectiveDate: null, reviewDate: null, sourceNote: 'Illustrative preset only; not a manufacturer-verified figure.' },
  { id: 'tumble-dryer', name: 'Tumble dryer', watts: 2500, range: '2,000–3,000 W', description: 'Heating element and cycle length make a big difference.', sourceStatus: 'illustrative', sourceName: null, sourceUrl: null, effectiveDate: null, reviewDate: null, sourceNote: 'Illustrative preset only; not a manufacturer-verified figure.' },
  { id: 'washing-machine', name: 'Washing machine', watts: 2100, range: '1,500–2,500 W', description: 'The average draw is lower than its maximum rating.', sourceStatus: 'illustrative', sourceName: null, sourceUrl: null, effectiveDate: null, reviewDate: null, sourceNote: 'Illustrative preset only; not a manufacturer-verified figure.' },
  { id: 'dishwasher', name: 'Dishwasher', watts: 1800, range: '1,200–2,400 W', description: 'Eco cycles generally use less energy than intensive cycles.', sourceStatus: 'illustrative', sourceName: null, sourceUrl: null, effectiveDate: null, reviewDate: null, sourceNote: 'Illustrative preset only; not a manufacturer-verified figure.' },
  { id: 'fridge-freezer', name: 'Fridge-freezer', watts: 150, range: '100–300 W', description: 'Cycles on and off, so its average draw is much lower.', sourceStatus: 'illustrative', sourceName: null, sourceUrl: null, effectiveDate: null, reviewDate: null, sourceNote: 'Illustrative preset only; not a manufacturer-verified figure.' },
  { id: 'television', name: 'Television', watts: 100, range: '50–200 W', description: 'Power varies with screen size, brightness and technology.', sourceStatus: 'illustrative', sourceName: null, sourceUrl: null, effectiveDate: null, reviewDate: null, sourceNote: 'Illustrative preset only; not a manufacturer-verified figure.' },
  { id: 'gaming-pc', name: 'Gaming PC', watts: 500, range: '300–800 W', description: 'Gaming load can be very different from idle or browsing.', sourceStatus: 'illustrative', sourceName: null, sourceUrl: null, effectiveDate: null, reviewDate: null, sourceNote: 'Illustrative preset only; not a manufacturer-verified figure.' },
  { id: 'electric-heater', name: 'Electric heater', watts: 2000, range: '1,000–3,000 W', description: 'Often thermostatically controlled, so it may cycle on and off.', sourceStatus: 'illustrative', sourceName: null, sourceUrl: null, effectiveDate: null, reviewDate: null, sourceNote: 'Illustrative preset only; not a manufacturer-verified figure.' },
  { id: 'fan', name: 'Fan', watts: 50, range: '20–100 W', description: 'A low-power appliance designed for longer use.', sourceStatus: 'illustrative', sourceName: null, sourceUrl: null, effectiveDate: null, reviewDate: null, sourceNote: 'Illustrative preset only; not a manufacturer-verified figure.' },
  { id: 'dehumidifier', name: 'Dehumidifier', watts: 300, range: '200–500 W', description: 'Compressor models can cycle depending on humidity.', sourceStatus: 'illustrative', sourceName: null, sourceUrl: null, effectiveDate: null, reviewDate: null, sourceNote: 'Illustrative preset only; not a manufacturer-verified figure.' },
  { id: 'air-fryer', name: 'Air fryer', watts: 1500, range: '1,200–2,000 W', description: 'Short cooking cycles usually keep total use modest.', sourceStatus: 'illustrative', sourceName: null, sourceUrl: null, effectiveDate: null, reviewDate: null, sourceNote: 'Illustrative preset only; not a manufacturer-verified figure.' },
];
