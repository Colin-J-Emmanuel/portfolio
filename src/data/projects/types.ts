import type { ImageMetadata } from 'astro';

/** Colors for one case study. `band` is the header / dark-section color, `accent` the highlight on it. */
export interface Theme {
  band: string;
  bandDark: string;
  accent: string;
  accentSoft: string;
  onBand1: string; // secondary text on the band
  onBand2: string; // body text on the band
  onBand3: string; // faint labels on the band
  term?: string;
  termDot?: string;
}

export interface Img { src: ImageMetadata; alt: string; caption?: string }
export interface Item { title: string; body: string }
export interface Stat { label: string; value: string; highlight?: boolean; full?: boolean }

/** Strings may contain simple inline HTML (<em>, <code>, <strong>). */
export type Section =
  | { kind: 'prose'; num: string; title: string; paragraphs: string[]; quote?: string }
  | { kind: 'steps'; num: string; title: string; intro?: string; steps: (Img & { title: string; body: string })[] }
  | { kind: 'image'; num: string; title: string; intro?: string; image: Img; cards?: Item[] }
  | { kind: 'split'; num: string; title: string; paragraphs: string[]; image: Img }
  | { kind: 'points'; num: string; title: string; points: Item[]; phone: Img }
  | { kind: 'gallery'; num: string; title: string; intro?: string; main: Img; side: Img }
  | { kind: 'cards'; num: string; title: string; intro?: string; items: Item[]; lastDark?: boolean; min?: number }
  | { kind: 'rows'; num: string; title: string; intro?: string; items: Item[] }
  | { kind: 'table'; num: string; title: string; intro?: string; head: string[]; rows: string[][]; strongLast?: boolean; cards?: Item[] }
  | { kind: 'story'; label: string; title: string; paragraphs: string[]; stats?: Stat[]; closing?: string }
  | { kind: 'limits'; limitsLabel: string; limits: string[]; nextLabel: string; next: string[] };

export type HeroVisual =
  | { kind: 'image'; image: Img }
  | { kind: 'pipeline' }
  | { kind: 'terminal'; command: string; lines: { type: 'prompt' | 'out' | 'result'; text: string }[] }
  | { kind: 'compare'; before: Img; after: Img };

export interface Project {
  slug: string;
  title: string;
  theme: Theme;
  badge: string;
  lead: string; // may contain one <em>…</em> for the accent color
  sub: string;
  buttons: { label: string; href: string }[]; // first one is the accent button
  hero: HeroVisual;
  glance: { label: string; value: string }[];
  sections: Section[];
  /** Home-page card */
  card: {
    summary: string;
    tags: string[];
    flow?: { label: string; on?: boolean }[];
    flowJoin?: string[]; // separators between flow items; defaults to →
    shot?: Img;
    links: { label: string; href: string }[];
  };
}
