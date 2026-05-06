/**
 * Generates holiday greeting content using Claude.
 * Run: node scripts/generate-greetings.js
 * Skips holidays that already have entries in data/greetings.json.
 * Requires: ANTHROPIC_API_KEY env var.
 */
import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const holidays  = JSON.parse(readFileSync(join(root, 'data/holidays.json'),  'utf8'));
const greetings = JSON.parse(readFileSync(join(root, 'data/greetings.json'), 'utf8'));

async function generateForHoliday(holiday) {
  const prompt = `You are writing content for a B2B SaaS marketing website called Rapport, which helps sales reps send timely holiday greetings to their CRM contacts.

Generate content for the holiday: ${holiday.name} (${holiday.category}, ${holiday.date_2026})

Return a single valid JSON object with exactly these fields:
{
  "seo_title": "short title under 60 characters, e.g. '${holiday.name} Business Greetings for Clients & Colleagues'",
  "meta_description": "under 155 characters, benefit-focused, mentions professional or business context",
  "cultural_context": "2-3 sentences of factual, respectful cultural context about this holiday — what it is, who celebrates it, what it means",
  "greetings": [
    { "type": "Formal", "text": "..." },
    { "type": "Formal", "text": "..." },
    { "type": "Warm",   "text": "..." },
    { "type": "Warm",   "text": "..." },
    { "type": "Warm",   "text": "..." },
    { "type": "Brief",  "text": "..." },
    { "type": "Brief",  "text": "..." },
    { "type": "Brief",  "text": "..." }
  ]
}

Greeting guidelines:
- Formal (2): polished, professional, suitable for clients you don't know well; may reference [Company]
- Warm (3): friendly, genuine, suitable for contacts you have a relationship with
- Brief (3): 1-2 sentences max, punchy, acknowledge the holiday warmly
- Never mention Rapport in the greetings themselves
- Use traditional phrases where they exist (e.g. "Shanah Tovah", "Eid Mubarak", "Chag Sameach")
- Tone: professional warmth — not enterprise-cold, not over-casual

Return ONLY the JSON object, no markdown, no explanation.`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1500,
    messages: [{ role: 'user', content: prompt }]
  });

  return JSON.parse(response.content[0].text.trim());
}

let generated = 0;
for (const holiday of holidays) {
  if (greetings[holiday.slug]) {
    console.log(`⏭  Skipping ${holiday.name} (already exists)`);
    continue;
  }
  console.log(`⏳  Generating: ${holiday.name}…`);
  try {
    greetings[holiday.slug] = await generateForHoliday(holiday);
    generated++;
    console.log(`✓   Generated: ${holiday.name}`);
  } catch (err) {
    console.error(`✗   Failed: ${holiday.name} — ${err.message}`);
  }
}

writeFileSync(join(root, 'data/greetings.json'), JSON.stringify(greetings, null, 2), 'utf8');
console.log(`\n✅  Done. Generated ${generated} new entries.`);
