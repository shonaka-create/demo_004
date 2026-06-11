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

document.querySelectorAll('.fu, .fi, .stg, .foot-tagline-large').forEach(el => obs.observe(el));

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

/* ============================================
   PARTICLE NETWORK CANVAS
   ============================================ */
class ParticleNet {
  constructor(canvasId, opts = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.o = {
      count:     opts.count     || 70,
      maxDist:   opts.maxDist   || 140,
      color:     opts.color     || '201,162,74',
      speed:     opts.speed     || 0.35,
      minR:      opts.minR      || 1,
      maxR:      opts.maxR      || 2.5,
      lineAlpha: opts.lineAlpha || 0.35,
      dotAlpha:  opts.dotAlpha  || 0.75,
    };
    this.pts = [];
    this._raf = null;
    this._onResize = this._resize.bind(this);
    this._init();
  }

  _init() {
    this._resize();
    window.addEventListener('resize', this._onResize);
    for (let i = 0; i < this.o.count; i++) {
      this.pts.push({
        x:  Math.random() * this.canvas.width,
        y:  Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.o.speed,
        vy: (Math.random() - 0.5) * this.o.speed,
        r:  this.o.minR + Math.random() * (this.o.maxR - this.o.minR),
      });
    }
    this._raf = requestAnimationFrame(() => this._tick());
  }

  _resize() {
    const el = this.canvas.parentElement;
    this.canvas.width  = el ? el.offsetWidth  : window.innerWidth;
    this.canvas.height = el ? el.offsetHeight : window.innerHeight;
  }

  _tick() {
    const ctx = this.ctx;
    const W = this.canvas.width;
    const H = this.canvas.height;
    const c = this.o.color;

    ctx.clearRect(0, 0, W, H);

    for (const p of this.pts) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      else if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      else if (p.y > H) p.y = 0;
    }

    const d2 = this.o.maxDist * this.o.maxDist;
    for (let i = 0; i < this.pts.length; i++) {
      for (let j = i + 1; j < this.pts.length; j++) {
        const dx = this.pts[i].x - this.pts[j].x;
        const dy = this.pts[i].y - this.pts[j].y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < d2) {
          const alpha = (1 - Math.sqrt(dist2) / this.o.maxDist) * this.o.lineAlpha;
          ctx.strokeStyle = `rgba(${c},${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(this.pts[i].x, this.pts[i].y);
          ctx.lineTo(this.pts[j].x, this.pts[j].y);
          ctx.stroke();
        }
      }
    }

    for (const p of this.pts) {
      ctx.fillStyle = `rgba(${c},${this.o.dotAlpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    this._raf = requestAnimationFrame(() => this._tick());
  }

  destroy() {
    cancelAnimationFrame(this._raf);
    window.removeEventListener('resize', this._onResize);
  }
}

// Initialize canvases
window.addEventListener('DOMContentLoaded', () => {
  // Hero: gold particles, full background
  new ParticleNet('heroCanvas', {
    count: 90, maxDist: 155, color: '201,162,74',
    speed: 0.3, minR: 1, maxR: 2.8, lineAlpha: 0.32, dotAlpha: 0.7,
  });

  // Philosophy: denser gold, warmer glow
  new ParticleNet('phiCanvas', {
    count: 65, maxDist: 110, color: '201,162,74',
    speed: 0.25, minR: 1.2, maxR: 3.5, lineAlpha: 0.42, dotAlpha: 0.85,
  });

  // Platform: blue-tinted network
  new ParticleNet('platCanvas', {
    count: 55, maxDist: 125, color: '94,158,196',
    speed: 0.28, minR: 1, maxR: 2.5, lineAlpha: 0.35, dotAlpha: 0.72,
  });
});
