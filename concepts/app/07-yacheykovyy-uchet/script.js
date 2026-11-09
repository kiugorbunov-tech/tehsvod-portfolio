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
document.getElementById('scan-demo').onclick = () => {
  document.getElementById('cell').value = 'А-05';
  document.getElementById('cell-error').textContent = 'Демокод считан. Откройте ячейку.';
};
document.getElementById('cell-form').onsubmit = event => {
  event.preventDefault();
  const address = document.getElementById('cell').value.trim().toUpperCase().replace('A', 'А');
  if(address !== 'А-05') {
    document.getElementById('cell-error').textContent = 'В демоверсии доступна только ячейка А-05.';
    return;
  }go('count');
};
function compare() {
  const input = document.getElementById('actual');
  if(!input.reportValidity())return false;
  const delta = Number(input.value) - 24;
  document.getElementById('delta').textContent = delta > 0 ? '+' + delta: String(delta).replace('-', '−');
  document.getElementById('diff-title').textContent = delta === 0 ? 'Остаток совпал': 'Количество не совпало';
  document.getElementById('explanation').textContent = delta === 0 ? 'Можно сохранить пересчёт без причины расхождения.': 'Проверьте соседние ячейки и зафиксируйте причину расхождения.';
  document.getElementById('reason').disabled = delta === 0;
  document.getElementById('reason-error').textContent = delta === 0 ? 'Причина не требуется.': 'Без причины расхождение не закрывается.';
  go('difference');
  return true;
} document.getElementById('compare').onclick = compare;
document.getElementById('finish').onclick = () => {
  if(!compare())return;
  const actual = Number(document.getElementById('actual').value);
  const reason = document.getElementById('reason').value;
  if(actual !== 24&&!reason) {
    document.getElementById('reason-error').textContent = 'Выберите причину расхождения.';
    document.getElementById('reason').focus();
    return;
  }document.getElementById('result-actual').textContent = actual + ' шт.';
  document.getElementById('result-delta').textContent = document.getElementById('delta').textContent + ' шт.';
  document.getElementById('result-reason').textContent = actual === 24 ? 'Остаток подтверждён пересчётом': reason;
  document.getElementById('result-title').textContent = 'Демопересчёт сохранён';
  document.getElementById('feedback').textContent = 'Изменения остатков не отправляются.';
  go('result');
};

// Анимация материалов не меняет сценарий приложения.
{const reduced=matchMedia('(prefers-reduced-motion: reduce)');const stories=document.querySelectorAll('.visual-story');if(!reduced.matches){const observer=new IntersectionObserver(items=>{for(const item of items)if(item.isIntersecting){item.target.classList.add('is-visible');observer.unobserve(item.target)}},{threshold:.15});stories.forEach(item=>observer.observe(item));}}
