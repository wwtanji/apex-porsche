export const SELECTORS = Object.freeze({
  hero: '[data-hero]',
  heroImage: '[data-hero-image]',
  heroTitle: '[data-hero-title]',
  heroShade: '[data-hero-shade]',
  heroPart: '[data-hero-part]',
  statement: '[data-statement]',
  models: '[data-models]',
  modelsTrack: '[data-models-track]',
  modelsProgress: '[data-models-progress]',
  modelSlide: '[data-model]',
  modelImage: '[data-model-image]',
  modelSpecs: '[data-model-specs]',
  spec: '[data-spec]',
  launch: '[data-launch]',
  launchImage: '[data-launch-image]',
  launchSpeed: '[data-launch-speed]',
  launchTime: '[data-launch-time]',
  launchLines: '[data-launch-lines]',
  launchNeedle: '[data-launch-needle]',
  reveal: '[data-reveal]',
  parallax: '[data-parallax]',
  counter: '[data-counter]',
  scrollLink: '[data-scroll-link]',
});

export const CLASS_SPLIT_PART = 'split-part';
export const CLASS_IS_READY = 'is-ready';

export const UNSPLASH_BASE = 'https://images.unsplash.com/photo-';
export const IMAGE_WIDTHS = [640, 1080, 1600, 2400];
export const IMAGE_QUALITY = 78;

export const LAUNCH_TARGET_KMH = 100;
export const LAUNCH_SECONDS = 2.5;
export const NUMBER_LOCALE = 'en-GB';

export const SIDEWAYS_QUERY = '(min-width: 901px) and (prefers-reduced-motion: no-preference)';
export const STACKED_MOTION_QUERY = '(max-width: 900px) and (prefers-reduced-motion: no-preference)';
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
