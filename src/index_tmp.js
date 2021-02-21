import './styles.css';

// import template from './templates/menu.hbs';
const templateFn = require('./templates/menu.hbs');

// const menuData = require('./menu.json');
console.table(menuData);
const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
  };

  const bodyRef = document.querySelector("body");
  const destList = document.querySelector(".menu.js-menu");  
  const themeSwitchRef = document.querySelector("#theme-switch-toggle");
//  функция установки текущей темы
  function setCurrentTheme (isDARK){
    if(isDARK){
      bodyRef.classList.remove(Theme.LIGHT);
      bodyRef.classList.add(Theme.DARK);
      themeSwitchRef.checked = isDARK;
    }
    else{
      bodyRef.classList.remove(Theme.DARK);
      bodyRef.classList.add(Theme.LIGHT);
      themeSwitchRef.checked = isDARK;
    }
  }
//   функция обработки переключения темы
  function hndlThemeSwitchChanged(event){
    // const themeSwitchState = themeSwitchRef.checked;
    localStorage.setItem('isDARK', themeSwitchRef.checked);  
    console.log("Theme is Dark: ", themeSwitchRef.checked);
    if (themeSwitchRef.checked){
      bodyRef.classList.add(Theme.DARK); 
      bodyRef.classList.remove(Theme.LIGHT);
    }
    else{
      bodyRef.classList.add(Theme.LIGHT); 
      bodyRef.classList.remove(Theme.DARK);
    }    
  }
// функция сохранения текущей темы в localStorage
  function hndlBeforeUnload(event){
    localStorage.setItem('isDARK', themeSwitchRef.checked);    
  }
  // проверим localStorage на наличие записи isDARK, в которой хранится текущая тема. Если запись отсутствует, создадим её
if(!localStorage.getItem('isDARK')){
    localStorage.setItem('isDARK', false);
    console.log("isDARK is in the localStorage now ");    
  }

  setCurrentTheme (JSON.parse(localStorage.getItem('isDARK')));

  destList.innerHTML = menuData.reduce((acc, value)=>acc+templateFn(value).trim(), ''); // html разметка с подставленными значениями

//   обработка событий
  themeSwitchRef.addEventListener('change', hndlThemeSwitchChanged);
  window.addEventListener('beforeunload', hndlBeforeUnload);