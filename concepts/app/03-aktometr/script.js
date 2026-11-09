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
document.querySelectorAll('[data-next]').forEach(button => button.onclick = () => go(button.dataset.next));
document.querySelectorAll('.object').forEach(button => button.onclick = () => {
  document.querySelectorAll('.object').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.getElementById('object-name').textContent = document.getElementById('doc-object').textContent = button.dataset.object;
});
document.getElementById('volumes-form').onsubmit = event => {
  event.preventDefault();
  if(['plaster', 'floor', 'paint'].every(id => Number(document.getElementById(id).value) === 0)) {
    document.getElementById('plaster').setCustomValidity('Укажите ненулевой объём хотя бы одной работы.');
    document.getElementById('plaster').reportValidity();
    return;
  }['plaster', 'floor', 'paint'].forEach(id => document.getElementById('doc-' + id).textContent = document.getElementById(id).value + ' м²');
  go('review');
};
['plaster', 'floor', 'paint'].forEach(id => document.getElementById(id).oninput = () => document.getElementById('plaster').setCustomValidity(''));
document.getElementById('paper').onchange = event => {
  document.getElementById('file-state').textContent = event.target.checked ? '✓ Бумажная схема отмечена': '! Приложений пока нет';
  document.getElementById('validation').textContent = event.target.checked ? 'Комплект можно передать на проверку.': 'Нужна отметка перед передачей.';
};
document.getElementById('create').onclick = () => {
  if(!document.getElementById('paper').checked) {
    document.getElementById('validation').textContent = 'Отметьте передачу схемы на бумаге.';
    document.getElementById('paper').focus();
    return;
  }if(!document.getElementById('volumes-form').reportValidity()) {
    go('volumes');
    return;
  }document.getElementById('volumes-form').requestSubmit();
  if(document.getElementById('plaster').validationMessage)return;
  document.getElementById('result-title').textContent = 'Демоакт собран';
  document.getElementById('attachment').textContent = 'Приложение — схема замеров на бумаге';
  go('result');
};
document.getElementById('download').onclick = () => {
  const text = ['ДЕМОНСТРАЦИОННЫЙ АКТ', document.getElementById('doc-object').textContent, ...Array.from(document.querySelectorAll('dl div'), row => row.textContent), 'Пример — концепт для портфолио'].join('\n');
  const url = URL.createObjectURL(new Blob([text], {
    type: 'text/plain;charset=utf-8'
  }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'demo-akt.txt';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

// Анимация материалов не меняет сценарий приложения.
{const reduced=matchMedia('(prefers-reduced-motion: reduce)');const stories=document.querySelectorAll('.visual-story');if(!reduced.matches){const observer=new IntersectionObserver(items=>{for(const item of items)if(item.isIntersecting){item.target.classList.add('is-visible');observer.unobserve(item.target)}},{threshold:.15});stories.forEach(item=>observer.observe(item));}}
