/* =======================================================
   HEAD STAR GLOBAL — main.js
   Handles: header/footer includes, preloader, sticky header,
   mobile menu, active-nav highlighting, back-to-top,
   AOS init, lazy-load fade-in, chat tooltip, year stamp.
   ======================================================= */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initHeaderBehaviour() {
    var header = document.getElementById('headerArea');
    var trigger = document.getElementById('menuTrigger');
    var nav = document.getElementById('mainNav');
    var backdrop = document.getElementById('mobileBackdrop');

    /* Sticky header shadow on scroll */
    function onScroll() {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      updateBackToTop();
      highlightSectionOnScroll();
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* Mobile menu toggle */
    function closeMenu() {
      trigger.classList.remove('active');
      nav.classList.remove('active');
      backdrop.classList.remove('active');
      trigger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    function openMenu() {
      trigger.classList.add('active');
      nav.classList.add('active');
      backdrop.classList.add('active');
      trigger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    trigger.addEventListener('click', function () {
      var isOpen = nav.classList.contains('active');
      if (isOpen) { closeMenu(); } else { openMenu(); }
    });
    backdrop.addEventListener('click', closeMenu);
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    /* Active nav link — matches current page via body[data-page] */
    var currentPage = document.body.getAttribute('data-page') || 'home';
    nav.querySelectorAll('a[data-page]').forEach(function (link) {
      if (link.getAttribute('data-page') === currentPage) {
        link.classList.add('active');
      }
    });
  }

  /* ---------- Active nav highlight based on scroll position (home page sections) ---------- */
  function highlightSectionOnScroll() {
    var sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;
    var nav = document.getElementById('mainNav');
    if (!nav) return;
    var scrollPos = window.scrollY + 140;
    sections.forEach(function (sec) {
      var top = sec.offsetTop;
      var bottom = top + sec.offsetHeight;
      var id = sec.getAttribute('id');
      var link = nav.querySelector('a[href="#' + id + '"]');
      if (!link) return;
      if (scrollPos >= top && scrollPos < bottom) {
        nav.querySelectorAll('a[href^="#"]').forEach(function (l) { l.classList.remove('active'); });
        link.classList.add('active');
      }
    });
  }

  /* ---------- Back to top button ---------- */
  var backToTop;
  function updateBackToTop() {
    if (!backToTop) backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }

  function initBackToTop() {
    backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Chat widget tooltip ---------- */
  function initChatWidget() {
    var chat = document.getElementById('chatWidget');
    var tooltip = document.getElementById('chatTooltip');
    if (!chat || !tooltip) return;
    setTimeout(function () { tooltip.classList.add('show'); }, 1500);
    setTimeout(function () { tooltip.classList.remove('show'); }, 6000);
    chat.addEventListener('mouseenter', function () { tooltip.classList.add('show'); });
    chat.addEventListener('mouseleave', function () { tooltip.classList.remove('show'); });
  }

  /* ---------- Preloader ---------- */
  function initPreloader() {
    var preloader = document.getElementById('preloader');
    if (!preloader) return;
    window.addEventListener('load', function () {
      setTimeout(function () {
        preloader.classList.add('loaded');
      }, 400);
    });
  }

  /* ---------- Lazy-load fade-in for images ---------- */
  function initLazyFade() {
    var imgs = document.querySelectorAll('img[loading="lazy"]');
    imgs.forEach(function (img) {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', function () { img.classList.add('loaded'); });
      }
    });
  }

  /* ---------- Smooth scroll for in-page anchors ---------- */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var id = link.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var headerOffset = 90;
      var pos = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: pos, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Stat counter animation ---------- */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-count'), 10);
        if (prefersReducedMotion) {
          el.textContent = target;
          observer.unobserve(el);
          return;
        }
        var current = 0;
        var duration = 1500;
        var stepTime = Math.max(Math.floor(duration / target), 15);
        var timer = setInterval(function () {
          current += Math.ceil(target / (duration / stepTime));
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current;
        }, stepTime);
        observer.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { observer.observe(c); });
  }

  /* ---------- AOS init ---------- */
  function initAOS() {
    if (window.AOS) {
      window.AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60,
        disable: prefersReducedMotion
      });
    }
  }

  /* ---------- Footer year ---------- */
  function stampYear() {
    var el = document.getElementById('currentYear');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- FAQ accordion ---------- */
  function initFAQ() {
    var items = document.querySelectorAll('.faq-item');
    items.forEach(function (item) {
      var question = item.querySelector('.faq-question');
      if (!question) return;
      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        items.forEach(function (i) { i.classList.remove('open'); });
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  /* ---------- Export gallery carousel (dependency-free) ---------- */
  function initExportGallery() {
    var track = document.getElementById('exportGalleryTrack');
    if (!track) return;
    var prevBtn = document.querySelector('.gallery-nav.prev');
    var nextBtn = document.querySelector('.gallery-nav.next');

    function step() {
      var slide = track.querySelector('.export-slide');
      if (!slide) return 300;
      var style = window.getComputedStyle(track);
      var gap = parseFloat(style.gap) || 20;
      return slide.getBoundingClientRect().width + gap;
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        track.scrollBy({ left: -step(), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        track.scrollBy({ left: step(), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      });
    }

    if (!prefersReducedMotion) {
      var timer = setInterval(function () {
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: step(), behavior: 'smooth' });
        }
      }, 2800);
      track.addEventListener('mouseenter', function () { clearInterval(timer); });
      track.addEventListener('touchstart', function () { clearInterval(timer); }, { passive: true });
    }
  }

  /* ---------- Boot sequence ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initPreloader();
    initHeaderBehaviour();
    stampYear();
    initBackToTop();
    initChatWidget();
    initLazyFade();
    initSmoothScroll();
    initCounters();
    initFAQ();
    initExportGallery();
    initAOS();
  });
})();
