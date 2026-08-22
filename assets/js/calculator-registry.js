const calculators = new Map();

export const calculatorRegistry = {
  register(definition) { calculators.set(definition.id, definition); },
  get(id) { return calculators.get(id); },
  all() { return [...calculators.values()]; },
};

calculatorRegistry.register({
  id: 'appliance-cost',
  category: 'electricity',
  title: 'Appliance Running Cost Calculator',
  url: './',
});
