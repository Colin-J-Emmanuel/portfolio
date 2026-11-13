import { sauti } from './sauti';
import { prReviewer } from './pr-reviewer';
import { terminalAgent } from './terminal-agent';
import { magicstream } from './magicstream';
import { characterLora } from './character-lora';
import type { Project, Theme } from './types';

/** Order here = order on the home page and in the "Next project" loop. The first one is featured. */
export const projects: Project[] = [sauti, prReviewer, terminalAgent, magicstream, characterLora];
export const featured = projects[0];

export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};

export const themeVars = (t: Theme) =>
  [
    `--band:${t.band}`, `--band-dark:${t.bandDark}`, `--accent:${t.accent}`, `--accent-soft:${t.accentSoft}`,
    `--on-band-1:${t.onBand1}`, `--on-band-2:${t.onBand2}`, `--on-band-3:${t.onBand3}`,
    t.term ? `--term:${t.term}` : '', t.termDot ? `--term-dot:${t.termDot}` : '',
  ].filter(Boolean).join(';');

export type { Project };
