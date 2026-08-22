export function createCalculatorRegistry() {
  const calculators = new Map();
  return {
    register(definition) {
      if (!definition?.id || typeof definition.calculator !== 'function') throw new TypeError('A calculator needs an id and calculator function.');
      calculators.set(definition.id, definition);
      return definition;
    },
    get(id) { return calculators.get(id); },
    all() { return [...calculators.values()]; },
  };
}

export const calculatorRegistry = createCalculatorRegistry();
