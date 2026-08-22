const rules = {
  watts: { label: 'Power', min: 0, max: 100000 },
  hours: { label: 'Hours per day', min: 0, max: 24 },
  days: { label: 'Days per week', min: 0, max: 7 },
  price: { label: 'Electricity price', min: 0, max: 1000 },
};

export function validateInput(name, rawValue) {
  const rule = rules[name];
  const value = Number(rawValue);
  if (!rawValue || !Number.isFinite(value)) return { value, error: `${rule.label} must be a number.` };
  if (value < rule.min) return { value, error: `${rule.label} cannot be negative.` };
  if (value > rule.max) return { value, error: `${rule.label} must be ${rule.max.toLocaleString('en-GB')} or less.` };
  return { value, error: '' };
}
