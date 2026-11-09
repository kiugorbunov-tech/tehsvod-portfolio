const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const fmt = value => new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
const form = $('#lead-form');
let dayIndex=0;
const menus=[['Понедельник','Курица с булгуром','Тыквенный суп','Салат из свежих овощей','Содержит глютен и молоко. Полный состав уточняется.'],['Вторник','Индейка с рисом','Овощной суп','Салат из капусты','Состав соуса и возможные аллергены уточняются.'],['Среда','Овощи с чечевицей','Грибной суп','Салат с огурцом','Возможны молоко и сельдерей. Полный состав уточняется.'],['Четверг','Рыба с картофелем','Суп с крупой','Салат из свёклы','Содержит рыбу и глютен. Полный состав уточняется.'],['Пятница','Говядина с гречкой','Суп с фасолью','Морковный салат','Состав заправки и возможные аллергены уточняются.']];
function updateLunch(){
  const portions=$('#portions-count');
  const valid=portions.value!==''&&portions.checkValidity();
  portions.setAttribute('aria-invalid',String(!valid));
  $('#cost-total').textContent=valid?fmt(Number(portions.value)*450):'Укажите 5–100 порций';
  $('#form-status').textContent='';
  $('#form-context').textContent=menus[dayIndex][0]+', '+menus[dayIndex][1]+'. '+(valid?portions.value+' порций. '+fmt(Number(portions.value)*450)+'.':'Число порций уточняется.');
  $('#less').disabled=valid&&Number(portions.value)<=5;
  $('#more').disabled=valid&&Number(portions.value)>=100;
}
function setDay(index){
  dayIndex=index;
  const menu=menus[index];
  $('#menu-day').textContent=menu[0];
  $('#menu-main').textContent=menu[1];
  $('#menu-side').replaceChildren(document.createTextNode(menu[2]),document.createElement('br'),document.createTextNode(menu[3]));
  $('#menu-allergens').textContent=menu[4];
  $$('[data-day],[data-menu-select]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.day??button.dataset.menuSelect)===index)));
  updateLunch();
}
$$('[data-day],[data-menu-select]').forEach(button=>button.addEventListener('click',()=>setDay(Number(button.dataset.day??button.dataset.menuSelect))));
$('#portions-count').addEventListener('input',updateLunch);
function stepPortions(step){
  const input=$('#portions-count');
  const current=input.value!==''&&Number.isFinite(input.valueAsNumber)?input.valueAsNumber:10;
  input.value=Math.min(100,Math.max(5,Math.round(current)+step));
  updateLunch();
}
$('#less').addEventListener('click',()=>stepPortions(-1));
$('#more').addEventListener('click',()=>stepPortions(1));
updateLunch();
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
 const mode=9;
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
