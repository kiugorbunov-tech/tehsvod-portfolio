const form = document.querySelector('form');
const descriptions = {
  'Бетон': 'Определяем характеристики образцов и сопоставляем результат с требованиями вашего проекта.',
  'Грунт': 'Исследуем физические свойства грунта для оценки основания в рамках согласованного задания.',
  'Раствор': 'Проверяем свойства раствора с учётом его назначения и условий применения.',
  'Инертные материалы': 'Уточняем зерновой состав и характеристики материала для его использования в смеси.'
};
document.querySelectorAll('[data-material]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-material]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelector('#material-title').textContent = button.dataset.material;
  document.querySelector('#material-description').textContent = descriptions[button.dataset.material];
  form.elements.message.value = button.dataset.material + '. Требуется согласовать исследование.';
}));
form.addEventListener('submit', event => {
  event.preventDefault();
  form.querySelector('[role=status]').textContent = 'Запрос проверен. Это демонстрация, данные никуда не отправлены.';
});
