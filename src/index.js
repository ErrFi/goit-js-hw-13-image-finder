import './styles.css';

// import libraries
const _ = require('lodash');

// import templates 
const tmpltSearchForm = require('./templates/search-form.hbs');
const tmpltGallery = require('./templates/gallery.hbs');
const tmpltImageCard = require('./templates/image-card.hbs');
import {getImagesAsync} from "./Components/apiService.js"
console.dir(tmpltSearchForm({}));
console.dir(tmpltGallery({}));
console.dir(tmpltImageCard({}));

// webformatURL - ссылка на маленькое изображение для списка карточек
// largeImageURL - ссылка на большое изображение (смотри пункт 'дополнительно')
// likes - количество лайков
// views - количество просмотров
// comments - количество комментариев
// downloads - количество загрузок

const rootRef = document.querySelector("body");
console.log(rootRef);
const searchFormRef = rootRef.querySelector("#search-form");
console.log(searchFormRef);
const galleryRef = rootRef.querySelector("#gallery");
console.log(galleryRef);

function hndlSearchInput(event){
// console.log(event.target.value);
getImagesAsync(event.target.value).then(result=>{console.log(result)});
}

const timeDebounce = 1000; // ms to wait after input puse
const hndlSearchInputDebounced = _.debounce(hndlSearchInput, timeDebounce);


searchFormRef.addEventListener("input", hndlSearchInputDebounced);


