import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculatorsFilePath = path.resolve(__dirname, '../src/data/calculators.ts');
const calculatorsContent = fs.readFileSync(calculatorsFilePath, 'utf-8');

// Regex match all slugs in CALCULATORS_REGISTRY
const slugMatches = [...calculatorsContent.matchAll(/slug:\s*'([a-z0-9-]+)'/g)];
const uniqueSlugs = Array.from(new Set(slugMatches.map(m => m[1])));

// Absolute origin for sitemap entries, including any subdirectory the site is
// served from. Must match VITE_SITE_URL used for canonicals, or Google will see
// a sitemap listing URLs that differ from the pages' own canonical tags.
//   GitHub Pages : SITE_URL=https://atulscript.github.io/calculator
//   Production   : SITE_URL=https://calculator360.com
const BASE_URL = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://calculator360.com').replace(/\/$/, '');
const currentDate = new Date().toISOString().split('T')[0];

const flagships = [
  'mortgage-calculator',
  'loan-calculator',
  'emi-calculator',
  'sip-calculator',
  'compound-interest-calculator',
  'bmi-calculator',
  'calorie-calculator',
  'age-calculator',
  'percentage-calculator',
  'date-calculator',
  'scientific-calculator',
  'unit-converter'
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Home page
xml += `  <url>\n`;
xml += `    <loc>${BASE_URL}/</loc>\n`;
xml += `    <lastmod>${currentDate}</lastmod>\n`;
xml += `    <changefreq>daily</changefreq>\n`;
xml += `    <priority>1.0</priority>\n`;
xml += `  </url>\n`;

// Legal & Core Platform Pages
const staticPages = ['about', 'contact', 'privacy', 'terms', 'disclaimer'];
for (const p of staticPages) {
  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}/${p}</loc>\n`;
  xml += `    <lastmod>${currentDate}</lastmod>\n`;
  xml += `    <changefreq>monthly</changefreq>\n`;
  xml += `    <priority>0.5</priority>\n`;
  xml += `  </url>\n`;
}

// Category hubs. Parsed from categoryHubs.ts rather than hardcoded so a new hub
// cannot be added to the site and silently left out of the sitemap.
const hubsFilePath = path.resolve(__dirname, '../src/data/categoryHubs.ts');
const hubsContent = fs.readFileSync(hubsFilePath, 'utf-8');
const hubSlugs = Array.from(
  new Set([...hubsContent.matchAll(/^\s{4}slug:\s*'([a-z0-9-]+)',/gm)].map(m => m[1]))
).filter(s => !uniqueSlugs.includes(s)); // /unit-converter is already a calculator URL

for (const slug of hubSlugs) {
  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}/${slug}</loc>\n`;
  xml += `    <lastmod>${currentDate}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>0.9</priority>\n`;
  xml += `  </url>\n`;
}

// Pages that canonical to a different URL must not be submitted for indexing.
// These are pending 301s — see docs/seo-master-plan.md section H.
const canonicalisedAway = [
  'date-difference-calculator',
  'overweight-calculator',
  'healthy-weight-calculator',
  'engine-horsepower-calculator'
];

for (const slug of uniqueSlugs) {
  if (canonicalisedAway.includes(slug)) continue;
  const isFlagship = flagships.includes(slug);
  const priority = isFlagship ? '0.9' : '0.8';
  const changefreq = isFlagship ? 'weekly' : 'monthly';

  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}/${slug}</loc>\n`;
  xml += `    <lastmod>${currentDate}</lastmod>\n`;
  xml += `    <changefreq>${changefreq}</changefreq>\n`;
  xml += `    <priority>${priority}</priority>\n`;
  xml += `  </url>\n`;
}

xml += `</urlset>\n`;

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf-8');

// robots.txt is generated here so its Sitemap line always matches BASE_URL.
const robots = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
fs.writeFileSync(path.resolve(__dirname, '../public/robots.txt'), robots, 'utf-8');

const indexableCalcs = uniqueSlugs.length - canonicalisedAway.length;
const total = 1 + staticPages.length + hubSlugs.length + indexableCalcs;
console.log(
  `Generated sitemap.xml — ${total} URLs ` +
    `(${indexableCalcs} calculators, ${hubSlugs.length} hubs, ${staticPages.length} static; ` +
    `${canonicalisedAway.length} excluded as canonicalised) at: ${outputPath}`
);
