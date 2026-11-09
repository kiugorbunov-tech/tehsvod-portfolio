const descriptions = {
  'Зерновые культуры': 'Согласуем назначение, показатели качества и условия приёмки зерна.',
  'Масличные культуры': 'Уточняем культуру, требования переработчика и порядок подтверждения показателей партии.',
  'Кормовые культуры': 'Обсуждаем вид продукции, параметры хранения и требования к поставке для кормопроизводства.'
};
const form = document.querySelector('form');
document.querySelectorAll('[data-crop]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-crop]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelector('#crop-title').textContent = button.dataset.crop;
  document.querySelector('#crop-text').textContent = descriptions[button.dataset.crop];
  form.elements.message.value = button.dataset.crop + '. Требуется согласовать партию.';
}));
form.addEventListener('submit', event => {
  event.preventDefault();
  form.querySelector('[role=status]').textContent = 'Запрос проверен. Это демонстрация, данные никуда не отправлены.';
});
