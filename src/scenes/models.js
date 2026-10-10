import { gsap } from 'gsap';
import { NUMBER_LOCALE, SELECTORS, SIDEWAYS_QUERY, STACKED_MOTION_QUERY } from '../constants.js';
import { MODELS } from '../data/models.js';
import { unsplashSrcset, unsplashUrl } from '../shared/unsplash.js';
import { prefersReducedMotion } from '../shared/motion.js';

function formatSpec(value, decimals) {
  return new Intl.NumberFormat(NUMBER_LOCALE, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);
}

function slideMarkup(model, index) {
  const specs = model.specs
    .map(
      (spec) => `
        <div class="spec">
          <dt>${spec.label}</dt>
          <dd><span data-spec data-value="${spec.value}" data-decimals="${spec.decimals}">${formatSpec(spec.value, spec.decimals)}</span><small>${spec.unit}</small></dd>
        </div>`,
    )
    .join('');
  return `
    <article class="model" id="${model.id}" data-model>
      <figure class="model__frame">
        <img data-model-image src="${unsplashUrl(model.photo.id, 1600)}" srcset="${unsplashSrcset(model.photo.id)}"
          sizes="(max-width: 900px) 100vw, 70vw" alt="${model.photo.alt}" loading="lazy" />
      </figure>
      <div class="model__copy">
        <p class="model__index">${String(index + 1).padStart(2, '0')} / ${String(MODELS.length).padStart(2, '0')}</p>
        <h3 class="model__name"><span>${model.line}</span>${model.name}</h3>
        <p class="model__drive">${model.drive}</p>
        <p class="model__text">${model.text}</p>
        <dl class="model__specs" data-model-specs>${specs}</dl>
      </div>
    </article>`;
}

function countSpecs(slide, scrollTrigger) {
  slide.querySelectorAll(SELECTORS.spec).forEach((element) => {
    const target = Number(element.dataset.value);
    const decimals = Number(element.dataset.decimals);
    const shown = { value: 0 };
    gsap.to(shown, {
      value: target,
      duration: 1.6,
      ease: 'power3.out',
      scrollTrigger,
      onUpdate: () => {
        element.textContent = formatSpec(shown.value, decimals);
      },
    });
  });
}

/**
 * Builds the model line-up. On wide screens it pins and drives sideways like a car passing the camera,
 * each figure counting up as its car arrives; on phones the cars simply stack.
 * @returns {void}
 */
export function initModels() {
  const section = document.querySelector(SELECTORS.models);
  const track = section.querySelector(SELECTORS.modelsTrack);
  const progress = section.querySelector(SELECTORS.modelsProgress);
  track.insertAdjacentHTML('beforeend', MODELS.map(slideMarkup).join(''));
  const slides = [...track.querySelectorAll(SELECTORS.modelSlide)];
  if (prefersReducedMotion()) return;

  const travelDistance = () => track.scrollWidth - window.innerWidth;
  const media = gsap.matchMedia();

  media.add(SIDEWAYS_QUERY, () => {
    const drive = gsap.to(track, {
      x: () => -travelDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${travelDistance()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: ({ progress: amount }) => {
          progress.style.transform = `scaleX(${amount})`;
        },
      },
    });

    slides.forEach((slide) => {
      gsap.fromTo(
        slide.querySelector(SELECTORS.modelImage),
        { xPercent: -10, scale: 1.15 },
        {
          xPercent: 10,
          scale: 1.15,
          ease: 'none',
          scrollTrigger: { trigger: slide, containerAnimation: drive, start: 'left right', end: 'right left', scrub: true },
        },
      );
      countSpecs(slide, { trigger: slide, containerAnimation: drive, start: 'left 60%' });
    });
  });

  media.add(STACKED_MOTION_QUERY, () => {
    slides.forEach((slide) => countSpecs(slide, { trigger: slide.querySelector(SELECTORS.modelSpecs), start: 'top 90%' }));
  });
}
