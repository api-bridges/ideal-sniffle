/**
 * GET SET GO API · Navbar JS
 * Handles hamburger menu toggle and outside-click close.
 *
 * Usage: add before </body> on every page:
 *   <script src="/assets/js/navbar.js"></script>
 */
(function () {
  'use strict';

  function initNavbar() {
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
  } else {
    initNavbar();
  }
}());
