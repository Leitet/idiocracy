// Render tells, stars (now lightning bolts), and animate the total score.

// Brawndo-style lightning bolt — the movie's single most iconic visual.
const STAR_SVG = `
<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M14 1 L4 13 L10.5 13 L9 23 L20 10 L13 10 Z"/>
</svg>`;

// Easter-egg-only — a teeny Brawndo can for the brawndo-rain gag.
const CAN_SVG = `
<svg viewBox="0 0 20 32" aria-hidden="true">
  <rect x="2" y="4" width="16" height="26" rx="2" ry="2" fill="#c7ff1f" stroke="#0a0d0f" stroke-width="1.5"/>
  <rect x="2" y="4" width="16" height="4" fill="#94c800"/>
  <path d="M7 14 L5 20 L9 20 L8 27 L14 18 L10 18 L12 14 Z" fill="#ffd400" stroke="#0a0d0f" stroke-width="0.8"/>
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
  wireEasterEggs(total);

  document.getElementById("verdict").textContent = verdictFor(total);
}

/* ============================================================
   EASTER EGGS — quotes, konami, brawndo rain, hash triggers.
   ============================================================ */

const SECRET_QUOTES = [
  "Brawndo: the thirst mutilator.",
  "I like money.",
  "You talk like a fag, and your shit's all retarded.",
  "I know shit's bad right now.",
  "Ow, my balls.",
  "Go away, 'batin'!",
  "Welcome to Costco. I love you."
];

function flashToast(text) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = text;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add("on"));
  setTimeout(() => {
    t.classList.remove("on");
    setTimeout(() => t.remove(), 400);
  }, 2400);
}

function brawndoRain(duration = 3500) {
  if (document.body.classList.contains("brawndo-mode")) return;
  document.body.classList.add("brawndo-mode");
  const root = document.createElement("div");
  root.className = "rain";
  document.body.appendChild(root);
  const COUNT = 40;
  for (let i = 0; i < COUNT; i++) {
    const can = document.createElement("div");
    can.className = "drop";
    can.innerHTML = CAN_SVG;
    can.style.left = (Math.random() * 100) + "vw";
    can.style.animationDuration = (1.6 + Math.random() * 1.8) + "s";
    can.style.animationDelay = (Math.random() * 0.8) + "s";
    can.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
    root.appendChild(can);
  }
  flashToast("IT'S GOT WHAT PLANTS CRAVE");
  setTimeout(() => {
    root.remove();
    document.body.classList.remove("brawndo-mode");
  }, duration);
}

function toggleNotSureMode() {
  document.body.classList.toggle("not-sure");
  flashToast(document.body.classList.contains("not-sure")
    ? "NOT SURE IF MODE ENABLED..."
    : "Mode: certain again.");
}

function wireEasterEggs(total) {
  // 1. Type "brawndo" anywhere → electrolyte rain.
  let buf = "";
  const TARGETS = { "brawndo": brawndoRain, "batin": () => flashToast("GO AWAY, 'BATIN'!"), "camacho": () => flashToast("CAMACHO — FIVE-TIME SMACKDOWN CHAMPION!") };
  document.addEventListener("keydown", (e) => {
    if (e.key.length !== 1) return;
    if (e.target && e.target.matches && e.target.matches("input, textarea")) return;
    buf = (buf + e.key.toLowerCase()).slice(-12);
    for (const [word, fn] of Object.entries(TARGETS)) {
      if (buf.endsWith(word)) { fn(); buf = ""; return; }
    }
  });

  // 2. Konami code → Not-Sure mode toggle.
  const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  let kIdx = 0;
  document.addEventListener("keydown", (e) => {
    const want = KONAMI[kIdx];
    const got = (e.key.length === 1) ? e.key.toLowerCase() : e.key;
    if (got === want) {
      kIdx++;
      if (kIdx === KONAMI.length) { toggleNotSureMode(); kIdx = 0; }
    } else {
      kIdx = (got === KONAMI[0]) ? 1 : 0;
    }
  });

  // 3. URL hash triggers.
  function handleHash() {
    const h = location.hash.slice(1).toLowerCase();
    if (h === "batin") flashToast("GO AWAY, 'BATIN'!");
    else if (h === "brawndo") brawndoRain();
    else if (h === "notsure") toggleNotSureMode();
  }
  window.addEventListener("hashchange", handleHash);
  handleHash();

  // 4. Verdict cycles through movie lines on a long, forgiving interval.
  const verdictEl = document.getElementById("verdict");
  let showingSecret = false;
  setInterval(() => {
    if (!verdictEl || document.body.classList.contains("not-sure")) return;
    if (showingSecret) {
      verdictEl.textContent = verdictFor(total);
    } else {
      verdictEl.textContent = SECRET_QUOTES[Math.floor(Math.random() * SECRET_QUOTES.length)];
    }
    verdictEl.classList.add("blip");
    setTimeout(() => verdictEl.classList.remove("blip"), 400);
    showingSecret = !showingSecret;
  }, 22000);

  // 5. Console Easter egg.
  const style = "background:#c7ff1f;color:#0a0d0f;padding:6px 10px;font-weight:900;font-size:14px;";
  console.log("%c Welcome to Costco. I love you. ", style);
  console.log("%c Try typing: brawndo · batin · camacho   — or press ↑↑↓↓←→←→BA ", "color:#ffd400;font-style:italic;");
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
