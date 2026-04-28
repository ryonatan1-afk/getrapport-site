// ── Scroll-reveal observer (declared first — used by FAQ render below) ──────
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        revealObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
)

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el))

// ── FAQ data ────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'Is Rapport just for sales reps?',
    a: "No — Rapport is for anyone on a GTM team who manages existing relationships. Account executives, account managers, and customer success managers are all active users. If your work involves staying genuinely connected to people already in your CRM — whether that's for expansion, renewals, retention, or re-engagement — Rapport is built for you. The only scope that's out of bounds is cold prospecting. Rapport is for relationships you already have.",
  },
  {
    q: 'Which CRMs does Rapport support?',
    a: "HubSpot is currently supported. Salesforce and CSV import are on the roadmap. If your team uses a different CRM, reach out — we'd love to hear from you.",
  },
  {
    q: 'How does Rapport know which holidays are relevant to my contacts?',
    a: "Rapport uses the country field on each CRM contact record to match national, religious, and cultural holidays. Coverage spans 50+ countries using two complementary holiday data sources. If a contact doesn't have a country set, Rapport flags it so you can fill it in.",
  },
  {
    q: 'Will Rapport send emails on my behalf without me knowing?',
    a: "Never. Rapport generates draft messages and delivers them in your weekly digest. When you click 'Open draft', your own email client opens with the message ready — you review and hit send. You are always the sender.",
  },
  {
    q: 'What does the weekly digest look like?',
    a: 'A clean email delivered Monday morning at 7 am your local time. Each contact with an upcoming holiday gets a card showing the holiday name, date, and the first line of your personalised greeting, plus a button that opens a pre-filled draft in your mail client.',
  },
  {
    q: 'Is my CRM data safe?',
    a: 'Rapport syncs contact names, companies, email addresses, and countries over an encrypted connection using read-only OAuth tokens — we can never write to your CRM. Contact data is only used to generate greetings and is never shared with or sold to third parties.',
  },
  {
    q: 'What counts as an active contact?',
    a: 'Any HubSpot contact with CRM activity — a call, email, meeting, note, or deal update — in the last 12 months. For AEs and AMs this typically means open or recently closed accounts. For CSMs, it\'s your active book of business. This filter keeps your digest focused on relationships worth warming, not stale records.',
  },
  {
    q: 'How much does Rapport cost?',
    a: 'Rapport is free during early access. Pricing will be introduced as more features are added — early adopters will always get credit for getting in first.',
  },
]

// ── Render FAQ ──────────────────────────────────────────────────────────────
const faqList = document.getElementById('faq-list')
faqs.forEach((item, i) => {
  const el = document.createElement('div')
  el.className = 'reveal border border-slate-200 rounded-xl overflow-hidden bg-white'
  el.setAttribute('role', 'listitem')
  el.innerHTML = `
    <button
      class="faq-btn w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
      aria-expanded="false"
      aria-controls="faq-body-${i}"
      id="faq-btn-${i}">
      <span class="text-sm font-semibold text-slate-900">${item.q}</span>
      <svg class="plus-icon flex-shrink-0 text-slate-400" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <path d="M7.5 1.5v12M1.5 7.5h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
    <div class="faq-body" id="faq-body-${i}" role="region" aria-labelledby="faq-btn-${i}">
      <p class="text-sm text-slate-500 leading-relaxed px-5 pb-5 pt-1">${item.a}</p>
    </div>`
  faqList.appendChild(el)
  revealObserver.observe(el)
})

// ── FAQ accordion toggle ────────────────────────────────────────────────────
document.addEventListener('click', e => {
  const btn = e.target.closest('.faq-btn')
  if (!btn) return
  const body = btn.nextElementSibling
  const icon = btn.querySelector('.plus-icon')
  const isOpen = body.classList.contains('open')
  document.querySelectorAll('.faq-body').forEach(b => b.classList.remove('open'))
  document.querySelectorAll('.plus-icon').forEach(ic => ic.classList.remove('open'))
  document.querySelectorAll('.faq-btn').forEach(b => b.setAttribute('aria-expanded', 'false'))
  if (!isOpen) {
    body.classList.add('open')
    icon.classList.add('open')
    btn.setAttribute('aria-expanded', 'true')
  }
})

// ── Stat count-up ───────────────────────────────────────────────────────────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function countUp(el, target, duration = 1400) {
  if (prefersReducedMotion) { el.textContent = target; return }
  const start = performance.now()
  const tick = now => {
    const p = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    el.textContent = Math.round(eased * target)
    if (p < 1) requestAnimationFrame(tick)
    else el.textContent = target
  }
  requestAnimationFrame(tick)
}

const statsCard = document.getElementById('stats-card')
let countStarted = false
const statsObserver = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting && !countStarted) {
      countStarted = true
      document.querySelectorAll('.count-up').forEach(el => {
        countUp(el, parseInt(el.dataset.target, 10))
      })
      statsObserver.disconnect()
    }
  },
  { threshold: 0.4 },
)
statsObserver.observe(statsCard)
