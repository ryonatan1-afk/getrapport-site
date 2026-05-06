import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const holidays = JSON.parse(readFileSync(join(root, 'data/holidays.json'), 'utf8'));
const SITE_URL = 'https://getrapport.app';
const today = new Date().toISOString().split('T')[0];

const staticPages = [
  { url: '/',           priority: '1.0', changefreq: 'monthly' },
  { url: '/greetings/', priority: '0.9', changefreq: 'monthly' },
];

const holidayPages = holidays.map(h => ({
  url:        `/greetings/${h.slug}/`,
  priority:   '0.8',
  changefreq: 'yearly',
}));

const allPages = [...staticPages, ...holidayPages];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(p => `  <url>
    <loc>${SITE_URL}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

writeFileSync(join(root, 'public/sitemap.xml'), xml, 'utf8');
console.log(`✅  Sitemap written with ${allPages.length} URLs → public/sitemap.xml`);
