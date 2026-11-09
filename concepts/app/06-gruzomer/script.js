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
let base = 1900, car = 'Фургон';
function total() {
  const amount = base + (document.getElementById('helpers').checked ? 1200: 0);
  document.getElementById('total').textContent = amount.toLocaleString('ru-RU');
  document.getElementById('result-total').textContent = amount.toLocaleString('ru-RU') + ' ₽';
  return amount;
} document.querySelectorAll('.vehicles button').forEach(button => button.onclick = () => {
  document.querySelectorAll('.vehicles button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  base = Number(button.dataset.cost);
  car = button.dataset.car;
  total();
});
document.getElementById('helpers').onchange = total;
document.getElementById('route-form').onsubmit = event => {
  event.preventDefault();
  go('cargo');
};
document.getElementById('apply').onclick = () => {
  document.getElementById('promo-state').textContent = document.getElementById('promo').value.trim() ? 'Код не найден в демоверсии. Цена остаётся прежней.': 'Введите код или продолжите без скидки.';
};
document.getElementById('order').onclick = () => {
  if(!document.getElementById('route-form').reportValidity()) {
    go('route');
    return;
  }if(!document.getElementById('cargo-name').reportValidity()) {
    go('cargo');
    return;
  }document.getElementById('from-address').textContent = document.getElementById('origin').value;
  document.getElementById('to-address').textContent = document.getElementById('destination').value;
  document.getElementById('result-car').textContent = car;
  document.getElementById('result-cargo').textContent = document.getElementById('cargo-name').value;
  document.getElementById('result-when').textContent = document.getElementById('when').value;
  document.getElementById('result-title').textContent = 'Деморейс оформлен';
  document.getElementById('feedback').textContent = 'Сохранено в деморежиме. Машина не вызывается.';
  total();
  go('result');
};

// Анимация материалов не меняет сценарий приложения.
{const reduced=matchMedia('(prefers-reduced-motion: reduce)');const stories=document.querySelectorAll('.visual-story');if(!reduced.matches){const observer=new IntersectionObserver(items=>{for(const item of items)if(item.isIntersecting){item.target.classList.add('is-visible');observer.unobserve(item.target)}},{threshold:.15});stories.forEach(item=>observer.observe(item));}}
