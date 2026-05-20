// GET SET GO API · Shared Scripts

// Animate API counter stats
function animateCounter(el, target, duration) {
  const start = performance.now();
  const startVal = 0;
  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(startVal + (target - startVal) * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target >= 1000 ? target.toLocaleString() : target + (el.dataset.suffix || '');
  }
  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        const target = parseInt(entry.target.dataset.count, 10);
        animateCounter(entry.target, target, 1800);
      }
    });
  }, { threshold: 0.3 });
  counters.forEach(el => observer.observe(el));
}

// Ticker animation (CSS handles it, JS just ensures it's cloned for seamless loop)
function initTicker() {
  const ticker = document.querySelector('.ticker-inner');
  if (!ticker) return;
  ticker.innerHTML += ticker.innerHTML;
}

// Smooth highlight for stat bars
function initStatBars() {
  const bars = document.querySelectorAll('.threat-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width || entry.target.style.width;
      }
    });
  });
  bars.forEach(bar => observer.observe(bar));
}

// Mobile nav hamburger toggle
function initHamburger() {
  const btn = document.getElementById('navToggle');
  const drawer = document.getElementById('navMobile');
  if (!btn || !drawer) return;
  btn.addEventListener('click', function () {
    const open = drawer.classList.toggle('open');
    btn.textContent = open ? '✕' : '☰';
    btn.setAttribute('aria-expanded', open);
  });
  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!btn.contains(e.target) && !drawer.contains(e.target)) {
      drawer.classList.remove('open');
      btn.textContent = '☰';
    }
  });
}

// Determine playground type from a category page href
function playgroundType(href) {
  if (!href) return 'chat';
  if (href.includes('ipl.html')) return 'image';
  if (href.includes('chemtrails.html')) return 'audio';
  return 'chat';
}

// Determine playground type for the current category page
function currentPageType() {
  const path = window.location.pathname;
  if (path.includes('ipl.html')) return 'image';
  if (path.includes('chemtrails.html')) return 'audio';
  return 'chat';
}

// Add "Use →" buttons to api-model-cards in the index API browser
function initModelCards() {
  document.querySelectorAll('a.api-model-card').forEach(function (card) {
    var href = card.getAttribute('href') || '';
    var type = playgroundType(href);
    var modelName = (card.querySelector('.api-model-name') || {}).textContent || '';
    if (!modelName) return;

    // Create wrapper div to hold top row + actions
    var wrapper = document.createElement('div');
    wrapper.className = card.className + ' api-model-card--has-actions';
    var styleAttr = card.getAttribute('style');
    if (styleAttr) wrapper.setAttribute('style', styleAttr);

    // Move logo + info into a horizontal top row
    var topRow = document.createElement('div');
    topRow.className = 'card-top-row';
    topRow.innerHTML = card.innerHTML;
    wrapper.appendChild(topRow);

    // Action bar
    var actions = document.createElement('div');
    actions.className = 'api-model-actions';
    actions.innerHTML =
      '<a href="' + href + '" class="api-model-view-btn">View API</a>' +
      '<a href="playground.html?model=' + encodeURIComponent(modelName) + '&type=' + type + '" class="api-model-use-btn">Try it \u2192</a>';
    wrapper.appendChild(actions);

    card.parentNode.replaceChild(wrapper, card);
  });
}

// Add "Use →" buttons to theory-items in category pages
function initTheoryUseButtons() {
  const type = currentPageType();
  document.querySelectorAll('.theory-item').forEach(function (item) {
    const nameEl = item.querySelector('.theory-name');
    if (!nameEl) return;
    const modelName = nameEl.textContent.trim();
    const btn = document.createElement('a');
    btn.href = 'playground.html?model=' + encodeURIComponent(modelName) + '&type=' + type;
    btn.className = 'theory-use-btn';
    btn.textContent = 'Use →';
    item.appendChild(btn);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initCounters();
  initTicker();
  initStatBars();
  initHamburger();
  initModelCards();
  initTheoryUseButtons();
});

