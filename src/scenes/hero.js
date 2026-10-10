import { gsap } from 'gsap';
import { CLASS_IS_READY, SELECTORS } from '../constants.js';
import { splitText } from '../shared/split-text.js';
import { prefersReducedMotion } from '../shared/motion.js';

/**
 * Starts on a single car at sunset. The letters of the title stretch out from narrow to wide, and scrolling
 * pushes the camera in while the light goes.
 * @returns {void}
 */
export function initHero() {
  document.body.classList.add(CLASS_IS_READY);
  if (prefersReducedMotion()) return;

  const letters = splitText(document.querySelector(SELECTORS.heroTitle), 'chars');
  gsap
    .timeline({ defaults: { ease: 'expo.out' } })
    .from(SELECTORS.heroImage, { scale: 1.25, duration: 3 }, 0)
    .from(SELECTORS.heroShade, { opacity: 1, duration: 2.4 }, 0)
    .from(letters, { yPercent: 100, fontVariationSettings: '"wdth" 62', duration: 1.6, stagger: 0.08 }, 0.4)
    .from(SELECTORS.heroPart, { autoAlpha: 0, y: 24, duration: 1.2, stagger: 0.1 }, 1);

  gsap
    .timeline({ scrollTrigger: { trigger: SELECTORS.hero, start: 'top top', end: 'bottom top', scrub: true } })
    .fromTo(SELECTORS.heroImage, { scale: 1 }, { scale: 1.3, ease: 'none', immediateRender: false }, 0)
    .to(SELECTORS.heroShade, { opacity: 0.85, ease: 'none' }, 0)
    .to(SELECTORS.heroTitle, { yPercent: 40, letterSpacing: '0.12em', ease: 'none' }, 0)
    .to(SELECTORS.heroPart, { autoAlpha: 0, ease: 'none', duration: 0.3 }, 0);
}
