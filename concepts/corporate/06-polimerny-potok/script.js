const texts = {
  'Водоснабжение': 'Уточняем состав среды, рабочие условия и способ соединения. Подбор выполняется по техническому заданию.',
  'Водоотведение': 'Учитываем состав стоков, глубину заложения и внешнюю нагрузку на трубопровод.',
  'Кабельная защита': 'Проверяем условия прокладки, требования к защите кабеля и возможности протяжки.'
};
const form = document.querySelector('form');
document.querySelectorAll('[data-medium]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-medium]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelector('#medium-title').textContent = button.dataset.medium;
  document.querySelector('#medium-text').textContent = texts[button.dataset.medium];
  form.elements.message.value = button.dataset.medium + '. Требуется подбор трубной системы.';
}));
form.addEventListener('submit', event => {
  event.preventDefault();
  form.querySelector('[role=status]').textContent = 'Задание проверено. Это демонстрация, данные никуда не отправлены.';
});
