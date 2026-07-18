/* =========================================================
   NEOTERIC — particles.js configuration
   Subtle yellow particle network on a black backdrop.
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
  if (typeof particlesJS === 'undefined') return;

  particlesJS('particles-js', {
    particles: {
      number: { value: 55, density: { enable: true, value_area: 900 } },
      color: { value: '#FFD400' },
      shape: { type: 'circle' },
      opacity: {
        value: 0.35,
        random: true,
        anim: { enable: true, speed: 0.4, opacity_min: 0.08, sync: false }
      },
      size: {
        value: 2.4,
        random: true,
        anim: { enable: false }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#FFD400',
        opacity: 0.12,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.6,
        direction: 'top',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'window',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: { distance: 160, line_linked: { opacity: 0.35 } },
        push: { particles_nb: 3 }
      }
    },
    retina_detect: true
  });
});
