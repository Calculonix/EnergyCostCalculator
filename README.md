# WattCost UK: appliance running costs

A fast, static, mobile-first electricity cost calculator for UK users. It uses HTML, CSS and native ES modules, so it can be deployed directly to GitHub Pages.

## Run locally

Serve the project directory with any static server. For example:

```powershell
python -m http.server 8080
```

Open `http://localhost:8080`. ES modules should be served over HTTP rather than opened directly from `file://`.

Run the deterministic calculation tests with:

```powershell
node --test tests/calculator-engine.test.mjs
```

Or run the full test script:

```powershell
npm test
```

## Structure

- `index.html`: SEO page shell and accessible calculator markup.
- `assets/js/calculator-engine.js`: pure calculation and comparison functions.
- `assets/js/data.js`: site configuration and appliance presets.
- `assets/js/calculator-registry.js`: central registry for future calculators.
- `assets/js/calculator-page-controller.js`: shared form and mobile-slider event binding.
- `assets/js/appliance-calculator-page.js`: shared appliance-calculator page wiring (presets, validation, results, reset), reused by the homepage and by dedicated appliance SEO pages.
- `assets/js/app.js`: thin homepage entry point that calls `initApplianceCalculatorPage()`.
- `assets/js/validation.js` and `formatting.js`: reusable input and presentation helpers.
- `assets/js/analytics.js` and `ad-slot.js`: disabled-by-default integration boundaries.
- `assets/css/styles.css`: responsive design system.
- `tumble-dryer-running-cost/index.html`: first dedicated appliance SEO page, and the template for future ones.

## Annualisation model

Usage is entered as hours per day and days per week, so annual figures are calculated on a 52-week year (`siteConfig.annualisation.weeksPerYear`), not a calendar 365-day year. `daysPerYear` is derived as `weeksPerYear * 7` (364) so that annual, weekly and daily figures stay mathematically consistent with each other. Monthly cost divides the annual cost by `monthsPerYear` (12).

## Extending the site

To add a calculator, create a pure function with the same input/result discipline, register its definition with `calculatorRegistry.register({ id, title, category, url, calculator })`, and give it a page module that uses `createCalculatorPageController`. Keep calculation rules out of page event handlers.

To add an SEO page for a specific appliance (e.g. `/electric-heater-running-cost/`), copy `tumble-dryer-running-cost/index.html` as a template: create a new folder with an `index.html`, write unique title/meta/H1/content/FAQ, reuse the identical calculator form markup (same element IDs), and call `initApplianceCalculatorPage({ defaultPresetId: '<preset-id>' })` from `assets/js/appliance-calculator-page.js` in an inline module script. This reuses the shared calculation engine, validation, formatting and page controller without duplicating any logic. Add the new page's URL to `sitemap.xml` and link to it from the homepage's "More appliance running costs" section.

To add an appliance preset, append an object to `appliancePresets` in `assets/js/data.js`. Include a typical wattage or range and an explanation that makes the estimate's limits clear.

Advertising is currently disabled with `siteConfig.ads.enabled = false`. Future ad providers can mount into the stable slots returned by `createAdSlot(position)` without coupling them to calculator logic. Analytics has a no-op interface and does not collect personal information.

## Deployment

Commit the repository to GitHub, then enable GitHub Pages from the repository's Pages settings using the branch and root directory containing `index.html`. No server-side routing is required.

## Before publishing

The default electricity tariff (`siteConfig.electricityTariff` in `assets/js/data.js`) is sourced from Ofgem's energy price cap average unit rate for Direct Debit customers (26.11p/kWh, 1 July to 30 September 2026) and should be reviewed by the `reviewDate` each quarter. Review preset wattages against current manufacturer data, add canonical URLs and Open Graph metadata, and add FAQ/Breadcrumb/WebApplication structured data only where the page content genuinely supports it.
