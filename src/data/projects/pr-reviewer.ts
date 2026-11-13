import type { Project } from './types';
import trace from '../../assets/pr-reviewer/langsmith-trace.png';

const repo = 'https://github.com/Colin-J-Emmanuel/multi-agent-pr-reviewer';

export const prReviewer: Project = {
  slug: 'pr-reviewer',
  title: 'Multi-agent PR reviewer',
  theme: {
    band: '#2b1d55', bandDark: '#1c1238', accent: '#c4b5fd', accentSoft: 'rgba(196,181,253,0.16)',
    onBand1: '#cfc6ea', onBand2: '#e4def5', onBand3: '#a99dd0',
  },
  badge: 'Complete · 8 build phases',
  lead: 'Four specialist agents review every pull request in parallel. The interesting part is the <em>reliability engineering</em> around them.',
  sub: 'Not an LLM in a loop: webhook verification, latency isolation, idempotency, confidence gates and cost control, each built and tested one step at a time.',
  buttons: [
    { label: 'Source on GitHub', href: repo },
    { label: 'Read the build log', href: `${repo}#build-log` },
  ],
  hero: { kind: 'pipeline' },
  glance: [
    { label: 'Stack', value: 'Python · FastAPI · Redis + ARQ · LangGraph · Postgres + pgvector · LangSmith' },
    { label: 'Speed', value: '8.3 s per review with the agents in parallel, versus ~21 s one after another' },
    { label: 'Cost', value: 'Tracked per review in Postgres, cross-checked against LangSmith' },
    { label: 'Tested', value: '16 unit tests and ruff, run in GitHub Actions on every PR' },
  ],
  sections: [
    {
      kind: 'prose', num: '01', title: "Why it's harder than it looks",
      paragraphs: [
        'Calling an LLM on a diff is easy. Running it on real webhooks is not. GitHub times out slow handlers and redelivers events. Four agents writing at once can overwrite each other. A bot that comments on every push gets muted within a day. And a retry loop on a broken PR can quietly spend money forever.',
        'So the project is a study of the patterns around an agent system, with each one built by hand, tested on its happy and failure paths, and written down with the reason it exists.',
      ],
    },
    {
      kind: 'cards', num: '02', title: 'Five ideas carry the design',
      intro: 'Each one answers a specific way the naive version breaks.', min: 320, lastDark: true,
      items: [
        { title: 'Fast-ack', body: 'The web process only verifies, dedupes, enqueues and returns 202 in milliseconds. The slow review runs in a separate worker, so GitHub never times out.' },
        { title: 'Fan-out, fan-in', body: 'Four agents read the same PR and write into one shared list. An <code>operator.add</code> reducer merges their concurrent writes instead of letting the last one win.' },
        { title: 'Durable lifecycle', body: 'Each delivery is written to Postgres as <code>in_progress</code> before the slow work starts. A crashed review leaves a row you can query instead of vanishing.' },
        { title: 'Idempotent at three layers', body: '<code>SET NX</code> on enqueue, <code>ON CONFLICT</code> on the PR row, find-then-update on the comment. A PR reviewed ten times has one comment.' },
        { title: 'Bounded failure and spend', body: 'Failures are classified before retrying, retries are capped, and a daily budget is checked before any work begins.' },
        { title: 'The rule under all five', body: "Code decides; the LLM narrates. Dedupe, tiering and ordering are plain Python that can't hallucinate a finding in or out." },
      ],
    },
    {
      kind: 'split', num: '03', title: 'Parallel, proven from the trace',
      paragraphs: [
        "All four agents start at t = 0 in one LangGraph superstep. The aggregator is a barrier: it can't run until every agent finishes. The whole run takes 8.3 seconds; one after another, it would take about 21.",
        "Every call is traced in LangSmith, and its token counts are summed onto the delivery row, so each review's cost sits next to its findings.",
      ],
      image: { src: trace, alt: 'LangSmith waterfall of one review: docs, quality, security and testing agents run concurrently from zero seconds, and the aggregate step runs after all four finish, 8.28 seconds total', caption: 'One review run in LangSmith' },
    },
    {
      kind: 'story', label: '04 · What broke', title: 'The cost column looked right. It was off by 50%.',
      paragraphs: [
        "Per-review cost is recorded in Postgres because LangSmith's traces expire after 14 days and can't be joined against findings. To check it, I compared the two. Tokens matched exactly: 5,552. The cost did not. The hardcoded prices were for the wrong Sonnet generation, inflating every figure by about half.",
      ],
      stats: [
        { label: 'Tokens', value: '5,552 = 5,552' },
        { label: 'Cost, before fix', value: '~50% high', highlight: true },
        { label: 'After the fix', value: "$0.0154 vs LangSmith's $0.0155", full: true },
      ],
      closing: 'The lesson I kept: no amount of checking a number against itself would have caught this. It took a second, independent source.',
    },
    {
      kind: 'rows', num: '05', title: 'Key engineering decisions',
      intro: "The README explains more than twenty. These four are the ones I'd defend first.",
      items: [
        { title: "Demote low-confidence findings, don't drop them", body: "An agent's low confidence describes its own certainty, not the issue's importance. High-tier findings reach the PR; demoted ones stay in Postgres, queryable, and never clutter the comment." },
        { title: 'Unknown failures are permanent by default', body: 'Timeouts, 429s and 5xx retry with backoff, up to three attempts. A 404, a 401 or one of our own bugs fails the same way every time, so retrying it only burns money. A mistake costs one lost review, not an endless loop.' },
        { title: 'Check the budget before the work', body: 'A ceiling checked after the LLM calls is an accounting note, not a control. Over budget, a review returns in 0.05 s having spent zero tokens.' },
        { title: 'Vector search beside the relational data', body: 'pgvector similarity is one ordering in the same SQL that joins findings to deliveries and PRs. No separate vector store to keep in sync, and embeddings run locally with no extra API key.' },
      ],
    },
    {
      kind: 'prose', num: '06', title: 'The reviewer, reviewing itself',
      paragraphs: [
        'Once it could post, I pointed it at its own repository. On the PR that added CI, it flagged that <code>pytest</code> was listed as a dependency but never run by the workflow. Lint and import checks had passed cleanly on the same commit.',
        'The next PR fixed it, and the review of that PR suggested boundary tests at the exact confidence thresholds, which I added. The deterministic checks and the semantic review caught entirely different kinds of problems.',
      ],
    },
    {
      kind: 'limits',
      limitsLabel: '07 · Known gaps',
      limits: [
        'The budget ceiling is soft: concurrent workers can each pass the check',
        'A budget skip leaves no delivery row in Postgres',
        'Price constants are hardcoded and unchecked at runtime',
        'Embedding runs inside the review transaction',
      ],
      nextLabel: '08 · Next',
      next: [
        'Integration tests for the database layer against a real Postgres in CI',
        'A hard spend cap with per-call accounting inside the graph',
        'A backfill script for findings that predate embeddings',
      ],
    },
  ],
  card: {
    summary: 'Security, quality, testing and docs agents review every PR in parallel and post one idempotent comment. Verified cost accounting caught a 50% pricing error.',
    tags: ['FastAPI', 'LangGraph', 'Redis', 'Postgres + pgvector'],
    flow: [{ label: 'webhook' }, { label: 'ARQ' }, { label: '4 agents ∥', on: true }, { label: 'aggregate' }, { label: 'PR comment' }],
    links: [{ label: 'Source', href: repo }],
  },
};
