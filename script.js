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

const TREND_META = {
  rising: { glyph: "▲", label: "Rising",  className: "trend-rising"  },
  stable: { glyph: "▶", label: "Stable",  className: "trend-stable"  },
  easing: { glyph: "▼", label: "Easing",  className: "trend-easing"  }
};

function renderTell(tell, index) {
  const score = scoreFor(tell);
  const starsHtml = tell.stars.map((star, i) => {
    const id = `star-${tell.id}-${i}`;
    return `
    <button class="star" type="button"
            id="${id}"
            style="left:${star.pct}%"
            data-pct="${star.pct}"
            data-tell="${tell.id}"
            data-star-idx="${i}"
            aria-expanded="false"
            aria-controls="detail-${tell.id}"
            aria-label="${escapeHtml(star.title)}"
            title="${escapeHtml(star.title)}">
      ${STAR_SVG}
    </button>`;
  }).join("");

  const trend = TREND_META[tell.trend] || TREND_META.stable;

  return `
    <article class="tell" id="${tell.id}" data-score="${score}">
      <div class="tell-head">
        <div class="idx">TELL #${String(index + 1).padStart(2, "0")}</div>
        <div class="trend ${trend.className}" title="Trend: ${trend.label}">
          <span class="g" aria-hidden="true">${trend.glyph}</span>
          <span class="l">${trend.label}</span>
        </div>
      </div>
      <h2>${escapeHtml(tell.title)}</h2>
      <p class="quote">"${escapeHtml(tell.movie)}"</p>

      <div class="bar-wrap">
        <div class="bar">
          <div class="fill" data-target="${score}"></div>
          ${starsHtml}
        </div>
        <div class="scale" aria-hidden="true">
          <span>0</span><span>25</span><span>50</span><span>75</span><span>100</span>
        </div>
      </div>

      <div class="tell-foot">
        <span>CURRENT READING</span>
        <span class="score"><span class="score-num" data-target="${score}">0</span>%</span>
      </div>

      <div class="detail" id="detail-${tell.id}" role="region" aria-live="polite" hidden>
        <!-- populated on star click -->
      </div>
    </article>
  `;
}

function renderDetail(star) {
  return `
    <div class="detail-inner">
      <div class="detail-head">
        <span class="src">${escapeHtml(star.source)}</span>
        <span class="date">${escapeHtml(star.date || "")}</span>
        <span class="pct">@ ${star.pct}%</span>
      </div>
      <div class="t">${escapeHtml(star.title)}</div>
      <a class="read" href="${escapeHtml(star.url)}" target="_blank" rel="noopener noreferrer">
        Read source <span aria-hidden="true">↗</span>
      </a>
    </div>
  `;
}

function closeAllDetails(except) {
  document.querySelectorAll(".tell").forEach(tell => {
    if (tell === except) return;
    const panel = tell.querySelector(".detail");
    if (panel && !panel.hidden) {
      panel.classList.remove("open");
      panel.hidden = true;
      panel.innerHTML = "";
    }
    tell.querySelectorAll(".star[aria-expanded='true']")
        .forEach(s => s.setAttribute("aria-expanded", "false"));
  });
}

function wireStars() {
  document.addEventListener("click", (e) => {
    const star = e.target.closest(".star");
    if (!star) {
      // Click outside any star → close all.
      if (!e.target.closest(".detail")) closeAllDetails(null);
      return;
    }
    e.preventDefault();

    const tellEl = star.closest(".tell");
    const tellId = star.dataset.tell;
    const idx = Number(star.dataset.starIdx);
    const tell = TELLS.find(t => t.id === tellId);
    const starData = tell.stars[idx];

    const panel = tellEl.querySelector(".detail");
    const wasOpen = star.getAttribute("aria-expanded") === "true";

    // Close other tells' panels.
    closeAllDetails(tellEl);
    // Collapse other stars in this tell.
    tellEl.querySelectorAll(".star").forEach(s => s.setAttribute("aria-expanded", "false"));

    if (wasOpen) {
      panel.classList.remove("open");
      panel.hidden = true;
      panel.innerHTML = "";
      return;
    }

    panel.innerHTML = renderDetail(starData);
    panel.hidden = false;
    // Let the browser paint `hidden=false` first so the transition can animate.
    requestAnimationFrame(() => panel.classList.add("open"));
    star.setAttribute("aria-expanded", "true");
  });

  // Esc closes any open detail.
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllDetails(null);
  });
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

  const total = Math.round(
    TELLS.reduce((sum, t) => sum + scoreFor(t), 0) / TELLS.length
  );

  animateNumber(document.getElementById("total-num"), total, 2400);

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const tell = entry.target;
      const fill = tell.querySelector(".fill");
      const target = Number(fill.dataset.target);
      requestAnimationFrame(() => { fill.style.width = target + "%"; });

      const stars = tell.querySelectorAll(".star");
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

  wireStars();
  wireSubmitButton();

  document.getElementById("verdict").textContent = verdictFor(total);
}

// Pre-fill a GitHub issue when the user clicks "SUBMIT A STAR".
function wireSubmitButton() {
  const btn = document.getElementById("submit-star");
  if (!btn) return;
  const tellList = TELLS.map(t => `  - ${t.id}: ${t.title}`).join("\n");
  const body = [
    "### Which tell does this star belong to?",
    "_Pick one id from below, or suggest a new tell:_",
    tellList,
    "",
    "### News URL",
    "<paste link>",
    "",
    "### Source (e.g. BBC, Reuters, NYT, Wikipedia)",
    "",
    "### Date of the event",
    "e.g. \"Feb 28, 2024\" or \"2023–present\"",
    "",
    "### One-line headline (as it will appear on the page)",
    "",
    "### Proposed score (0–100) — how far along the indicator is this?",
    "",
    "### Why this belongs",
    ""
  ].join("\n");
  const url = "https://github.com/Leitet/idiocracy/issues/new?" +
    "labels=star-submission" +
    "&title=" + encodeURIComponent("[Star] ") +
    "&body=" + encodeURIComponent(body);
  btn.href = url;
}

document.addEventListener("DOMContentLoaded", init);
