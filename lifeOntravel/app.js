/**
 * Life On Travel — Main Application Script
 * Architecture: Module pattern, ES6+
 * Integrates: WordPress REST API, GSAP, Swiper.js
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────────
     CONFIG
  ───────────────────────────────────────────────────────────────── */
  const CONFIG = {
    DATA_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === ''
              ? './data.json' 
              : 'https://life-on-travel-backend.vercel.app/api/data',
    STORY_AUTO_ADVANCE: 4000,
  };

  /* Loaded once at startup, then shared across all modules */
  let SITE = {};
  window.SITE = SITE;

  /* ─────────────────────────────────────────────────────────────────
     DATA LOADER — fetches site data
  ───────────────────────────────────────────────────────────────── */
  async function fetchSiteData() {
    try {
      const r = await fetch(CONFIG.DATA_URL + (CONFIG.DATA_URL.includes('?') ? '&' : '?') + 'v=' + Date.now());
      if (!r.ok) throw new Error('Primary fetch failed');
      SITE = await r.json();
    } catch (e) {
      console.warn('Primary fetch failed, attempting alternate source:', e.message);
      // If we tried API and failed, try local file. If we tried local file and failed, try API (unlikely to work but safe)
      const altUrl = CONFIG.DATA_URL.startsWith('./') ? 'https://life-on-travel-backend.vercel.app/api/data' : './data.json';
      try {
        const r = await fetch(altUrl + '?v=' + Date.now());
        if (!r.ok) throw new Error('Alternate fetch failed');
        SITE = await r.json();
      } catch (e2) {
        console.error('Could not load site data from any source');
        SITE = FALLBACK;
      }
    }
  }

  /* ─── PLACEHOLDER (kept so nothing breaks during load) ─── */
  const FALLBACK = {
    destinations: [
      { id: 1, title: 'Jim Corbett', region: 'Uttarakhand, India', type: 'Tiger Reserve', duration: '3–5 Days', img: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=600&q=80', slug: 'jim-corbett' },
      { id: 2, title: 'Ranthambore', region: 'Rajasthan, India', type: 'National Park', duration: '2–4 Days', img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80', slug: 'ranthambore' },
      { id: 3, title: 'Kaziranga', region: 'Assam, India', type: 'UNESCO Heritage', duration: '3–5 Days', img: 'https://images.unsplash.com/photo-1504173010664-32509107de11?w=600&q=80', slug: 'kaziranga' },
      { id: 4, title: 'Sundarbans', region: 'West Bengal, India', type: 'Mangrove Delta', duration: '4–6 Days', img: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?w=600&q=80', slug: 'sundarbans' },
    ],
    packages: [
      {
        id: 1,
        title: 'The Corbett Immersion',
        type: 'Tiger Safari',
        desc: 'A six-day deep dive into the oldest national park in Asia. Encounter Bengal tigers, leopards, and over 600 bird species across diverse terrain.',
        duration: '6 Days / 5 Nights',
        groupSize: 'Up to 8',
        difficulty: 'Easy',
        price: '₹42,000',
        priceNote: '/person',
        img: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&q=80',
        featured: false,
        slug: 'corbett-immersion',
      },
      {
        id: 2,
        title: 'Ranthambore Royale',
        type: 'Luxury Safari',
        desc: 'Experience the majestic tigers of Ranthambore in supreme comfort. Private jeeps, luxury camp, expert naturalists guiding every hour of your adventure.',
        duration: '5 Days / 4 Nights',
        groupSize: 'Private (2–4)',
        difficulty: 'Easy',
        price: '₹78,000',
        priceNote: '/person',
        img: 'https://images.unsplash.com/photo-1470114716159-e389f8712fda?w=800&q=80',
        featured: true,
        slug: 'ranthambore-royale',
      },
      {
        id: 3,
        title: 'Northeast Wilderness',
        type: 'Multi-Park Expedition',
        desc: 'From one-horned rhinos in Kaziranga to rare birds in Manas — a cross-park adventure through India\'s pristine northeastern frontier.',
        duration: '8 Days / 7 Nights',
        groupSize: 'Up to 12',
        difficulty: 'Moderate',
        price: '₹55,000',
        priceNote: '/person',
        img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
        featured: false,
        slug: 'northeast-wilderness',
      },
    ],
    pricing: [
      {
        name: 'Explorer',
        desc: 'Perfect for solo travelers and small groups looking for guided adventure.',
        price: '28,000',
        currency: '₹',
        period: 'per person',
        features: [
          { text: 'Shared jeep safari (6-seater)', inc: true },
          { text: '3 safari drives included', inc: true },
          { text: 'Expert naturalist guide', inc: true },
          { text: 'Camp accommodation', inc: true },
          { text: 'All meals included', inc: true },
          { text: 'Airport transfers', inc: false },
          { text: 'Private vehicle', inc: false },
        ],
        recommended: false,
        cta: 'Book Explorer',
      },
      {
        name: 'Signature',
        desc: 'Our most popular package. Curated for couples and discerning travelers.',
        price: '55,000',
        currency: '₹',
        period: 'per person',
        features: [
          { text: 'Private jeep safari (exclusive)', inc: true },
          { text: '5 safari drives included', inc: true },
          { text: 'Senior naturalist guide', inc: true },
          { text: 'Luxury tent accommodation', inc: true },
          { text: 'All meals + sundowner', inc: true },
          { text: 'Airport transfers', inc: true },
          { text: 'Wildlife photo sessions', inc: true },
        ],
        recommended: true,
        cta: 'Book Signature',
      },
      {
        name: 'Elite',
        desc: 'Ultimate bespoke luxury. Every element personalised, nothing left to chance.',
        price: '1,20,000',
        currency: '₹',
        period: 'per person',
        features: [
          { text: 'Full private concierge', inc: true },
          { text: 'Unlimited safari drives', inc: true },
          { text: 'Chief naturalist + researcher', inc: true },
          { text: 'Premium jungle lodge', inc: true },
          { text: 'Gourmet dining, all meals', inc: true },
          { text: 'Heli transfers available', inc: true },
          { text: 'Custom itinerary design', inc: true },
        ],
        recommended: false,
        cta: 'Enquire Elite',
      },
    ],
    gallery: [
      { id:1, src:'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=600&q=80', alt:'Tiger at dawn', caption:'Bengal Tiger, Jim Corbett' },
      { id:2, src:'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=600&q=80', alt:'Elephant herd', caption:'Elephant Herd, Corbett' },
      { id:3, src:'https://images.unsplash.com/photo-1530126483408-aa533e55bdb2?w=600&q=80', alt:'Leopard on branch', caption:'Leopard at rest' },
      { id:4, src:'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80', alt:'African savannah', caption:'Savannah at sunset' },
      { id:5, src:'https://images.unsplash.com/photo-1504173010664-32509107de11?w=600&q=80', alt:'Dense jungle', caption:'Jungle canopy, Assam' },
      { id:6, src:'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', alt:'Wildlife at dusk', caption:'Golden hour safari' },
      { id:7, src:'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80', alt:'Forest path', caption:'Morning game drive' },
      { id:8, src:'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?w=600&q=80', alt:'River safari', caption:'Boat safari, Sundarbans' },
      { id:9, src:'https://images.unsplash.com/photo-1470114716159-e389f8712fda?w=600&q=80', alt:'Bird watching', caption:'Dawn birding' },
      { id:10, src:'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=600&q=80', alt:'Night sky', caption:'Stargazing camp' },
      { id:11, src:'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600&q=80', alt:'Misty morning', caption:'Misty dawn, Corbett' },
      { id:12, src:'https://images.unsplash.com/photo-1568034897208-da0d3b1e08cd?w=600&q=80', alt:'Jungle camp', caption:'Forest camp retreat' },
    ],
    stories: [
      {
        id: 1,
        title: 'Dawn of the Tiger',
        label: 'Jim Corbett',
        cover: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=400&q=80',
        slides: [
          { img: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=900&q=80', title: 'Dawn of the Tiger', text: 'The forest holds its breath as first light breaks over the Ramganga. Every shadow could hold the secret we seek.' },
          { img: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=900&q=80', title: 'The Misty Hour', text: 'At 5 AM, the jungle comes alive. The air carries the scent of wet earth and the distant call of a spotted deer.' },
          { img: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=900&q=80', title: 'The Encounter', text: 'She emerges from the sal forest, unhurried, magnificent. A Bengal tigress — and she is watching us as closely as we watch her.' },
        ],
      },
      {
        id: 2,
        title: 'Rhino Country',
        label: 'Kaziranga',
        cover: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&q=80',
        slides: [
          { img: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=900&q=80', title: 'One-Horned Giants', text: 'Kaziranga is home to two-thirds of the world\'s one-horned rhinoceros population. This ancient world feels untouched by time.' },
          { img: 'https://images.unsplash.com/photo-1504173010664-32509107de11?w=900&q=80', title: 'Flood Plains & Forest', text: 'The Brahmaputra floodplains transform every monsoon, reshaping the landscape that these giants have called home for millennia.' },
        ],
      },
      {
        id: 3,
        title: 'Night in the Delta',
        label: 'Sundarbans',
        cover: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?w=400&q=80',
        slides: [
          { img: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?w=900&q=80', title: 'Mangrove Maze', text: 'The Sundarbans is the world\'s largest mangrove forest, where channels weave like veins through the green delta.' },
          { img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&q=80', title: 'The Elusive King', text: 'The swimming tiger of the Sundarbans is unlike any other. An apex predator at home in both water and forest.' },
        ],
      },
      {
        id: 4,
        title: 'Wings Over Corbett',
        label: 'Bird Safari',
        cover: 'https://images.unsplash.com/photo-1470114716159-e389f8712fda?w=400&q=80',
        slides: [
          { img: 'https://images.unsplash.com/photo-1470114716159-e389f8712fda?w=900&q=80', title: 'Wings Over Corbett', text: 'Over 600 avian species call Jim Corbett home. For birders, it is paradise on earth.' },
        ],
      },
      {
        id: 5,
        title: 'Leopard of Ranthambore',
        label: 'Big Cat Safari',
        cover: 'https://images.unsplash.com/photo-1530126483408-aa533e55bdb2?w=400&q=80',
        slides: [
          { img: 'https://images.unsplash.com/photo-1530126483408-aa533e55bdb2?w=900&q=80', title: 'The Ghost Cat', text: 'Silent and near-invisible against the rocky terrain, the leopard of Ranthambore embodies the mystery of the wild.' },
          { img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=80', title: 'Rocky Kingdom', text: 'The ancient fort of Ranthambore watches over a kingdom of feline royalty.' },
        ],
      },
    ],
    testimonials: [
      { id:1, text:'Life On Travel redefined what I thought a safari could be. Our naturalist guide had a story for every rustling leaf. The encounter with a tigress and her cubs will remain etched in memory forever.', name:'Priya Malhotra', meta:'Mumbai · Jim Corbett, 2024', avatar:'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80', stars:5 },
      { id:2, text:'From the moment we arrived, every detail was immaculate. The private jeep, the gourmet picnic breakfast deep in the forest, the sunset at the watering hole — nothing felt like a package tour. It felt like it was made just for us.', name:'Rahul & Sneha Kapoor', meta:'Delhi · Ranthambore, 2024', avatar:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', stars:5 },
      { id:3, text:'As a wildlife photographer, I\'ve been on dozens of safaris. Life On Travel stands apart because they understand light, behavior, and timing. I returned with photographs I could never have gotten elsewhere.', name:'Arjun Menon', meta:'Bangalore · Kaziranga, 2023', avatar:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80', stars:5 },
      { id:4, text:'The Sundarbans night river cruise alone was worth the entire trip. We drifted silently through the mangroves under a full moon, and our guide spotted a tiger on the bank 40 metres away. Extraordinary.', name:'Sarah Thompson', meta:'London · Sundarbans, 2024', avatar:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', stars:5 },
    ],
    posts: [
      { id:1, title:'The Art of Reading Tiger Pug Marks', category:'Field Notes', excerpt:'Before you see the tiger, the forest tells you where it has been. Understanding animal tracks transforms a safari from a game drive into a conversation with the wild.', date:'March 15, 2025', img:'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=800&q=80', slug:'tiger-pug-marks' },
      { id:2, title:'Why Kaziranga Floods are a Gift to Wildlife', category:'Ecology', excerpt:'Every monsoon, the Brahmaputra reclaims its floodplains. For the one-horned rhinoceros and its neighbours, this seasonal chaos is a renewal as ancient as the species themselves.', date:'February 28, 2025', img:'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&q=80', slug:'kaziranga-floods' },
      { id:3, title:'The Best Time to Visit India\'s Tiger Reserves', category:'Travel Guide', excerpt:'Timing your safari makes all the difference between a fleeting glimpse and an unforgettable encounter. Our naturalists break down the seasons across seven reserves.', date:'January 10, 2025', img:'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80', slug:'best-time-tiger-safari' },
    ],
  };

  /* ─────────────────────────────────────────────────────────────────
     UTILITIES
  ───────────────────────────────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  function lazyLoadImage(el) {
    if (!el) return;
    const src = el.dataset.src;
    const bg = el.dataset.bg;
    if (!src && !bg) return;
    
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          target.classList.add('is-loading');
          
          const onLoad = () => {
            target.classList.remove('is-loading');
            target.classList.add('is-loaded');
          };

          if (target.dataset.src) {
            const img = new Image();
            img.src = target.dataset.src;
            img.onload = () => {
              target.src = target.dataset.src;
              target.removeAttribute('data-src');
              onLoad();
            };
          }
          if (target.dataset.bg) {
            const img = new Image();
            img.src = target.dataset.bg;
            img.onload = () => {
              target.style.backgroundImage = `url('${target.dataset.bg}')`;
              target.removeAttribute('data-bg');
              onLoad();
            };
          }
          obs.unobserve(target);
        }
      });
    }, { rootMargin: '200px' });
    observer.observe(el);
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function stripHTML(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  /* ─────────────────────────────────────────────────────────────────
     NAVBAR MODULE
  ───────────────────────────────────────────────────────────────── */
  const NavbarModule = {
    init() {
      const nav = $('#navbar');
      const burger = $('.navbar__burger');
      const menu = $('#mobile-menu');
      const links = $$('.mobile-menu a');

      let lastScrollY = window.scrollY;
      window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Hide on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          nav.classList.add('is-hidden');
        } else {
          nav.classList.remove('is-hidden');
        }
        
        nav.classList.toggle('is-compact', currentScrollY > 60);
        
        lastScrollY = currentScrollY;
        BackTopModule.toggle(currentScrollY > 500);
      }, { passive: true });

      burger?.addEventListener('click', () => {
        const open = burger.classList.toggle('is-open');
        burger.setAttribute('aria-expanded', open);
        if (open) {
          menu.hidden = false;
          document.body.style.overflow = 'hidden';
        } else {
          menu.hidden = true;
          document.body.style.overflow = '';
        }
      });

      links.forEach(link => {
        link.addEventListener('click', () => {
          menu.hidden = true;
          burger.classList.remove('is-open');
          burger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
    },
  };

  /* ─────────────────────────────────────────────────────────────────
     HERO MODULE
  ───────────────────────────────────────────────────────────────── */
  const HeroModule = {
    swiper: null,
    init() {
      this.swiper = new Swiper('#heroCarousel', {
        loop: true,
        autoplay: { delay: 6000, disableOnInteraction: false },
        speed: 1400,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        pagination: { el: '.hero__pagination', clickable: true },
      });
    },
  };

  /* ─────────────────────────────────────────────────────────────────
     COUNTER MODULE
  ───────────────────────────────────────────────────────────────── */
  const CounterModule = {
    init() {
      const nums = $$('[data-count]');
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const dur = 1800;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.floor(eased * target).toLocaleString('en-IN');
            if (t < 1) requestAnimationFrame(tick);
            else el.textContent = target.toLocaleString('en-IN');
          };
          requestAnimationFrame(tick);
          obs.unobserve(el);
        });
      }, { threshold: 0.5 });
      nums.forEach(n => obs.observe(n));
    },
  };

  /* ─────────────────────────────────────────────────────────────────
     DESTINATIONS MODULE
  ───────────────────────────────────────────────────────────────── */
  const DestinationsModule = {
    async init() {
      const grid = $('#destinationsGrid');
      if (!grid) return;

      // Section header text from data.json
      const sec = SITE.destinations || {};
      const hdr = grid.closest('section');
      if (hdr) {
        const ey = hdr.querySelector('.section__eyebrow'); if (ey && sec.sectionEyebrow) ey.textContent = sec.sectionEyebrow;
        const tt = hdr.querySelector('.section__title');   if (tt && sec.sectionTitle)   tt.textContent = sec.sectionTitle;
        const ds = hdr.querySelector('.section__desc');    if (ds && sec.sectionDesc)    ds.textContent = sec.sectionDesc;
        const va = hdr.querySelector('.section__footer a'); if (va) { if (sec.viewAllLabel) va.textContent = sec.viewAllLabel; if (sec.viewAllHref) va.href = sec.viewAllHref; }
      }

      const raw = Array.isArray(sec) ? sec : (sec.items || FALLBACK.destinations);
      const data = raw.map(d => ({ ...d, img: d.image || d.img || d.url || '' }));

      grid.innerHTML = data.map((d, i) => `
        <article class="dest-card" data-reveal style="transition-delay:${i * 0.1}s" role="listitem">
          <a href="destination.html?slug=${d.slug}" aria-label="Explore ${d.title}">
            <div class="dest-card__img-wrap">
              <img class="dest-card__img"
                   data-src="${d.img}"
                   src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
                   alt="${d.title} safari destination"
                   loading="lazy" />
            </div>
            <div class="dest-card__overlay"></div>
            <div class="dest-card__body">
              <span class="dest-card__label">${d.type}</span>
              <h3 class="dest-card__title">${d.title}</h3>
              <div class="dest-card__meta">
                <span>${d.region}</span>
                <span>${d.duration}</span>
              </div>
            </div>
            <div class="dest-card__arrow" aria-hidden="true">→</div>
          </a>
        </article>
      `).join('');

      $$('[data-src]', grid).forEach(lazyLoadImage);
      RevealModule.observe();
    },
  };

  /* ─────────────────────────────────────────────────────────────────
     PACKAGES MODULE
  ───────────────────────────────────────────────────────────────── */
  const PackagesModule = {
    async init() {
      const grid = $('#packagesGrid');
      if (!grid) return;

      const sec = SITE.packages || {};
      const hdr = grid.closest('section');
      if (hdr) {
        const ey = hdr.querySelector('.section__eyebrow'); if (ey && sec.sectionEyebrow) ey.textContent = sec.sectionEyebrow;
        const tt = hdr.querySelector('.section__title');   if (tt && sec.sectionTitle)   tt.textContent = sec.sectionTitle;
        const ds = hdr.querySelector('.section__desc');    if (ds && sec.sectionDesc)    ds.textContent = sec.sectionDesc;
      }

      const raw = Array.isArray(sec) ? sec : (sec.items || FALLBACK.packages);
      const data = raw.map(p => ({ ...p, img: p.image || p.img || p.url || '', desc: p.description || p.desc || '' }));

      grid.innerHTML = data.map((p, i) => `
        <article class="pkg-card${p.featured ? ' pkg-card--featured' : ''}" data-reveal style="transition-delay:${i * 0.15}s">
          <div class="pkg-card__img-wrap">
            <img class="pkg-card__img"
                 data-src="${p.img}"
                 src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
                 alt="${p.title}"
                 loading="lazy" />
            ${p.featured ? '<span class="pkg-card__badge">Most Popular</span>' : ''}
          </div>
          <div class="pkg-card__body">
            <span class="pkg-card__type">${p.type}</span>
            <h3 class="pkg-card__title">${p.title}</h3>
            <p class="pkg-card__desc">${p.desc}</p>
            <div class="pkg-card__meta">
              <div class="pkg-card__meta-item">
                <span class="pkg-card__meta-label">Duration</span>
                <span class="pkg-card__meta-val">${p.duration}</span>
              </div>
              <div class="pkg-card__meta-item">
                <span class="pkg-card__meta-label">Group</span>
                <span class="pkg-card__meta-val">${p.groupSize}</span>
              </div>
              <div class="pkg-card__meta-item">
                <span class="pkg-card__meta-label">Level</span>
                <span class="pkg-card__meta-val">${p.difficulty}</span>
              </div>
            </div>
            <div class="pkg-card__footer">
              <div class="pkg-card__price">
                <span class="pkg-card__price-from">From</span>
                <span class="pkg-card__price-val">${p.price}</span>
                <span class="pkg-card__price-per">${p.priceNote}</span>
              </div>
              <a href="package.html?slug=${p.slug}" class="btn btn--primary btn--sm">View Details</a>
            </div>
          </div>
        </article>
      `).join('');

      $$('[data-src]', grid).forEach(lazyLoadImage);
      RevealModule.observe();
    },
  };

  /* ─────────────────────────────────────────────────────────────────
     PRICING MODULE
  ───────────────────────────────────────────────────────────────── */
  const PricingModule = {
    async init() {
      const grid = $('#pricingGrid');
      if (!grid) return;

      const sec = SITE.pricing || {};
      const hdr = grid.closest('section');
      if (hdr) {
        const ey = hdr.querySelector('.section__eyebrow'); if (ey && sec.sectionEyebrow) ey.textContent = sec.sectionEyebrow;
        const tt = hdr.querySelector('.section__title');   if (tt && sec.sectionTitle)   tt.textContent = sec.sectionTitle;
        const ds = hdr.querySelector('.section__desc');    if (ds && sec.sectionDesc)    ds.textContent = sec.sectionDesc;
      }

      const rawPlans = Array.isArray(sec) ? sec : (sec.plans || sec.items || FALLBACK.pricing);
      // Normalise field names (data.json uses 'included', FALLBACK uses 'inc')
      const data = rawPlans.map(p => ({
        ...p,
        desc: p.description || p.desc || '',
        cta:  p.ctaLabel    || p.cta  || 'Book Now',
        price: p.price      || p.amount || '0',
        features: (p.features || []).map(f => {
          if (typeof f === 'string') return { text: f, inc: true };
          return { text: f.text, inc: f.included !== undefined ? f.included : (f.inc !== undefined ? f.inc : true) };
        }),
      }));

      grid.innerHTML = data.map((p, i) => `
        <div class="price-card${p.recommended ? ' price-card--recommended' : ''}" data-reveal style="transition-delay:${i * 0.1}s">
          ${p.recommended ? '<div class="price-card__ribbon">Recommended</div>' : ''}
          <h3 class="price-card__name">${p.name}</h3>
          <p class="price-card__desc">${p.desc}</p>
          <div class="price-card__amount">
            <span class="price-card__currency">${p.currency}</span>
            <span class="price-card__num">${p.price}</span>
          </div>
          <span class="price-card__period">${p.period}</span>
          <div class="price-card__divider"></div>
          <ul class="price-card__features">
            ${p.features.map(f => `
              <li class="price-card__feature${f.inc ? '' : ' price-card__feature--off'}">
                <span class="price-card__check">${f.inc ? '✓' : '✕'}</span>
                ${f.text}
              </li>
            `).join('')}
          </ul>
          <a href="#contact" class="btn btn--${p.recommended ? 'primary' : 'outline'}" style="width:100%;justify-content:center">${p.cta}</a>
        </div>
      `).join('');

      RevealModule.observe();
    },
  };

  /* ─────────────────────────────────────────────────────────────────
     GALLERY MODULE
  ───────────────────────────────────────────────────────────────── */
  const GalleryModule = {
    items: [],
    activeIndex: 0,

    async init() {
      const grid = $('#galleryGrid');
      if (!grid) return;

      const sec = SITE.gallery || {};
      const hdr = grid.closest('section');
      if (hdr) {
        const ey = hdr.querySelector('.section__eyebrow'); if (ey && sec.sectionEyebrow) ey.textContent = sec.sectionEyebrow;
        const tt = hdr.querySelector('.section__title');   if (tt && sec.sectionTitle)   tt.textContent = sec.sectionTitle;
      }

      const raw = Array.isArray(sec) ? sec : (sec.items || FALLBACK.gallery);
      const data = raw.map(g => ({ ...g, src: g.image || g.src || g.url || '' }));

      this.items = data;
      grid.innerHTML = data.map((item, i) => `
        <div class="gallery__item" data-index="${i}" tabindex="0" role="button" aria-label="View ${item.alt}">
          <img data-src="${item.src}"
               src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
               alt="${item.alt}"
               loading="lazy"
               style="aspect-ratio:${i % 3 === 0 ? '3/4' : i % 5 === 0 ? '1/1' : '4/3'}" />
          <div class="gallery__item-overlay">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"/><path d="M11 8v6M8 11h6"/></svg>
          </div>
        </div>
      `).join('');

      $$('[data-src]', grid).forEach(lazyLoadImage);
      grid.addEventListener('click', e => {
        const item = e.target.closest('.gallery__item');
        if (item) this.openLightbox(parseInt(item.dataset.index, 10));
      });
      grid.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          const item = e.target.closest('.gallery__item');
          if (item) this.openLightbox(parseInt(item.dataset.index, 10));
        }
      });

      this.initLightbox();
    },

    initLightbox() {
      const lb = $('#lightbox');
      const img = lb?.querySelector('.lightbox__img');
      const cap = lb?.querySelector('.lightbox__caption');
      const close = lb?.querySelector('.lightbox__close');
      const prev = lb?.querySelector('.lightbox__prev');
      const next = lb?.querySelector('.lightbox__next');

      close?.addEventListener('click', () => this.closeLightbox());
      prev?.addEventListener('click', () => this.navigate(-1));
      next?.addEventListener('click', () => this.navigate(1));
      lb?.addEventListener('click', e => { if (e.target === lb) this.closeLightbox(); });

      document.addEventListener('keydown', e => {
        if (!lb || lb.hidden) return;
        if (e.key === 'Escape') this.closeLightbox();
        if (e.key === 'ArrowLeft') this.navigate(-1);
        if (e.key === 'ArrowRight') this.navigate(1);
      });
    },

    openLightbox(index) {
      const lb = $('#lightbox');
      if (!lb) return;
      this.activeIndex = index;
      this.updateLightbox();
      lb.hidden = false;
      document.body.style.overflow = 'hidden';
    },

    closeLightbox() {
      const lb = $('#lightbox');
      if (!lb) return;
      lb.hidden = true;
      document.body.style.overflow = '';
    },

    navigate(dir) {
      this.activeIndex = (this.activeIndex + dir + this.items.length) % this.items.length;
      this.updateLightbox();
    },

    updateLightbox() {
      const lb = $('#lightbox');
      const item = this.items[this.activeIndex];
      if (!lb || !item) return;
      const img = lb.querySelector('.lightbox__img');
      const cap = lb.querySelector('.lightbox__caption');
      if (img) { img.src = item.src; img.alt = item.alt; }
      if (cap) cap.textContent = item.caption;
    },
  };

  /* ─────────────────────────────────────────────────────────────────
     STORIES MODULE
  ───────────────────────────────────────────────────────────────── */
  const StoriesModule = {
    storyData: [],
    activeStory: null,
    activeSlide: 0,
    timer: null,
    progressTimers: [],

    async init() {
      const scroll = $('#storiesScroll');
      if (!scroll) return;

      const sec = SITE.stories || {};
      const hdr = scroll.closest('section');
      if (hdr) {
        const ey = hdr.querySelector('.section__eyebrow'); if (ey && sec.sectionEyebrow) ey.textContent = sec.sectionEyebrow;
        const tt = hdr.querySelector('.section__title');   if (tt && sec.sectionTitle)   tt.textContent = sec.sectionTitle;
      }

      const raw = Array.isArray(sec) ? sec : (sec.items || FALLBACK.stories);
      const data = raw.map(s => ({ ...s, cover: s.coverImage || s.cover || s.image || '' }));

      this.storyData = data;
      scroll.innerHTML = data.map((s, i) => `
        <div class="story-card" data-story="${i}" role="button" tabindex="0" aria-label="View story: ${s.title}">
          <div class="story-card__ring">
            <img data-src="${s.cover}" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E" alt="${s.title}" loading="lazy" class="story-card__img" />
            <div class="story-card__overlay">
              <span class="story-card__title">${s.title}</span>
              <span class="story-card__label">${s.label}</span>
            </div>
          </div>
        </div>
      `).join('');

      $$('[data-src]', scroll).forEach(lazyLoadImage);

      scroll.addEventListener('click', e => {
        const card = e.target.closest('.story-card');
        if (card) this.openStory(parseInt(card.dataset.story, 10));
      });

      this.initModal();
      this.startAutoScroll(scroll);
    },

    autoScrollTimer: null,
    startAutoScroll(scroll) {
      if (!scroll) return;
      this.autoScrollTimer = setInterval(() => {
        // Pause scrolling if user is hovering over the stories
        if (scroll.matches(':hover')) return;
        
        const cardWidth = scroll.querySelector('.story-card')?.offsetWidth || 160;
        const gap = 20; // Approx 1.25rem
        const scrollAmount = cardWidth + gap;

        if (scroll.scrollLeft + scroll.clientWidth >= scroll.scrollWidth - 10) {
          scroll.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }, 3500);
    },

    initModal() {
      const modal = $('#storyModal');
      const closeBtn = modal?.querySelector('.story-modal__close');
      const prevArea = modal?.querySelector('.story-modal__prev');
      const nextArea = modal?.querySelector('.story-modal__next');

      closeBtn?.addEventListener('click', () => this.closeStory());
      prevArea?.addEventListener('click', () => this.prevSlide());
      nextArea?.addEventListener('click', () => this.nextSlide());

      document.addEventListener('keydown', e => {
        if (!modal || modal.hidden) return;
        if (e.key === 'Escape') this.closeStory();
        if (e.key === 'ArrowLeft') this.prevSlide();
        if (e.key === 'ArrowRight') this.nextSlide();
      });
    },

    openStory(index) {
      const modal = $('#storyModal');
      if (!modal) return;
      this.activeStory = this.storyData[index];
      this.activeSlide = 0;
      this.buildSlides();
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      this.startProgress();
    },

    closeStory() {
      const modal = $('#storyModal');
      if (!modal) return;
      modal.hidden = true;
      document.body.style.overflow = '';
      this.clearTimer();
    },

    buildSlides() {
      const container = $('#storySlides');
      const progress = $('#storyProgress');
      const story = this.activeStory;
      if (!container || !story) return;

      container.innerHTML = story.slides.map((s, i) => `
        <div class="story-modal__slide${i === 0 ? ' is-active' : ''}" style="background-image:url('${s.img}')">
          <div class="story-modal__slide-overlay"></div>
          <div class="story-modal__slide-content">
            <h3 class="story-modal__slide-title">${s.title}</h3>
            <p class="story-modal__slide-text">${s.text}</p>
          </div>
        </div>
      `).join('');

      progress.innerHTML = story.slides.map((_, i) => `
        <div class="progress-bar${i === 0 ? '' : ''}">
          <div class="progress-bar__fill"></div>
        </div>
      `).join('');
    },

    goToSlide(index) {
      const slides = $$('.story-modal__slide', $('#storySlides'));
      slides.forEach((s, i) => s.classList.toggle('is-active', i === index));

      const bars = $$('.progress-bar', $('#storyProgress'));
      bars.forEach((b, i) => {
        const fill = b.querySelector('.progress-bar__fill');
        if (i < index) { fill.style.transition = 'none'; fill.style.width = '100%'; b.classList.add('is-done'); }
        else if (i === index) { fill.style.transition = 'none'; fill.style.width = '0%'; b.classList.remove('is-done'); }
        else { fill.style.transition = 'none'; fill.style.width = '0%'; b.classList.remove('is-done'); }
      });
    },

    startProgress() {
      this.clearTimer();
      this.goToSlide(this.activeSlide);
      const bars = $$('.progress-bar', $('#storyProgress'));
      const bar = bars[this.activeSlide];
      if (!bar) return;
      const fill = bar.querySelector('.progress-bar__fill');
      fill.style.transition = `width ${CONFIG.STORY_AUTO_ADVANCE}ms linear`;
      fill.style.width = '100%';

      this.timer = setTimeout(() => this.nextSlide(), CONFIG.STORY_AUTO_ADVANCE);
    },

    nextSlide() {
      const total = this.activeStory?.slides.length || 0;
      if (this.activeSlide < total - 1) {
        this.activeSlide++;
        this.startProgress();
      } else {
        this.closeStory();
      }
    },

    prevSlide() {
      if (this.activeSlide > 0) {
        this.activeSlide--;
        this.startProgress();
      }
    },

    clearTimer() {
      if (this.timer) { clearTimeout(this.timer); this.timer = null; }
    },
  };

  /* ─────────────────────────────────────────────────────────────────
     TESTIMONIALS MODULE
  ───────────────────────────────────────────────────────────────── */
  const TestimonialsModule = {
    swiper: null,

    async init() {
      const slides = $('#testimonialsSlides');
      if (!slides) return;

      const sec = SITE.testimonials || {};
      const hdr = slides.closest('section');
      if (hdr) {
        const ey = hdr.querySelector('.section__eyebrow'); if (ey && sec.sectionEyebrow) ey.textContent = sec.sectionEyebrow;
        const tt = hdr.querySelector('.section__title');   if (tt && sec.sectionTitle)   tt.textContent = sec.sectionTitle;
      }

      const data = Array.isArray(sec) ? sec : (sec.items || FALLBACK.testimonials);

      slides.innerHTML = data.map(t => `
        <div class="swiper-slide">
          <div class="testi-card">
            <div class="testi-card__quote">"</div>
            <blockquote class="testi-card__text">${t.text}</blockquote>
            <div class="testi-card__author">
              ${t.avatar || t.image || t.img ? `<img class="testi-card__avatar" data-src="${t.avatar || t.image || t.img}" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E" alt="${t.name || t.author}" loading="lazy" />` : ''}
              <div>
                <div class="testi-card__stars">${'★'.repeat(t.stars || 5)}</div>
                <div class="testi-card__name">${t.name || t.author || 'Guest'}</div>
                <div class="testi-card__meta">${t.meta || ''}</div>
              </div>
            </div>
          </div>
        </div>
      `).join('');

      $$('[data-src]', slides).forEach(lazyLoadImage);

      this.swiper = new Swiper('#testimonialsSwiper', {
        loop: data.length > 2,
        autoplay: { delay: 5500, disableOnInteraction: false },
        speed: 800,
        slidesPerView: 1,
        spaceBetween: 24,
        breakpoints: {
          640: { slidesPerView: 1.2 },
          900: { slidesPerView: 2 },
          1100: { slidesPerView: 2.5 },
        },
        pagination: { el: '.testimonials__pagination', clickable: true },
      });
    },
  };

  /* ─────────────────────────────────────────────────────────────────
     BLOG MODULE
  ───────────────────────────────────────────────────────────────── */
  const BlogModule = {
    async init() {
      const grid = $('#blogGrid');
      if (!grid) return;

      const sec = SITE.blog || {};
      const hdr = grid.closest('section');
      if (hdr) {
        const ey = hdr.querySelector('.section__eyebrow'); if (ey && sec.sectionEyebrow) ey.textContent = sec.sectionEyebrow;
        const tt = hdr.querySelector('.section__title');   if (tt && sec.sectionTitle)   tt.textContent = sec.sectionTitle;
        const ds = hdr.querySelector('.section__desc');    if (ds && sec.sectionDesc)    ds.textContent = sec.sectionDesc;
        const ra = hdr.querySelector('.section__footer a'); if (ra) { if (sec.readAllLabel) ra.textContent = sec.readAllLabel; if (sec.readAllHref) ra.href = sec.readAllHref; }
      }

      const raw = Array.isArray(sec) ? sec : (sec.posts || sec.items || FALLBACK.posts);
      const fallbackImg = 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800';
      const data = raw.map(p => ({ ...p, img: p.image || p.img || p.url || fallbackImg }));

      grid.innerHTML = data.map((p, i) => `
        <article class="blog-card" data-reveal style="transition-delay:${i * 0.12}s">
          <a href="blog-post.html?slug=${p.slug}">
            <div class="blog-card__img-wrap">
              <img class="blog-card__img"
                   data-src="${p.img}"
                   src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
                   alt="${p.title}"
                   loading="lazy" />
            </div>
          </a>
          <div class="blog-card__body">
            <span class="blog-card__cat">${p.category}</span>
            <h3 class="blog-card__title">
              <a href="blog-post.html?slug=${p.slug}">${p.title}</a>
            </h3>
            <p class="blog-card__excerpt">${p.excerpt}</p>
            <div class="blog-card__footer">
              <span class="blog-card__date">${p.date}</span>
              <a href="blog-post.html?slug=${p.slug}" class="blog-card__read">Read more →</a>
            </div>
          </div>
        </article>
      `).join('');

      $$('[data-src]', grid).forEach(lazyLoadImage);
      RevealModule.observe();
    },
  };

  /* ─────────────────────────────────────────────────────────────────
     REVEAL / SCROLL ANIMATION MODULE
  ───────────────────────────────────────────────────────────────── */
  const RevealModule = {
    observer: null,
    init() {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });
      this.observe();
    },
    observe() {
      $$('[data-reveal]').forEach(el => {
        if (!el.classList.contains('is-visible')) {
          this.observer?.observe(el);
        }
      });
    },
  };

  /* ─────────────────────────────────────────────────────────────────
     GSAP ANIMATIONS MODULE
  ───────────────────────────────────────────────────────────────── */
  const AnimModule = {
    init() {
      if (typeof gsap === 'undefined') return;
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
      }

      // Hero & Navbar entrance
      gsap.timeline({ delay: 0.1 })
        .from('.navbar__logo', { opacity: 0, x: -20, duration: 0.8, ease: 'power3.out' })
        .from('.navbar__link', { opacity: 0, y: -10, stagger: 0.1, duration: 0.6, ease: 'power3.out' }, '-=0.6')
        .from('.navbar__actions', { opacity: 0, x: 20, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from('.hero__eyebrow', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .from('.hero__heading', { opacity: 0, y: 40, duration: 1, ease: 'power3.out' }, '-=0.6')
        .from('.hero__sub', { opacity: 0, y: 24, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from('.hero__cta .btn', { opacity: 0, y: 20, stagger: 0.15, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .from('.hero__scroll-hint', { opacity: 0, duration: 0.6 }, '-=0.3');

      // Parallax on hero slide images
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.to('.hero__slide', {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
        
        // Scroll Progress Tracker
        const scrollTracker = document.querySelector('.scroll-tracker__progress');
        if (scrollTracker) {
          gsap.to(scrollTracker, {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: document.body,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.2
            }
          });
        }
      }
    },
  };

  /* ─────────────────────────────────────────────────────────────────
     BACK TO TOP
  ───────────────────────────────────────────────────────────────── */
  const BackTopModule = {
    init() {
      const btn = $('#backTop');
      btn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    },
    toggle(show) {
      const btn = $('#backTop');
      if (!btn) return;
      btn.hidden = !show;
    },
  };

  /* ─────────────────────────────────────────────────────────────────
     LAZY INITIALIZATION MODULE
  ───────────────────────────────────────────────────────────────── */
  const LazyModule = {
    init() {
      const sectionMapping = [
        { id: '#destinations', init: () => DestinationsModule.init() },
        { id: '#packages',     init: () => PackagesModule.init() },
        { id: '#pricing',      init: () => PricingModule.init() },
        { id: '#gallery',      init: () => GalleryModule.init() },
        { id: '#stories',      init: () => StoriesModule.init() },
        { id: '#testimonials', init: () => TestimonialsModule.init() },
        { id: '#blog',         init: () => BlogModule.init() },
      ];

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const map = sectionMapping.find(m => entry.target.matches(m.id));
            if (map) {
              map.init().then(() => {
                // Ensure GSAP ScrollTrigger updates after dynamic content is added
                if (typeof ScrollTrigger !== 'undefined') {
                   ScrollTrigger.refresh();
                }
              });
              observer.unobserve(entry.target);
            }
          }
        });
      }, { rootMargin: '400px 0px', threshold: 0 });

      sectionMapping.forEach(m => {
        const el = $(m.id);
        if (el) observer.observe(el);
      });
    }
  };

  /* ─────────────────────────────────────────────────────────────────
     APP INIT
  ───────────────────────────────────────────────────────────────── */
  /* Apply site-wide settings from data.json (navbar, hero, stats, CTA, footer) */
  function applySiteData() {
    const s = SITE.site || {};

    // Logo
    // Logo
    $$('.navbar__logo-mark').forEach(el => { if (s.logoMark) el.textContent = s.logoMark; });
    $$('.navbar__logo-text').forEach(el => { if (s.logoText)  el.textContent = s.logoText; });

    // Navbar links
    const nav = SITE.navbar || {};
    const navLinks = $$('.navbar__nav .navbar__link');
    const linksArray = nav.links || Array.isArray(nav) ? nav : [];
    if (linksArray.length && navLinks.length) {
      linksArray.forEach((l, i) => { if (navLinks[i]) { navLinks[i].textContent = l.label; navLinks[i].href = l.href; } });
    }
    const mobileLinks = $$('.mobile-menu nav a:not(.btn)');
    if (linksArray.length && mobileLinks.length) {
      linksArray.forEach((l, i) => { if (mobileLinks[i]) { mobileLinks[i].textContent = l.label; mobileLinks[i].href = l.href; } });
    }
    if (nav.ctaLabel) $$('.navbar__actions .btn--outline').forEach(el => el.textContent = nav.ctaLabel);
    if (nav.ctaHref)  $$('.navbar__actions .btn--outline').forEach(el => el.href = nav.ctaHref);

    // Hero text
    const h = SITE.hero || {};
    const eyebrow = $('.hero__label'); if (eyebrow && (h.eyebrowText || h.eyebrow)) eyebrow.textContent = h.eyebrowText || h.eyebrow;
    const heading = $('.hero__heading');
    if (heading && (h.headingLine1 || h.heading)) {
        if (h.headingLine1) heading.innerHTML = `${h.headingLine1}<br /><em>${h.headingLine2Em || ''}</em>`;
        else heading.textContent = h.heading;
    }
    const sub = $('.hero__sub'); if (sub && (h.subtext || h.sub)) sub.textContent = h.subtext || h.sub;
    const hCta = h.cta || h.buttons;
    if (hCta && Array.isArray(hCta)) {
      const btns = $$('.hero__cta .btn');
      hCta.forEach((c, i) => { if (btns[i]) { btns[i].textContent = c.label || c.text; btns[i].href = c.href || c.url; } });
    }
    // Hero slides
    const hSlides = h.slides || h.items;
    if (hSlides && Array.isArray(hSlides)) {
      const wrapper = $('#heroSlides');
      if (wrapper) {
        wrapper.innerHTML = hSlides.map((sl, i) => {
          const img = sl.image || sl.url || sl.img;
          if (i === 0) {
            return `
              <div class="swiper-slide hero__slide is-loaded" style="background-image:url('${img}')" role="img" aria-label="${sl.alt || ''}">
                <div class="hero__slide-overlay"></div>
              </div>`;
          }
          return `
            <div class="swiper-slide hero__slide" data-bg="${img}" role="img" aria-label="${sl.alt || ''}">
              <div class="hero__slide-overlay"></div>
            </div>`;
        }).join('');
        
        $$('.hero__slide[data-bg]', wrapper).forEach(lazyLoadImage);
      }
    }

    // Stats
    const statsData = SITE.stats || [];
    if (statsData.length) {
      const items = $$('.stat-item');
      statsData.forEach((st, i) => {
        if (!items[i]) return;
        const num = items[i].querySelector('.stat-item__num');
        const suf = items[i].querySelector('.stat-item__suffix');
        const lbl = items[i].querySelector('.stat-item__label');
        if (num) { num.dataset.count = st.number || st.num || 0; num.textContent = '0'; }
        if (suf) suf.textContent = st.suffix || '';
        if (lbl) lbl.textContent = st.label || '';
      });
    }

    // CTA section
    const cta = SITE.cta || SITE.contact || {};
    const ctaSec = $('#contact');
    if (ctaSec) {
      const ey = ctaSec.querySelector('.section__eyebrow'); if (ey && (cta.eyebrow || cta.label)) ey.textContent = cta.eyebrow || cta.label;
      const tt = ctaSec.querySelector('.cta-final__title');
      if (tt && (cta.title || cta.heading)) {
          if (cta.title) tt.innerHTML = `${cta.title}<br /><em>${cta.titleEm || ''}</em>`;
          else tt.textContent = cta.heading;
      }
      const ds = ctaSec.querySelector('.cta-final__desc'); if (ds && (cta.description || cta.desc || cta.sub)) ds.textContent = cta.description || cta.desc || cta.sub;
    }

    // Footer
    const ft = SITE.footer || {};
    const tl = $('.footer__tagline'); if (tl && ft.tagline) tl.textContent = ft.tagline;
    if (ft.exploreLinks || ft.items) {
      const els = $$('.footer__col:nth-child(2) .footer__links li a');
      const exLinks = ft.exploreLinks || ft.items || [];
      exLinks.forEach((l, i) => { if (els[i]) { els[i].textContent = l.label || l.text; els[i].href = l.href || l.url; } });
    }
    if (ft.companyLinks) {
      const cls = $$('.footer__col:nth-child(3) .footer__links li a');
      ft.companyLinks.forEach((l, i) => { if (cls[i]) { cls[i].textContent = l.label || l.text; cls[i].href = l.href || l.url; } });
    }
    const email = s.email || (SITE.contact ? SITE.contact.email : '');
    const phone = s.phone || (SITE.contact ? SITE.contact.phone : '');
    if (email) $$('a[href^="mailto:"]').forEach(el => { el.href = `mailto:${email}`; if (el.textContent.includes('@')) el.textContent = email; });
    if (phone) $$('a[href^="tel:"]').forEach(el => { el.href = `tel:+${phone.replace(/\D/g,'')}`; if (el.textContent.includes('+')) el.textContent = s.phoneDisplay || phone; });
    
    const waNum = s.whatsappNumber || (SITE.contact ? SITE.contact.whatsapp : '');
    if (waNum) {
      const msg = encodeURIComponent(s.whatsappMessage || 'Hi');
      $$('a[href*="wa.me"]').forEach(el => el.href = `https://wa.me/${waNum}?text=${msg}`);
    }
    if (ft.legalLinks) {
      const lls = $$('.footer__bottom-links a');
      ft.legalLinks.forEach((l, i) => { if (lls[i]) { lls[i].textContent = l.label || l.text; lls[i].href = l.href || l.url; } });
    }
    const copy = $('.footer__bottom p');
    if (copy && (s.copyrightYear || s.year)) copy.textContent = `© ${s.copyrightYear || s.year || '2025'} ${s.logoText || 'Life On Travel'}. All rights reserved.`;
    
    // Social links
    const socialLinks = $$('.footer__social-link');
    const socialMap = [
      { key: 'instagram', label: 'Instagram' },
      { key: 'facebook', label: 'Facebook' },
      { key: 'youtube', label: 'YouTube' }
    ];
    socialMap.forEach((sm, i) => {
      if (socialLinks[i] && s[sm.key]) {
        socialLinks[i].href = s[sm.key];
      }
    });

    // Address
    const addrEl = $('.footer__contact p:last-child');
    if (addrEl && s.address) addrEl.textContent = s.address;
  }

  async function init() {
    // Fetch site data first — everything depends on it
    try {
      await fetchSiteData();
    } catch (e) {
      console.warn('Site data load failed, using inline fallback:', e.message);
      SITE = FALLBACK;
    }
    applySiteData();

    NavbarModule.init();
    RevealModule.init();
    BackTopModule.init();
    CounterModule.init();
    AnimModule.init();

    // Init hero swiper after DOM ready
    if (typeof Swiper !== 'undefined') {
      HeroModule.init();
    }

    // Load dynamic content (lazily)
    lazyLoadImage($('.cta-final__bg'));
    LazyModule.init();

    // Re-run reveal after initial DOM setup
    RevealModule.observe();

    // Hide Page Loader
    setTimeout(() => {
      document.getElementById('pageLoader')?.classList.add('is-hidden');
    }, 500);

    // Re-initialize GSAP ScrollTriggers after DOM updates to ensure correct heights
    if (typeof ScrollTrigger !== 'undefined') {
      setTimeout(() => {
        ScrollTrigger.refresh();
        
        // Add parallax to newly loaded images
        const cardImages = document.querySelectorAll('.dest-card__img, .pkg-card__img');
        cardImages.forEach(img => {
          gsap.fromTo(img, 
            { yPercent: -5, scale: 1.05 },
            { 
              yPercent: 5,
              ease: 'none',
              scrollTrigger: {
                trigger: img.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
              }
            }
          );
        });
      }, 500);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
