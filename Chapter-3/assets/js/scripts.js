AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic', offset: 60 });

const btn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  btn.classList.toggle('visible', window.scrollY > 400);
});

function copyCode(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('copied'); }, 2000);
  });
}

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
