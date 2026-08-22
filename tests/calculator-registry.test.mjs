import assert from 'node:assert/strict';
import test from 'node:test';
import { createCalculatorRegistry } from '../assets/js/calculator-registry.js';

test('registers and looks up calculator definitions', () => {
  const registry = createCalculatorRegistry();
  const calculator = () => ({ result: true });
  const definition = registry.register({ id: 'example', title: 'Example', calculator });
  assert.equal(registry.get('example'), definition);
  assert.deepEqual(registry.all(), [definition]);
});

test('rejects incomplete definitions', () => {
  assert.throws(() => createCalculatorRegistry().register({ id: 'missing-function' }), TypeError);
});
