// Everything personal lives here, so updating the site is mostly editing this file.
export const site = {
  name: 'Colin J. Emmanuel',
  description:
    'Software engineer building backends, machine learning systems and full-stack apps. Projects, case studies and the decisions behind them.',
  // Short credibility line under the headline
  credentials: ['Columbia CS', 'Break Through Tech AI Fellow, Cornell Tech', 'PayPal AI Hackathon 2026'],
  // About: a short bio, and a longer one behind the "Long" toggle. Edit freely; plain text, one string per paragraph.
  bio: {
    short: [
      "I'm a software engineer and Columbia Computer Science graduate. I build systems end to end: backends that stay correct when things go wrong, ML experiments with honest evaluation, and apps people actually use.",
    ],
    long: [
      "I'm a software engineer and Columbia Computer Science graduate. I build systems end to end: backends that stay correct when things go wrong, ML experiments with honest evaluation, and apps people actually use.",
      "Most of my projects start with something I want to understand properly, like how a coding agent really works, or what it takes to credit a payment exactly once. I build them one tested piece at a time, check each piece on its failure path before moving on, and write down why every decision was made. That habit is where these case studies come from.",
      "Sauti is closest to what I want to do long term: build for problems I've seen in Tanzania and across East Africa, where good software can still change how a small business runs.",
      "I was a Machine Learning Fellow with Break Through Tech AI at Cornell Tech. Right now I'm looking for software engineering roles on teams that ship real products.",
    ],
  },
  // "How I build": each principle links to the case study that shows it
  principles: [
    { title: 'Test the failure path, not just the happy path', proof: 'Sauti: 8 unhappy paths', href: '/projects/sauti#s-06' },
    { title: 'Idempotency is a requirement, not a cleanup task', proof: 'PR reviewer: idempotent at three layers', href: '/projects/pr-reviewer#s-02' },
    { title: 'Treat model output as untrusted input', proof: 'MagicStream: exact-match validation', href: '/projects/magicstream#s-03' },
    { title: 'Verify numbers against a second source', proof: 'PR reviewer: the 50% pricing bug', href: '/projects/pr-reviewer#s-04' },
    { title: 'Prevent mistakes by design, not by checks', proof: 'Terminal agent: single-purpose git tools', href: '/projects/terminal-agent#s-05' },
    { title: 'Write down the why behind every decision', proof: 'Sauti: key engineering decisions', href: '/projects/sauti#s-04' },
  ],
  interests: [
    'Software engineering',
    'Backend development',
    'Full-stack',
    'Machine learning',
    'AI engineering',
  ],
  links: {
    github: 'https://github.com/Colin-J-Emmanuel',
    linkedin: 'https://www.linkedin.com/in/colin-j-emmanuel',
    resume: '/resume.pdf', // drop your PDF into public/resume.pdf
    writing: '', // your Substack or Medium URL; until then the Writing link goes nowhere
  },
  stack: [
    { group: 'Languages', items: ['Python', 'Go', 'TypeScript', 'JavaScript', 'Java', 'C++', 'C', 'SQL'] },
    { group: 'Backend & frameworks', items: ['FastAPI', 'Gin', 'Spring Boot', 'Apache Kafka', 'Node.js', 'React', 'Next.js', 'Tailwind CSS'] },
    { group: 'AI, LLMs & agents', items: ['Claude', 'OpenAI', 'Hugging Face', 'LangGraph', 'LangSmith', 'RAG'] },
    { group: 'Machine learning & data', items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Pandas', 'NumPy'] },
    { group: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Supabase'] },
    { group: 'Cloud & tools', items: ['AWS', 'Google Cloud', 'Docker', 'GitHub Actions', 'Vercel'] },
  ],
  background: [
    { title: 'Columbia University', detail: 'B.A. in Computer Science' },
    { title: 'Break Through Tech AI · Cornell Tech', detail: 'Machine Learning Fellow' },
    { title: 'PayPal AI Hackathon', detail: 'Built Sauti' },
  ],
};
