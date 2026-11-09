const go = id => {
  const screen = document.getElementById(id);
  screen.scrollIntoView( {
    block: 'nearest', inline: 'center'
  });
  screen.setAttribute('tabindex', '-1');
  screen.focus( {
    preventScroll: true
  });
};
document.querySelectorAll('[data-next]').forEach(button => button.onclick = () => go(button.dataset.next));
let quantity = 2;
function update() {
  document.getElementById('count').textContent = quantity;
  document.getElementById('cost').textContent = document.getElementById('bill').textContent = `${quantity*390} ₽`;
  document.getElementById('ordered').textContent = `Бутылей по 19 литров — ${quantity}`;
} document.getElementById('less').onclick = () => {
  quantity = Math.max(1, quantity - 1);
  update();
};
document.getElementById('more').onclick = () => {
  quantity = Math.min(12, quantity + 1);
  update();
};
document.getElementById('address-form').onsubmit = event => {
  event.preventDefault();
  document.getElementById('destination').textContent = `${document.getElementById('street').value.trim()}, кв. ${document.getElementById('flat').value.trim()}`;
  go('delivery');
};
document.querySelectorAll('.slots button').forEach(button => button.onclick = () => {
  document.querySelectorAll('.slots button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.getElementById('interval').textContent = button.textContent;
});
document.getElementById('order').onclick = () => {
  if(!document.getElementById('address-form').reportValidity()) {
    go('address');
    return;
  }document.getElementById('result-title').textContent = 'Демозаказ оформлен';
  document.getElementById('notice').textContent = 'Сохранено в текущем просмотре. Доставка не вызывается.';
  update();
  go('result');
};

// Анимация материалов не меняет сценарий приложения.
{const reduced=matchMedia('(prefers-reduced-motion: reduce)');const stories=document.querySelectorAll('.visual-story');if(!reduced.matches){const observer=new IntersectionObserver(items=>{for(const item of items)if(item.isIntersecting){item.target.classList.add('is-visible');observer.unobserve(item.target)}},{threshold:.15});stories.forEach(item=>observer.observe(item));}}
