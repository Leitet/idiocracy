// Render tells, stars, and animate the total score.

const STAR_SVG = `
<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M12 1.5 L15 8.5 L22.5 9.3 L16.8 14.2 L18.5 21.5 L12 17.8 L5.5 21.5 L7.2 14.2 L1.5 9.3 L9 8.5 Z"/>
</svg>`;

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

// Tell score = highest star position (= how far along the indicator is proven).
function scoreFor(tell) {
  if (!tell.stars.length) return 0;
  return Math.max(...tell.stars.map(s => s.pct));
}

function verdictFor(total) {
  if (total < 20) return "Optimistic. Maybe we make it.";
  if (total < 40) return "Warming up. Keep an eye on things.";
  if (total < 60) return "We are past the opening montage.";
  if (total < 75) return "Brawndo is being considered for agriculture.";
  if (total < 90) return "Costco is building its law school.";
  return "Welcome to Costco. I love you.";
}

function renderTell(tell, index) {
  const score = scoreFor(tell);
  const starsHtml = tell.stars.map(star => `
    <a class="star" href="${escapeHtml(star.url)}" target="_blank" rel="noopener noreferrer"
       style="left:${star.pct}%"
       data-pct="${star.pct}">
      ${STAR_SVG}
      <div class="card">
        <span class="src">${escapeHtml(star.source)}</span>
        <div class="t">${escapeHtml(star.title)}</div>
      </div>
    </a>
  `).join("");

  return `
    <article class="tell" data-score="${score}">
      <div class="idx">TELL #${String(index + 1).padStart(2, "0")}</div>
      <h2>${escapeHtml(tell.title)}</h2>
      <p class="quote">"${escapeHtml(tell.movie)}"</p>

      <div class="bar-wrap">
        <div class="bar">
          <div class="fill" data-target="${score}"></div>
          ${starsHtml}
        </div>
        <div class="scale">
          <span>0</span><span>25</span><span>50</span><span>75</span><span>100</span>
        </div>
      </div>

      <div class="tell-foot">
        <span>CURRENT READING</span>
        <span class="score"><span class="score-num" data-target="${score}">0</span>%</span>
      </div>
    </article>
  `;
}

function animateNumber(el, target, duration = 1600) {
  const start = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(eased * target);
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

function init() {
  const tellsRoot = document.getElementById("tells");
  tellsRoot.innerHTML = TELLS.map(renderTell).join("");

  // Total score = average of all tell scores.
  const total = Math.round(
    TELLS.reduce((sum, t) => sum + scoreFor(t), 0) / TELLS.length
  );

  // Animate the hero number.
  const totalNumEl = document.getElementById("total-num");
  animateNumber(totalNumEl, total, 2400);

  // Fill bars + light up stars + count up per-tell score using an intersection observer
  // so it feels like each panel "comes online" as you scroll.
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const tell = entry.target;
      const fill = tell.querySelector(".fill");
      const target = Number(fill.dataset.target);
      requestAnimationFrame(() => {
        fill.style.width = target + "%";
      });

      // Light the stars at staggered intervals
      const stars = tell.querySelectorAll(".star");
      // sort by pct so they pop in left-to-right
      [...stars]
        .sort((a, b) => Number(a.dataset.pct) - Number(b.dataset.pct))
        .forEach((s, i) => {
          setTimeout(() => s.classList.add("lit"), 600 + i * 220);
        });

      const numEl = tell.querySelector(".score-num");
      animateNumber(numEl, Number(numEl.dataset.target), 1600);

      io.unobserve(tell);
    });
  }, { threshold: 0.25 });

  document.querySelectorAll(".tell").forEach(t => io.observe(t));

  // Verdict text
  document.getElementById("verdict").textContent = verdictFor(total);
}

document.addEventListener("DOMContentLoaded", init);
