const form = document.querySelector('form');
document.querySelectorAll('[data-product]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-product]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelector('#choice').textContent = button.dataset.product;
  form.elements.message.value = button.dataset.product + '. Требуется изготовление по чертежам.';
}));
form.addEventListener('submit', event => {
  event.preventDefault();
  form.querySelector('[role=status]').textContent = 'Обращение проверено. Это демонстрация, данные никуда не отправлены.';
});

;(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)'),image=document.querySelector('.visual-hero img');let queued=false;function draw(){queued=false;image.style.transform=media.matches?'':'translateY('+Math.min(scrollY*.08,45)+'px) scale(1.08)'}addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(draw)}},{passive:true});media.addEventListener('change',draw);draw()})();