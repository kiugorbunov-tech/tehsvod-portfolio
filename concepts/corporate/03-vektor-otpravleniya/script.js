const form = document.querySelector('form');
document.querySelectorAll('[data-cargo]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-cargo]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelector('#cargo-choice').textContent = button.dataset.cargo;
  form.elements.message.value = button.dataset.cargo + '. Откуда и куда требуется доставка?';
}));
form.addEventListener('submit', event => {
  event.preventDefault();
  form.querySelector('[role=status]').textContent = 'Описание проверено. Это демонстрация, данные никуда не отправлены.';
});
