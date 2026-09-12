# Calculator11 — Master SEO Plan

**Status:** Content complete — 150/150 articles, 150/150 metadata
**Scope:** 150 calculators + homepage + 6 informational pages + 8 proposed category hubs
**Last updated:** 2026-09-12

This document is the source of truth for site architecture, keyword targeting, metadata, internal
linking and schema. Page content is written into `src/data/calculatorArticles.ts` and
`src/data/seoRegistry.ts` against the decisions recorded here.

---

## 0. Audit findings (start state)

Measured against the live codebase, not estimated.

| Metric | Value |
|---|---|
| Calculators in `CALCULATORS_REGISTRY` | 150 |
| Calculators with hand-written SEO metadata | 13 |
| Calculators with editorial article content | 12 |
| Calculators with neither | **138** |
| Indexable category/hub pages | **0** |
| URLs in `sitemap.xml` | 156 |

### Three issues that outrank keyword work in priority

**1. Fabricated review schema — fixed 2026-09-12.**
Every calculator page emitted `aggregateRating: 4.9 / 2840 ratings` in its JSON-LD. Those reviews
do not exist. Google requires aggregate ratings to reflect genuine reviews collected on the page;
inventing them is a structured-data violation and a manual-action risk. Removed from
`seoRegistry.ts`. **Do not reintroduce** unless a real review-collection mechanism ships first.

**2. No category hub pages exist.**
Categories are a client-side filter on the homepage only. `finance`, `health`, `math` and the rest
have no URL. The architecture is flat — homepage → 150 calculators — with no intermediate layer for
Google to understand topical grouping, and no page that can rank for head terms like
"financial calculators". This is the single largest structural gap. See §A and §G.

**3. 138 thin pages is a liability, not just a gap.**
Uncovered pages auto-generate a title from the calculator name and a meta description from a
one-line blurb, with no body content. Mass-producing 138 templated articles would convert a thin-content
problem into a scaled-thin-content problem, which is precisely what the Helpful Content system
targets. The plan below deliberately sequences hubs and depth over volume. See §J.

### Open item requiring a human answer

Articles carry `author: "Calculator11 Editorial Team"` and
`reviewedBy: "Subject Matter Verification Desk"`. Organisation-level authorship is legitimate.
"Verification Desk" asserts a review process. **If no such review actually happens, this must be
softened** — an unsupportable E-E-A-T claim is worse than no claim. Flagged, not changed.

---

## A. Site architecture

### Current

```
/                                  homepage (also acts as the category browser)
├── /{calculator-slug}             × 150, flat
└── /about /contact /privacy /terms /disclaimer
```

### Recommended

```
/                                           homepage — head term + category routing
│
├── /financial-calculators/                 hub  (56 tools)
│   ├── /mortgage-calculator/
│   ├── /emi-calculator/
│   └── … 54 more
│
├── /health-calculators/                    hub  (24 tools)
├── /math-calculators/                      hub  (24 tools)
├── /date-time-calculators/                 hub  (8 tools — split from "everyday")
├── /auto-vehicle-calculators/              hub  (6 tools — split from "everyday")
├── /science-calculators/                   hub  (10 tools)
├── /construction-calculators/              hub  (8 tools)
├── /unit-converters/                       hub  (7 tools)
├── /cooking-calculators/                   hub  (4 tools)
│
└── /about /contact /privacy /terms /disclaimer
```

**Why "everyday" gets split.** The `everyday` category currently mixes date arithmetic
(`age-calculator`, `days-until-calculator`), automotive tools (`gas-mileage-calculator`,
`tire-size-calculator`, `horsepower-calculator`), a `password-generator` and a `btu-calculator`.
That is not a topic — it is a leftovers bin, and it cannot rank as a hub or pass meaningful topical
signal. Splitting into **Date & Time** and **Auto & Vehicle** produces two coherent clusters. The
three genuine outliers (`password-generator`, `btu-calculator`, `sleep-cycle-calculator`) are
assigned in §G.

**Hub URL naming.** `/financial-calculators/` rather than `/finance/` — the plural "-calculators"
form matches how the head term is actually searched and makes the URL self-describing. Keep the
existing flat `/{slug}/` pattern for calculators themselves; do **not** nest them under hubs. Nesting
would force 150 redirects for no ranking benefit and would deepen crawl paths.

**Implementation note.** Hubs need routes in `App.tsx`, entries in `FLAGSHIP_SEO`, and inclusion in
`scripts/generateSitemap.js` (currently slug-driven only, so hubs will be omitted unless added
explicitly).

---

## B. Complete URL map

All URLs indexable, `200`, self-canonical, trailing-slash consistent.

**Core (2)**
`/` · `/sitemap.xml` (not indexable; reference only)

**Category hubs (9 — new)**
`/financial-calculators/` · `/health-calculators/` · `/math-calculators/` ·
`/date-time-calculators/` · `/auto-vehicle-calculators/` · `/science-calculators/` ·
`/construction-calculators/` · `/unit-converters/` · `/cooking-calculators/`

**Calculators (150 — existing, all retained except where §H recommends consolidation)**
Enumerated with keywords and metadata in §C/§D.

**Informational (5)**
`/about/` · `/contact/` · `/privacy/` · `/terms/` · `/disclaimer/`

**Duplicate aliases to resolve (§H)**
`/loan-calculator/` and `/date-difference-calculator/` currently render byte-identical pages to
`/emi-calculator/` and `/date-calculator/` respectively.

---

## G. Content cluster strategy

Each cluster is **hub → flagship → supporting tools → shared explainer content**. The flagship is
the page that earns links and rankings; supporting tools inherit authority through the hub and
through contextual sibling links.

### Cluster 1 — Finance & Money (56 tools) · highest commercial value

| Layer | Pages |
|---|---|
| **Hub** | `/financial-calculators/` |
| **Flagships** | `mortgage-calculator`, `emi-calculator`, `sip-calculator`, `compound-interest-calculator`, `retirement-calculator` |
| **Sub-cluster: Mortgage & property** | `mortgage-refinance-calculator`, `home-affordability-calculator`, `rent-vs-buy-calculator`, `heloc-calculator`, `fha-loan-calculator`, `va-mortgage-calculator`, `mortgage-calculator-uk`, `canadian-mortgage-calculator`, `stamp-duty-calculator`, `rental-property-roi-calculator` |
| **Sub-cluster: Debt & credit** | `credit-card-payoff-calculator`, `debt-payoff-calculator`, `debt-consolidation-calculator`, `debt-ratio-calculator`, `student-loan-calculator`, `personal-loan-calculator`, `auto-loan-calculator`, `car-lease-vs-buy-calculator`, `business-loan-calculator`, `boat-loan-calculator`, `interest-rate-calculator` |
| **Sub-cluster: Retirement & investing** | `401k-calculator`, `roth-ira-calculator`, `ira-calculator`, `pension-calculator`, `social-security-calculator`, `annuity-calculator`, `annuity-payout-calculator`, `cd-calculator`, `bond-calculator`, `dividend-yield-calculator`, `savings-calculator`, `college-cost-calculator`, `ppf-calculator` |
| **Sub-cluster: Tax & business** | `income-tax-calculator`, `capital-gains-tax-calculator`, `gst-calculator`, `vat-calculator`, `salary-calculator`, `commission-calculator`, `margin-calculator`, `depreciation-calculator`, `roi-calculator`, `irr-calculator`, `payback-period-calculator`, `net-worth-calculator`, `inflation-calculator` |
| **Everyday money** | `tip-calculator`, `discount-calculator`, `simple-interest-calculator`, `loan-calculator` |

### Cluster 2 — Health & Fitness (24 tools) · YMYL, highest trust bar

| Layer | Pages |
|---|---|
| **Hub** | `/health-calculators/` |
| **Flagships** | `bmi-calculator`, `calorie-calculator` |
| **Body composition** | `body-fat-calculator`, `lean-body-mass-calculator`, `ideal-weight-calculator`, `healthy-weight-calculator`, `overweight-calculator`, `army-body-fat-calculator`, `bsa-calculator` |
| **Energy & macros** | `tdee-calculator`, `bmr-calculator`, `macro-calculator`, `protein-calculator`, `carbohydrate-calculator`, `fat-intake-calculator`, `calories-burned-calculator` |
| **Fitness performance** | `one-rep-max-calculator`, `pace-calculator`, `target-heart-rate-calculator` |
| **Reproductive & clinical** | `pregnancy-due-date-calculator`, `ovulation-calculator`, `gfr-calculator`, `bac-calculator` |
| **Wellness** | `water-intake-calculator`, `sleep-cycle-calculator` |

> **YMYL requirement.** Every page in this cluster needs a visible methodology statement, the source
> standard it implements (WHO, NIH, DoD, CKD-EPI, Mifflin-St Jeor), an explicit statement of limits,
> and a "not medical advice" disclaimer. `bac-calculator` and `gfr-calculator` carry the highest risk
> and must state plainly that they are estimates and must not be used for driving or clinical decisions.

### Cluster 3 — Math & Numbers (24 tools)

| Layer | Pages |
|---|---|
| **Hub** | `/math-calculators/` |
| **Flagships** | `percentage-calculator`, `scientific-calculator` |
| **Arithmetic & number theory** | `fraction-calculator`, `gcf-calculator`, `lcm-calculator`, `prime-factorization-calculator`, `exponent-calculator`, `log-calculator`, `ratio-calculator` |
| **Statistics** | `average-calculator`, `mean-median-mode-range-calculator`, `probability-calculator`, `permutation-and-combination-calculator`, `random-number-generator` |
| **Geometry** | `triangle-calculator`, `right-triangle-calculator`, `pythagorean-theorem-calculator`, `volume-calculator`, `surface-area-calculator`, `slope-calculator` |
| **Algebra** | `quadratic-formula-calculator` |
| **Number bases** | `binary-calculator`, `hex-calculator` |
| **Education** | `gpa-calculator` |

### Cluster 4 — Date & Time (8 tools)

| Layer | Pages |
|---|---|
| **Hub** | `/date-time-calculators/` |
| **Flagship** | `age-calculator` |
| **Supporting** | `date-calculator`, `days-until-calculator`, `day-of-the-week-calculator`, `time-duration-calculator`, `hours-and-minutes-calculator`, `time-card-calculator`, `chronological-age-calculator` |

### Cluster 5 — Auto & Vehicle (6 tools)

| Layer | Pages |
|---|---|
| **Hub** | `/auto-vehicle-calculators/` |
| **Flagship** | `gas-mileage-calculator` |
| **Supporting** | `fuel-cost-calculator`, `tire-size-calculator`, `horsepower-calculator`, `engine-horsepower-calculator`, `btu-calculator`* |

\* `btu-calculator` is HVAC sizing, not automotive. Assign to Construction instead — noted in §H.

### Cluster 6 — Science & Engineering (10 tools)

| Layer | Pages |
|---|---|
| **Hub** | `/science-calculators/` |
| **Physics** | `speed-distance-time-calculator`, `density-mass-volume-calculator`, `force-calculator` |
| **Electrical** | `ohms-law-calculator`, `voltage-drop-calculator`, `electricity-calculator` |
| **Networking & dev** | `ip-subnet-calculator`, `bandwidth-calculator`, `base64-encode-decode`, `url-encode-decode` |

> The four networking/dev tools are a weak fit for a "science" hub and compete against
> well-established developer-tool sites. Treated as P3 — keep indexable, invest last.

### Cluster 7 — Construction & DIY (8 + 1 tools)

| Layer | Pages |
|---|---|
| **Hub** | `/construction-calculators/` |
| **Flagship** | `square-footage-calculator` |
| **Supporting** | `concrete-calculator`, `paint-calculator`, `tile-calculator`, `roofing-calculator`, `stair-calculator`, `gravel-and-mulch-calculator`, `wallpaper-calculator`, `btu-calculator` (reassigned) |

### Cluster 8 — Unit Converters (7 tools)

| Layer | Pages |
|---|---|
| **Hub** | `/unit-converters/` — merge with `unit-converter` rather than run both, see §H |
| **Supporting** | `temperature-converter`, `length-converter`, `weight-converter`, `speed-converter`, `area-converter`, `data-storage-converter` |

### Cluster 9 — Food & Cooking (4 tools)

| Layer | Pages |
|---|---|
| **Hub** | `/cooking-calculators/` |
| **Supporting** | `recipe-converter`, `baking-conversion-calculator`, `cooking-time-calculator`, `coffee-water-ratio-calculator` |

### Unclustered

`password-generator` — a genuine orphan. It is a security utility with no topical neighbours on this
site and competes against 1Password, Bitwarden and LastPass. Keep it, link it from the homepage
only, and treat as P3. Do not build a "security" cluster around a single tool.

---

## H. Cannibalization risks and consolidation recommendations

Ordered by severity. Two of these are true duplicate content shipping today.

### Severity 1 — identical pages on two URLs (fix first)

**`/emi-calculator/` vs `/loan-calculator/`**
`App.tsx` routes both slugs to the same `LoanCalculatorPage` component. Byte-identical output, two
URLs, one `FLAGSHIP_SEO` entry each with overlapping keywords. Classic self-competition.

> **Recommendation — differentiate, do not redirect.** These serve genuinely different intents in
> different markets: "EMI" is the dominant term in India/South Asia, "loan calculator" is the
> generic global term. Keep both URLs, but give them separate components or a mode prop so the
> content differs materially: `/emi-calculator/` leads with EMI terminology, rupee presets and
> amortisation; `/loan-calculator/` leads with borrowing capacity, affordability and comparing
> offers. Cross-link with descriptive anchors. If differentiation is not built, consolidate to
> `/loan-calculator/` and 301 the EMI URL.

**`/date-calculator/` vs `/date-difference-calculator/`**
Both route to `DateDifferencePage`. Identical output.

> **Recommendation — consolidate.** Unlike the loan pair, there is no market or intent split here;
> both mean "days between two dates". Keep `/date-calculator/` (shorter, broader, higher intent
> coverage including date add/subtract), **301 `/date-difference-calculator/` → `/date-calculator/`**,
> and target "date difference" as an H2 and secondary keyword on the surviving page. Remove the
> redirected URL from the sitemap.

### Severity 2 — strong intent overlap, differentiation required

**`calorie-calculator` / `tdee-calculator` / `bmr-calculator`**
BMR and TDEE are inputs to a calorie target, so all three currently answer "how many calories do I
need". Keep all three — each has real independent search demand — but enforce strict scoping:
`bmr-calculator` explains resting metabolism only and ends by linking onward; `tdee-calculator`
covers activity multipliers and maintenance; `calorie-calculator` owns goal-based targets
(deficit/surplus) and is the cluster flagship. No page may fully duplicate another's output table.

**`bmi-calculator` / `healthy-weight-calculator` / `ideal-weight-calculator` / `overweight-calculator`**
Four pages answering "is my weight healthy". This is the worst overlap on the site by page count.

> **Recommendation — consolidate two.** Keep `bmi-calculator` (flagship, distinct metric) and
> `ideal-weight-calculator` (distinct formulas — Devine, Robinson, Miller, Hamwi — with genuine
> independent demand). **301 `overweight-calculator` → `bmi-calculator`** and
> **301 `healthy-weight-calculator` → `ideal-weight-calculator`**, absorbing their query targets as
> H2 sections. Retaining four near-identical pages dilutes all four.

**`average-calculator` vs `mean-median-mode-range-calculator`**
`average-calculator` is titled "Average, Mean & Standard Deviation" — it already covers mean, and
mean is the headline term of the other page.

> **Recommendation — re-scope, keep both.** Narrow `average-calculator` to arithmetic/weighted mean
> and standard deviation. `mean-median-mode-range-calculator` owns the full descriptive-statistics
> set, which is a distinct and heavily searched school-curriculum query. Remove "mean" from the
> first page's primary keyword.

**`horsepower-calculator` vs `engine-horsepower-calculator`**
"Horsepower & Engine Torque" vs "Engine Dyno & Trap Speed HP".

> **Recommendation — consolidate.** The distinction (torque-based vs trap-speed-based) is a method
> difference, not a search-intent difference; both are served by one page with two modes.
> **301 `engine-horsepower-calculator` → `horsepower-calculator`**, keep trap-speed as a mode and
> an H2.

**`right-triangle-calculator` vs `pythagorean-theorem-calculator`**
Heavy formula overlap, but the Pythagorean theorem is a distinct named entity with large,
stable, education-driven search demand. **Keep both**; scope the Pythagorean page tightly to
`a² + b² = c²` (finding a missing side) and let the right-triangle page own angles, area and
trigonometric ratios.

**`unit-converter` vs `/unit-converters/` hub**
Do not create both. The existing `/unit-converter/` page already routes all seven converter slugs.

> **Recommendation — promote, don't duplicate.** Make `/unit-converter/` itself the hub: it keeps
> its existing URL and authority, gains hub content and links to the six specific converters. Skip
> `/unit-converters/` entirely. This is the one cluster where the hub already exists.

**`salary-calculator` vs `income-tax-calculator`**
Both compute take-home pay. Scope `salary-calculator` to gross↔net, pay-period conversion and
hourly↔annual; scope `income-tax-calculator` to tax bands, deductions and liability. Keep both.

### Severity 3 — acceptable overlap, no action

`mortgage-calculator` vs `fha-loan-calculator` / `va-mortgage-calculator` /
`mortgage-calculator-uk` / `canadian-mortgage-calculator` — loan-programme and country variants with
distinct rules, distinct queries and distinct audiences. Legitimate.

`401k-calculator` / `roth-ira-calculator` / `ira-calculator` — distinct account types with distinct
tax treatment and contribution limits. Legitimate.

`annuity-calculator` vs `annuity-payout-calculator` — accumulation vs distribution phase. Legitimate,
but must cross-link prominently or users will land on the wrong one.

`gst-calculator` vs `vat-calculator` — regional tax regimes. Legitimate.

`debt-payoff-calculator` / `debt-consolidation-calculator` / `debt-ratio-calculator` — strategy vs
refinancing vs a lending ratio. Legitimate.

### Net effect of recommendations

| Action | Count |
|---|---|
| 301 redirect and absorb | 4 (`date-difference-calculator`, `overweight-calculator`, `healthy-weight-calculator`, `engine-horsepower-calculator`) |
| Differentiate, keep both URLs | 5 pairs |
| Hub merged into existing page | 1 (`unit-converter`) |
| **Final indexable calculator count** | **146** |

---

## J. SEO priority

Priority reflects opportunity × current gap × commercial value — not search volume alone.

### Content status: COMPLETE

**Articles: 150 / 150 · SEO metadata: 150 / 150.**

Every calculator has hand-written editorial content — formula card with variable definitions,
how-to steps, a worked example whose arithmetic resolves, editorial sections and FAQs. Depth is
matched to intent, from ~500 words for the Roman numeral converter to ~1,580 for the retirement
projection. Each page emits `Article` + `FAQPage` + `HowTo` + `WebApplication` schema, and no
page falls back to the generic template.

Articles live in 17 cluster files under `src/data/articles/`, merged into `CALCULATOR_ARTICLES`.

Metadata for the 107 non-flagship calculators was generated from the authored titles and
descriptions in sections C/D of this document into `src/data/planSeo.ts`, and resolved in
`getSeoForPath` above the generic fallback. **Editing that file directly will drift from this
plan** — change the plan and regenerate, or promote the entry into `FLAGSHIP_SEO`.

**Interim consolidation.** Pending host-level 301s, the four pages slated for redirect carry a
cross-canonical to their target and are excluded from the sitemap:
`date-difference-calculator` → `date-calculator`, `overweight-calculator` → `bmi-calculator`,
`healthy-weight-calculator` → `ideal-weight-calculator`, `engine-horsepower-calculator` →
`horsepower-calculator`.

Sitemap: 160 URLs — 146 indexable calculators, 8 hubs, 5 static, homepage.

The priority tiers below are retained as a record of the sequence the work was done in.

### P0 — Critical (blocking; do first)

| Item | Status | Why |
|---|---|---|
| Remove fabricated `aggregateRating` | ✅ shipped | Policy violation |
| All 9 category hubs built | ✅ shipped | 150 tools had no parent page |
| `CollectionPage` + `ItemList` schema | ✅ shipped | Hub is a curated list; schema now matches |
| Homepage metadata + keyword narrowing | ✅ shipped | Was competing with its own calculator pages |
| Hubs added to `generateSitemap.js` | ✅ shipped | Parsed from `categoryHubs.ts`, cannot drift |
| Homepage cards link to hubs | ✅ shipped | Previously an in-page filter with no URL |
| 4 × 301 redirects from §H | ⏳ blocked | Needs hosting platform — see below |

### Implementation notes (shipped 2026-09-12)

New files: `src/data/categoryHubs.ts` (single source of truth for hub membership,
copy and metadata), `src/pages/CategoryHubPage.tsx`.

Hub membership is validated to cover all 150 calculators exactly once, with five
deliberate exclusions: four pending redirects plus `password-generator`.

`/unit-converter/` is promoted to hub status in the data model but is still rendered by
`UnitConverterPage`. Wiring its hub content into that page is outstanding (P1).

Verified live: titles 50–53 chars, descriptions 129–149, one H1 per hub, correct
`CollectionPage` + `ItemList` + `BreadcrumbList` + `FAQPage` graph, no `aggregateRating`,
zero contrast failures in both themes, zero horizontal overflow at 320px and 390px.

### Pre-VPS hardening pass (2026-09-12)

Everything fixable without the VPS, completed before migration.

**E-E-A-T honesty.** Removed 13 fabricated reviewer credentials from the original articles,
including "Certified Financial Planner (CFP)" and "Registered Clinical Dietitian" — both legally
protected designations, asserted on YMYL financial and health pages and emitted into `Article`
schema as machine-readable claims. Also replaced the blanket "✓ Fact-Checked & Verified" badge
shown on every article page with "Formula & sources shown", which the reader can verify on the
page itself. **If a real review process exists, reinstate the specific claim — but only where it
actually happened.**

**About page rewritten** with verifiable specifics instead of assurances: the named standard each
cluster implements (Mifflin-St Jeor, CKD-EPI 2021, US Navy circumference, Devine/Robinson/Miller/
Hamwi, WHO BMI with Asian cut-offs, Naegele's rule, Epley/Brzycki, Gregorian leap rules, exact
conversion factors), an explicit "what these tools are not" section, and how corrections are
handled.

**Broken internal link.** The homepage hero linked to `/date-difference`, which does not exist and
rendered the 404 page. Now points at `/date-calculator`.

**Duplicate schema.** The homepage emitted its own `WebSite` block on top of the one from
`seoRegistry`, which already includes `Organization` and `SearchAction`. Removed — every route now
emits exactly one JSON-LD graph.

**Contrast.** Fixed 20+ further failures the sampled sweeps had missed, all the same underlying
pattern: a colour that is correct in one theme used where the background inverts in the other.
Worst cases were white text on `--primary-600` (1.40:1 in dark), on `--accent-emerald` (1.92:1),
and on a fixed `#10b981` (2.54:1 in both themes). Several were in modals and conditional UI that
an automated page-load sweep cannot reach and had to be found by reading the source.

**Responsive.** Long unbreakable tokens (URLs, percent-encoded strings) overflowed narrow
viewports; `overflow-wrap: break-word` now applies to text containers, with explicit handling for
the worked-example spans the rule could not reach. Selects could not shrink below their widest
option. Chip rows exceeded 320px at full padding. Flex-row numeric inputs could not shrink.

**Verification method.** A harness drives one headless Chrome session across every route and
checks render, JS errors, heading structure, canonical, JSON-LD, contrast and overflow in one
pass — run across all 167 routes in four configurations (desktop light/dark, mobile 390 light,
mobile 320 dark), plus the production build under the GitHub Pages base path.

### Hosting: GitHub Pages now, Hostinger VPS for production

**Current (GitHub Pages).** Served from a subdirectory at
`https://atulscript.github.io/calculator/`. No server-side redirects are possible, so the four
consolidations rely on cross-canonical tags. Build with `npm run build` (alias for
`build:pages`), which sets the base path, writes a matching sitemap and robots, and copies
`index.html` to `404.html` for SPA routing.

**Production (Hostinger VPS).** Build with `npm run build:vps` and deploy `dist/` behind
`deploy/nginx.conf`, which contains the real 301s, SPA fallback via `try_files`, asset caching
and a single canonical host. Validate with `sudo nginx -t` before reloading.

### Canonical host bug — fixed 2026-09-12

The production build serves from `/calculator/`, but canonicals were built as
`window.location.origin + canonicalPath`, omitting the base path. **Every canonical on the
live GitHub Pages site pointed at a URL that does not exist.** Meanwhile `sitemap.xml` and
`robots.txt` hardcoded `https://calculator11.com`, a domain the site is not served from — so
the sitemap listed 160 URLs on the wrong host.

Fixed by introducing `getSiteOrigin()` in `seoRegistry.ts`, which respects `BASE_URL` and can
be overridden with `VITE_SITE_URL`. The sitemap script reads the same value from `SITE_URL`
and now generates `robots.txt` alongside, so the two cannot drift apart again. Both build
targets are verified to produce matching canonical, sitemap and robots URLs.

### Migration checklist

1. Point DNS at the VPS and issue certificates for the apex and `www`.
2. `npm run build:vps`, deploy `dist/` to `/var/www/calculator11`.
3. Install `deploy/nginx.conf`, run `sudo nginx -t`, reload.
4. Verify the four 301s return `301` and land on the right target.
5. Add the new property in Search Console and submit
   `https://calculator11.com/sitemap.xml`.
6. Use the Change of Address tool if the GitHub Pages URL has accrued any indexing.
7. Spot-check that canonicals no longer contain `/calculator/`.

---

## I. Schema strategy

The existing `@graph` implementation in `seoRegistry.ts` is well built — single graph, linked
`@id`s, conditional entity inclusion. Extend rather than replace.

| Page type | Schema | Why | Key properties |
|---|---|---|---|
| Homepage | `WebSite` + `Organization` + `SearchAction` | Site entity; enables sitelinks search box | `url`, `name`, `potentialAction` |
| Category hub | `CollectionPage` + `ItemList` + `BreadcrumbList` | Hub is literally a curated list of tools | `ItemList.itemListElement` → each calculator |
| Calculator | `WebApplication` + `BreadcrumbList` | Tool, not article; matches visible function | `applicationCategory`, `offers.price: 0`, `operatingSystem` |
| Calculator with article | add `Article` | Genuine editorial body content exists | `headline`, `author`, `dateModified` |
| Calculator with FAQs | add `FAQPage` | Only where FAQs are visible on-page | `mainEntity[].Question` |
| Calculator with steps | add `HowTo` | Only where step-by-step usage is visible | `step[].HowToStep` |
| About | `AboutPage` + `Organization` | Entity disambiguation | `mainEntity` |
| Contact | `ContactPage` | — | `mainEntity` |
| Privacy / Terms / Disclaimer | `WebPage` | Adequate; no richer type applies | `publisher` |

**Rules.**
- Never emit `aggregateRating`, `review`, or `Review` without real user reviews on the page.
- Never emit `FAQPage` for questions not visible to users.
- `Dataset` is **not** appropriate here — these are tools, not published datasets. Do not add it.
- `Article` only where `CALCULATOR_ARTICLES` has an entry; do not emit it for the 138 thin pages.
- `dateModified` must be driven by real edits, not hardcoded. Currently hardcoded to `2026-09-12` in
  `seoRegistry.ts` — **change to a per-article field** so it does not falsely claim freshness.

**New work required:** `CollectionPage` + `ItemList` for hubs does not exist yet and must be added
to `updateDocumentSeo` alongside a `schemaType: 'CollectionPage'`.

---

## F. Content gap analysis

Gaps are expressed as what users expect and competitors provide, versus what this site currently has.

### Site-wide gaps

| Gap | Impact | Where competitors win |
|---|---|---|
| No category hubs | Cannot rank for head terms; no cluster signal | calculator.net, omnicalculator both run strong hubs |
| No formula/methodology on 138 pages | Fails the primary informational intent behind tool queries | omnicalculator shows the formula on every page |
| No worked examples on 138 pages | Users cannot verify the tool is correct | calculator.net includes examples throughout |
| No stated sources on health tools | YMYL trust failure | Clinical calculators cite the source standard |
| No "related calculators" logic beyond same-category | Weak internal link graph, poor discovery | omnicalculator cross-links aggressively by topic |
| Homepage carries every keyword | Dilutes the head term | — |

### Topic gaps (tools competitors have that this site lacks)

Genuine additions worth considering, all adjacent to existing clusters:

- **Finance:** amortization schedule (standalone), APY, break-even, currency conversion, lease,
  overtime pay, refinance break-even, take-home by state
- **Health:** waist-to-hip ratio, waist-to-height ratio, child BMI percentile, conception date,
  period tracker, sleep debt
- **Math:** percentage increase/decrease (standalone — high volume, currently buried inside
  `percentage-calculator`), long division, rounding, scientific notation, standard deviation
  (standalone), z-score
- **Date/time:** business days, week number, time zone converter, add/subtract time
- **Construction:** lumber, drywall, insulation, deck, fence, brick/block

> **Do not build these yet.** 138 existing pages lack content. Adding tools before filling them
> compounds the thin-content problem. Revisit after P1 completes.

### Supporting guide opportunities (non-calculator content)

Only build these where they answer an intent a calculator cannot:

- "How mortgage amortisation actually works" → supports the mortgage sub-cluster
- "BMI limitations and who it misclassifies" → genuine YMYL trust content, differentiates from
  competitors who present BMI uncritically
- "Snowball vs avalanche: which clears debt faster" → comparison intent, links to two calculators
- "Metric and imperial conversion reference" → supports the converter cluster

---

## E. Internal linking map

### Principles

1. Every calculator links **up** to its hub, **sideways** to 3–6 genuine siblings, and where relevant
   **across** to another cluster.
2. Anchor text is descriptive and varied. Never repeat the identical anchor across many pages —
   currently `Related Calculators` is a generic heading with raw titles as links, which passes no
   topical signal.
3. Cross-cluster links only where the user journey is real (mortgage → home affordability; BMI →
   calorie; square footage → flooring cost).

### Hub → calculator

Each hub links to all of its tools, with the flagship given prominence and a descriptive
sentence rather than a bare title.

### Calculator → hub (breadcrumb + body)

| From | Anchor | To |
|---|---|---|
| any finance tool | `all financial calculators` | `/financial-calculators/` |
| any health tool | `browse health & fitness calculators` | `/health-calculators/` |

### High-value cross-links (sample — full set produced with page content)

| Source | Anchor text | Destination |
|---|---|---|
| `mortgage-calculator` | `how much house you can afford` | `home-affordability-calculator` |
| `mortgage-calculator` | `compare renting against buying` | `rent-vs-buy-calculator` |
| `mortgage-calculator` | `refinancing break-even point` | `mortgage-refinance-calculator` |
| `home-affordability-calculator` | `debt-to-income ratio` | `debt-ratio-calculator` |
| `bmi-calculator` | `daily calorie target` | `calorie-calculator` |
| `bmi-calculator` | `body fat percentage` | `body-fat-calculator` |
| `calorie-calculator` | `resting metabolic rate` | `bmr-calculator` |
| `calorie-calculator` | `protein, carb and fat split` | `macro-calculator` |
| `tdee-calculator` | `calories burned per activity` | `calories-burned-calculator` |
| `emi-calculator` | `total interest over the term` | `compound-interest-calculator` |
| `sip-calculator` | `what inflation does to returns` | `inflation-calculator` |
| `retirement-calculator` | `employer 401(k) match` | `401k-calculator` |
| `credit-card-payoff-calculator` | `snowball and avalanche compared` | `debt-payoff-calculator` |
| `square-footage-calculator` | `paint coverage for that area` | `paint-calculator` |
| `square-footage-calculator` | `tile and grout quantities` | `tile-calculator` |
| `age-calculator` | `days until your next birthday` | `days-until-calculator` |
| `percentage-calculator` | `ratios and proportions` | `ratio-calculator` |
| `gas-mileage-calculator` | `cost of the whole trip` | `fuel-cost-calculator` |

### Homepage

Links to all 9 hubs with descriptive copy, plus the 8–10 flagship calculators. It should **not**
link to all 150 — that flattens PageRank distribution and is the current behaviour.

---

## C / D. Keyword and metadata map

Combined into one table per cluster: URL → intent → primary keyword → secondary keywords →
title → meta description. Kept together deliberately so metadata is never written without its
keyword rationale visible.

Produced per cluster in the sections that follow, in P0 → P3 order.

> **No search-volume figures appear in this document.** No keyword tool data was available for this
> project. Priority is assigned on search intent, commercial value and competitive gap. If you have
> Ahrefs/Semrush/GSC access, re-rank P1/P2 against real volume and difficulty before production.

---

*Sections C/D per cluster, and full page content, follow in subsequent passes.*

---

# C/D.1 — Homepage and category hubs (P0)

Character counts shown as `T:nn` (title) and `M:nnn` (description). Targets: title ≤ 60, description
140–158.

## `/` — Homepage

| Field | Value |
|---|---|
| **Intent** | Navigational + tool discovery |
| **Primary** | free online calculators |
| **Secondary** | all-in-one calculator site, online calculator tools, free calculators for finance health and math |
| **Semantic** | calculator directory, browser-based calculation, no sign-up, privacy-first tools, unit conversion, financial calculators, health calculators |
| **Questions** | what is the best free online calculator site, are online calculators accurate, do online calculators store my data |

**SEO Title** `Free Online Calculators for Finance, Health & Math` — T:49
**Meta Description** `146 free calculators for loans, mortgages, BMI, calories, percentages and unit conversion. Everything runs in your browser — no sign-up, no tracking.` — M:150

> Note the count is **146**, not 150, after the §H consolidations. Update `formatSeoDescription`
> and the homepage trust strip together — a stated number that disagrees with the sitemap is an
> avoidable trust error.

**Positioning.** The homepage targets the head term only. It must stop carrying keywords for
mortgage, EMI, SIP, BMI, calories and age simultaneously — that is the current `FLAGSHIP_SEO.home`
keyword array, and it competes with the very pages it should be feeding.

---

## `/financial-calculators/` — Finance hub

| Field | Value |
|---|---|
| **Intent** | Commercial investigation + tool discovery |
| **Primary** | financial calculators |
| **Secondary** | loan calculators, investment calculators, mortgage and debt calculators, money calculators |
| **Semantic** | amortisation, principal and interest, APR, compounding, take-home pay, debt-to-income, retirement planning |
| **Questions** | which calculator should I use for a loan, how do I work out monthly repayments, what calculator shows total interest |

**SEO Title** `Financial Calculators: Loans, Mortgages & Investments` — T:52
**Meta Description** `56 finance calculators covering mortgages, loan repayments, compound interest, retirement, debt payoff and tax. Free, accurate and private.` — M:139

---

## `/health-calculators/` — Health hub

| Field | Value |
|---|---|
| **Intent** | Informational + tool discovery |
| **Primary** | health calculators |
| **Secondary** | fitness calculators, body measurement calculators, nutrition calculators, weight and calorie tools |
| **Semantic** | BMI, body composition, basal metabolic rate, TDEE, macronutrients, WHO classification, lean body mass |
| **Questions** | how do I measure body composition, which health calculator is most accurate, what do these numbers actually mean |

**SEO Title** `Health & Fitness Calculators: BMI, Calories, Body Fat` — T:52
**Meta Description** `Work out BMI, daily calories, macros, body fat and ideal weight using recognised clinical formulas. Every tool shows its method and its limits.` — M:143

> The second sentence is the differentiator. Competitors present these numbers without caveats;
> stating the method and the limits is both better for users and the strongest available E-E-A-T
> signal for a site without named clinical authors.

---

## `/math-calculators/` — Math hub

| Field | Value |
|---|---|
| **Intent** | Informational + tool discovery |
| **Primary** | math calculators |
| **Secondary** | online maths solver, algebra and geometry calculators, statistics calculators |
| **Semantic** | percentage, fraction, quadratic formula, standard deviation, prime factorisation, permutation, logarithm |
| **Questions** | what calculator solves quadratic equations, how do I calculate standard deviation, is there a free fraction calculator |

**SEO Title** `Math Calculators: Percentages, Algebra & Statistics` — T:50
**Meta Description** `Solve percentages, fractions, quadratics, geometry and statistics step by step. Each tool shows the working, not just the answer.` — M:130

---

## `/date-time-calculators/` — Date & time hub

| Field | Value |
|---|---|
| **Intent** | Tool discovery |
| **Primary** | date and time calculators |
| **Secondary** | date calculator tools, time duration calculators, age and countdown calculators |
| **Semantic** | days between dates, leap year, timesheet, elapsed time, chronological age, day of week |
| **Questions** | how many days between two dates, how do I add days to a date, how do I total hours worked |

**SEO Title** `Date & Time Calculators: Age, Duration & Countdowns` — T:51
**Meta Description** `Count days between dates, find your exact age, total timesheet hours and track countdowns. Handles leap years and month-end dates correctly.` — M:139

---

## `/auto-vehicle-calculators/` — Auto hub

| Field | Value |
|---|---|
| **Intent** | Tool discovery |
| **Primary** | car and vehicle calculators |
| **Secondary** | fuel economy calculators, automotive performance calculators, road trip cost tools |
| **Semantic** | MPG, L/100km, tyre diameter, speedometer error, horsepower, torque, trap speed |
| **Questions** | how do I work out my MPG, will bigger tyres change my speedometer, how much will this trip cost in fuel |

**SEO Title** `Car & Vehicle Calculators: MPG, Fuel Cost & Tyre Size` — T:52
**Meta Description** `Calculate fuel economy, trip costs, horsepower and tyre size effects on your speedometer. Works in both metric and imperial units.` — M:130

---

## `/science-calculators/` — Science hub

| Field | Value |
|---|---|
| **Intent** | Informational + tool discovery |
| **Primary** | physics calculators |
| **Secondary** | science calculators, electrical calculators, engineering calculation tools |
| **Semantic** | Ohm's law, Newton's second law, density, velocity, voltage drop, watt-hours, subnet mask |
| **Questions** | how do I calculate voltage drop, what is the formula for force, how do I work out electricity cost |

**SEO Title** `Physics & Science Calculators: Force, Ohm's Law, Speed` — T:53
**Meta Description** `Solve for force, density, speed, voltage drop and electricity cost. Rearrangeable formulas that solve for any variable you leave blank.` — M:136

---

## `/construction-calculators/` — Construction hub

| Field | Value |
|---|---|
| **Intent** | Transactional-adjacent + tool discovery |
| **Primary** | construction calculators |
| **Secondary** | building material calculators, home improvement calculators, DIY estimating tools |
| **Semantic** | square footage, cubic yards, coverage rate, waste factor, shingle square, riser and tread |
| **Questions** | how much concrete do I need, how much paint for a room, how many tiles for this floor |

**SEO Title** `Construction Calculators: Concrete, Paint & Square Feet` — T:54
**Meta Description** `Estimate concrete, paint, tile, roofing and flooring quantities before you buy. Includes waste allowance so you order the right amount.` — M:135

---

## `/unit-converter/` — Converter hub (existing URL, promoted)

| Field | Value |
|---|---|
| **Intent** | Tool discovery + direct conversion |
| **Primary** | unit converter |
| **Secondary** | metric to imperial converter, measurement conversion tool, online unit conversion |
| **Semantic** | SI units, metric system, imperial units, conversion factor, celsius to fahrenheit, kg to lbs |
| **Questions** | how do I convert metric to imperial, what is the conversion factor for, how many grams in an ounce |

**SEO Title** `Unit Converter: Metric, Imperial, Temperature & More` — T:51
**Meta Description** `Convert length, weight, temperature, area, speed and data sizes instantly. Exact conversion factors, both metric and imperial, no rounding surprises.` — M:150

> Promoted to hub rather than creating `/unit-converters/`. Retains existing authority; see §H.

---

## `/cooking-calculators/` — Cooking hub

| Field | Value |
|---|---|
| **Intent** | Tool discovery |
| **Primary** | cooking calculators |
| **Secondary** | kitchen conversion tools, recipe scaling calculator, baking measurement converter |
| **Semantic** | cups to grams, ingredient density, roasting time per pound, brew ratio, serving scaling |
| **Questions** | how many grams in a cup of flour, how do I halve a recipe, how long to roast per pound |

**SEO Title** `Cooking & Baking Calculators: Cups to Grams, Scaling` — T:51
**Meta Description** `Scale recipes, convert cups to grams by ingredient, time your roast and dial in coffee ratios. Weight-based conversions, not generic volume guesses.` — M:149

---

# C/D.2 — Finance cluster (56 tools)

Intent key: **T** = tool/calculator intent · **I** = informational · **C** = commercial investigation

## Flagships (full detail)

### `/mortgage-calculator/` — already has metadata + article ✅
Primary: `mortgage calculator` · Secondary: monthly mortgage payment, PITI calculator, home loan
calculator, mortgage amortization schedule · Intent: T
Existing metadata is good. **One change:** add `15 vs 30 year mortgage` as an H2 rather than a
keyword — it is a distinct comparison intent currently unserved on-page.

### `/emi-calculator/` — already has metadata + article ✅
Primary: `emi calculator` · Intent: T
See §H — must be differentiated from `/loan-calculator/` or consolidated.

### `/sip-calculator/` · `/compound-interest-calculator/` — already have metadata + articles ✅

### `/retirement-calculator/` — **P1, no content**

| Field | Value |
|---|---|
| Primary | retirement calculator |
| Secondary | retirement savings calculator, FIRE calculator, how much do I need to retire, retirement planning calculator |
| Long-tail | how much do I need to retire at 60, will my savings last 30 years, how much should I save each month for retirement |
| Semantic | safe withdrawal rate, 4% rule, corpus, inflation-adjusted returns, retirement age, nest egg, drawdown |
| Questions | how much do I need to retire · what is the 4% rule · how long will my retirement savings last · when can I afford to retire |

**Title** `Retirement Calculator: How Much You Need to Retire` — T:49
**Meta** `See whether your savings will last. Projects your retirement corpus, applies a safe withdrawal rate and shows the monthly saving needed to close any gap.` — M:154

Content must cover: the 4% rule and its criticisms, inflation-adjusted vs nominal returns, sequence
of returns risk, and an explicit statement that projections are not guarantees. Links to
`401k-calculator`, `savings-calculator`, `inflation-calculator`, `pension-calculator`.

---

## Mortgage & property sub-cluster

| URL | Int | Primary keyword | Title · Meta |
|---|---|---|---|
| `/home-affordability-calculator/` | T | how much house can i afford | **Home Affordability Calculator: What Can You Afford?**<br>`Find the realistic price range for your income, deposit and existing debts. Uses standard lender debt-to-income limits rather than optimistic estimates.` |
| `/mortgage-refinance-calculator/` | C | mortgage refinance calculator | **Refinance Calculator: Break-Even Point & Savings**<br>`Compare your current mortgage against a new rate. Shows monthly saving, total interest saved and how many months until refinancing pays for itself.` |
| `/rent-vs-buy-calculator/` | C | rent vs buy calculator | **Rent vs Buy Calculator: Which Costs Less Long-Term?**<br>`Compare the true cost of renting against buying, including maintenance, taxes and the opportunity cost of your deposit. Shows the break-even year.` |
| `/heloc-calculator/` | T | heloc calculator | **HELOC Calculator: Home Equity Line Payments**<br>`Work out how much equity you can borrow, what the draw and repayment periods cost, and how a rate change would affect your payment.` |
| `/rental-property-roi-calculator/` | T | rental property roi calculator | **Rental Property ROI & Cap Rate Calculator**<br>`Calculate cap rate, cash-on-cash return and monthly cash flow for a rental. Accounts for vacancy, maintenance and management fees.` |
| `/fha-loan-calculator/` | T | fha loan calculator | **FHA Loan Calculator: Payment & Mortgage Insurance**<br>`Estimate FHA monthly payments including upfront and annual mortgage insurance premiums, with the 3.5% minimum down payment built in.` |
| `/va-mortgage-calculator/` | T | va loan calculator | **VA Loan Calculator: Payment & Funding Fee**<br>`Estimate a VA mortgage payment with no down payment and no PMI. Includes the funding fee and exemption handling for disabled veterans.` |
| `/mortgage-calculator-uk/` | T | uk mortgage calculator | **UK Mortgage Calculator: Monthly Repayments**<br>`Work out monthly repayments on a UK mortgage, compare repayment against interest-only, and see the effect when your fixed rate ends.` |
| `/canadian-mortgage-calculator/` | T | canadian mortgage calculator | **Canadian Mortgage Calculator: Payments & Terms**<br>`Calculate Canadian mortgage payments with semi-annual compounding, accelerated payment options and CMHC insurance on low down payments.` |
| `/stamp-duty-calculator/` | T | stamp duty calculator | **Stamp Duty Calculator: Property Transfer Tax**<br>`Estimate stamp duty or property transfer tax on a purchase, including first-time buyer relief and additional-property surcharges.` |

> **Regional accuracy warning.** The UK, Canadian, FHA, VA and stamp duty pages encode
> jurisdiction-specific rules and rates that change. Each needs a visible "rates current as of"
> line and an owner responsible for updating it. If that cannot be maintained, these pages will
> become actively wrong and should be de-prioritised rather than published with stale figures.

## Debt & credit sub-cluster

| URL | Int | Primary keyword | Title · Meta |
|---|---|---|---|
| `/credit-card-payoff-calculator/` | T | credit card payoff calculator | **Credit Card Payoff Calculator: Time & Interest**<br>`See how long minimum payments really take and what they cost. Compare against a fixed monthly amount to find how much sooner you clear the balance.` |
| `/debt-payoff-calculator/` | C | debt snowball calculator | **Debt Snowball vs Avalanche Calculator**<br>`Compare both payoff strategies across all your debts. Snowball clears accounts faster, avalanche costs less — see the actual difference for your numbers.` |
| `/debt-consolidation-calculator/` | C | debt consolidation calculator | **Debt Consolidation Calculator: Is It Worth It?**<br>`Compare your current debts against a single consolidation loan. Includes fees, so you can see whether consolidating genuinely saves money.` |
| `/debt-ratio-calculator/` | T | debt to income ratio calculator | **Debt-to-Income Ratio Calculator (DTI)**<br>`Work out your front-end and back-end DTI the way lenders do, and see where you sit against the thresholds most mortgage lenders apply.` |
| `/student-loan-calculator/` | T | student loan calculator | **Student Loan Repayment Calculator**<br>`Estimate monthly repayments, total interest and payoff date. Compare standard repayment against extended and income-driven plans.` |
| `/personal-loan-calculator/` | T | personal loan calculator | **Personal Loan Calculator: Monthly Payments**<br>`Calculate monthly payments and total interest on a personal loan, and see how the term length changes what you pay overall.` |
| `/auto-loan-calculator/` | T | auto loan calculator | **Auto Loan Calculator: Car Payment & Interest**<br>`Work out monthly car payments with trade-in, down payment and sales tax included. See total interest before you sign at the dealership.` |
| `/car-lease-vs-buy-calculator/` | C | lease vs buy calculator | **Car Lease vs Buy Calculator: Which Is Cheaper?**<br>`Compare leasing against financing over the same period, including residual value and equity, so you can see the real cost difference.` |
| `/business-loan-calculator/` | T | business loan calculator | **Business Loan Calculator: Repayments & Cost**<br>`Estimate repayments on commercial financing, including origination fees, and see the true annual cost of borrowing for your business.` |
| `/boat-loan-calculator/` | T | boat loan calculator | **Boat Loan Calculator: Monthly Payment Estimate**<br>`Estimate monthly payments on a boat or marine loan across the longer terms typical of marine financing.` |
| `/interest-rate-calculator/` | T | interest rate calculator | **Interest Rate & APR Calculator**<br>`Work backwards from a payment to find the actual interest rate, and see the difference between a quoted rate and the APR you really pay.` |

## Retirement & investing sub-cluster

| URL | Int | Primary keyword | Title · Meta |
|---|---|---|---|
| `/401k-calculator/` | T | 401k calculator | **401(k) Calculator: Growth & Employer Match**<br>`Project your 401(k) balance at retirement and see exactly what the employer match adds. Leaving the match unclaimed is the costliest common mistake.` |
| `/roth-ira-calculator/` | T | roth ira calculator | **Roth IRA Calculator: Tax-Free Growth**<br>`Project Roth IRA growth and compare after-tax outcomes against a traditional IRA, including contribution and income limits.` |
| `/ira-calculator/` | T | traditional ira calculator | **Traditional IRA Calculator: Growth & Tax Deferral**<br>`Project a traditional IRA balance, see the value of the upfront deduction and estimate what required minimum distributions will look like.` |
| `/pension-calculator/` | T | pension calculator | **Pension Calculator: Forecast Your Income**<br>`Estimate the annual pension your years of service and final salary will produce, and see what a few more years of contributions would add.` |
| `/social-security-calculator/` | T | social security calculator | **Social Security Calculator: Benefit Estimate**<br>`Estimate your monthly benefit and see how claiming at 62, full retirement age or 70 changes the amount for the rest of your life.` |
| `/annuity-calculator/` | T | annuity calculator | **Annuity Calculator: Growth During Accumulation**<br>`Project what an annuity will be worth when you start drawing on it, with regular contributions and a fixed growth rate.` |
| `/annuity-payout-calculator/` | T | annuity payout calculator | **Annuity Payout Calculator: Monthly Income**<br>`Work out the monthly income an annuity will pay, over a fixed term or for life, and how the payout period changes the amount.` |
| `/cd-calculator/` | T | cd calculator | **CD Calculator: Certificate of Deposit Returns**<br>`Calculate what a CD will be worth at maturity, compare APY across terms, and see what early withdrawal penalties would cost.` |
| `/bond-calculator/` | T | bond yield calculator | **Bond Calculator: Yield, Price & Maturity**<br>`Calculate current yield, yield to maturity and bond price, and see how a change in market rates moves the value of what you hold.` |
| `/dividend-yield-calculator/` | T | dividend yield calculator | **Dividend Yield Calculator: Income & Payout**<br>`Calculate dividend yield, annual income and payout ratio, and see what dividend reinvestment does to returns over time.` |
| `/savings-calculator/` | T | savings goal calculator | **Savings Calculator: Reach Your Goal**<br>`Find the monthly amount needed to hit a savings target by a set date, or see what your current contributions will grow into.` |
| `/college-cost-calculator/` | T | college savings calculator | **College Cost Calculator: 529 Savings Plan**<br>`Project future tuition costs against education inflation and find the monthly 529 contribution needed to cover them.` |
| `/ppf-calculator/` | T | ppf calculator | **PPF Calculator: Maturity Value & Interest**<br>`Calculate Public Provident Fund maturity over the 15-year term, with year-by-year interest and the effect of extending in 5-year blocks.` |

## Tax & business sub-cluster

| URL | Int | Primary keyword | Title · Meta |
|---|---|---|---|
| `/income-tax-calculator/` | T | income tax calculator | **Income Tax Calculator: Take-Home Pay**<br>`Estimate income tax, see which band each part of your income falls into, and find your effective rate as against your marginal rate.` |
| `/salary-calculator/` | T | salary calculator | **Salary Calculator: Hourly, Monthly & Annual**<br>`Convert between hourly, weekly, monthly and annual pay, and see gross against take-home for any pay period.` |
| `/capital-gains-tax-calculator/` | T | capital gains tax calculator | **Capital Gains Tax Calculator: What You'll Owe**<br>`Estimate capital gains tax on a sale, with the short-term and long-term rates applied separately and losses offset against gains.` |
| `/gst-calculator/` | T | gst calculator | **GST Calculator: Add or Remove GST**<br>`Add GST to a net price or strip it out of a gross one. Covers the standard slabs and shows the tax amount separately.` |
| `/vat-calculator/` | T | vat calculator | **VAT Calculator: Add or Remove VAT**<br>`Add VAT to a net figure or work backwards from a VAT-inclusive price, at any rate you enter.` |
| `/commission-calculator/` | T | commission calculator | **Sales Commission Calculator: Earnings**<br>`Work out commission on flat, tiered or split rates, and see total earnings once base salary is included.` |
| `/margin-calculator/` | T | margin calculator | **Margin & Markup Calculator: Price and Profit**<br>`Calculate margin, markup, profit and selling price from any two values. Margin and markup are not the same number — this shows both.` |
| `/depreciation-calculator/` | T | depreciation calculator | **Depreciation Calculator: Straight-Line Schedule**<br>`Calculate annual depreciation and book value year by year, with salvage value and useful life factored in.` |
| `/roi-calculator/` | T | roi calculator | **ROI Calculator: Return on Investment**<br>`Calculate ROI as a percentage and annualised, so returns over different holding periods can be compared fairly.` |
| `/irr-calculator/` | T | irr calculator | **IRR Calculator: Internal Rate of Return**<br>`Find the internal rate of return on an uneven series of cash flows, and compare it against your required rate.` |
| `/payback-period-calculator/` | T | payback period calculator | **Payback Period Calculator: Time to Recover**<br>`Work out how long an investment takes to repay its cost, with both simple and discounted payback shown.` |
| `/net-worth-calculator/` | T | net worth calculator | **Net Worth Calculator: Assets Minus Liabilities**<br>`Add up assets and debts to find your net worth, and see which liabilities are holding the number down.` |
| `/inflation-calculator/` | I | inflation calculator | **Inflation Calculator: What Money Is Worth**<br>`See what an amount from a past year is worth today, or what today's money will buy in future at a given inflation rate.` |

## Everyday money

| URL | Int | Primary keyword | Title · Meta |
|---|---|---|---|
| `/loan-calculator/` | T | loan calculator | **Loan Calculator: Payments, Term & Total Cost**<br>`Work out what you can borrow for a payment you can afford, compare offers side by side, and see total interest before you commit.` |
| `/simple-interest-calculator/` | T | simple interest calculator | **Simple Interest Calculator: I = P × r × t**<br>`Calculate simple interest and the final balance, and see how it differs from compound interest over the same period.` |
| `/tip-calculator/` | T | tip calculator | **Tip Calculator: Split the Bill Fairly**<br>`Work out the tip and split a bill between any number of people, with uneven splits and rounding handled.` |
| `/discount-calculator/` | T | discount calculator | **Discount Calculator: Sale Price & Savings**<br>`Find the sale price and what you actually save, including stacked discounts and percentage-off-then-extra deals.` |

---

# C/D.3 — Health cluster (24 tools) · YMYL

Every page in this cluster must name the formula it implements, state who it is inaccurate for, and
carry a "not medical advice" line. That is a ranking requirement here, not a legal formality.

## Flagships

### `/bmi-calculator/` — has metadata + article ✅
Primary: `bmi calculator` · Intent: T
**Required addition:** an honest limitations section. BMI misclassifies muscular people, older
adults losing muscle mass, and does not distinguish fat distribution. The page already implements
Asian BMI cut-offs — surface that as a differentiator, competitors largely ignore it.
Absorbs `overweight-calculator` per §H.

### `/calorie-calculator/` — has metadata + article ✅
Primary: `calorie calculator` · Intent: T
Owns goal-based targets. Must not duplicate the TDEE or BMR output tables.

## Body composition

| URL | Int | Primary keyword | Title · Meta |
|---|---|---|---|
| `/body-fat-calculator/` | T | body fat calculator | **Body Fat Percentage Calculator (Navy Method)**<br>`Estimate body fat from tape measurements using the US Navy formula, with healthy ranges by age and sex. No calipers needed.` |
| `/lean-body-mass-calculator/` | T | lean body mass calculator | **Lean Body Mass Calculator (Boer & James)**<br>`Estimate lean mass and fat mass from height, weight and sex, using the formulas clinicians use for drug dosing.` |
| `/ideal-weight-calculator/` | T | ideal weight calculator | **Ideal Weight Calculator: Devine, Hamwi & More**<br>`Compare four established ideal-weight formulas side by side. They disagree — seeing the spread is more useful than any single number.` |
| `/army-body-fat-calculator/` | T | army body fat calculator | **Army Body Fat Calculator (DoD Standard)**<br>`Check body fat against current US Army standards by age and sex, using the official tape-test method.` |
| `/bsa-calculator/` | T | body surface area calculator | **Body Surface Area Calculator (Du Bois, Mosteller)**<br>`Calculate BSA using Du Bois or Mosteller, the standard basis for chemotherapy and paediatric dosing.` |

> `healthy-weight-calculator` → 301 to `/ideal-weight-calculator/` (§H).
> `overweight-calculator` → 301 to `/bmi-calculator/` (§H).

## Energy & macros

| URL | Int | Primary keyword | Title · Meta |
|---|---|---|---|
| `/tdee-calculator/` | T | tdee calculator | **TDEE Calculator: Total Daily Energy Expenditure**<br>`Find the calories you burn in a full day, including activity. This is your maintenance level — the number every diet target is built from.` |
| `/bmr-calculator/` | T | bmr calculator | **BMR Calculator: Basal Metabolic Rate**<br>`Calculate the calories your body burns completely at rest, using the Mifflin-St Jeor equation preferred in clinical practice.` |
| `/macro-calculator/` | T | macro calculator | **Macro Calculator: Protein, Carbs & Fat Split**<br>`Turn a calorie target into daily protein, carb and fat grams, with splits for fat loss, maintenance or muscle gain.` |
| `/protein-calculator/` | T | protein calculator | **Protein Intake Calculator: Daily Grams**<br>`Find your daily protein target based on body weight and training load, with the research ranges shown rather than one arbitrary figure.` |
| `/carbohydrate-calculator/` | T | carb calculator | **Carbohydrate Calculator: Daily Carb Target**<br>`Work out daily carbohydrate grams for your calorie goal, from low-carb through to endurance-training intakes.` |
| `/fat-intake-calculator/` | T | fat intake calculator | **Dietary Fat Calculator: Daily Fat Grams**<br>`Calculate daily fat intake in grams for your calorie target, including the minimum needed for hormone function.` |
| `/calories-burned-calculator/` | T | calories burned calculator | **Calories Burned Calculator: By Activity (METs)**<br>`Estimate calories burned for over 100 activities using MET values, adjusted for your weight and duration.` |

## Fitness performance

| URL | Int | Primary keyword | Title · Meta |
|---|---|---|---|
| `/one-rep-max-calculator/` | T | one rep max calculator | **One Rep Max Calculator (1RM) with Percentages**<br>`Estimate your 1RM from any set, and get the full percentage table for programming your working sets.` |
| `/pace-calculator/` | T | pace calculator | **Running Pace Calculator: Time, Pace & Splits**<br>`Work out race pace, finish time or distance from any two of them, with split times for 5K through marathon.` |
| `/target-heart-rate-calculator/` | T | target heart rate calculator | **Target Heart Rate Calculator: Training Zones**<br>`Find your five training zones from max and resting heart rate, using the Karvonen method for more accurate zones.` |

## Reproductive & clinical

| URL | Int | Primary keyword | Title · Meta |
|---|---|---|---|
| `/pregnancy-due-date-calculator/` | T | due date calculator | **Due Date Calculator: Estimate Your Delivery Date**<br>`Estimate your due date from your last period, conception date or IVF transfer, with current week and trimester shown.` |
| `/ovulation-calculator/` | T | ovulation calculator | **Ovulation Calculator: Fertile Window**<br>`Estimate your fertile window and likely ovulation date from your cycle length and last period.` |
| `/gfr-calculator/` | T | gfr calculator | **GFR Calculator: Kidney Function (CKD-EPI 2021)**<br>`Estimate glomerular filtration rate using the 2021 CKD-EPI equation, with the CKD stage the result corresponds to.` |
| `/bac-calculator/` | T | bac calculator | **BAC Calculator: Blood Alcohol Estimate**<br>`Estimate blood alcohol concentration using the Widmark formula. An estimate only — never use it to decide whether to drive.` |

> **Highest-risk pages on the site.** `gfr-calculator` and `bac-calculator` must carry prominent,
> unavoidable disclaimers. The BAC meta description above deliberately includes the warning so it
> appears in the SERP snippet. The CKD-EPI page must state that the 2021 race-free equation is
> implemented, since the older race-adjusted version is now deprecated.

## Wellness

| URL | Int | Primary keyword | Title · Meta |
|---|---|---|---|
| `/water-intake-calculator/` | T | water intake calculator | **Water Intake Calculator: Daily Hydration Needs**<br>`Estimate daily water needs from body weight, activity and climate — rather than assuming eight glasses fits everyone.` |
| `/sleep-cycle-calculator/` | T | sleep calculator | **Sleep Calculator: Best Bedtime & Wake Time**<br>`Work backwards from your wake time to find bedtimes that let you finish a full 90-minute sleep cycle instead of waking mid-cycle.` |

---

# C/D.4 — Math cluster (24 tools)

## Flagships

### `/percentage-calculator/` — has metadata + article ✅
Primary: `percentage calculator` · Intent: T
**Gap:** "percentage increase" and "percentage decrease" are large standalone queries currently
buried as modes. Give each a dedicated H2 with a worked example so the page can rank for them.

### `/scientific-calculator/` — has metadata, no article
Primary: `scientific calculator` · Intent: T
**Title** `Scientific Calculator: Free Online with Full Functions` — T:54
**Meta** `A full scientific calculator with trig, logs, powers, roots and memory. Keyboard-friendly and works offline once loaded.`

## Arithmetic & number theory

| URL | Int | Primary keyword | Title · Meta |
|---|---|---|---|
| `/fraction-calculator/` | T | fraction calculator | **Fraction Calculator: Add, Subtract, Multiply, Divide**<br>`Work with fractions and mixed numbers, with every result simplified and the steps shown so you can follow the working.` |
| `/gcf-calculator/` | T | gcf calculator | **GCF Calculator: Greatest Common Factor**<br>`Find the greatest common factor of any set of numbers, with the prime factorisation and Euclidean method both shown.` |
| `/lcm-calculator/` | T | lcm calculator | **LCM Calculator: Least Common Multiple**<br>`Find the least common multiple of two or more numbers, with the working shown step by step.` |
| `/prime-factorization-calculator/` | T | prime factorization calculator | **Prime Factorization Calculator with Factor Tree**<br>`Break any number into its prime factors, with a factor tree and the result in exponent form.` |
| `/exponent-calculator/` | T | exponent calculator | **Exponent Calculator: Powers and Roots**<br>`Calculate powers, roots and fractional exponents, including negative bases and the rules that apply to them.` |
| `/log-calculator/` | T | log calculator | **Log Calculator: Natural Log, Log Base 10 & Any Base**<br>`Calculate logarithms to any base, including ln and log₁₀, with the change-of-base formula shown.` |
| `/ratio-calculator/` | T | ratio calculator | **Ratio Calculator: Simplify, Scale & Solve**<br>`Simplify ratios, solve for a missing term and scale recipes or plans up and down while keeping proportions.` |

## Statistics

| URL | Int | Primary keyword | Title · Meta |
|---|---|---|---|
| `/mean-median-mode-range-calculator/` | T | mean median mode calculator | **Mean, Median, Mode and Range Calculator**<br>`Find all four measures from one data set, with the sorted values and the working shown for each.` |
| `/average-calculator/` | T | average calculator | **Average & Standard Deviation Calculator**<br>`Calculate arithmetic and weighted averages plus standard deviation and variance, for a sample or a full population.` |
| `/probability-calculator/` | T | probability calculator | **Probability Calculator: Single & Multiple Events**<br>`Calculate probability for single and combined events, covering independent, dependent and mutually exclusive cases.` |
| `/permutation-and-combination-calculator/` | T | permutation and combination calculator | **Permutation & Combination Calculator (nPr, nCr)**<br>`Calculate nPr and nCr with and without repetition, and see which one your problem actually needs.` |
| `/random-number-generator/` | T | random number generator | **Random Number Generator: Pick a Range**<br>`Generate random numbers in any range, with or without duplicates, using the browser's cryptographic random source.` |

## Geometry

| URL | Int | Primary keyword | Title · Meta |
|---|---|---|---|
| `/triangle-calculator/` | T | triangle calculator | **Triangle Calculator: Area, Angles & Sides**<br>`Solve any triangle from three known values using the sine and cosine rules, with area and all remaining sides and angles.` |
| `/right-triangle-calculator/` | T | right triangle calculator | **Right Triangle Calculator: Sides, Angles & Area**<br>`Solve a right triangle from any two values, with the trigonometric ratios and the working shown.` |
| `/pythagorean-theorem-calculator/` | T | pythagorean theorem calculator | **Pythagorean Theorem Calculator: Find a Missing Side**<br>`Find the hypotenuse or either leg using a² + b² = c², with the rearranged formula and steps shown.` |
| `/volume-calculator/` | T | volume calculator | **Volume Calculator: Cube, Sphere, Cylinder & Cone**<br>`Calculate volume for ten 3D shapes, with each formula shown and results in the unit you choose.` |
| `/surface-area-calculator/` | T | surface area calculator | **Surface Area Calculator for 3D Shapes**<br>`Calculate total and lateral surface area for spheres, cylinders, cones, prisms and pyramids.` |
| `/slope-calculator/` | T | slope calculator | **Slope Calculator: Gradient & Line Equation**<br>`Find the slope between two points, plus the line equation, distance, midpoint and angle of incline.` |

## Algebra, bases and education

| URL | Int | Primary keyword | Title · Meta |
|---|---|---|---|
| `/quadratic-formula-calculator/` | T | quadratic formula calculator | **Quadratic Formula Calculator with Steps**<br>`Solve any quadratic equation, including complex roots, with the discriminant explained and every step shown.` |
| `/binary-calculator/` | T | binary calculator | **Binary Calculator & Base Converter**<br>`Add, subtract, multiply and divide in binary, and convert between binary, decimal, octal and hex.` |
| `/hex-calculator/` | T | hex calculator | **Hex Calculator: Hexadecimal Math & Conversion**<br>`Do arithmetic in hexadecimal and convert between hex, decimal and binary — useful for colour codes and memory addresses.` |
| `/gpa-calculator/` | T | gpa calculator | **GPA Calculator: Weighted & Unweighted**<br>`Calculate semester and cumulative GPA on a 4.0 scale, with credit hours weighted and AP or honours courses handled.` |

---

# C/D.5 — Date & Time cluster (8 tools)

### `/age-calculator/` — has metadata + article ✅ · cluster flagship
Primary: `age calculator` · Intent: T
Strongest existing page. Keep as the hub's anchor and link out from it generously.

### `/date-calculator/` — has metadata + article ✅
Primary: `date calculator` · Intent: T
Absorbs `date-difference-calculator` per §H. Add an H2 for "days between two dates" and one for
"add or subtract days from a date" — two distinct intents on one page.

| URL | Int | Primary keyword | Title · Meta |
|---|---|---|---|
| `/days-until-calculator/` | T | days until calculator | **Days Until Calculator: Countdown to Any Date**<br>`Count the days until a birthday, holiday, exam or deadline, with weeks and months shown alongside.` |
| `/day-of-the-week-calculator/` | I | what day of the week was | **Day of the Week Calculator: Any Date in History**<br>`Find the weekday for any date, past or future, using the Gregorian calendar rules including leap years.` |
| `/time-duration-calculator/` | T | time duration calculator | **Time Duration Calculator: Hours Between Times**<br>`Work out the time between two clock times, across midnight if needed, in hours, minutes and decimal hours.` |
| `/hours-and-minutes-calculator/` | T | hours and minutes calculator | **Hours & Minutes Calculator: Add and Subtract Time**<br>`Add and subtract hours and minutes, and convert between clock time and decimal hours for timesheets.` |
| `/time-card-calculator/` | T | time card calculator | **Time Card Calculator: Weekly Hours & Overtime**<br>`Total a week of clock-in and clock-out times, deduct breaks and split regular from overtime hours.` |
| `/chronological-age-calculator/` | T | chronological age calculator | **Chronological Age Calculator for School & Testing**<br>`Calculate exact age in years, months and days on a specific test date — the format required for school assessments.` |

---

# C/D.6 — Auto & Vehicle cluster (5 tools)

| URL | Int | Primary keyword | Title · Meta |
|---|---|---|---|
| `/gas-mileage-calculator/` | T | gas mileage calculator | **Gas Mileage Calculator: MPG and L/100km**<br>`Work out real fuel economy from your odometer and fill-up, in MPG (US or UK) or litres per 100km.` |
| `/fuel-cost-calculator/` | T | fuel cost calculator | **Fuel Cost Calculator: Trip and Journey Cost**<br>`Estimate what a journey costs in fuel from distance, economy and price per litre or gallon, split between passengers if you like.` |
| `/tire-size-calculator/` | T | tire size calculator | **Tire Size Calculator: Compare and Check Speedometer**<br>`Compare two tyre sizes and see the difference in diameter, sidewall height and the speedometer error a change introduces.` |
| `/horsepower-calculator/` | T | horsepower calculator | **Horsepower Calculator: From Torque or Trap Speed**<br>`Calculate horsepower from torque and RPM, or estimate it from quarter-mile trap speed and vehicle weight.` |
| `/roman-numeral-converter/` | T | roman numeral converter | **Roman Numeral Converter: Both Directions**<br>`Convert Roman numerals to numbers and back, with the subtractive rules applied correctly.` |

> `engine-horsepower-calculator` → 301 to `/horsepower-calculator/` (§H); trap speed becomes a mode.
> `roman-numeral-converter` sits here only because it has no better home — it is P3 and unclustered
> in practice.

---

# C/D.7 — Science & Engineering cluster (10 tools)

| URL | Int | Primary keyword | Title · Meta |
|---|---|---|---|
| `/speed-distance-time-calculator/` | T | speed distance time calculator | **Speed, Distance & Time Calculator**<br>`Solve for speed, distance or time from the other two, in any combination of metric and imperial units.` |
| `/density-mass-volume-calculator/` | T | density calculator | **Density, Mass & Volume Calculator**<br>`Solve the density triangle for any missing value, with a reference table of common material densities.` |
| `/force-calculator/` | T | force calculator | **Force Calculator: Newton's Second Law (F = ma)**<br>`Calculate force, mass or acceleration from the other two, with unit handling for newtons, kg and m/s².` |
| `/ohms-law-calculator/` | T | ohms law calculator | **Ohm's Law Calculator: Voltage, Current, Resistance**<br>`Solve for V, I, R or P from any two known values, with the full Ohm's law and power wheel explained.` |
| `/voltage-drop-calculator/` | T | voltage drop calculator | **Voltage Drop Calculator: Wire Size & Distance**<br>`Calculate voltage drop over a cable run and check whether your conductor size stays within the 3% guideline.` |
| `/electricity-calculator/` | T | electricity cost calculator | **Electricity Cost Calculator: Appliance Running Cost**<br>`Work out what an appliance costs to run per day, month and year from its wattage and your tariff.` |
| `/ip-subnet-calculator/` | T | subnet calculator | **Subnet Calculator: CIDR, Mask & Host Range**<br>`Calculate network address, broadcast, usable host range and mask from any IPv4 address and CIDR prefix.` |
| `/bandwidth-calculator/` | T | download time calculator | **Bandwidth Calculator: Download Time Estimate**<br>`Estimate how long a file takes to download at a given connection speed, with bits and bytes kept straight.` |
| `/base64-encode-decode/` | T | base64 encoder decoder | **Base64 Encoder and Decoder**<br>`Encode text to Base64 or decode it back, entirely in your browser — nothing is uploaded.` |
| `/url-encode-decode/` | T | url encoder decoder | **URL Encoder and Decoder: Percent Encoding**<br>`Percent-encode text for safe use in URLs, or decode an encoded string back to readable text.` |

> The last four are P3. They compete against entrenched developer utilities. The one genuine
> advantage worth stating on-page: encoding runs locally and nothing is transmitted — a real
> differentiator for anyone pasting sensitive strings.

---

# C/D.8 — Construction & DIY cluster (9 tools)

| URL | Int | Primary keyword | Title · Meta |
|---|---|---|---|
| `/square-footage-calculator/` | T | square footage calculator | **Square Footage Calculator: Rooms and Flooring**<br>`Measure square footage for rooms of any shape, add a waste allowance and get the material quantity to order.` |
| `/concrete-calculator/` | T | concrete calculator | **Concrete Calculator: Slabs, Footings & Bags**<br>`Work out cubic yards or metres of concrete for slabs, footings and columns, and how many bags that means.` |
| `/paint-calculator/` | T | paint calculator | **Paint Calculator: How Much Paint You Need**<br>`Calculate litres or gallons for a room, with doors and windows deducted and coats and coverage rate factored in.` |
| `/tile-calculator/` | T | tile calculator | **Tile Calculator: Tiles, Boxes & Grout Needed**<br>`Find how many tiles and boxes a floor or wall needs, including cut waste and grout quantity.` |
| `/roofing-calculator/` | T | roofing calculator | **Roofing Calculator: Squares and Shingle Bundles**<br>`Calculate roof area in squares from footprint and pitch, and the bundles of shingles required.` |
| `/stair-calculator/` | T | stair calculator | **Stair Calculator: Rise, Run & Stringer Layout**<br>`Work out riser height, tread depth and stringer length for a staircase that meets standard building code limits.` |
| `/gravel-and-mulch-calculator/` | T | gravel calculator | **Gravel, Mulch & Soil Calculator: Volume and Weight**<br>`Calculate cubic yards and tonnage of gravel, mulch or topsoil for a given area and depth.` |
| `/wallpaper-calculator/` | T | wallpaper calculator | **Wallpaper Calculator: Rolls Needed**<br>`Find how many rolls a room needs, with pattern repeat and drop matching accounted for.` |
| `/btu-calculator/` | T | btu calculator | **BTU Calculator: Air Conditioner Sizing**<br>`Size an air conditioner or heater in BTUs for a room, adjusted for ceiling height, sunlight and occupancy.` |

> Reassigned from "everyday" — BTU sizing is a building/HVAC task, not an automotive one.

---

# C/D.9 — Unit Converters (6 tools + hub)

Hub is `/unit-converter/` itself (§H). The six below are the spokes.

| URL | Int | Primary keyword | Title · Meta |
|---|---|---|---|
| `/temperature-converter/` | T | celsius to fahrenheit | **Temperature Converter: Celsius, Fahrenheit, Kelvin**<br>`Convert between Celsius, Fahrenheit and Kelvin, with the conversion formula shown alongside the answer.` |
| `/length-converter/` | T | length converter | **Length Converter: Metres, Feet, Inches & Miles**<br>`Convert length and distance across metric and imperial units, with exact factors and no rounding drift.` |
| `/weight-converter/` | T | kg to lbs converter | **Weight Converter: Kilograms, Pounds, Stone & Ounces**<br>`Convert weight and mass between metric and imperial, including stone for UK body weight.` |
| `/speed-converter/` | T | speed converter | **Speed Converter: mph, km/h, m/s & Knots**<br>`Convert speed between mph, km/h, metres per second, knots and Mach.` |
| `/area-converter/` | T | area converter | **Area Converter: Square Feet, Metres, Acres & Hectares**<br>`Convert area between square metres, square feet, acres, hectares and regional land units.` |
| `/data-storage-converter/` | T | data storage converter | **Data Storage Converter: MB, GB, TB & Binary Units**<br>`Convert between bytes, KB, MB, GB and TB, with the decimal and binary (KiB, MiB) definitions kept separate.` |

> `temperature-converter` is the highest-demand page in this cluster — "celsius to fahrenheit" is a
> very large query. Give it a conversion table for common values; that is what the SERP rewards.

---

# C/D.10 — Cooking cluster (4 tools)

| URL | Int | Primary keyword | Title · Meta |
|---|---|---|---|
| `/baking-conversion-calculator/` | T | cups to grams | **Cups to Grams Converter for Baking Ingredients**<br>`Convert cups to grams by ingredient — flour, sugar and butter all weigh differently, so a single factor gets it wrong.` |
| `/recipe-converter/` | T | recipe scaler | **Recipe Converter: Scale Servings Up or Down**<br>`Scale any recipe to the number of servings you need, with quantities converted to sensible measurements.` |
| `/cooking-time-calculator/` | T | roasting time calculator | **Meat Roasting Calculator: Time and Temperature**<br>`Work out roasting time and oven temperature by weight and cut, with safe internal temperatures listed.` |
| `/coffee-water-ratio-calculator/` | T | coffee to water ratio | **Coffee to Water Ratio Calculator**<br>`Get the coffee and water amounts for your brew method and strength, in grams and millilitres.` |

---

# C/D.11 — Unclustered (1 tool)

| URL | Int | Primary keyword | Title · Meta |
|---|---|---|---|
| `/password-generator/` | T | password generator | **Password Generator: Strong Random Passwords**<br>`Generate strong random passwords in your browser and check strength. Nothing is sent anywhere — the password never leaves your device.` |

> P3. Competes against password managers with far stronger authority. The only honest advantage is
> local generation, which the description leads with. No cluster should be built around it.

---

# Redirect schedule (§H consolidations)

Implement before or alongside hub launch. Each source is currently in `sitemap.xml` and must be
removed from it when the redirect ships.

| From | To | Reason |
|---|---|---|
| `/date-difference-calculator/` | `/date-calculator/` | Identical component output; no intent split |
| `/overweight-calculator/` | `/bmi-calculator/` | Same question, weaker page |
| `/healthy-weight-calculator/` | `/ideal-weight-calculator/` | Same question, weaker page |
| `/engine-horsepower-calculator/` | `/horsepower-calculator/` | Method difference, not intent difference |

After redirects: **146 indexable calculators**, 9 hubs (one of which is the promoted
`/unit-converter/`), homepage and 5 informational pages.

Absorb each redirected page's query targets as an H2 on the destination:

| Destination | H2 to add |
|---|---|
| `/date-calculator/` | "Difference between two dates" |
| `/bmi-calculator/` | "What counts as overweight?" |
| `/ideal-weight-calculator/` | "Healthy weight range for your height" |
| `/horsepower-calculator/` | "Estimating horsepower from trap speed" |

---

# Informational pages (5)

| URL | Schema | Title · Meta |
|---|---|---|
| `/about/` | AboutPage | **About Calculator11**<br>`Who builds these calculators, how the formulas are chosen and verified, and why everything runs in your browser rather than on a server.` |
| `/contact/` | ContactPage | **Contact Calculator11**<br>`Report an error in a calculation, suggest a tool or ask a question. Corrections are the fastest way to improve the site.` |
| `/privacy/` | WebPage | **Privacy Policy**<br>`What Calculator11 does and does not collect. Calculations run locally in your browser and the values you enter are never transmitted.` |
| `/terms/` | WebPage | **Terms of Service**<br>`The terms covering use of Calculator11's calculators and content, including limits on reliance for financial or medical decisions.` |
| `/disclaimer/` | WebPage | **Disclaimer**<br>`Calculator11's tools provide estimates for general information. They are not financial, medical, legal or engineering advice.` |

> The About page carries real E-E-A-T weight and is currently generic. It should state plainly: which
> published standard each health calculator implements, that calculations are client-side, how
> corrections are handled, and who maintains the site. Concrete, verifiable statements beat claimed
> authority.

---

## Final quality-control checklist (§25)

Run before any page ships.

- [ ] Title unique across the site, ≤ 60 chars, primary keyword present naturally
- [ ] Meta description unique, 140–158 chars, describes the actual page
- [ ] Exactly one H1, matching the page's primary intent
- [ ] Heading hierarchy is H1 → H2 → H3 with no skipped levels
- [ ] Formula and variable definitions visible on-page where a formula exists
- [ ] At least one worked example with real numbers
- [ ] FAQs answer genuinely distinct questions — no rephrasing of the same point
- [ ] Links up to its hub, sideways to 3–6 siblings, with varied descriptive anchors
- [ ] Schema matches visible content only; no FAQPage without visible FAQs
- [ ] No fabricated ratings, authors, credentials or statistics
- [ ] YMYL pages: source standard named, limitations stated, disclaimer present
- [ ] Regional pages: "rates current as of" date present and accurate
- [ ] Page has a clear reason to exist that no other page duplicates (§H)
