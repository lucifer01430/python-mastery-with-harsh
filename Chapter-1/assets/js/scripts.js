
// Init AOS
AOS.init({
    duration: 700,
    once: true,
    easing: 'ease-out-cubic',
    offset: 60
});

// Back to Top
const btn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
});

// Copy button
function copyCode(btn, text) {
    navigator.clipboard.writeText(text).then(() => {
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.innerHTML = orig;
            btn.classList.remove('copied');
        }, 2000);
    });
}

// Interactive Checklist
function toggleCheck(el) {
    el.classList.toggle('checked');
    updateProgress();
}

function updateProgress() {
    const items = document.querySelectorAll('#checklistBox .check-item');
    const checked = document.querySelectorAll('#checklistBox .check-item.checked').length;
    document.getElementById('progressCount').textContent = checked + '/' + items.length;
    const pct = (checked / items.length) * 100;
    document.getElementById('checkProgressBar').style.width = pct + '%';
}

// Smooth active nav highlighting
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 140) current = s.getAttribute('id');
    });
});

// Typing animation in hero (optional subtle effect)
(function () {
    // No heavy typing lib needed; the code window is already visually animated via CSS
})();
