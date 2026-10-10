import { gsap } from 'gsap';
import { NUMBER_LOCALE, SELECTORS } from '../constants.js';
import { splitText } from '../shared/split-text.js';
import { prefersReducedMotion } from '../shared/motion.js';

/**
 * Lights the opening statement word by word, slides blocks in as they arrive, drifts framed photos against the
 * scroll and counts figures up the first time they are seen.
 * @returns {void}
 */
export function initReveals() {
  if (prefersReducedMotion()) return;

  const words = splitText(document.querySelector(SELECTORS.statement), 'words');
  gsap.fromTo(
    words,
    { opacity: 0.1 },
    {
      opacity: 1,
      stagger: 0.1,
      ease: 'none',
      scrollTrigger: { trigger: SELECTORS.statement, start: 'top 80%', end: 'bottom 45%', scrub: true },
    },
  );

  document.querySelectorAll(SELECTORS.reveal).forEach((element) => {
    gsap.from(element, {
      y: 70,
      autoAlpha: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: element, start: 'top 86%' },
    });
  });

  document.querySelectorAll(SELECTORS.parallax).forEach((image) => {
    gsap.fromTo(
      image,
      { yPercent: -12 },
      {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });

  const formatter = new Intl.NumberFormat(NUMBER_LOCALE);
  document.querySelectorAll(SELECTORS.counter).forEach((counter) => {
    const shown = { value: 0 };
    gsap.to(shown, {
      value: Number(counter.dataset.to),
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: counter, start: 'top 85%' },
      onUpdate: () => {
        counter.textContent = formatter.format(Math.round(shown.value));
      },
    });
  });
}
