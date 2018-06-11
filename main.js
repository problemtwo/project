window.onload = () => {
 [...document.getElementsByTagName('h1')].forEach(v => {
  v.onclick = () => {
   v.style.zIndex = 2;
   v.nextElementSibling.style.zIndex = 3;
   v.nextElementSibling.value = v.innerHTML;
  };
 });

 [...document.getElementsByTagName('textarea')].forEach(v => {
  v.onkeydown = k => {
   if(k.keyCode === 13){
    k.preventDefault();
    v.style.zIndex = 2;
    v.previousElementSibling.style.zIndex = 3;
    v.previousElementSibling.innerHTML = v.value;
   }
  } 
 });

 const keys = {
  'alt':false,
  'ctrl':false,
  'shift':false,
  'others':[]
 };

 const last_added_cell = {
  'top':0,
  'left':0
 }

 function update() {
  if(keys.shift && keys.others[78] && document.activeElement === document.body){
   const node = document.querySelector('#t-cell');
   const content = document.importNode(node.content,true);
   let cell_x = last_added_cell.left + 30;
   let cell_y = last_added_cell.top;
   if(cell_x + 30 >= 100){
    cell_x = 0;
    cell_y = last_added_cell.top + 30;
   }
   content.children[0].children[0].style.left = cell_x + '%';
   content.children[0].children[0].style.top = cell_y + '%';
   last_added_cell.left = cell_x;
   last_added_cell.top = cell_y;
   content.children[0].children[0].innerHTML = 'Nothing to see here...';
   document.querySelector('#cells').appendChild(content);
  }
 }

 window.onkeydown = k => {
  switch(k.keyCode) {
   case 16:
    keys.shift = true;
    break;
   case 17:
    keys.ctrl = true;
    break;
   case 18:
    keys.alt = true;
    break;
   default:
    keys.others[k.keyCode] = true;
    break;
  }
  update();
 }

 window.onkeyup = k => {
  switch(k.keyCode) {
   case 16:
    keys.shift = false;
    break;
   case 17:
    keys.ctrl = false;
    break;
   case 18:
    keys.alt = false;
    break;
   default:
    keys.others[k.keyCode] = false;
    break;
  }
  update();
 }
};
