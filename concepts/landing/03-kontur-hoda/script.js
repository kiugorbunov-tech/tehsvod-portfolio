const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const fmt = value => new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
function pressed(selector,target){$$(selector).forEach(button=>button.setAttribute('aria-pressed',String(button===target)));}
const form = $('#lead-form');
let system='Двигатель';
let packageIndex=0;
const packages=[['Одна система',1500],['Комплексная проверка',4500]];
function updateOrder(){
  $('#cost-total').textContent=fmt(packages[packageIndex][1]);
  $('#form-status').textContent='';
  $('#form-context').textContent=system+'. '+packages[packageIndex][0]+'. '+fmt(packages[packageIndex][1])+'. Ремонт отдельно.';
}
$$('[data-system]').forEach((button,index)=>button.addEventListener('click',()=>{
  pressed('[data-system]',button);
  system=button.dataset.system;
  $('#system-name').textContent=system;
  $('#system-copy').textContent=['Нестабильные обороты? Начнём с поиска причины.','Посторонний стук? Проверим подвеску и крепления.','Ошибка на панели? Проверим цепи и соединения.'][index];
  $('#gauge-needle').setAttribute('transform','rotate('+[0,-55,40][index]+' 300 225)');
  updateOrder();
}));
$$('[data-package]').forEach(button=>button.addEventListener('click',()=>{
  packageIndex=Number(button.dataset.package);
  pressed('[data-package]',button);
  updateOrder();
}));
updateOrder();
function validateField(field){
 let message='';
 if(field.name==='name' && !/^[\p{L}][\p{L}\s’'−-]{1,59}$/u.test(field.value.trim())){
  message='Укажите имя от 2 до 60 букв.';
 }
 if(field.name==='phone'){
  const digits=field.value.replace(/\D/g,'');
  if(!/^[78]\d{10}$/.test(digits))message='Введите российский телефон +7 и ещё 10 цифр.';
 }
 if(field.name==='consent' && !field.checked){
  message='Подтвердите, что понимаете условия демонстрации.';
 }
 field.setAttribute('aria-invalid',String(Boolean(message)));
 $('#'+field.name+'-error').textContent=message;
 return !message;
}
const fields=['name','phone','consent'].map(name=>form.elements.namedItem(name));
fields.forEach(field=>field.addEventListener(field.type==='checkbox'?'change':'input',()=>{
 if(field.getAttribute('aria-invalid')==='true')validateField(field);
 $('#form-status').textContent='';
}));
form.addEventListener('submit',event=>{
 event.preventDefault();
 const invalid=fields.filter(field=>!validateField(field));
 if(invalid.length){
  $('#form-status').textContent='Проверьте отмеченные поля.';
  invalid[0].focus();
  return;
 }
 $('#form-status').textContent='Демонстрационная заявка подготовлена. Данные никуда не отправлены и не сохранены. '+$('#form-context').textContent;
});

/* Task 15 ? photography movement and header measurement */
{
 const opening=document.querySelector('.visual-opening'),image=opening.querySelector('img');
 const header=document.querySelector('header'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const masthead=()=>document.documentElement.style.setProperty('--masthead',header.getBoundingClientRect().height+'px');
 masthead();new ResizeObserver(masthead).observe(header);
 const mode=3;
 let queued=false;
 function updatePhoto(){
  queued=false;
  if(reduced.matches){image.style.transform='';return;}
  const rect=opening.getBoundingClientRect();
  const progress=Math.min(1,Math.max(0,-rect.top/rect.height));
  if(mode===5||mode===10)image.style.transform='scale(1.08) translateY('+progress*5+'%)';
  if(mode===2)image.style.clipPath='inset(0 '+progress*12+'% 0 0)';
  if(mode===6)image.style.filter='brightness('+(1-progress*.18)+')';
 }
 if([2,5,6,10].includes(mode))addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(updatePhoto);}},{passive:true});
 if(mode===3)opening.addEventListener('pointermove',event=>{
  if(reduced.matches)return;
  const rect=opening.getBoundingClientRect();
  opening.style.setProperty('--light-x',(event.clientX-rect.left)/rect.width*100+'%');
  opening.style.setProperty('--light-y',(event.clientY-rect.top)/rect.height*100+'%');
 });
 reduced.addEventListener('change',()=>{image.style.transform='';image.style.clipPath='';image.style.filter='';});
}
