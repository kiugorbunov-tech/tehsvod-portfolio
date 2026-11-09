const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const fmt = value => new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
function pressed(selector,target){$$(selector).forEach(button=>button.setAttribute('aria-pressed',String(button===target)));}
const form = $('#lead-form');
let machineIndex=0;
const machines=[['Экскаватор',18000,'Для котлованов, траншей и планировки. Подберём ковш и рабочие параметры по грунту и объёму.','Грунт, глубина, объём работ','excavator'],['Автокран',26000,'Для подъёма грузов. Уточним массу, вылет стрелы, высоту и условия установки.','Масса груза, вылет стрелы, высота','crane'],['Манипулятор',22000,'Для перевозки и разгрузки. Уточним габариты, массу груза и доступ к месту разгрузки.','Габариты, масса и точка разгрузки','loader']];
function updateDispatch(){
  const shifts=$('#shifts');
  const valid=shifts.value!==''&&shifts.checkValidity();
  shifts.setAttribute('aria-invalid',String(!valid));
  const machine=machines[machineIndex];
  $('#shift-rate').textContent=machine[0]+' · '+fmt(machine[1])+' за смену';
  $('#cost-total').textContent=valid?fmt(Number(shifts.value)*machine[1]):'Укажите 1–14 смен';
  $('#form-status').textContent='';
  $('#form-context').textContent=machine[0]+'. '+(valid?shifts.value+' смен. '+fmt(Number(shifts.value)*machine[1])+'.':'Число смен уточняется.')+' Подача отдельно.';
}
$$('[data-machine]').forEach(button=>button.addEventListener('click',()=>{
  pressed('[data-machine]',button);
  machineIndex=Number(button.dataset.machine);
  const machine=machines[machineIndex];
  $('#machine-name').textContent=machine[0];
  $('#machine-hero').textContent=machine[0];
  $('#machine-info').textContent=machine[2];
  $('#machine-data').textContent=machine[3];
  $('#vehicle').setAttribute('aria-label','Схема: '+machine[0]);
  $$('#vehicle > g').forEach(group=>group.toggleAttribute('hidden',group.id!==machine[4]));
  updateDispatch();
}));
$('#shifts').addEventListener('input',updateDispatch);
updateDispatch();
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
 const mode=10;
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
