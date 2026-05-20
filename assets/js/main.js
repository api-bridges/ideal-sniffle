// DEEP SIGNAL · Shared Scripts

// Matrix/random background text generator
function initMatrixBg(elementId, chars) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const charSet = chars || '01アイウエオカキクケコABCDEFGXYZ01010110';
  let html = '';
  for (let i = 0; i < 400; i++) {
    html += charSet[Math.floor(Math.random() * charSet.length)];
    if (i % 60 === 59) html += '<br>';
    else html += ' ';
  }
  el.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function() {
  initMatrixBg('matrixBg');
});
