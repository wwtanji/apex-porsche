import { gsap } from 'gsap';
import { LAUNCH_SECONDS, LAUNCH_TARGET_KMH, SELECTORS } from '../constants.js';
import { prefersReducedMotion } from '../shared/motion.js';

const SPEED_LINE_COUNT = 26;

function speedLinesMarkup() {
  return Array.from({ length: SPEED_LINE_COUNT }, (_, index) => {
    const top = (index * 37) % 100;
    const width = 18 + ((index * 53) % 40);
    const delay = ((index * 0.13) % 1).toFixed(2);
    return `<span style="top:${top}%; width:${width}vw; animation-delay:-${delay}s"></span>`;
  }).join('');
}

/**
 * Pins the launch scene and ties a full 0 to 100 km/h run to the scroll: the speed, the clock and the
 * road all accelerate together, finishing at the 911 Turbo S's 2.5 seconds.
 * @returns {void}
 */
export function initLaunch() {
  const section = document.querySelector(SELECTORS.launch);
  const speed = section.querySelector(SELECTORS.launchSpeed);
  const clock = section.querySelector(SELECTORS.launchTime);
  const lines = section.querySelector(SELECTORS.launchLines);
  const needle = section.querySelector(SELECTORS.launchNeedle);
  lines.innerHTML = speedLinesMarkup();
  if (prefersReducedMotion()) return;

  const run = { progress: 0 };
  const render = () => {
    const eased = 1 - Math.pow(1 - run.progress, 1.6);
    speed.textContent = String(Math.round(eased * LAUNCH_TARGET_KMH));
    clock.textContent = (run.progress * LAUNCH_SECONDS).toFixed(2);
    needle.style.transform = `scaleX(${eased})`;
    section.style.setProperty('--velocity', eased.toFixed(3));
  };
  render();

  gsap
    .timeline({
      scrollTrigger: { trigger: section, start: 'top top', end: '+=220%', pin: true, scrub: 0.4 },
    })
    .to(run, { progress: 1, ease: 'none', onUpdate: render }, 0)
    .fromTo(section.querySelector(SELECTORS.launchImage), { scale: 1.05 }, { scale: 1.55, ease: 'power2.in' }, 0);
}
