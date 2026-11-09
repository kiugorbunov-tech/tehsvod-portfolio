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
let drink = 'Капучино', base = 240;
function update() {
  const size = document.querySelector('.sizes [aria-pressed=true]');
  const milk = document.querySelector('.milks [aria-pressed=true]');
  document.getElementById('total').textContent = (base + Number(size.dataset.extra) + Number(milk.dataset.extra)) + ' ₽';
  document.getElementById('result-drink').textContent = document.getElementById('drink-name').textContent = drink;
  document.getElementById('result-recipe').textContent = size.textContent + ' · ' + milk.textContent.replace(' +70 ₽', '').toLowerCase() + ' молоко' + (document.getElementById('sugar').checked ? ' · с сахаром': ' · без сахара');
  document.getElementById('favorite-status').textContent = 'Текущий рецепт ещё не сохранён.';
  document.getElementById('favorite').disabled = false;
} document.querySelectorAll('.drinks button').forEach(button => button.onclick = () => {
  document.querySelectorAll('.drinks button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  drink = button.dataset.name;
  base = Number(button.dataset.price);
  update();
});
['sizes', 'milks'].forEach(group => document.querySelectorAll('.' + group + ' button').forEach(button => button.onclick = () => {
  document.querySelectorAll('.' + group + ' button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  update();
}));
document.getElementById('sugar').onchange = update;
document.getElementById('order').onclick = () => {
  update();
  document.getElementById('result-time').textContent = document.getElementById('pickup-time').value;
  document.getElementById('result-title').textContent = 'Демозаказ готов';
  document.getElementById('feedback').textContent = 'Заказ не передаётся на кассу. Оплата не принимается.';
  go('result');
};
document.getElementById('favorite').onclick = () => {
  document.getElementById('favorite-status').textContent = 'Рецепт сохранён до перезагрузки.';
  document.querySelector('.empty b').textContent = drink;
  document.querySelector('.empty p').textContent = document.getElementById('result-recipe').textContent;
  document.getElementById('favorite').disabled = true;
};

// Анимация материалов не меняет сценарий приложения.
{const reduced=matchMedia('(prefers-reduced-motion: reduce)');const stories=document.querySelectorAll('.visual-story');if(!reduced.matches){const observer=new IntersectionObserver(items=>{for(const item of items)if(item.isIntersecting){item.target.classList.add('is-visible');observer.unobserve(item.target)}},{threshold:.15});stories.forEach(item=>observer.observe(item));}}
