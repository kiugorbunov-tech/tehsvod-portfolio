const systems = {
  'Продажи и склад': ['Заказ', 'Отгрузка', 'Проверяем, как заказ резервирует товар, как меняются остатки и откуда менеджер узнаёт об отгрузке.', 'Состав · остатки · статус'],
  'Склад и учёт': ['Движение', 'Проводка', 'Сверяем единицы измерения, номенклатуру и документы движения, чтобы учёт отражал состояние склада.', 'Документ · партия · учёт'],
  'Сервис и продажи': ['Обращение', 'Клиент', 'Определяем, как история обращений попадает к менеджеру и как сервис получает данные о заказе.', 'Клиент · заказ · история']
};
const form = document.querySelector('form');
document.querySelectorAll('[data-system]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-system]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  const [left, right, text, fields] = systems[button.dataset.system];
  document.querySelector('#endpoint-left').textContent = left;
  document.querySelector('#endpoint-right').textContent = right;
  document.querySelector('#system-title').textContent = button.dataset.system;
  document.querySelector('#system-text').textContent = text;
  document.querySelector('.connector span').textContent = fields;
  form.elements.message.value = button.dataset.system + '. Требуется наладить обмен данными.';
}));
form.addEventListener('submit', event => {
  event.preventDefault();
  form.querySelector('[role=status]').textContent = 'Задача проверена. Это демонстрация, данные никуда не отправлены.';
});
