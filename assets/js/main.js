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

document.addEventListener('DOMContentLoaded', function () {
  initCounters();
  initTicker();
  initStatBars();
});
