import assert from 'node:assert/strict';
import test from 'node:test';
import { validateInput } from '../assets/js/validation.js';

test('validates a value within the configured range', () => {
  assert.deepEqual(validateInput('hours', '2'), { value: 2, error: '' });
});

test('rejects blank, non-numeric and out-of-range values', () => {
  assert.match(validateInput('price', ' ').error, /must be a number/);
  assert.match(validateInput('price', 'abc').error, /must be a number/);
  assert.match(validateInput('days', '8').error, /7 or less/);
});

test('reports unknown fields', () => {
  assert.match(validateInput('unknown', '1').error, /Unknown input/);
});
