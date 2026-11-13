import type { Project } from './types';
import baseline from '../../assets/character-lora/baseline.png';
import lora from '../../assets/character-lora/lora.png';
import sweep from '../../assets/character-lora/scale-sweep.png';

const repo = 'https://github.com/Colin-J-Emmanuel/character-consistency-lora';

export const characterLora: Project = {
  slug: 'character-consistency',
  title: 'Character-consistent generation',
  theme: {
    band: '#14403e', bandDark: '#0b2b2a', accent: '#e8a06a', accentSoft: 'rgba(232,160,106,0.16)',
    onBand1: '#bfd8d5', onBand2: '#daeae8', onBand3: '#95bbb7',
  },
  badge: 'ML research project',
  lead: 'How well does SDXL keep one character recognizable across scenes, and <em>how much does a LoRA add</em>?',
  sub: 'A DreamBooth LoRA fine-tune on Stable Diffusion XL, measured with a fixed character, fixed scenes, fixed seeds and one shared set of metrics.',
  buttons: [
    { label: 'Source on GitHub', href: repo },
    { label: 'Full results', href: `${repo}/blob/main/RESULTS.md` },
  ],
  hero: {
    kind: 'compare',
    before: { src: baseline, alt: "Six scenes generated from the text description only, one fixed seed: the woman's face shape, age and hair length drift between images", caption: 'Text only · identity 0.545' },
    after: { src: lora, alt: 'The same six scenes with text plus the LoRA: the same woman is recognizable in a coffee shop, rainy street, mountain trail, spacesuit, armor and picnic', caption: 'Text + LoRA · identity 0.809' },
  },
  glance: [
    { label: 'Stack', value: 'Python · PyTorch · SDXL · Diffusers · LoRA / DreamBooth' },
    { label: 'Metrics', value: 'SFace identity, DINOv2, CLIP-I, CLIP-T scene fidelity' },
    { label: 'Training', value: 'Rank 16, 800 steps, about 20 minutes on an L4' },
    { label: 'Result', value: 'Identity up 0.15 to 0.26 in every setting' },
  ],
  sections: [
    {
      kind: 'table', num: '01', title: 'Headline result',
      intro: 'Same prompts, with and without the adapter, so the difference isolates the LoRA. Identity is SFace similarity on detected, aligned faces; higher is more similar.',
      head: ['Setting', 'Text only', 'LoRA token only', 'Text + LoRA'],
      rows: [
        ['prompt_only · varied seed, CFG 7', '0.525', '0.613', '0.751'],
        ['fixed_seed · one seed, CFG 7', '0.545', '0.679', '0.809'],
        ['high_cfg · one seed, CFG 12', '0.648', '0.675', '0.798'],
      ],
      strongLast: true,
      cards: [
        { title: 'It removes failures', body: 'The worst pair of images improved by 0.12 to 0.32, not just the average.' },
        { title: 'The token alone carries identity', body: 'The LoRA token by itself beats the full text description in every setting.' },
        { title: 'Scene fidelity barely moves', body: 'CLIP-T fell by 0.025 in one setting and was flat in the other two.' },
      ],
    },
    {
      kind: 'image', num: '02', title: 'Adapter strength buys identity cheaply',
      intro: 'Sweeping the LoRA scale from 0 to 1.0 raises identity steadily in every setting while scene fidelity stays roughly flat.',
      image: { src: sweep, alt: 'Scale sweep chart: identity rises steadily with LoRA strength from 0 to 1.0 in all three settings while scene fidelity stays roughly flat' },
    },
    {
      kind: 'story', label: '03 · What I learned', title: "A metric answers the question it was trained on, not the one you're asking.",
      paragraphs: [
        'Scored on whole frames, the fine-tune looked worse: DINOv2 fell from 0.24 to 0.16, because the compositions changed, not the faces. Cropping to faces fixed that but still said the token alone underperformed the description.',
        "A face-recognition embedding, SFace, aligns the face and ignores everything else, and it reversed that conclusion too. The more identity-specific metric was right all three times. And CLIP couldn't tell these faces apart at all: any auburn-haired, freckled woman scores alike.",
      ],
      stats: [
        { label: 'Training set', value: '0.722 SFace' },
        { label: 'Text + LoRA', value: '0.809 SFace', highlight: true },
        { label: 'Takeaway', value: 'the adapter is more consistent than its own training data', full: true },
      ],
    },
    {
      kind: 'rows', num: '04', title: 'Engineering notes',
      items: [
        { title: 'fp16 needed a fixed VAE', body: "SDXL's stock VAE produces NaNs in fp16, so every pipeline loads a patched VAE. On a T4, which has no bf16, that's what makes training possible at all." },
        { title: "Training loss isn't a quality signal", body: 'Per-step diffusion loss mostly reflects which noise level was sampled, so evaluation uses generated images on held-out scenes instead.' },
        { title: 'CLIP has to stay in its own space', body: "transformers 5 changed what CLIP's feature functions return. The harness applies the projections explicitly; otherwise it would compare 768-dim text against 1024-dim image states." },
        { title: 'Runs on a T4 or an L4', body: 'Two training scripts share steps, learning rate and schedule, and differ only in hardware flags: resolution, precision and 8-bit Adam.' },
      ],
    },
    {
      kind: 'limits',
      limitsLabel: '05 · Limitations',
      limits: [
        'Six images per setting, so gaps under about 0.05 are inconclusive',
        'SFace was trained on real photos; synthetic faces are out of distribution',
        'All twelve training images are frontal portraits with the same clothing',
        'One training run, one seed schedule, one base model',
      ],
      nextLabel: '06 · Next',
      next: [
        'Push the scale sweep above 1.0 and train past 800 steps',
        'Measure attribute leakage, like training clothing appearing in unrelated scenes',
        'A more diverse training set with multi-view generation or pose conditioning',
        'Add prior preservation and measure class drift',
      ],
    },
  ],
  card: {
    summary: 'Fine-tunes Stable Diffusion XL with DreamBooth-style LoRA so one character stays recognizable in a coffee shop, in space or in armor. A four-metric eval harness scores prompt fidelity and identity fidelity separately, and documents where it fails.',
    tags: ['PyTorch', 'Stable Diffusion XL', 'Diffusers', 'LoRA', 'CLIP · DINO'],
    flow: [{ label: 'SDXL (frozen)' }, { label: 'LoRA adapter', on: true }, { label: 'any scene' }, { label: 'CLIP-T · CLIP-I · DINO' }],
    flowJoin: ['+', '→', '→'],
    links: [{ label: 'Source', href: repo }],
  },
};
