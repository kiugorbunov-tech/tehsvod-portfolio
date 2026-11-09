const descriptions = {
  'Кухня-гостиная': 'Общее пространство для ужинов и разговоров, отдельная спальня для отдыха.',
  'Отдельный кабинет': 'Рабочее место за отдельной дверью, чтобы домашний и рабочий день не мешали друг другу.',
  'Семейная квартира': 'Изолированные комнаты, место для хранения и общая гостиная для всей семьи.'
};
const form = document.querySelector('form');
document.querySelectorAll('[data-plan]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-plan]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelector('#plan-title').textContent = button.dataset.plan;
  document.querySelector('#plan-text').textContent = descriptions[button.dataset.plan];
  form.elements.message.value = 'Интересует ' + button.dataset.plan.toLowerCase() + '.';
}));
form.addEventListener('submit', event => {
  event.preventDefault();
  form.querySelector('[role=status]').textContent = 'Запрос проверен. Это демонстрация, данные никуда не отправлены.';
});
