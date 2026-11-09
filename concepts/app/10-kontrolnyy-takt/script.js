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
document.querySelectorAll('.choices').forEach(group => group.querySelectorAll('button').forEach(button => button.onclick = () => {
  group.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
}));
function faults() {
  return Array.from(document.querySelectorAll('.choices')).filter(group => group.querySelector('[aria-pressed=true]').dataset.value === 'fault').map(group => group.dataset.point);
} document.getElementById('review').onclick = () => {
  const names = faults();
  document.getElementById('defect-title').textContent = names.length ? 'Дефект без описания': 'Замечаний нет';
  document.getElementById('defect-warning').hidden = !names.length;
  document.getElementById('description').disabled = !names.length;
  document.getElementById('description-error').textContent = names.length ? 'Опишите дефект минимум в 10 символах.': 'Можно закрыть обход без пояснения.';
  go('defect');
};
document.getElementById('close').onclick = () => {
  const names = faults();
  const text = document.getElementById('description').value.trim();
  if(names.length&&text.length < 10) {
    document.getElementById('description-error').textContent = 'Пояснение слишком короткое. Нужно минимум 10 символов.';
    document.getElementById('description').focus();
    return;
  }document.getElementById('fault-count').textContent = names.length;
  document.getElementById('fault-heading').textContent = names.length ? names.join(', '): 'Замечания отсутствуют';
  document.getElementById('fault-description').textContent = names.length ? text: 'Все пункты отмечены как исправные в демоверсии.';
  document.getElementById('result-title').textContent = 'Демообход закрыт';
  document.getElementById('feedback').textContent = 'Результат показан локально. Диспетчер не уведомлён.';
  go('result');
};

// Анимация материалов не меняет сценарий приложения.
{const reduced=matchMedia('(prefers-reduced-motion: reduce)');const stories=document.querySelectorAll('.visual-story');if(!reduced.matches){const observer=new IntersectionObserver(items=>{for(const item of items)if(item.isIntersecting){item.target.classList.add('is-visible');observer.unobserve(item.target)}},{threshold:.15});stories.forEach(item=>observer.observe(item));const hero=document.querySelector('.visual-hero');hero.addEventListener('pointermove',event=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--vx',((event.clientX-r.left)/r.width*100)+'%');hero.style.setProperty('--vy',((event.clientY-r.top)/r.height*100)+'%')});}}
