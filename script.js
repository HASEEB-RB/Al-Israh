/* ============================================================
   AL-ISRAH PAINT — script.js
   ============================================================ */

'use strict';

// ── NAV SCROLL BEHAVIOUR ────────────────────────────────────
const header    = document.getElementById('site-header');
const navLinks  = document.getElementById('nav-links');
const hamburger = document.getElementById('hamburger');
const allNavA   = document.querySelectorAll('.nav-a');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Smooth-close nav on link click
allNavA.forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      allNavA.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-a[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => observer.observe(s));


// ── HERO SLIDER ANIMATION ───────────────────────────────────
const heroSlides = document.querySelectorAll('.hero-slide');
if (heroSlides.length > 0) {
  let currentSlide = 0;
  setInterval(() => {
    heroSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroSlides[currentSlide].classList.add('active');
  }, 3500); // Changes slide every 3.5 seconds
}


// ── COUNTER ANIMATION ───────────────────────────────────────
function animateCounter(el) {
  const target  = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step     = 16;
  const increment = target / (duration / step);
  let current = 0;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.round(current).toLocaleString();
  }, step);
}

const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      statObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => statObserver.observe(el));


// ── SCROLL FADE-UP ANIMATIONS ───────────────────────────────
const fadeEls = document.querySelectorAll('.product-card, .section-header, .why-feat, .contact-info-item, .stat-item');
fadeEls.forEach(el => el.classList.add('fade-up'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
fadeEls.forEach(el => fadeObserver.observe(el));


// ── COLOUR PALETTE DATA ─────────────────────────────────────
const colorData = {
  emulsion: [
    // Gold Series (2200 range)
    { name: 'Off White',       code: '2201', hex: '#F5F5EE' },
    { name: 'Cream',           code: '2202', hex: '#F5F0DC' },
    { name: 'Cockleshell',     code: '2203', hex: '#C8BDB0' },
    { name: 'Ash White',       code: '2204', hex: '#F0EDEA' },
    { name: 'Cameo',           code: '2205', hex: '#D9B9A0' },
    { name: 'Sand Stone',      code: '2206', hex: '#C0B49A' },
    { name: 'Lavender White',  code: '2207', hex: '#F5F4F8' },
    { name: 'Desert Willow',   code: '2208', hex: '#A89888' },
    { name: 'Spice',           code: '2209', hex: '#8B7060' },
    { name: 'Orange',          code: '2210', hex: '#E88040' },
    { name: 'Bright Red',      code: '2211', hex: '#D94050' },
    { name: 'Terracotta',      code: '2212', hex: '#9B6048' },
    { name: 'Forest Green',    code: '2213', hex: '#80C040' },
    { name: 'Apple Green',     code: '2214', hex: '#88D8A0' },
    { name: 'Ice Grey',        code: '2215', hex: '#C8DCE8' },
    { name: 'Poppy',           code: '2216', hex: '#B85060' },
    { name: 'Opal Lilac',      code: '2217', hex: '#E8E0F0' },
    { name: 'Lilac',           code: '2218', hex: '#C8B8D8' },
    { name: 'Jewel Blue',      code: '2219', hex: '#78C8D8' },
    // Special range (2220+)
    { name: 'Summer Pink',     code: '2220', hex: '#F8D8D8' },
    { name: 'Apricot Tone',    code: '2221', hex: '#F0C8A0' },
    { name: 'Beige',           code: '2222', hex: '#E8D8B8' },
    { name: 'Coffee',          code: '2223', hex: '#E8EEE0' },
    { name: 'Carnival Pink',   code: '2224', hex: '#C890A0' },
    { name: 'Moon Flower',     code: '2225', hex: '#F4F0E0' },
    { name: 'Cool Blue',       code: '2226', hex: '#C0D8E8' },
    { name: 'Royal Blue',      code: '2227', hex: '#3060A8' },
    { name: 'Leaf Green',      code: '2228', hex: '#808048' },
    { name: 'Apple White',     code: '2229', hex: '#F8F8F0' },
    { name: 'Orchid Shadow',   code: '2230', hex: '#D8D4E0' },
    { name: 'Star Dust',       code: '2231', hex: '#C8D8E8' },
    { name: 'Silver Mist',     code: '2232', hex: '#E0E8E0' },
  ],
  enamel: [
    { name: 'Off White',      code: '2001', hex: '#F8F5E8' },
    { name: 'Cream',          code: '2002', hex: '#F5F0D8' },
    { name: 'Lemon',          code: '2003', hex: '#F5D800' },
    { name: 'Golden Yellow',  code: '2004', hex: '#E8900A' },
    { name: 'Beige',          code: '2005', hex: '#C8B898' },
    { name: 'Orange',         code: '2006', hex: '#E06020' },
    { name: 'Signal Red',     code: '2007', hex: '#C01830' },
    { name: 'Red Oxide',      code: '2008', hex: '#883020' },
    { name: 'Golden Brown',   code: '2009', hex: '#8B4820' },
    { name: 'Dark Brown',     code: '2010', hex: '#3C1808' },
    { name: 'Smoke Grey',     code: '2011', hex: '#606870' },
    { name: 'Court Grey',     code: '2012', hex: '#A8B0B8' },
    { name: 'Dark Grey',      code: '2013', hex: '#404850' },
    { name: 'Light Blue',     code: '2014', hex: '#00A8C8' },
    { name: 'Vivid Blue',     code: '2015', hex: '#0060B8' },
    { name: 'Middle Blue',    code: '2016', hex: '#1838A0' },
    { name: 'Coriander',      code: '2017', hex: '#A09080' },
    { name: 'Adams Green',    code: '2018', hex: '#00B8A0' },
    { name: 'Emerald',        code: '2019', hex: '#00A870' },
    { name: 'Royal Green',    code: '2020', hex: '#006840' },
    { name: 'Spring Green',   code: '2021', hex: '#38A018' },
    { name: 'Scarab',         code: '2022', hex: '#005030' },
    // Gold Series enamel
    { name: 'Ash White',      code: '2126', hex: '#D8D8D0' },
    { name: 'Oyster',         code: '2127', hex: '#C0B8A8' },
    { name: 'Violet',         code: '2128', hex: '#202880' },
    { name: 'Pink',           code: '2129', hex: '#F0A8B0' },
    { name: 'Mauve',          code: '2130', hex: '#A890C0' },
    { name: 'Diyar',          code: '2131', hex: '#C89868' },
    { name: 'Pale Cream',     code: '2132', hex: '#F0E0C0' },
    { name: 'Terracotta',     code: '2133', hex: '#C07050' },
    { name: 'Cameo',          code: '2134', hex: '#E8C8A0' },
    { name: 'Black',          code: '2135', hex: '#1A1A1A' },
    { name: 'Pumice',         code: '2136', hex: '#E0E0E0' },
    // Metallic
    { name: 'Brilliant Green',code: '2161', hex: '#008050' },
    { name: 'Brown',          code: '2163', hex: '#705030' },
    { name: 'Copper',         code: '2164', hex: '#B87038' },
    { name: 'Deep Copper',    code: '2165', hex: '#905830' },
    { name: 'Ocean Blue',     code: '2166', hex: '#6090B0' },
    { name: 'Pale Green',     code: '2167', hex: '#80A878' },
    { name: 'Shamp Grey',     code: '2168', hex: '#909898' },
    { name: 'Fine Beige',     code: '2169', hex: '#C8B898' },
    { name: 'Bright Gold',    code: '2170', hex: '#C8A040' },
    { name: 'Black Pearl',    code: '2171', hex: '#202828' },
  ],
  weather: [
    { name: 'Off White',      code: '2401', hex: '#F8F6EE' },
    { name: 'Sugar Cane',     code: '2402', hex: '#EDE8D8' },
    { name: 'Magnolia',       code: '2403', hex: '#F8F5E0' },
    { name: 'Autumn Stone',   code: '2404', hex: '#F5F0D0' },
    { name: 'Cameo',          code: '2405', hex: '#DDB898' },
    { name: 'Beige',          code: '2406', hex: '#C8AB80' },
    { name: 'Fawn',           code: '2407', hex: '#C0A870' },
    { name: 'Sand Stone',     code: '2408', hex: '#B8A88A' },
    { name: 'Ash White',      code: '2409', hex: '#E8E4D8' },
    { name: 'Corel Cove',     code: '2410', hex: '#D8B898' },
    { name: 'Peach',          code: '2411', hex: '#E89060' },
    { name: 'Tea Rose',       code: '2412', hex: '#C0A0A8' },
    { name: 'Terracotta',     code: '2413', hex: '#B07058' },
    { name: 'Spice',          code: '2414', hex: '#908070' },
    { name: 'Red Oxide',      code: '2415', hex: '#9A5040' },
    { name: 'Tile Red',       code: '2416', hex: '#D04040' },
    { name: 'Apple Green',    code: '2417', hex: '#88C870' },
    { name: 'Forest Green',   code: '2418', hex: '#60C058' },
    { name: 'Sky Grey',       code: '2419', hex: '#C8D8E8' },
  ],
};

// Build colour grid
function buildColourGrid(tab) {
  const grid = document.getElementById('color-grid');
  const colours = colorData[tab] || [];
  grid.innerHTML = '';
  colours.forEach(c => {
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch';
    swatch.title = `${c.name} — Code: ${c.code}`;
    swatch.innerHTML = `
      <div class="swatch-color" style="background:${c.hex};"></div>
      <div class="swatch-name">${c.name}<br><small style="opacity:.6">${c.code}</small></div>
    `;
    swatch.addEventListener('click', () => {
      navigator.clipboard?.writeText(`${c.name} ${c.code}`).catch(()=>{});
      swatch.style.outline = '3px solid var(--gold-lt)';
      setTimeout(() => { swatch.style.outline = ''; }, 1200);
    });
    grid.appendChild(swatch);
  });
}

// Tab switching
const colorTabs = document.querySelectorAll('.color-tab');
colorTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    colorTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    buildColourGrid(tab.dataset.tab);
  });
});
buildColourGrid('emulsion'); // initial


// ── FAQ ACCORDION ──────────────────────────────────────────
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const btn = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  btn.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Close all other FAQs
    faqItems.forEach(otherItem => {
      otherItem.classList.remove('active');
      otherItem.querySelector('.faq-answer').style.maxHeight = null;
    });

    // Open the clicked FAQ if it wasn't already open
    if (!isActive) {
      item.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});


// ── CONTACT FORM ────────────────────────────────────────────
const form    = document.getElementById('contact-form');
const success = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('.btn-primary');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    success.classList.add('show');
    form.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
    setTimeout(() => success.classList.remove('show'), 5000);
  }, 900);
});
