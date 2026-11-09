const go = id => {
  const element = document.getElementById(id);
  element.scrollIntoView( {
    block: 'nearest'
  });
  element.tabIndex = - 1;
  element.focus( {
    preventScroll: true
  });
};
document.querySelectorAll('[data-go]').forEach(button => button.onclick = () => go(button.dataset.go));
document.querySelectorAll('.worklist button').forEach(button => button.onclick = () => {
  document.querySelectorAll('.worklist button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.getElementById('book-work').textContent = button.querySelector('span').textContent;
  document.getElementById('book-price').textContent = Number(button.dataset.price).toLocaleString('ru-RU') + ' ₽';
});
document.querySelectorAll('.slots button').forEach(button => button.onclick = () => {
  document.querySelectorAll('.slots button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.getElementById('book-time').textContent = button.textContent;
});
document.getElementById('book').onclick = () => {
  document.getElementById('done-title').textContent = 'Демозапись готова';
  document.getElementById('feedback').textContent = 'Сервис не уведомляется. Вы можете изменить время.';
  go('done');
};

// Анимация материалов не меняет сценарий приложения.
{const reduced=matchMedia('(prefers-reduced-motion: reduce)');const stories=document.querySelectorAll('.visual-story');if(!reduced.matches){const observer=new IntersectionObserver(items=>{for(const item of items)if(item.isIntersecting){item.target.classList.add('is-visible');observer.unobserve(item.target)}},{threshold:.15});stories.forEach(item=>observer.observe(item));}}
