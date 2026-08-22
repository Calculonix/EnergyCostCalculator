export const siteConfig = {
  defaultElectricityPrice: 30,
  ads: { enabled: false },
};

export const appliancePresets = [
  { id: 'kettle', name: 'Kettle', watts: 3000, range: '2,000–3,000 W', description: 'High power, usually used for a few minutes at a time.' },
  { id: 'tumble-dryer', name: 'Tumble dryer', watts: 2500, range: '2,000–3,000 W', description: 'Heating element and cycle length make a big difference.' },
  { id: 'washing-machine', name: 'Washing machine', watts: 2100, range: '1,500–2,500 W', description: 'The average draw is lower than its maximum rating.' },
  { id: 'dishwasher', name: 'Dishwasher', watts: 1800, range: '1,200–2,400 W', description: 'Eco cycles generally use less energy than intensive cycles.' },
  { id: 'fridge-freezer', name: 'Fridge-freezer', watts: 150, range: '100–300 W', description: 'Cycles on and off, so its average draw is much lower.' },
  { id: 'television', name: 'Television', watts: 100, range: '50–200 W', description: 'Power varies with screen size, brightness and technology.' },
  { id: 'gaming-pc', name: 'Gaming PC', watts: 500, range: '300–800 W', description: 'Gaming load can be very different from idle or browsing.' },
  { id: 'electric-heater', name: 'Electric heater', watts: 2000, range: '1,000–3,000 W', description: 'Often thermostatically controlled, so it may cycle on and off.' },
  { id: 'fan', name: 'Fan', watts: 50, range: '20–100 W', description: 'A low-power appliance designed for longer use.' },
  { id: 'dehumidifier', name: 'Dehumidifier', watts: 300, range: '200–500 W', description: 'Compressor models can cycle depending on humidity.' },
  { id: 'air-fryer', name: 'Air fryer', watts: 1500, range: '1,200–2,000 W', description: 'Short cooking cycles usually keep total use modest.' },
];
