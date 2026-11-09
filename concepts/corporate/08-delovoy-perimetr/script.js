const descriptions = {
  'Офисный объект': 'Рабочие места арендаторов, общие пространства, режим доступа и инженерная инфраструктура.',
  'Торговый объект': 'Потоки посетителей, режим арендаторов, уборка и непрерывная работа общих систем.',
  'Складской объект': 'Погрузочные зоны, транспортный доступ, техническая готовность помещений и режим хранения.'
};
const form = document.querySelector('form');
document.querySelectorAll('[data-asset]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-asset]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelector('#asset-title').textContent = button.dataset.asset;
  document.querySelector('#asset-text').textContent = descriptions[button.dataset.asset];
  form.elements.message.value = button.dataset.asset + '. Требуется обсудить управление.';
}));
form.addEventListener('submit', event => {
  event.preventDefault();
  form.querySelector('[role=status]').textContent = 'Обращение проверено. Это демонстрация, данные никуда не отправлены.';
});
