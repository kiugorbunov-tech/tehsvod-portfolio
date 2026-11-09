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
document.getElementById('request-form').onsubmit = event => {
  event.preventDefault();
  go('photos');
};
document.getElementById('photo').onchange = event => {
  const file = event.target.files[0];
  document.getElementById('photo-title').textContent = file ? 'Изображение добавлено': 'Фотографий пока нет';
  document.getElementById('file-info').textContent = file ? file.name + ' · только локальный просмотр': 'Файл останется на вашем устройстве.';
};
document.getElementById('send').onclick = () => {
  if(!document.getElementById('request-form').reportValidity()) {
    go('request');
    return;
  }document.getElementById('result-topic').textContent = document.getElementById('topic').value;
  document.getElementById('result-place').textContent = document.getElementById('place').value;
  document.getElementById('result-title').textContent = 'Демозаявка создана';
  document.getElementById('application-count').textContent = 'Одна демозаявка';
  document.getElementById('sent').textContent = 'Запись создана в текущем просмотре. УК не уведомлена.';
  go('result');
};

// Анимация материалов не меняет сценарий приложения.
{const reduced=matchMedia('(prefers-reduced-motion: reduce)');const stories=document.querySelectorAll('.visual-story');if(!reduced.matches){const observer=new IntersectionObserver(items=>{for(const item of items)if(item.isIntersecting){item.target.classList.add('is-visible');observer.unobserve(item.target)}},{threshold:.15});stories.forEach(item=>observer.observe(item));const hero=document.querySelector('.visual-hero');hero.addEventListener('pointermove',event=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--vx',((event.clientX-r.left)/r.width*100)+'%');hero.style.setProperty('--vy',((event.clientY-r.top)/r.height*100)+'%')});}}
