import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sitemapPath = resolve(root, 'sitemap.xml');
const pages = [
  { slug: '/', file: 'index.html', title: 'Appliance Electricity Cost Calculator UK | WattCost UK' },
  { slug: '/tumble-dryer-running-cost/', file: 'tumble-dryer-running-cost/index.html', title: 'Tumble Dryer Running Cost Calculator UK | WattCost UK' },
  { slug: '/electric-heater-running-cost/', file: 'electric-heater-running-cost/index.html', title: 'Electric Heater Running Cost Calculator UK | WattCost UK' },
  { slug: '/kettle-running-cost/', file: 'kettle-running-cost/index.html', title: 'Kettle Running Cost Calculator UK | WattCost UK' },
  { slug: '/fridge-running-cost/', file: 'fridge-running-cost/index.html', title: 'Fridge Running Cost Calculator UK | WattCost UK' },
  { slug: '/dishwasher-running-cost/', file: 'dishwasher-running-cost/index.html', title: 'Dishwasher Running Cost Calculator UK | WattCost UK' },
  { slug: '/oven-running-cost/', file: 'oven-running-cost/index.html', title: 'Oven Running Cost Calculator UK | WattCost UK' },
  { slug: '/gaming-pc-running-cost/', file: 'gaming-pc-running-cost/index.html', title: 'Gaming PC Running Cost Calculator UK | WattCost UK' },
  { slug: '/fan-running-cost/', file: 'fan-running-cost/index.html', title: 'Fan Running Cost Calculator UK | WattCost UK' },
  { slug: '/dehumidifier-running-cost/', file: 'dehumidifier-running-cost/index.html', title: 'Dehumidifier Running Cost Calculator UK | WattCost UK' },
  { slug: '/air-fryer-running-cost/', file: 'air-fryer-running-cost/index.html', title: 'Air Fryer Running Cost Calculator UK | WattCost UK' },
  { slug: '/washing-machine-running-cost/', file: 'washing-machine-running-cost/index.html', title: 'Washing Machine Running Cost Calculator UK | WattCost UK' },
  { slug: '/methodology/electricity-tariff/', file: 'methodology/electricity-tariff/index.html', title: 'Electricity Cost Calculator Methodology | WattCost UK' },
  { slug: '/guides/watts-vs-kwh/', file: 'guides/watts-vs-kwh/index.html', title: 'Watts vs kWh: How Appliance Electricity Costs Work | WattCost UK' },
];

function readHtml(filePath) {
  return readFileSync(resolve(root, filePath), 'utf8');
}

function extractTag(html, tagName) {
  const match = html.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i'));
  return match ? match[1].trim() : null;
}

function extractMeta(html, name) {
  const match = html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]*content=["']([^"']+)["'][^>]*>`, 'i')) ||
    html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]*name=["']${name}["'][^>]*>`, 'i'));
  return match ? match[1].trim() : null;
}

function extractCanonical(html) {
  const match = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
  return match ? match[1].trim() : null;
}

function extractJsonLdBlocks(html) {
  const matches = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  return matches.map((match) => match[1].trim()).filter(Boolean);
}

test('dedicated appliance route files exist and have required metadata', () => {
  for (const page of pages) {
    const filePath = page.file;
    assert.ok(existsSync(resolve(root, filePath)), `Missing page file: ${filePath}`);
    const html = readHtml(filePath);
    assert.match(html, /<title>.*<\/title>/i, `${filePath} is missing a title`);
    assert.ok(extractMeta(html, 'description'), `${filePath} is missing a meta description`);
    assert.ok(extractCanonical(html), `${filePath} is missing a canonical`);
    assert.ok(html.includes(page.title), `${filePath} title mismatch: expected ${page.title}`);
    assert.ok(extractCanonical(html).startsWith('https://calculonix.github.io/EnergyCostCalculator'), `${filePath} canonical URL does not use the expected domain`);
  }
});

test('appliance routes are present in the sitemap and sitemap URLs look valid', () => {
  const sitemap = readFileSync(sitemapPath, 'utf8');
  const urls = [...sitemap.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.ok(urls.length >= 14, 'Sitemap should contain the main routes');
  const routes = ['/', '/tumble-dryer-running-cost/', '/electric-heater-running-cost/', '/kettle-running-cost/', '/fridge-running-cost/', '/dishwasher-running-cost/', '/oven-running-cost/', '/gaming-pc-running-cost/', '/fan-running-cost/', '/dehumidifier-running-cost/', '/air-fryer-running-cost/', '/washing-machine-running-cost/', '/methodology/electricity-tariff/', '/guides/watts-vs-kwh/'];
  for (const route of routes) {
    const expected = `https://calculonix.github.io/EnergyCostCalculator${route}`;
    assert.ok(urls.includes(expected), `Sitemap missing expected URL: ${expected}`);
  }
  assert.ok(!urls.some((url) => url.includes('NEEDS RESEARCH BEFORE PUBLISHING') || url.includes('undefined')));
});

test('dedicated appliance pages contain parseable JSON-LD blocks', () => {
  const appliancePages = pages.filter((item) => item.slug !== '/' && item.slug !== '/methodology/electricity-tariff/' && item.slug !== '/guides/watts-vs-kwh/');
  for (const page of appliancePages) {
    const html = readHtml(page.file);
    const blocks = extractJsonLdBlocks(html);
    assert.ok(blocks.length >= 2, `${page.file} should include JSON-LD metadata`);
    for (const block of blocks) {
      assert.doesNotThrow(() => JSON.parse(block), `${page.file} contains invalid JSON-LD`);
    }
  }
});

test('important appliance routes are discoverable in the navigation network', () => {
  const homeHtml = readHtml('index.html');
  const expectedLinks = [
    'tumble-dryer-running-cost/',
    'electric-heater-running-cost/',
    'kettle-running-cost/',
    'fridge-running-cost/',
    'dishwasher-running-cost/',
    'oven-running-cost/',
    'gaming-pc-running-cost/',
    'fan-running-cost/',
    'dehumidifier-running-cost/',
    'air-fryer-running-cost/',
    'washing-machine-running-cost/',
    'methodology/electricity-tariff/',
    'guides/watts-vs-kwh/',
  ];
  for (const link of expectedLinks) {
    assert.ok(homeHtml.includes(link), `Home page missing expected route: ${link}`);
  }
});
