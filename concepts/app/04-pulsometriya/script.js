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
let selectedTime = '10:00';
document.querySelectorAll('.classrow').forEach(button => button.onclick = () => {
  selectedTime = button.dataset.time;
  document.querySelectorAll('.classrow').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.getElementById('training-name').textContent = button.dataset.name;
  document.getElementById('training-time').textContent = '7 ноября · ' + selectedTime;
  const mobility = selectedTime === '12:00';
  document.getElementById('description').textContent = mobility ? 'Мягкая работа с подвижностью суставов и контролем движений.': 'Базовые движения с собственным весом и свободными весами.';
  document.getElementById('duration').textContent = mobility ? '45 минут': '50 минут';
  document.querySelector('[data-go="wait"]').textContent = selectedTime === '10:00' ? 'Проверить места': 'Забронировать демоместо';
});
document.querySelector('[data-go="wait"]').onclick = () => {
  if(selectedTime === '10:00') {
    go('wait');
    return;
  }complete(selectedTime, selectedTime === '12:00' ? 'Мобильность': 'Силовая база');
};
function complete(time, name) {
  document.getElementById('result-time').textContent = time;
  document.getElementById('result-name').textContent = name;
  document.getElementById('result-room').textContent = time === '12:00' ? 'Студия · 45 минут': 'Зал 1 · 50 минут';
  document.getElementById('result-title').textContent = 'Демоместо закреплено';
  document.getElementById('final-feedback').textContent = 'Бронь показана в деморежиме.';
  go('result');
} document.getElementById('reserve').onclick = () => complete('18:00', 'Силовая база');
document.getElementById('waitlist').onclick = () => {
  document.getElementById('wait-feedback').textContent = 'Вы в демонстрационном листе ожидания на 10:00. Уведомления не отправляются.';
  document.getElementById('waitlist').disabled = true;
};

// Анимация материалов не меняет сценарий приложения.
{const reduced=matchMedia('(prefers-reduced-motion: reduce)');const stories=document.querySelectorAll('.visual-story');if(!reduced.matches){const observer=new IntersectionObserver(items=>{for(const item of items)if(item.isIntersecting){item.target.classList.add('is-visible');observer.unobserve(item.target)}},{threshold:.15});stories.forEach(item=>observer.observe(item));}}
