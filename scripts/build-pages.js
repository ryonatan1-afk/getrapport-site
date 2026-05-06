import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const holidays  = JSON.parse(readFileSync(join(root, 'data/holidays.json'),  'utf8'));
const greetings = JSON.parse(readFileSync(join(root, 'data/greetings.json'), 'utf8'));

const SETUP_URL = 'https://app.getrapport.app/setup';
const SITE_URL  = 'https://getrapport.app';
const GA_ID     = 'G-Y63NRYWTGT';

function badgeClass(type) {
  if (type === 'Formal') return 'badge-formal';
  if (type === 'Warm')   return 'badge-warm';
  return 'badge-brief';
}

function copyIcon() {
  return `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M8 4V2.5A1.5 1.5 0 0 0 6.5 1h-4A1.5 1.5 0 0 0 1 2.5v4A1.5 1.5 0 0 0 2.5 8H4" stroke="currentColor" stroke-width="1.3"/></svg>`;
}

function logoSvg() {
  return `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true"><rect width="30" height="30" rx="8" fill="#0369A1"/><path d="M8 8h6.5a4.5 4.5 0 0 1 0 9H8V8z" fill="white"/><path d="M14.5 17l5.5 5.5" stroke="white" stroke-width="2.5" stroke-linecap="round"/></svg>`;
}

function arrowRight() {
  return `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M3 7.5h9M8.5 3.5l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

function chevronLeft() {
  return `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M9 11L5 7l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

function getRelated(currentSlug) {
  return holidays
    .filter(h => h.slug !== currentSlug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);
}

function buildPage(holiday, content) {
  const related = getRelated(holiday.slug);
  const canonicalUrl = `${SITE_URL}/greetings/${holiday.slug}/`;

  const relatedCards = related.map(r => `
    <a href="/greetings/${r.slug}/" class="related-card" aria-label="${r.name} greetings">
      <span class="related-emoji" aria-hidden="true">${r.emoji}</span>
      <span class="related-name">${r.name}</span>
      <span class="related-date">${r.date_2026}</span>
    </a>`).join('');

  const greetingCards = content.greetings.map((g, i) => `
    <article class="greeting-card reveal reveal-d${(i % 3) + 1}" aria-label="${g.type} greeting">
      <header class="greeting-header">
        <span class="greeting-badge ${badgeClass(g.type)}" aria-label="Greeting type: ${g.type}">${g.type}</span>
        <button class="copy-btn" aria-label="Copy this greeting to clipboard" type="button">
          ${copyIcon()} Copy
        </button>
      </header>
      <p class="greeting-text">${g.text}</p>
    </article>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.seo_title} | Rapport</title>
  <meta name="description" content="${content.meta_description}">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Open Graph -->
  <meta property="og:title" content="${content.seo_title}">
  <meta property="og:description" content="${content.meta_description}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:site_name" content="Rapport">

  <!-- Schema.org -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${content.seo_title}",
    "description": "${content.meta_description}",
    "url": "${canonicalUrl}",
    "publisher": {
      "@type": "Organization",
      "name": "Rapport",
      "url": "${SITE_URL}"
    }
  }
  </script>

  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');</script>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Styles -->
  <link rel="stylesheet" href="/greetings/style.css">
</head>
<body>

<!-- NAV -->
<nav class="site-nav" role="navigation" aria-label="Main">
  <div class="nav-inner">
    <a href="${SITE_URL}" class="nav-logo" aria-label="Rapport home">
      ${logoSvg()}
      <span>Rapport</span>
    </a>
    <div class="nav-right">
      <a href="${SITE_URL}/greetings/" class="nav-back">
        ${chevronLeft()} All holidays
      </a>
      <a href="${SETUP_URL}" class="btn-primary" data-track="greeting_nav_cta">
        Install free ${arrowRight()}
      </a>
    </div>
  </div>
</nav>

<!-- BREADCRUMB -->
<nav aria-label="Breadcrumb">
  <div class="breadcrumb">
    <a href="${SITE_URL}">Home</a>
    <span class="breadcrumb-sep" aria-hidden="true">›</span>
    <a href="${SITE_URL}/greetings/">Holiday Greetings</a>
    <span class="breadcrumb-sep" aria-hidden="true">›</span>
    <span aria-current="page">${holiday.name}</span>
  </div>
</nav>

<!-- HERO -->
<header class="page-hero" aria-labelledby="page-title">
  <div class="hero-inner">
    <span class="reveal holiday-emoji" role="img" aria-label="${holiday.name} emoji">${holiday.emoji}</span>
    <span class="reveal reveal-d1 holiday-category">${holiday.category}</span>
    <h1 id="page-title" class="reveal reveal-d1 hero-title">${holiday.name}</h1>
    <div class="reveal reveal-d2 hero-date">
      <span class="hero-date-dot" aria-hidden="true"></span>
      <time>${holiday.date_2026}</time>
      ${holiday.date_note ? `<span style="color:#CBD5E1;margin:0 .1rem" aria-hidden="true">·</span><span style="color:#94A3B8;font-weight:500">${holiday.date_note}</span>` : ''}
    </div>
    <p class="reveal reveal-d3 hero-subtitle">${content.meta_description}</p>
  </div>
</header>

<!-- CULTURAL CONTEXT -->
<section class="section" aria-labelledby="context-heading">
  <div class="section-inner-narrow">
    <p class="reveal section-label">About this holiday</p>
    <h2 id="context-heading" class="reveal section-title">What is ${holiday.name}?</h2>
    <div class="reveal context-card">
      <p>${content.cultural_context}</p>
    </div>
  </div>
</section>

<!-- GREETINGS -->
<section class="section section-alt" aria-labelledby="greetings-heading">
  <div class="section-inner">
    <p class="reveal section-label">Ready-to-send messages</p>
    <h2 id="greetings-heading" class="reveal section-title">8 ${holiday.name} Business Greetings</h2>
    <p class="reveal" style="color:#64748B;margin-bottom:2rem;line-height:1.7">Click <strong>Copy</strong> on any card to copy the message to your clipboard — then paste it into your email, tweak if needed, and send.</p>
    <div class="greetings-grid" role="list" aria-label="${holiday.name} greeting examples">
      ${greetingCards}
    </div>
  </div>
</section>

<!-- HOW RAPPORT HELPS -->
<section class="section" aria-labelledby="rapport-heading">
  <div class="section-inner-narrow">
    <p class="reveal section-label">Powered by Rapport</p>
    <h2 id="rapport-heading" class="reveal section-title">Never miss a moment to reach out</h2>
    <p class="reveal" style="color:#64748B;line-height:1.75;margin-bottom:2rem">These greetings are great — but finding the right contacts at the right time is the hard part. Rapport monitors your HubSpot contacts' upcoming holidays and delivers personalised AI-written greeting drafts every Monday morning.</p>
    <div class="reveal hiw-callout">
      <div class="hiw-icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1.5v3M9 13.5v3M1.5 9h3M13.5 9h3M3.7 3.7l2.1 2.1M12.2 12.2l2.1 2.1M3.7 14.3l2.1-2.1M12.2 5.8l2.1-2.1" stroke="#0369A1" stroke-width="1.4" stroke-linecap="round"/><circle cx="9" cy="9" r="2.5" stroke="#0369A1" stroke-width="1.4"/></svg>
      </div>
      <div>
        <h3>Rapport does the research. You send the greeting.</h3>
        <p>Every Sunday night, Rapport scans a 14-day window of holidays across your contacts' countries. Monday morning you get a digest with pre-written greetings for each relevant contact — one click opens a pre-filled email draft. You review and send from your own address.</p>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section" aria-labelledby="cta-heading">
  <div class="cta-inner reveal">
    <span class="cta-eyebrow">Relationship intelligence for GTM teams</span>
    <h2 id="cta-heading" class="cta-title">
      Know when to reach out.<br>
      <span>Know what to say.</span>
    </h2>
    <p class="cta-subtitle">Rapport monitors your CRM contacts' upcoming holidays and delivers personalised greeting drafts every Monday morning. Connect HubSpot in 2 minutes — free to start.</p>
    <a href="${SETUP_URL}" class="cta-btn" data-track="greeting_bottom_cta">
      Install Rapport for HubSpot ${arrowRight()}
    </a>
    <div class="cta-features" role="list">
      <span class="cta-feature" role="listitem"><span class="cta-feature-dot" aria-hidden="true"></span>Free to start</span>
      <span class="cta-feature" role="listitem"><span class="cta-feature-dot" aria-hidden="true"></span>2-minute setup</span>
      <span class="cta-feature" role="listitem"><span class="cta-feature-dot" aria-hidden="true"></span>Works with HubSpot</span>
      <span class="cta-feature" role="listitem"><span class="cta-feature-dot" aria-hidden="true"></span>AI-personalised, not templated</span>
    </div>
  </div>
</section>

<!-- RELATED HOLIDAYS -->
<section class="section" aria-labelledby="related-heading">
  <div class="section-inner">
    <p class="reveal section-label">Holiday greetings library</p>
    <h2 id="related-heading" class="reveal section-title">More holiday greetings</h2>
    <div class="related-grid reveal" role="list" aria-label="Other holiday greetings">
      ${relatedCards}
    </div>
    <div style="text-align:center;margin-top:2rem" class="reveal">
      <a href="${SITE_URL}/greetings/" class="btn-primary" style="display:inline-flex" data-track="greeting_browse_all">
        Browse all holiday greetings ${arrowRight()}
      </a>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="site-footer" role="contentinfo">
  <div class="footer-inner">
    <a href="${SITE_URL}" class="nav-logo" aria-label="Rapport home">
      <svg width="24" height="24" viewBox="0 0 30 30" fill="none" aria-hidden="true"><rect width="30" height="30" rx="8" fill="#0369A1"/><path d="M8 8h6.5a4.5 4.5 0 0 1 0 9H8V8z" fill="white"/><path d="M14.5 17l5.5 5.5" stroke="white" stroke-width="2.5" stroke-linecap="round"/></svg>
      <span>Rapport</span>
    </a>
    <span class="footer-copy">© ${new Date().getFullYear()} Rapport. All rights reserved.</span>
    <nav class="footer-links" aria-label="Footer">
      <a href="mailto:hello@getrapport.app">Contact</a>
      <a href="${SITE_URL}/privacy.html">Privacy</a>
      <a href="${SITE_URL}/terms.html">Terms</a>
    </nav>
  </div>
</footer>

<script src="/greetings/script.js" defer></script>
</body>
</html>`;
}

function buildIndex() {
  const MONTH_ORDER = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const MONTH_COLORS = {
    January:   { bg: '#EFF6FF', color: '#1D4ED8', badge: '#3B82F6' },
    February:  { bg: '#EFF6FF', color: '#1D4ED8', badge: '#3B82F6' },
    March:     { bg: '#F0FDF4', color: '#15803D', badge: '#22C55E' },
    April:     { bg: '#F0FDF4', color: '#15803D', badge: '#22C55E' },
    May:       { bg: '#F0FDF4', color: '#15803D', badge: '#22C55E' },
    June:      { bg: '#FFFBEB', color: '#92400E', badge: '#F59E0B' },
    July:      { bg: '#FFFBEB', color: '#92400E', badge: '#F59E0B' },
    August:    { bg: '#FFFBEB', color: '#92400E', badge: '#F59E0B' },
    September: { bg: '#FAF5FF', color: '#6B21A8', badge: '#A855F7' },
    October:   { bg: '#FAF5FF', color: '#6B21A8', badge: '#A855F7' },
    November:  { bg: '#FFF1F2', color: '#9F1239', badge: '#F43F5E' },
    December:  { bg: '#FFF1F2', color: '#9F1239', badge: '#F43F5E' },
  };

  // Group by month, sort within each month by day number
  const byMonth = {};
  for (const h of holidays) {
    const month = h.date_2026.split(' ')[0];
    if (!byMonth[month]) byMonth[month] = [];
    byMonth[month].push(h);
  }
  for (const month of Object.keys(byMonth)) {
    byMonth[month].sort((a, b) => parseInt(a.date_2026.split(' ')[1]) - parseInt(b.date_2026.split(' ')[1]));
  }

  const monthCards = MONTH_ORDER
    .filter(m => byMonth[m])
    .map(month => {
      const items = byMonth[month];
      const c = MONTH_COLORS[month] || { bg: '#F8FAFC', color: '#475569', badge: '#94A3B8' };
      const rows = items.map(h => {
        const shortDate = h.date_2026.replace(', 2026', '');
        return `
        <a href="/greetings/${h.slug}/" class="cal-row" aria-label="${h.name} — ${shortDate}">
          <span class="cal-emoji" aria-hidden="true">${h.emoji}</span>
          <span class="cal-name">${h.name}</span>
          <span class="cal-date">${shortDate}</span>
        </a>`;
      }).join('');

      return `
      <div class="cal-month reveal">
        <div class="cal-month-header" style="background:${c.bg}">
          <span class="cal-month-name" style="color:${c.color}">${month}</span>
          <span class="cal-month-badge" style="background:${c.badge}">${items.length}</span>
        </div>
        <div class="cal-month-body">${rows}</div>
      </div>`;
    }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>2026 Holiday Business Greetings Calendar — 30 Holidays | Rapport</title>
  <meta name="description" content="Professional business greeting messages for 30 major holidays worldwide — Eid, Diwali, Lunar New Year, Hanukkah, Christmas, and more. Browse by month.">
  <link rel="canonical" href="${SITE_URL}/greetings/">
  <meta property="og:title" content="Holiday Business Greetings Calendar | Rapport">
  <meta property="og:description" content="Professional business greeting messages for 30 major holidays worldwide. Browse by month.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${SITE_URL}/greetings/">

  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');</script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/greetings/style.css">
</head>
<body>

<nav class="site-nav" role="navigation" aria-label="Main">
  <div class="nav-inner">
    <a href="${SITE_URL}" class="nav-logo" aria-label="Rapport home">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true"><rect width="30" height="30" rx="8" fill="#0369A1"/><path d="M8 8h6.5a4.5 4.5 0 0 1 0 9H8V8z" fill="white"/><path d="M14.5 17l5.5 5.5" stroke="white" stroke-width="2.5" stroke-linecap="round"/></svg>
      <span>Rapport</span>
    </a>
    <div class="nav-right">
      <a href="${SETUP_URL}" class="btn-primary" data-track="greetings_index_cta">
        Install free
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M3 7.5h9M8.5 3.5l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
    </div>
  </div>
</nav>

<header class="page-hero" style="padding-bottom:3rem" aria-labelledby="index-title">
  <div class="hero-inner">
    <span class="reveal reveal-d1 holiday-category">30 holidays · worldwide</span>
    <h1 id="index-title" class="reveal reveal-d1 hero-title">2026 Holiday Greetings Calendar</h1>
    <p class="reveal reveal-d2 hero-subtitle">Every major cultural, religious, and national holiday — with professional greeting messages ready to send. Browse by month.</p>
  </div>
</header>

<section class="section" style="padding-top:1.5rem" aria-labelledby="cal-heading">
  <div class="section-inner">
    <h2 id="cal-heading" class="reveal section-title" style="margin-bottom:1.5rem">Browse by month</h2>
    <div class="cal-grid">
      ${monthCards}
    </div>
  </div>
</section>

<section class="cta-section" aria-labelledby="index-cta-heading">
  <div class="cta-inner reveal">
    <span class="cta-eyebrow">Automate the timing. Keep the warmth.</span>
    <h2 id="index-cta-heading" class="cta-title">Never miss a holiday greeting again.<br><span>Rapport tracks them for you.</span></h2>
    <p class="cta-subtitle">Rapport monitors your HubSpot contacts' upcoming holidays and delivers personalised AI-written greeting drafts every Monday morning. Free to start.</p>
    <a href="${SETUP_URL}" class="cta-btn" data-track="greetings_index_bottom_cta">
      Install Rapport for HubSpot
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M3 7.5h9M8.5 3.5l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
    <div class="cta-features" role="list">
      <span class="cta-feature" role="listitem"><span class="cta-feature-dot" aria-hidden="true"></span>Free to start</span>
      <span class="cta-feature" role="listitem"><span class="cta-feature-dot" aria-hidden="true"></span>2-minute setup</span>
      <span class="cta-feature" role="listitem"><span class="cta-feature-dot" aria-hidden="true"></span>Works with HubSpot</span>
    </div>
  </div>
</section>

<footer class="site-footer" role="contentinfo">
  <div class="footer-inner">
    <a href="${SITE_URL}" class="nav-logo" aria-label="Rapport home">
      <svg width="24" height="24" viewBox="0 0 30 30" fill="none" aria-hidden="true"><rect width="30" height="30" rx="8" fill="#0369A1"/><path d="M8 8h6.5a4.5 4.5 0 0 1 0 9H8V8z" fill="white"/><path d="M14.5 17l5.5 5.5" stroke="white" stroke-width="2.5" stroke-linecap="round"/></svg>
      <span>Rapport</span>
    </a>
    <span class="footer-copy">© ${new Date().getFullYear()} Rapport. All rights reserved.</span>
    <nav class="footer-links" aria-label="Footer">
      <a href="mailto:hello@getrapport.app">Contact</a>
      <a href="${SITE_URL}/privacy.html">Privacy</a>
      <a href="${SITE_URL}/terms.html">Terms</a>
    </nav>
  </div>
</footer>

<script src="/greetings/script.js" defer></script>
</body>
</html>`;
}

let built = 0, skipped = 0;

for (const holiday of holidays) {
  const content = greetings[holiday.slug];
  if (!content) {
    console.warn(`⚠  No greetings data for ${holiday.slug} — skipping`);
    skipped++;
    continue;
  }
  const dir = join(root, 'public/greetings', holiday.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), buildPage(holiday, content), 'utf8');
  console.log(`✓  /greetings/${holiday.slug}/`);
  built++;
}

// Index page
const indexDir = join(root, 'public/greetings');
mkdirSync(indexDir, { recursive: true });
writeFileSync(join(indexDir, 'index.html'), buildIndex(), 'utf8');
console.log(`✓  /greetings/  (index)`);

console.log(`\n✅  Built ${built} holiday pages${skipped ? `, skipped ${skipped}` : ''}.`);
