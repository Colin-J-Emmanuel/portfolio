# Colin J. Emmanuel — portfolio

Personal site: a home page and one case study per project. Built with [Astro](https://astro.build), fully static, no client-side JavaScript.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run preview    # serve dist/ locally
```

Node 20.3+ (22 recommended).

## Where things live

```
src/
  data/site.ts              Name, links, interests, stack, background  ← edit this most
  data/projects/
    index.ts                Project order (first = featured) and "Next project" loop
    types.ts                The shape of a project and its sections
    sauti.ts …              One file per case study: theme colors, header, sections, home card
  assets/<project>/         Screenshots and diagrams (optimized to WebP at build time)
  components/
    Sections.astro          Renders every section type (prose, cards, rows, story, table…)
    HeroVisual.astro        Case-study header visuals: image, pipeline, terminal, compare
    Nav.astro, Footer.astro
  layouts/Base.astro        <head>, fonts, meta tags
  pages/index.astro         Home page
  pages/projects/[slug].astro  One page per project, generated from the data files
  styles/global.css         All styles; per-project colors come from CSS variables
public/
  favicon.svg
  resume.pdf                ← add this
```

### Common edits

- **Resume:** put your PDF at `public/resume.pdf`.
- **Writing link:** set `links.writing` in `src/data/site.ts` to your Substack URL. While it's empty, the nav link is hidden.
- **Add a project:** copy one file in `src/data/projects/`, change the slug, theme and content, add it to the list in `index.ts`. Its page is generated automatically.
- **Reorder projects:** change the array order in `src/data/projects/index.ts`. The first one is the featured card.
- **Section types:** `prose`, `steps`, `image`, `split`, `points`, `gallery`, `cards`, `rows`, `table`, `story`, `limits`. See `types.ts` for their fields. Text fields accept simple inline HTML (`<em>`, `<code>`).

## Deploy (free, on Vercel)

1. Create a new GitHub repo and push this folder to it.
2. On vercel.com: **Add New → Project**, import the repo. Vercel detects Astro; keep the defaults (build `npm run build`, output `dist`).
3. Deploy. Every push to `main` redeploys.
4. Once you know your URL (or add a custom domain), set `site` in `astro.config.mjs` so canonical links are correct.

## Design

Paper background (`#f5f2ea`) with ink-navy text, Bricolage Grotesque and JetBrains Mono (self-hosted via Fontsource). Each case study has its own color band:

| Project | Band | Accent |
| --- | --- | --- |
| Sauti | `#1b2650` navy | `#f2b632` marigold |
| PR reviewer | `#2b1d55` violet | `#c4b5fd` lavender |
| Terminal agent | `#0f3b2e` green | `#6ee7a8` mint |
| MagicStream | `#3a1624` burgundy | `#e0b24f` gold |
| Character consistency | `#14403e` teal | `#e8a06a` copper |
