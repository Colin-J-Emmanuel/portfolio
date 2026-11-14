// Everything personal lives here, so updating the site is mostly editing this file.
export const site = {
  name: 'Colin J. Emmanuel',
  description:
    'Software engineer building backends, machine learning systems and full-stack apps. Projects, case studies and the decisions behind them.',
  // Short credibility line under the headline
  credentials: ['Columbia CS', 'Break Through Tech AI/ML Fellow, Cornell Tech', 'PayPal AI Hackathon 2026'],
  // About: a short bio, and a longer one behind the "Long" toggle. Edit freely; plain text, one string per paragraph.
  bio: {
    short: [
      "I'm a software engineer and Columbia Computer Science graduate. I build systems end to end: backends that stay correct when things go wrong, ML experiments with honest evaluation, and apps people actually use.",
    ],
    long: [
      "I'm a software engineer and Columbia Computer Science graduate. I build systems end to end: backends that stay correct when things go wrong, ML experiments with honest evaluation, and apps people actually use.",
      "Most of my projects start with something I want to understand properly, like how a coding agent really works, or what it takes to credit a payment exactly once. I build them one tested piece at a time, check each piece on its failure path before moving on, and write down why every decision was made. That habit is where these case studies come from.",
      "Sauti is closest to what I want to do long term: build for problems I've seen in Tanzania and across East Africa, where good software can still change how a small business runs.",
      "I was an AI/ML Fellow with Break Through Tech AI at Cornell Tech. Right now I'm looking for software engineering roles on teams that ship real products.",
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
  // Which projects on this site use each technology (by project slug). Pills with an entry here are highlighted.
  usedIn: {
    Python: ['pr-reviewer', 'terminal-agent', 'character-consistency'],
    Go: ['magicstream'],
    TypeScript: ['sauti', 'magicstream'],
    SQL: ['pr-reviewer'],
    FastAPI: ['pr-reviewer'],
    Gin: ['magicstream'],
    React: ['magicstream'],
    'Next.js': ['sauti'],
    Claude: ['sauti', 'pr-reviewer', 'terminal-agent'],
    'Hugging Face': ['character-consistency'],
    LangGraph: ['pr-reviewer'],
    LangSmith: ['pr-reviewer'],
    PyTorch: ['character-consistency'],
    PostgreSQL: ['pr-reviewer'],
    MongoDB: ['magicstream'],
    Redis: ['pr-reviewer'],
    Docker: ['terminal-agent', 'pr-reviewer'],
    'Google Cloud': ['magicstream'],
    'GitHub Actions': ['pr-reviewer'],
    Vercel: ['magicstream'],
  } as Record<string, string[]>,
  // Background: grouped timeline. `description` and `tags` are optional; newest first.
  background: [
    {
      group: 'Experience',
      items: [
        {
          title: 'Mercor', role: 'AI Training Data Specialist, Computer-Use Agents · Contract', when: 'Oct 2026 – Present',
          description: 'Record expert, end-to-end software workflows on macOS that train AI agents to operate desktop applications and complete multi-step development tasks.',
          tags: ['AI agents', 'Software workflows'],
        },
        {
          title: 'Columbia University, Department of Computer Science', role: 'Software Engineer Intern · The Humor Project (crackd.ai)', when: 'Jan – Jun 2026',
          description: 'Built a public caption-rating app with Google sign-in, persistent votes and a vote-ranked feed, plus admin tools for ordered prompt pipelines, image uploads to a caption-generation service and role-based access.',
          tags: ['TypeScript', 'Next.js', 'Supabase'],
          link: { label: 'crackd.ai', href: 'https://crackd.ai' },
        },
        {
          title: 'Ursa Space Systems', role: 'Machine Learning Engineer', when: 'Aug – Dec 2025',
          tags: ['Machine learning', 'Data analysis'],
        },
        {
          title: 'Network Tree', role: 'Software Engineer Intern · Full-stack', when: 'Jan – Aug 2025',
          description: 'Full-stack development, first through Columbia Build Lab in the spring, then as a summer intern.',
          tags: ['TypeScript', 'Full-stack'],
        },
        {
          title: 'Columbia University Information Technology', role: 'Technical Support Specialist · Part-time', when: 'Aug 2023 – May 2026',
          description: 'Supported a campus of 36,000+ students and 4,600+ faculty, and deployed and maintained hybrid-learning infrastructure across labs and classrooms.',
        },
        {
          title: 'Absa Bank Tanzania', role: 'IT Department Intern · Dar es Salaam', when: 'Nov 2020 – Feb 2021',
          description: 'Frontline IT support across headquarters and branches. Shadowed the teams building "Abby," a WhatsApp-integrated AI banking chatbot, and an internal bulk-SMS portal.',
        },
      ],
    },
    {
      group: 'Education & programs',
      items: [
        {
          title: 'Columbia University', role: 'B.A. in Computer Science · Dean\'s List', when: '',
          description: 'Coursework in Artificial Intelligence, Natural Language Processing, Databases, Data Structures, Advanced Programming in C and UI Design. Member of ColorStack, CORE, the Columbia Data Science Society and the African Development Group.',
        },
        {
          title: 'PayPal AI Hackathon', role: 'Built Sauti', when: '2026',
          description: 'A Swahili-speaking PayPal agent for East African corner shops and the families abroad who pay for their groceries.',
          link: { label: 'Case study', href: '/projects/sauti' },
        },
        {
          title: 'JPMorganChase', role: 'Advanced Software Engineering Job Simulation', when: 'Jun – Jul 2026',
          description: 'Built a Spring Boot microservice that consumes Kafka transaction messages, validates and persists them with Spring Data JPA, calls an external incentive API and serves balances over REST.',
          tags: ['Spring Boot', 'Apache Kafka', 'REST'],
        },
        {
          title: 'Break Through Tech AI · Cornell Tech', role: 'AI/ML Fellow', when: 'May 2025 – Apr 2026',
          description: 'Selected from 3,600+ applicants across 200+ universities. A 12-month program in machine learning, deep learning for vision and NLP, and responsible AI, with an AI Studio project for an industry partner.',
          tags: ['Machine learning', 'Deep learning'],
        },
      ],
    },
],
};
