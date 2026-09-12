/* ==========================================================================
   Nikhil Rathore — Portfolio Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Theme toggle ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

  function applyTheme(theme){
    if(theme === 'light'){
      root.setAttribute('data-theme', 'light');
      if(themeIcon){ themeIcon.classList.remove('fa-moon'); themeIcon.classList.add('fa-sun'); }
    } else {
      root.removeAttribute('data-theme');
      if(themeIcon){ themeIcon.classList.remove('fa-sun'); themeIcon.classList.add('fa-moon'); }
    }
  }

  // Dark (the full space scene) is always the default look, regardless of the
  // visitor's OS light/dark preference — only an explicit toggle switches it.
  try {
    const saved = localStorage.getItem('nr-theme');
    if(saved === 'light') applyTheme('light');
  } catch(e){ /* localStorage unavailable — default dark theme stands */ }

  if(themeToggle){
    themeToggle.addEventListener('click', () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      const next = isLight ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem('nr-theme', next); } catch(e){}
    });
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ======================================================================
     Space backdrop — starfield, drifting ringed planets & shooting stars.
     Runs on a full-page fixed canvas behind every section. Dark theme gets
     the full animated scene; light theme gets a calm, mostly-static sky
     (kept in the same canvas so toggling is instant, no reload/flash).
     ====================================================================== */
  (function spaceScene(){
    const canvas = document.getElementById('spaceCanvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, dpr;
    let stars = [], planets = [], meteors = [];
    let meteorTimer = 0;

    const DARK_PLANETS = [
      { color:'#00d4ff', ring:'rgba(0,212,255,0.35)' },
      { color:'#7c5cff', ring:'rgba(124,92,255,0.35)' },
      { color:'#ff9f6b', ring:'rgba(255,159,107,0.3)'  },
      { color:'#6bffb0', ring:null }
    ];

    function isLight(){ return document.documentElement.getAttribute('data-theme') === 'light'; }

    function resize(){
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function seed(){
      const starCount = Math.min(220, Math.floor((w * h) / 8000));
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.3,
        baseAlpha: Math.random() * 0.6 + 0.35,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 1.2 + 0.4,
        drift: Math.random() * 0.012 + 0.004
      }));

      planets = DARK_PLANETS.map((p, i) => ({
        ...p,
        xFrac: 0.12 + Math.random() * 0.76,
        yFrac: 0.1 + Math.random() * 0.7,
        r: 16 + Math.random() * 22 + (i === 0 ? 10 : 0),
        vx: (Math.random() - 0.5) * 0.045,
        vy: (Math.random() - 0.5) * 0.03,
        tilt: -18 - Math.random() * 14
      }));
    }

    function drawPlanet(p){
      const x = p.xFrac * w, y = p.yFrac * h;
      // soft ring behind the sphere (Saturn-style)
      if(p.ring){
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((p.tilt * Math.PI) / 180);
        ctx.scale(1, 0.34);
        ctx.beginPath();
        ctx.arc(0, 0, p.r * 1.9, 0, Math.PI * 2);
        ctx.strokeStyle = p.ring;
        ctx.lineWidth = p.r * 0.22;
        ctx.stroke();
        ctx.restore();
      }
      // sphere with a soft directional-light gradient for a 3D feel
      const grad = ctx.createRadialGradient(x - p.r * 0.35, y - p.r * 0.35, p.r * 0.1, x, y, p.r);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.15, p.color);
      grad.addColorStop(1, 'rgba(3,6,14,0.9)');
      ctx.beginPath();
      ctx.arc(x, y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.globalAlpha = 0.85;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    function spawnMeteor(){
      const startX = Math.random() * w * 0.6;
      meteors.push({
        x: startX, y: -20,
        vx: 5 + Math.random() * 3,
        vy: 3 + Math.random() * 2,
        len: 70 + Math.random() * 60,
        life: 1, maxLife: 1
      });
    }

    function draw(t){
      // background wash
      const bgGrad = isLight()
        ? ctx.createLinearGradient(0, 0, 0, h)
        : ctx.createRadialGradient(w * 0.7, h * 0.15, 0, w * 0.7, h * 0.15, Math.max(w, h) * 0.9);

      if(isLight()){
        bgGrad.addColorStop(0, '#f7f9fd');
        bgGrad.addColorStop(1, '#eef1fa');
      } else {
        bgGrad.addColorStop(0, '#0e1830');
        bgGrad.addColorStop(0.45, '#080d1c');
        bgGrad.addColorStop(1, '#05070d');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      if(isLight()){
        return; // calm, minimal daytime backdrop — no stars/planets/meteors
      }

      // stars
      stars.forEach(s => {
        const twinkle = reduceMotion ? 1 : 0.5 + 0.5 * Math.sin(t * 0.001 * s.speed + s.phase);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${(s.baseAlpha * twinkle).toFixed(3)})`;
        ctx.fill();
        if(!reduceMotion){
          s.y -= s.drift;
          if(s.y < -2) s.y = h + 2;
        }
      });

      // planets
      planets.forEach(p => {
        drawPlanet(p);
        if(!reduceMotion){
          p.xFrac += p.vx / w;
          p.yFrac += p.vy / h;
          if(p.xFrac < -0.08) p.xFrac = 1.08;
          if(p.xFrac > 1.08) p.xFrac = -0.08;
          if(p.yFrac < -0.08) p.yFrac = 1.08;
          if(p.yFrac > 1.08) p.yFrac = -0.08;
        }
      });

      // shooting stars
      if(!reduceMotion){
        meteorTimer++;
        if(meteorTimer > 260 + Math.random() * 240){
          spawnMeteor();
          meteorTimer = 0;
        }
        meteors.forEach(m => {
          const tailX = m.x - m.vx * (m.len / 6);
          const tailY = m.y - m.vy * (m.len / 6);
          const g = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
          g.addColorStop(0, `rgba(255,255,255,${m.life})`);
          g.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.strokeStyle = g;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
          m.x += m.vx * 4; m.y += m.vy * 4;
          m.life -= 0.02;
        });
        meteors = meteors.filter(m => m.life > 0 && m.y < h + 40 && m.x < w + 40);
      }
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    });

    resize();

    if(reduceMotion){
      draw(0);
      // still react to theme toggles / resizes with a single fresh frame
      document.getElementById('themeToggle') && document.getElementById('themeToggle').addEventListener('click', () => setTimeout(() => draw(0), 50));
    } else {
      requestAnimationFrame(function loop(t){ draw(t); requestAnimationFrame(loop); });
    }
  })();

  /* ======================================================================
     Cosmic cursor — a bright point on the exact pointer, a trailing ringed
     "planet" that eases toward it, and a comet-dust particle trail between
     them. Desktop / fine-pointer only; respects reduced-motion.
     ====================================================================== */
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const cursorPoint = document.getElementById('cursorPoint');
  const cursorOrb = document.getElementById('cursorOrb');
  const trailCanvas = document.getElementById('cursorTrail');

  if(isFinePointer && cursorPoint && cursorOrb && trailCanvas){
    const tctx = trailCanvas.getContext('2d');
    let tw, th, tdpr;
    function resizeTrail(){
      tdpr = Math.min(window.devicePixelRatio || 1, 2);
      tw = window.innerWidth; th = window.innerHeight;
      trailCanvas.width = tw * tdpr; trailCanvas.height = th * tdpr;
      trailCanvas.style.width = tw + 'px'; trailCanvas.style.height = th + 'px';
      tctx.setTransform(tdpr, 0, 0, tdpr, 0, 0);
    }
    resizeTrail();
    window.addEventListener('resize', resizeTrail);

    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let orbX = mouseX, orbY = mouseY;
    let particles = [];
    const dustColors = ['#00d4ff', '#7c5cff', '#ffffff'];

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorPoint.style.left = mouseX + 'px';
      cursorPoint.style.top = mouseY + 'px';
      cursorPoint.style.opacity = '1';
      cursorOrb.style.opacity = '1';
    });
    document.addEventListener('mouseleave', () => {
      cursorPoint.style.opacity = '0';
      cursorOrb.style.opacity = '0';
    });

    function frame(){
      const prevX = orbX, prevY = orbY;
      orbX += (mouseX - orbX) * 0.14;
      orbY += (mouseY - orbY) * 0.14;
      cursorOrb.style.left = orbX + 'px';
      cursorOrb.style.top = orbY + 'px';

      if(!reduceMotion){
        const moved = Math.hypot(orbX - prevX, orbY - prevY);
        if(moved > 0.6 && particles.length < 140){
          particles.push({
            x: orbX, y: orbY,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            r: Math.random() * 2.2 + 1,
            life: 1,
            color: dustColors[Math.floor(Math.random() * dustColors.length)]
          });
        }

        tctx.clearRect(0, 0, tw, th);
        particles.forEach(p => {
          p.x += p.vx; p.y += p.vy;
          p.life -= 0.035;
          tctx.beginPath();
          tctx.arc(p.x, p.y, Math.max(p.r * p.life, 0), 0, Math.PI * 2);
          tctx.fillStyle = p.color;
          tctx.globalAlpha = Math.max(p.life, 0) * 0.75;
          tctx.fill();
        });
        tctx.globalAlpha = 1;
        particles = particles.filter(p => p.life > 0);
      }

      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    const hoverTargets = 'a, button, .tag, .stat-card, .skill-card, .project-card, input, textarea';
    document.addEventListener('mouseover', (e) => {
      if(e.target.closest(hoverTargets)) cursorOrb.classList.add('grow');
    });
    document.addEventListener('mouseout', (e) => {
      if(e.target.closest(hoverTargets)) cursorOrb.classList.remove('grow');
    });
  } else {
    if(cursorPoint) cursorPoint.style.display = 'none';
    if(cursorOrb) cursorOrb.style.display = 'none';
    if(trailCanvas) trailCanvas.style.display = 'none';
  }

  /* ---------- Navbar: scroll shadow + active link + mobile menu ---------- */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  function onScrollNav(){
    if(window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive:true });

  if(hamburger && navLinks){
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.dataset.section === id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(sec => navObserver.observe(sec));

  /* ---------- Typewriter effect ---------- */
  const roles = [
    'Computer Vision Engineer',
    'AI / ML Engineer',
    'Edge AI Specialist',
    'Person Re-ID Researcher',
    'Face Recognition Architect'
  ];
  const typeEl = document.getElementById('typewriter');

  if(typeEl){
    let roleIndex = 0, charIndex = 0, deleting = false;

    function typeLoop(){
      const current = roles[roleIndex];
      if(!deleting){
        charIndex++;
        typeEl.textContent = current.slice(0, charIndex);
        if(charIndex === current.length){
          deleting = true;
          setTimeout(typeLoop, 1500);
          return;
        }
      } else {
        charIndex--;
        typeEl.textContent = current.slice(0, charIndex);
        if(charIndex === 0){
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(typeLoop, deleting ? 35 : 65);
    }
    typeLoop();
  }

  /* ---------- Scroll-reveal animations ---------- */
  const revealEls = document.querySelectorAll('.reveal-up');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10) || 0;
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();

      function tick(now){
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if(progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(el => counterObserver.observe(el));

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 500) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  }, { passive:true });
  if(backToTop){
    backToTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
  }

  /* ---------- Toast helper ---------- */
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(message){
    if(!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 4000);
  }

  /* ---------- Contact form (Formspree) ---------- */
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('formSubmit');
  const formNote = document.getElementById('formNote');

  if(form && submitBtn){
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const endpoint = submitBtn.dataset.endpoint;

      formNote.textContent = '';
      formNote.className = 'form-note';

      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        });

        const data = await response.json().catch(() => null);

        if(response.ok){
          formNote.textContent = 'Thanks! Your message has been sent — I\'ll get back to you soon.';
          formNote.classList.add('success');
          showToast('Message sent successfully ✔');
          form.reset();
        } else {
          const msg = (data && (data.message || (data.errors && data.errors.map(er => er.message).join(', '))))
            || 'Something went wrong. Please try again or email me directly.';
          formNote.textContent = msg;
          formNote.classList.add('error');
          showToast('Could not send message.');
        }
      } catch (err){
        formNote.textContent = 'Network error — please check your connection and try again.';
        formNote.classList.add('error');
        showToast('Network error while sending.');
      } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

});
