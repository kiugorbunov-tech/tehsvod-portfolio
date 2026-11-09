const go = id => {
  const screen = document.getElementById(id);
  screen.scrollIntoView( {
    block: 'nearest'
  });
  screen.tabIndex = - 1;
  screen.focus( {
    preventScroll: true
  });
};
document.querySelectorAll('[data-go]').forEach(button => button.onclick = () => go(button.dataset.go));
document.querySelectorAll('.specialties button').forEach(button => button.onclick = () => {
  document.querySelectorAll('.specialties button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.getElementById('selected-specialty').textContent = button.dataset.name + ' · приём';
  document.getElementById('result-specialty').textContent = button.dataset.name;
});
document.querySelectorAll('.slots button').forEach(button => button.onclick = () => {
  document.querySelectorAll('.slots button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.getElementById('result-time').textContent = button.textContent;
});
document.getElementById('patient-form').onsubmit = event => {
  event.preventDefault();
  document.getElementById('patient-name').textContent = document.getElementById('name').value;
  document.getElementById('result-title').textContent = 'Демозапись готова';
  document.getElementById('feedback').textContent = 'Клиника не уведомляется. Данные останутся до перезагрузки.';
  go('result');
};

// Анимация материалов не меняет сценарий приложения.
{const reduced=matchMedia('(prefers-reduced-motion: reduce)');const stories=document.querySelectorAll('.visual-story');if(!reduced.matches){const observer=new IntersectionObserver(items=>{for(const item of items)if(item.isIntersecting){item.target.classList.add('is-visible');observer.unobserve(item.target)}},{threshold:.15});stories.forEach(item=>observer.observe(item));}}
