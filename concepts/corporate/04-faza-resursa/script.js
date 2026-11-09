const power = document.querySelector('#power');
power.addEventListener('click', () => {
  const active = power.getAttribute('aria-pressed') !== 'true';
  power.setAttribute('aria-pressed', String(active));
  document.querySelector('.circuit').classList.toggle('active', active);
  document.querySelector('#power-state').textContent = active ? 'Рабочий контур выделен. Это схема, включение оборудования не выполняется.' : 'Схема перед включением';
});
const form = document.querySelector('form');
form.addEventListener('submit', event => {
  event.preventDefault();
  form.querySelector('[role=status]').textContent = 'Задача проверена. Это демонстрация, данные никуда не отправлены.';
});

;(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){if(!media.matches)entry.target.animate([{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0)'}],{duration:1100,easing:'ease-out'});observer.unobserve(entry.target)}},{threshold:.15});document.querySelectorAll('.visual-process,.visual-detail').forEach(image=>observer.observe(image));media.addEventListener('change',()=>{if(media.matches)document.getAnimations().forEach(a=>a.cancel())})})();