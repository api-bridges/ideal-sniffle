/**
 * GET SET GO API · Navbar Component
 *
 * Injects the site-wide navigation bar and mobile drawer, auto-highlights
 * the current page link, and wires up the hamburger toggle.
 *
 * Usage on every page:
 *   <head>:  <link rel="stylesheet" href="/assets/css/navbar.css">
 *   </body>: <script src="/assets/js/navbar.js"></script>
 */
(function () {
  'use strict';

  /* ── 1. NAVBAR HTML TEMPLATE ── */
  var NAV_HTML =
    '<nav class="site-nav" id="siteNav" aria-label="Main navigation">\n' +
    '\n' +
    '  <!-- \u2500\u2500 LOGO \u2500\u2500 -->\n' +
    '  <a href="/" class="nav-logo">\n' +
    '    <span class="logo-dot" aria-hidden="true"></span>\n' +
    '    GET SET GO API\n' +
    '  </a>\n' +
    '\n' +
    '  <!-- \u2500\u2500 CENTRE LINKS (hidden on mobile) \u2500\u2500 -->\n' +
    '  <div class="nav-center">\n' +
    '    <ul class="nav-links" role="list">\n' +
    '\n' +
    '      <li class="nav-dropdown">\n' +
    '        <a href="#" class="nav-dropdown-toggle" aria-haspopup="true" aria-expanded="false">\n' +
    '          Explore <span class="dropdown-arrow" aria-hidden="true">\u25be</span>\n' +
    '        </a>\n' +
    '        <div class="nav-dropdown-menu" role="menu">\n' +
    '          <a href="/apis/ai-language/" role="menuitem">\ud83e\udde0 AI &amp; Language</a>\n' +
    '          <a href="/apis/image-vision/" role="menuitem">\ud83d\uddbc\ufe0f Image &amp; Vision</a>\n' +
    '          <a href="/apis/audio-video/" role="menuitem">\ud83c\udfb5 Audio &amp; Video</a>\n' +
    '          <div class="nav-dropdown-divider" role="separator"></div>\n' +
    '          <a href="/apis/code-dev/" role="menuitem">\ud83d\udcbb Code &amp; Dev</a>\n' +
    '          <a href="/apis/health-medical/" role="menuitem">\ud83c\udfe5 Health &amp; Medical</a>\n' +
    '          <a href="/apis/data-analytics/" role="menuitem">\ud83d\udcca Data &amp; Analytics</a>\n' +
    '          <a href="/apis/security-auth/" role="menuitem">\ud83d\udd10 Security &amp; Auth</a>\n' +
    '          <a href="/apis/automation/" role="menuitem">\u2699\ufe0f Automation</a>\n' +
    '          <a href="/apis/search-semantic/" role="menuitem">\ud83d\udd0d Search &amp; Semantic</a>\n' +
    '        </div>\n' +
    '      </li>\n' +
    '\n' +
    '      <li><a href="/docs/">Docs</a></li>\n' +
    '      <li><a href="/pricing/">Pricing</a></li>\n' +
    '      <li><a href="/about/">About</a></li>\n' +
    '\n' +
    '    </ul>\n' +
    '  </div>\n' +
    '\n' +
    '  <!-- \u2500\u2500 RIGHT-SIDE ACTIONS \u2500\u2500 -->\n' +
    '  <div class="nav-actions">\n' +
    '    <a href="/api-keys/" class="nav-btn nav-btn-api">\n' +
    '      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"\n' +
    '           stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">\n' +
    '        <circle cx="7.5" cy="15.5" r="5.5"/>\n' +
    '        <path d="M21 2l-9.6 9.6"/>\n' +
    '        <path d="M15.5 7.5l3 3"/>\n' +
    '      </svg>\n' +
    '      Get API Key\n' +
    '    </a>\n' +
    '    <a href="/pricing/" class="nav-btn nav-btn-start">Start Free \u2192</a>\n' +
    '  </div>\n' +
    '\n' +
    '  <!-- \u2500\u2500 HAMBURGER (mobile) \u2500\u2500 -->\n' +
    '  <button class="nav-hamburger" id="navToggle" aria-label="Toggle menu" aria-expanded="false"\n' +
    '          aria-controls="navMobile">\n' +
    '    <svg class="hamburger-icon" width="18" height="18" viewBox="0 0 18 18" fill="none"\n' +
    '         stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">\n' +
    '      <line x1="2" y1="4.5"  x2="16" y2="4.5"/>\n' +
    '      <line x1="2" y1="9"    x2="16" y2="9"/>\n' +
    '      <line x1="2" y1="13.5" x2="16" y2="13.5"/>\n' +
    '    </svg>\n' +
    '    <svg class="close-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"\n' +
    '         stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"\n' +
    '         style="display:none">\n' +
    '      <line x1="2" y1="2" x2="14" y2="14"/>\n' +
    '      <line x1="14" y1="2" x2="2" y2="14"/>\n' +
    '    </svg>\n' +
    '  </button>\n' +
    '\n' +
    '</nav>\n' +
    '\n' +
    '<!-- \u2500\u2500 MOBILE DRAWER \u2500\u2500 -->\n' +
    '<div class="nav-mobile" id="navMobile" role="navigation" aria-label="Mobile navigation">\n' +
    '\n' +
    '  <a href="/apis/ai-language/">\ud83e\udde0 AI &amp; Language</a>\n' +
    '  <a href="/apis/image-vision/">\ud83d\uddbc\ufe0f Image &amp; Vision</a>\n' +
    '  <a href="/apis/audio-video/">\ud83c\udfb5 Audio &amp; Video</a>\n' +
    '  <a href="/apis/code-dev/">\ud83d\udcbb Code &amp; Dev</a>\n' +
    '  <a href="/apis/health-medical/">\ud83c\udfe5 Health &amp; Medical</a>\n' +
    '  <a href="/apis/data-analytics/">\ud83d\udcca Data &amp; Analytics</a>\n' +
    '  <a href="/apis/security-auth/">\ud83d\udd10 Security &amp; Auth</a>\n' +
    '  <a href="/apis/automation/">\u2699\ufe0f Automation</a>\n' +
    '  <a href="/apis/search-semantic/">\ud83d\udd0d Search &amp; Semantic</a>\n' +
    '\n' +
    '  <div class="nav-mobile-divider"></div>\n' +
    '\n' +
    '  <a href="/docs/">\ud83d\udcda Docs</a>\n' +
    '  <a href="/pricing/">\ud83d\udcb0 Pricing</a>\n' +
    '  <a href="/about/">\u2139\ufe0f About</a>\n' +
    '\n' +
    '  <div class="nav-mobile-divider"></div>\n' +
    '\n' +
    '  <div class="nav-mobile-actions">\n' +
    '    <a href="/api-keys/" class="nav-btn nav-btn-api">\n' +
    '      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"\n' +
    '           stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">\n' +
    '        <circle cx="7.5" cy="15.5" r="5.5"/>\n' +
    '        <path d="M21 2l-9.6 9.6"/>\n' +
    '        <path d="M15.5 7.5l3 3"/>\n' +
    '      </svg>\n' +
    '      Get API Key\n' +
    '    </a>\n' +
    '    <a href="/pricing/" class="nav-btn nav-btn-start">Start Free \u2192</a>\n' +
    '  </div>\n' +
    '\n' +
    '</div>';

  /* ── 2. INJECT NAVBAR INTO PAGE ── */
  function injectNavbar() {
    var frag = document.createRange().createContextualFragment(NAV_HTML);
    var body = document.body;
    body.insertBefore(frag, body.firstChild);
  }

  /* ── 3. AUTO-HIGHLIGHT ACTIVE LINK ── */
  function setActiveLinks() {
    var path = window.location.pathname;
    /* Normalise: ensure trailing slash for directory-style paths */
    if (path && path.slice(-1) !== '/' && !path.match(/\.[a-z0-9]+$/i)) {
      path += '/';
    }

    document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href === '#') return;
      if (href === path) {
        link.classList.add('active');
      }
    });
  }

  /* ── 4. HAMBURGER TOGGLE ── */
  function initToggle() {
    var toggle = document.getElementById('navToggle');
    var drawer = document.getElementById('navMobile');
    if (!toggle || !drawer) return;

    var hamburgerIcon = toggle.querySelector('.hamburger-icon');
    var closeIcon     = toggle.querySelector('.close-icon');

    function openDrawer() {
      drawer.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      if (hamburgerIcon) hamburgerIcon.style.display = 'none';
      if (closeIcon)     closeIcon.style.display     = '';
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      if (hamburgerIcon) hamburgerIcon.style.display = '';
      if (closeIcon)     closeIcon.style.display     = 'none';
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (drawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    /* Close when clicking outside the nav/drawer */
    document.addEventListener('click', function (e) {
      var nav = document.getElementById('siteNav');
      if (!nav) return;
      if (!nav.contains(e.target) && !drawer.contains(e.target)) {
        closeDrawer();
      }
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });

    /* Close drawer when a mobile link is followed */
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeDrawer();
      });
    });
  }

  function init() {
    injectNavbar();
    setActiveLinks();
    initToggle();
  }

  if (document.body) {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
}());
