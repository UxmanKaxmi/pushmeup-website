/* ============================================================
   PushMeUp: site behavior
   ============================================================ */

/**
 * CTA destinations come from js/config.js (window.PUSHMEUP_CONFIG) — that
 * is the single place to edit the links. Any element with [data-cta] is
 * wired here:
 *   - If a platform URL matches the visitor's device, use it.
 *   - Otherwise fall back to the signup form.
 *   - If everything is empty, CTAs scroll to the beta section.
 */
const CFG = window.PUSHMEUP_CONFIG || {};
const CTA_CONFIG = {
  ios: CFG.iosTestFlightUrl || '',
  android: CFG.androidBetaUrl || '',
  fallback: CFG.tallyFormUrl || '',
};

(function wireCtas() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);

  let target = CTA_CONFIG.fallback;
  if (isIOS && CTA_CONFIG.ios) target = CTA_CONFIG.ios;
  else if (isAndroid && CTA_CONFIG.android) target = CTA_CONFIG.android;

  document.querySelectorAll('[data-cta]').forEach((el) => {
    if (target) {
      el.setAttribute('href', target);
      if (/^https?:/i.test(target)) {
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
      }
    } else {
      el.setAttribute('href', '#beta');
    }
  });
})();

/* FAQ accordion */
document.querySelectorAll('.faq-item').forEach((item) => {
  const btn = item.querySelector('.faq-item__q');
  const panel = item.querySelector('.faq-item__a');

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');

    // Close others so only one answer is open at a time
    document.querySelectorAll('.faq-item.is-open').forEach((open) => {
      if (open !== item) {
        open.classList.remove('is-open');
        open.querySelector('.faq-item__q').setAttribute('aria-expanded', 'false');
        open.querySelector('.faq-item__a').style.maxHeight = '0px';
      }
    });

    item.classList.toggle('is-open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
    panel.style.maxHeight = isOpen ? '0px' : panel.scrollHeight + 'px';
  });
});

/* Header elevation once the page scrolls */
const header = document.querySelector('.header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* Scroll reveal: skipped entirely for reduced-motion users */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Live hero card: every few seconds someone "pushes" Maya's post:
   the button nudges, a +1 floats up, the newest tally bar flashes. */
if (!prefersReducedMotion) {
  const heroBtn = document.querySelector('.js-hero-push');
  const heroFoot = heroBtn && heroBtn.closest('.app-card__foot');
  const heroTally = heroFoot && heroFoot.querySelectorAll('.tally i');

  if (heroBtn && heroTally && heroTally.length) {
    const lastBar = heroTally[heroTally.length - 1];

    setInterval(() => {
      heroBtn.classList.add('is-nudged');
      lastBar.classList.add('is-flash');

      const pip = document.createElement('span');
      pip.className = 'push-pip';
      pip.textContent = '+1';
      pip.setAttribute('aria-hidden', 'true');
      heroFoot.appendChild(pip);
      pip.addEventListener('animationend', () => pip.remove());

      setTimeout(() => {
        heroBtn.classList.remove('is-nudged');
        lastBar.classList.remove('is-flash');
      }, 900);
    }, 4200);
  }
}

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  // Stagger children inside a .reveal-group so they cascade in
  document.querySelectorAll('.reveal-group').forEach((group) => {
    group.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.transitionDelay = i * 90 + 'ms';
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
}
