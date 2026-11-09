const form = document.querySelector('form');
document.querySelectorAll('[data-survey]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-survey]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelector('#survey-choice').textContent = button.dataset.survey;
  form.elements.message.value = button.dataset.survey + '. Требуется согласовать границы работ.';
}));
form.addEventListener('submit', event => {
  event.preventDefault();
  form.querySelector('[role=status]').textContent = 'Задание проверено. Это демонстрация, данные никуда не отправлены.';
});

;(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)'),frame=document.querySelector('.visual-hero'),image=frame.querySelector('img');frame.addEventListener('pointermove',e=>{if(media.matches||e.pointerType!=='mouse')return;const r=frame.getBoundingClientRect();image.style.transformOrigin=((e.clientX-r.left)/r.width*100)+'% '+((e.clientY-r.top)/r.height*100)+'%';image.style.transform='scale(1.12)'});function reset(){image.style.transform=''}frame.addEventListener('pointerleave',reset);media.addEventListener('change',reset)})();