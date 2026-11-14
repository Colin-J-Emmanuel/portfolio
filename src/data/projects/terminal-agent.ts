import type { Project } from './types';
import architecture from '../../assets/terminal-agent/architecture.png';

const repo = 'https://github.com/Colin-J-Emmanuel/terminal-coding-agent';

export const terminalAgent: Project = {
  slug: 'terminal-agent',
  title: 'Terminal coding agent',
  theme: {
    band: '#0f3b2e', bandDark: '#08261d', accent: '#6ee7a8', accentSoft: 'rgba(110,231,168,0.16)',
    onBand1: '#bcd9cc', onBand2: '#d7ebe2', onBand3: '#93bba9', term: '#061c15', termDot: '#2f5e4d',
  },
  badge: 'Complete · 11 build phases',
  lead: 'A ReAct-loop agent that reads, writes and runs code from your terminal, <em>inside a sandbox</em>.',
  sub: 'Built to understand how coding agents work end to end. The tool system, validator, sandbox and agent loop are hand-built; AI helped only with boilerplate and test scaffolding.',
  buttons: [{ label: 'Source on GitHub', href: repo }],
  hero: {
    kind: 'terminal',
    command: 'python -m src.cli',
    lines: [
      { type: 'prompt', text: 'create a file called hello.py that prints hello world' },
      { type: 'out', text: '  → write_file(hello.py)' },
      { type: 'prompt', text: 'run this python code: print(sum(range(101)))' },
      { type: 'out', text: '  → execute_code · validator: safe · docker --network none' },
      { type: 'result', text: '  5050' },
      { type: 'prompt', text: 'search the code for ToolRegistry' },
    ],
  },
  glance: [
    { label: 'Stack', value: 'Python · Claude API · Docker · pytest' },
    { label: 'Tools', value: '7: files, code search, sandboxed execution, git status / diff / commit' },
    { label: 'Safety', value: 'AST validator, then a network-less container with a memory cap' },
    { label: 'Tested', value: '11 tests with the LLM mocked, so they run offline' },
  ],
  sections: [
    {
      kind: 'prose', num: '01', title: 'What it does',
      paragraphs: [
        'You type a request in plain English. The agent reasons about it, calls a tool, reads the result and repeats until the task is done: the Reason–Act–Observe loop.',
        'It can create and read files, search a codebase, run Python, check git status and diffs, commit, and rename a symbol across several files by combining search, read and write. When the conversation grows long, older turns are summarized and recent ones kept word for word.',
      ],
    },
    {
      kind: 'image', num: '02', title: 'Architecture',
      intro: 'A request flows through the loop, past the guardrails, to a tool. Every tool returns success with a result, or an error, which the agent reads before its next step.',
      image: { src: architecture, alt: 'Architecture: the user request enters the ReAct loop of reason, act and observe; actions pass guardrails for confirmation and snapshots, then reach tools; execute_code goes through an AST validator into a Docker sandbox, with a subprocess fallback' },
    },
    {
      kind: 'cards', num: '03', title: 'Safety: bound what code can do',
      intro: 'The design favors limiting what code can do over trying to list everything dangerous it might try.', min: 300, lastDark: true,
      items: [
        { title: '1 · Static validator, a first filter', body: "Parses the code into an AST and blocks dangerous imports like <code>os</code>, <code>subprocess</code> and <code>socket</code>. Code that won't parse is rejected. It's a blocklist, so it's not the security boundary." },
        { title: '2 · Docker sandbox, the real boundary', body: 'Code runs in a container with no network, a hard memory cap, a timeout and its own filesystem. This is the actual containment.' },
        { title: '3 · Subprocess fallback', body: 'No Docker? Code still runs in a subprocess with a timeout and CPU cap, so the agent works anywhere, as defense in depth.' },
        { title: 'Guardrails on every write', body: 'Destructive actions ask [y/N] and default to no. Files are snapshotted before writes, and /rollback restores them.' },
      ],
    },
    {
      kind: 'story', label: '04 · What broke', title: 'The agent kept repeating itself.',
      paragraphs: [
        'Early on, the agent re-ran tools several times for a single request. Tracing the actual message list on each turn showed why: the loop was rebuilding the conversation every iteration instead of adding to it, so the model never saw its own earlier tool calls.',
        'The fix was one growing message list. A second surprise came from testing on two platforms: Linux honors the memory limit and macOS rejects it, and the CPU cap kills with a different signal on each. Limits the OS refuses are now skipped instead of crashing.',
      ],
      stats: [
        { label: 'Before', value: 'tools re-run per request', highlight: true },
        { label: 'After', value: 'one growing message list' },
        { label: 'Found by', value: 'tracing each turn, not guessing', full: true },
      ],
    },
    {
      kind: 'rows', num: '05', title: 'Key engineering decisions',
      items: [
        { title: 'Default-deny confirmation', body: 'A destructive action runs only on an explicit yes. Pressing Enter, or anything else, means no.' },
        { title: 'Git as three single-purpose tools', body: "Status, diff and commit are separate tools rather than one general git command, so the agent can't compose something destructive. Structure prevents the mistake instead of a check catching it." },
        { title: 'Tests mock the LLM', body: 'The suite runs offline with no API key and asserts real behavior: the loop stops, tools are dispatched, errors surface. Not just that code ran.' },
        { title: 'Hand-build the load-bearing parts', body: 'The tool registry, validator, executor and loop were written by hand to understand them; boilerplate and test scaffolding were AI-assisted and then reviewed.' },
      ],
    },
    {
      kind: 'limits',
      limitsLabel: '06 · Known limitations',
      limits: [
        'Multi-file refactoring is verified only on small cases, since it rewrites whole files',
        "Without Docker, the validator can be evaded, so the fallback is defense in depth, not a boundary",
        'No hard filesystem boundary: tools stay in the working directory by convention',
        'The LLM provider is built in the constructor, coupling it to a live API key',
      ],
      nextLabel: '07 · Next',
      next: [
        'A line-level edit tool, so refactoring scales to large files',
        'Container hardening: seccomp, a read-only root filesystem, dropped capabilities',
        'Enforced path sandboxing for every file tool',
        'Dependency injection for the LLM provider',
      ],
    },
  ],
  card: {
    outcome: 'Runs AI-generated code in a network-less Docker sandbox, with destructive actions denied by default and 11 offline tests.',
    kind: ['AI agents', 'Dev tools'],
    year: '2026',
    summary: 'A coding agent that reads, edits and runs code from your terminal. Generated code is validated, then run in a network-less container. Destructive actions are denied unless you confirm them.',
    tags: ['Python', 'Claude API', 'Docker', 'pytest'],
    flow: [{ label: 'prompt' }, { label: 'ReAct loop ↻', on: true }, { label: 'AST check' }, { label: 'Docker sandbox' }],
    links: [{ label: 'Source', href: repo }],
  },
};
