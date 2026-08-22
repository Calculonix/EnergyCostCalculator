import assert from 'node:assert/strict';
import test from 'node:test';
import { formatCurrency, formatKwh, formatNumber } from '../assets/js/formatting.js';

test('formats UK currency and energy values', () => {
  assert.equal(formatCurrency(0.3), '£0.30');
  assert.equal(formatKwh(1460), '1,460 kWh');
  assert.equal(formatNumber(2.25), '2.3');
});
