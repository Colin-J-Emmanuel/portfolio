import type { Project } from './types';
import hero from '../../assets/sauti/hero.png';
import demo1 from '../../assets/sauti/demo-1.png';
import demo2 from '../../assets/sauti/demo-2.png';
import demo3 from '../../assets/sauti/demo-3.png';
import demo4 from '../../assets/sauti/demo-4.png';
import architecture from '../../assets/sauti/architecture.png';
import mobile from '../../assets/sauti/app-mobile.png';

export const sauti: Project = {
  slug: 'sauti',
  title: 'Sauti',
  theme: {
    band: '#1b2650', bandDark: '#121a38', accent: '#f2b632', accentSoft: 'rgba(242,182,50,0.14)',
    onBand1: '#c3c8db', onBand2: '#dde1ee', onBand3: '#9aa2c2',
  },
  badge: 'PayPal AI Hackathon 2026',
  lead: 'A PayPal agent that speaks <em>Swahili</em>.',
  sub: "A shopkeeper in Dar es Salaam speaks his sales into WhatsApp. Sauti keeps his books and runs a grocery wallet that each customer's family abroad tops up through PayPal.",
  buttons: [
    { label: 'Live demo', href: 'https://sauti-yik2.onrender.com/demo' },
    { label: 'Watch demo · 3 min', href: 'https://youtu.be/3WlV8Vcl37M' },
    { label: 'Source on GitHub', href: 'https://github.com/Colin-J-Emmanuel/sauti' },
  ],
  hero: { kind: 'image', image: { src: hero, alt: 'Sauti: illustration of Duka la Mzee Salim, a small shop in Dar es Salaam, beside the Sauti wordmark' } },
  glance: [
    { label: 'Built for', value: "PayPal AI Hackathon 2026, on PayPal's sandbox" },
    { label: 'Stack', value: 'Next.js · Claude via Vercel AI SDK · PayPal Agent Toolkit · ElevenLabs · WhatsApp Cloud API' },
    { label: 'The hard part', value: 'Crediting every payment exactly once, from two signals that can arrive in any order' },
    { label: 'Tested', value: '8 unhappy paths against the real model and PayPal sandbox' },
  ],
  sections: [
    {
      kind: 'prose', num: '01', title: 'The problem',
      paragraphs: [
        "Millions of East Africans abroad send money home, and much of it is meant for something specific: a parent's groceries, school supplies, the tab at the corner shop. Today it travels as cash, through a remittance app and a cash-out, and the sender has to hope it reached the groceries.",
        "The corner shop, the <em>duka</em>, keeps its books in a paper notebook, the <em>daftari</em>. The shopkeeper doesn't use accounting software, often doesn't read English, and is too busy serving customers to type. But he is on WhatsApp all day, mostly in voice notes.",
      ],
      quote: 'In May 2026, M-Pesa and PayPal linked up in Tanzania. The family abroad could now pay the shop directly. What was missing was something that works for the shopkeeper.',
    },
    {
      kind: 'steps', num: '02', title: 'One run of the loop',
      intro: "Mama Asha buys rice at Mzee Salim's shop in Dar es Salaam. Her son Juma lives in New York and pays for her groceries. Left phone: the shop. Right phone: Juma. Middle: what the agent did, with every PayPal call tagged.",
      steps: [
        { src: demo1, alt: 'Demo screen: the agent records the sale on credit and sends Juma a PayPal top-up request', title: 'The wallet is empty, so Sauti asks on its own.', body: 'A voice note says Mama Asha took 15,000 TZS of rice. Sauti records it on credit and sends Juma a $20.00 PayPal top-up request.' },
        { src: demo2, alt: 'Demo screen: Juma pays, the wallet shows 35,000 TZS and the debt is cleared', title: 'Juma pays; PayPal confirms.', body: 'A signed webhook arrives. Sauti clears the 15,000 owed and keeps 35,000 in her wallet.' },
        { src: demo3, alt: 'The daftari notebook with the top-up entry and a POCHI IMEJAZWA stamp', title: 'The notebook records it.', body: 'The top-up lands in green with a <em>POCHI IMEJAZWA</em> (wallet topped up) stamp, and the shopkeeper gets a WhatsApp message in Swahili.' },
        { src: demo4, alt: 'The demo screen in English, with the payment alert in the WhatsApp thread', title: 'Anyone can follow along.', body: 'An English/Kiswahili switch translates what the shopkeeper said, with the Swahili kept underneath.' },
      ],
    },
    {
      kind: 'image', num: '03', title: 'Architecture',
      intro: 'One Next.js app with two doors, WhatsApp and the web app, leading to the same agent, the same ledger and the same PayPal tools.',
      image: { src: architecture, alt: 'Architecture: the shop talks to Sauti through WhatsApp or the web app; the agent records sales and calls PayPal; PayPal confirms payments by webhook and live status checks' },
      cards: [
        { title: 'The agent decides, code calculates', body: 'Claude picks the tools and writes the reply. Every amount and balance is computed in the ledger, never by the model.' },
        { title: 'PayPal is the source of truth', body: 'A wallet only changes when PayPal says money arrived. If PayPal is down, nothing is credited.' },
        { title: 'Two signals, one fact', body: "A payment is learned from PayPal's webhook or from asking PayPal. Settlement is idempotent, so the two never double-count." },
      ],
    },
    {
      kind: 'rows', num: '04', title: 'Key engineering decisions',
      intro: 'Sixteen decisions are in the README. These four carry the most weight.',
      items: [
        { title: 'Exactly-once settlement', body: "Webhook signatures are verified through PayPal's own API, processed event ids are stored so retries are ignored, and settlement only acts on a request that is still open. The webhook and the 30-second status check can't both credit the same payment." },
        { title: 'Money logic in code, not in the model', body: '<code>record_entry</code> decides what the wallet pays, what goes on credit and whether a top-up is due, then tells the agent what to do next. The model\'s job is language and choosing tools.' },
        { title: 'Never record a sale twice', body: 'All ledger writes go through one write queue. A fallback model is used only if no tool has run yet, and memory keeps full tool calls, so a retry or follow-up never repeats a write.' },
        { title: 'Answer WhatsApp fast, work after', body: 'Meta expects a quick 200. The webhook verifies the signature, dedupes the message id and returns, then sends "writing it down…", runs the agent and replies.' },
      ],
    },
    {
      kind: 'points', num: '05', title: 'Designed for the shopkeeper',
      phone: { src: mobile, alt: "The shopkeeper's app on a phone: microphone button, examples and the daftari" },
      points: [
        { title: 'Voice first, on the app he already has', body: "A WhatsApp voice note in, a sentence out. He never types, never reads a dashboard. The web app's main control is one large microphone button." },
        { title: 'A notebook, not a spreadsheet', body: 'The daftari is drawn as the lined notebook the shop already keeps: blue rules, a red margin, handwritten entries, a rubber stamp when the family pays.' },
        { title: 'Pre-paid beats credit', body: 'The first version billed the family for an existing tab. The wallet is better: the shop is paid before goods leave, and the family sees exactly what their money bought.' },
        { title: "Show the agent's work", body: 'Every tool call becomes a plain sentence under the reply, PayPal calls are tagged, and the raw calls are one click away.' },
      ],
    },
    {
      kind: 'table', num: '06', title: 'Testing the unhappy paths',
      intro: 'Eight cases run against the real model and PayPal sandbox, each checking which tools the agent called. Four of them:',
      head: ['The shopkeeper says', 'Case', 'Sauti must'],
      rows: [
        ['<em>Mama Asha amechukua mchele.</em>', 'Sale with no amount', 'Ask for the amount, record nothing'],
        ['<em>Tuma shilingi 100,000 kwa Juma.</em>', 'Send money out (not supported)', "Explain it can't, send nothing"],
        ['<em>Baraka amechukua soda ya 1,000.</em>', 'No relative abroad', 'Record the sale, no PayPal request'],
        ['<em>Bibi Rehema took two loaves for 3,000 on credit.</em>', 'English instead of Swahili', 'Record it and request a top-up on its own'],
      ],
    },
    {
      kind: 'limits',
      limitsLabel: '07 · Limitations',
      limits: [
        'PayPal sandbox only; production needs a business account per shop',
        "Doesn't use the PayPal–M-Pesa link yet; limits and rollout aren't public",
        "Meta's test number only messages verified recipients",
        'JSON-file storage that resets on each deploy, and a fixed TZS/USD rate',
      ],
      nextLabel: "08 · What's next",
      next: [
        'Cash out to M-Pesa, so a top-up is spendable the same day',
        'Family controls: a monthly budget and a weekly summary for the payer',
        'More languages: Sheng, Kinyarwanda, Somali, Amharic',
        'Beyond groceries: school fees, pharmacies, clinics',
      ],
    },
  ],
  card: {
    summary: "A shopkeeper in Dar es Salaam speaks his sales into WhatsApp. Sauti keeps his books and runs a grocery wallet that each customer's family abroad tops up through PayPal, settling each payment exactly once, whether PayPal's webhook or a status check reports it first.",
    tags: ['Next.js', 'Claude', 'PayPal Agent Toolkit', 'WhatsApp Cloud API', 'ElevenLabs'],
    links: [],
  },
};
