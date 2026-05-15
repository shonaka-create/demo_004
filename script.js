/* ============================================
   FENRIR INNOVATIONS - Main JavaScript
   ============================================ */

// Header scroll effect
const header = document.getElementById('header');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
};
window.addEventListener('scroll', onScroll, { passive: true });

// Hamburger / Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
let menuOpen = false;

const toggleMenu = (open) => {
  menuOpen = open;
  mobileNav.classList.toggle('open', open);
  const [s1, s2, s3] = hamburger.querySelectorAll('span');
  if (open) {
    s1.style.transform = 'rotate(45deg) translate(5px, 5px)';
    s2.style.opacity = '0';
    s3.style.transform = 'rotate(-45deg) translate(5px, -5px)';
    document.body.style.overflow = 'hidden';
  } else {
    s1.style.transform = s2.style.opacity = s3.style.transform = '';
    document.body.style.overflow = '';
  }
};

hamburger.addEventListener('click', () => toggleMenu(!menuOpen));
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

// Intersection Observer — animations
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('on');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fu, .fi, .stg').forEach(el => obs.observe(el));

// Hero elements animate on load
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .fu').forEach((el, i) => {
    setTimeout(() => el.classList.add('on'), 300 + i * 150);
  });
});

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
