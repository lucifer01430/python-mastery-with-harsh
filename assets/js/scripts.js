
/* =========================================================
   Python Mastery with Harsh — Homepage Scripts
   Syncs with Chapter-1 and Chapter-2 via localStorage
========================================================= */

// ─── AOS (scroll animations) ───────────────────────────
AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic', offset: 60 });

// ─── Back to Top ────────────────────────────────────────
const backBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backBtn.classList.toggle('visible', window.scrollY > 400);
});

// ─── Progress Keys ──────────────────────────────────────
const TOTAL_MODULES = 15; // 13 chapters + 2 major projects
const CHAPTER_KEYS = [
  'python_chapter_1', 'python_chapter_2', 'python_chapter_3',
  'python_chapter_4',  'python_chapter_5',  'python_chapter_6',
  'python_chapter_7',  'python_chapter_8',  'python_project_1',
  'python_chapter_9',  'python_chapter_10', 'python_chapter_11',
  'python_chapter_12', 'python_chapter_13', 'python_project_mega'
];

// Map chapter keys to display names / links
const CHAPTER_META = {
  python_chapter_1:   { label: 'Chapter 1', link: './Chapter-1/index.html' },
  python_chapter_2:   { label: 'Chapter 2', link: './Chapter-2/index.html' },
  python_chapter_3:   { label: 'Chapter 3', link: null },
  python_chapter_4:   { label: 'Chapter 4', link: null },
  python_chapter_5:   { label: 'Chapter 5', link: null },
  python_chapter_6:   { label: 'Chapter 6', link: null },
  python_chapter_7:   { label: 'Chapter 7', link: null },
  python_chapter_8:   { label: 'Chapter 8', link: null },
  python_project_1:   { label: 'Project 1', link: null },
  python_chapter_9:   { label: 'Chapter 9',  link: null },
  python_chapter_10:  { label: 'Chapter 10', link: null },
  python_chapter_11:  { label: 'Chapter 11', link: null },
  python_chapter_12:  { label: 'Chapter 12', link: null },
  python_chapter_13:  { label: 'Chapter 13', link: null },
  python_project_mega:{ label: 'Mega Projects', link: null },
};

// ─── Read progress from localStorage ───────────────────
function getCompletedModules() {
  return CHAPTER_KEYS.filter(k => localStorage.getItem(k) === 'completed');
}

function getProgressPercent() {
  return Math.round((getCompletedModules().length / TOTAL_MODULES) * 100);
}

// ─── Update the global progress bar ────────────────────
function updateProgressUI() {
  const completed = getCompletedModules();
  const pct = getProgressPercent();

  // Big progress bar
  const bar = document.getElementById('globalProgressBar');
  const pctLabel = document.getElementById('globalProgressPct');
  const cntLabel = document.getElementById('globalCompletedCount');
  if (bar)      bar.style.width = pct + '%';
  if (pctLabel) pctLabel.textContent = pct + '%';
  if (cntLabel) cntLabel.textContent = completed.length + ' / ' + TOTAL_MODULES + ' Modules';

  // Progress steps (first 6 trackable nodes shown on homepage)
  const steps = document.querySelectorAll('.ps-circle[data-key]');
  steps.forEach(el => {
    const key = el.dataset.key;
    el.classList.remove('ps-done', 'ps-active', 'ps-pending');
    if (completed.includes(key)) {
      el.classList.add('ps-done');
      el.innerHTML = '<i class="fas fa-check" style="font-size:0.75rem"></i>';
    } else if (completed.length === CHAPTER_KEYS.indexOf(key)) {
      el.classList.add('ps-active');
    } else {
      el.classList.add('ps-pending');
    }
  });
}

// ─── Update chapter cards based on completion ──────────
function updateChapterCards() {
  const cards = document.querySelectorAll('.chapter-card[data-chapter-key]');
  cards.forEach(card => {
    const key = card.dataset.chapterKey;
    if (localStorage.getItem(key) === 'completed') {
      card.classList.add('completed');
    } else {
      card.classList.remove('completed');
    }
  });
}

// ─── Continue Learning Logic ────────────────────────────
function updateContinueLearning() {
  const completed = getCompletedModules();
  const el = document.getElementById('continueLearningContent');
  if (!el) return;

  // Find first not-yet-completed module that has a link
  let nextKey = null;
  let nextMeta = null;
  for (const key of CHAPTER_KEYS) {
    if (!completed.includes(key) && CHAPTER_META[key] && CHAPTER_META[key].link) {
      nextKey = key;
      nextMeta = CHAPTER_META[key];
      break;
    }
  }

  if (!nextKey) {
    // All available chapters done OR all done
    const ch1done = localStorage.getItem('python_chapter_1') === 'completed';
    const ch2done = localStorage.getItem('python_chapter_2') === 'completed';

    if (ch1done && ch2done) {
      el.innerHTML = `
        <div class="continue-badge"><i class="fas fa-trophy"></i> All Available Chapters Complete</div>
        <h3 class="fw-bold mb-2" style="font-family:'Syne',sans-serif">More Chapters Coming Soon!</h3>
        <p style="color:var(--text-muted);font-size:0.95rem;margin-bottom:0">
          You've completed all currently available chapters. Stay tuned — more content is on the way!
        </p>`;
    } else {
      el.innerHTML = buildContinueCard('python_chapter_1', { label: 'Chapter 1 — Modules, Comments & PIP', link: './Chapter-1/index.html' }, 'Start your Python journey');
    }
    return;
  }

  let title = '';
  let subtitle = '';
  if (nextKey === 'python_chapter_1') {
    title = 'Chapter 1 — Modules, Comments & PIP';
    subtitle = 'Start your Python journey right now!';
  } else if (nextKey === 'python_chapter_2') {
    title = 'Chapter 2 — Variables & Data Types';
    subtitle = 'Great job finishing Chapter 1! Keep going.';
  }

  el.innerHTML = buildContinueCard(nextKey, { label: title || nextMeta.label, link: nextMeta.link }, subtitle);
}

function buildContinueCard(key, meta, subtitle) {
  return `
    <div class="continue-badge"><i class="fas fa-play-circle"></i> Continue Learning</div>
    <h3 class="fw-bold mb-2" style="font-family:'Syne',sans-serif">
      ${meta.label}
    </h3>
    <p style="color:var(--text-muted);font-size:0.95rem;margin-bottom:24px">${subtitle}</p>
    <a href="${meta.link}" class="btn-continue">
      <i class="fas fa-arrow-right"></i> Open Chapter
    </a>`;
}

// ─── Animated Counters ──────────────────────────────────
function animateCounter(el, target, suffix = '', duration = 1500) {
  const start = 0;
  const startTime = performance.now();
  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(start + (target - start) * eased) + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(step);
}

function initCounters() {
  const completed = getCompletedModules().length;
  const pct = getProgressPercent();
  const counters = document.querySelectorAll('.counter-num[data-target]');
  counters.forEach(el => {
    let target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';

    // Dynamic values
    if (el.dataset.dynamic === 'completed') target = completed;
    if (el.dataset.dynamic === 'pct')       target = pct;

    animateCounter(el, target, suffix);
  });
}

// Intersection observer to trigger counters once visible
const countersSection = document.getElementById('statsSection');
if (countersSection) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { initCounters(); obs.disconnect(); } });
  }, { threshold: 0.3 });
  obs.observe(countersSection);
}

// ─── Roadmap node state ─────────────────────────────────
function updateRoadmapNodes() {
  const completed = getCompletedModules();
  const nodes = document.querySelectorAll('.roadmap-node[data-key]');
  nodes.forEach(node => {
    const key = node.dataset.key;
    node.classList.remove('node-done', 'node-active', 'node-pending');
    if (completed.includes(key)) {
      node.classList.add('node-done');
      if (!node.dataset.special) {
        node.innerHTML = '<i class="fas fa-check" style="font-size:0.8rem"></i>';
      }
    } else {
      node.classList.add('node-pending');
    }
  });
}

// ─── Init all ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateProgressUI();
  updateChapterCards();
  updateContinueLearning();
  updateRoadmapNodes();
});

// ─── Mobile nav toggle ──────────────────────────────────
const hamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.style.display === 'flex';
    mobileMenu.style.display = open ? 'none' : 'flex';
  });
  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => { mobileMenu.style.display = 'none'; });
  });
}

// ─── Smooth scroll for nav links ────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
