/* ==========================================================================
   Nikhil Rathore — Portfolio Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader && preloader.classList.add('hide'), 250);
  });
  // Fallback in case 'load' already fired or takes too long
  setTimeout(() => preloader && preloader.classList.add('hide'), 1800);

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

  try {
    const saved = localStorage.getItem('nr-theme');
    if(saved){
      applyTheme(saved);
    } else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches){
      applyTheme('light');
    }
  } catch(e){ /* localStorage unavailable — default dark theme stands */ }

  if(themeToggle){
    themeToggle.addEventListener('click', () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      const next = isLight ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem('nr-theme', next); } catch(e){}
    });
  }

  /* ---------- Custom cursor glow (desktop / fine pointer only) ---------- */
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const cursorDot = document.getElementById('cursorDot');
  const cursorGlow = document.getElementById('cursorGlow');

  if(isFinePointer && cursorDot && cursorGlow){
    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateGlow(){
      glowX += (mouseX - glowX) * 0.16;
      glowY += (mouseY - glowY) * 0.16;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();

    const hoverTargets = 'a, button, .tag, .stat-card, .skill-card, .project-card, input, textarea';
    document.addEventListener('mouseover', (e) => {
      if(e.target.closest(hoverTargets)) cursorGlow.classList.add('grow');
    });
    document.addEventListener('mouseout', (e) => {
      if(e.target.closest(hoverTargets)) cursorGlow.classList.remove('grow');
    });
  } else {
    if(cursorDot) cursorDot.style.display = 'none';
    if(cursorGlow) cursorGlow.style.display = 'none';
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

      if(!endpoint || endpoint.includes('YOUR_FORM_ID')){
        formNote.textContent = 'Contact form isn\'t connected yet — set up a free Formspree endpoint (see comment in index.html) or email me directly below.';
        formNote.classList.add('error');
        showToast('Form not yet connected — please email directly for now.');
        return;
      }

      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        });

        if(response.ok){
          formNote.textContent = 'Thanks! Your message has been sent — I\'ll get back to you soon.';
          formNote.classList.add('success');
          showToast('Message sent successfully ✔');
          form.reset();
        } else {
          const data = await response.json().catch(() => null);
          const msg = data && data.errors ? data.errors.map(er => er.message).join(', ') : 'Something went wrong. Please try again or email me directly.';
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
