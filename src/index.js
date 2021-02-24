import './styles.css';

// import libraries
const _ = require('lodash');

// import templates
const tmpltSearchForm = require('./templates/search-form.hbs');
const tmpltGallery = require('./templates/gallery.hbs');
const tmpltImageCard = require('./templates/image-card.hbs');
import { getImagesAsync } from './Components/apiService.js';
console.dir(tmpltSearchForm({}));
console.dir(tmpltGallery({}));
console.dir(tmpltImageCard({}));

// webformatURL - ссылка на маленькое изображение для списка карточек
// largeImageURL - ссылка на большое изображение (смотри пункт 'дополнительно')
// likes - количество лайков
// views - количество просмотров
// comments - количество комментариев
// downloads - количество загрузок

const rootRef = document.querySelector('body');
console.log(rootRef);
const searchFormRef = rootRef.querySelector('#search-form');
console.log(searchFormRef);
const galleryRef = rootRef.querySelector('.gallery');
console.log(galleryRef);
const loadMoreRef = rootRef.querySelector('#load-more');
console.log(loadMoreRef);

let pageCounter = 1;
let searchRequest = '';

function hndlSearchInput(event) {
    pageCounter = 1;
    searchRequest = event.target.value;

  getImagesAsync(searchRequest, pageCounter).then(resp => {
    console.log(resp);
    // const galleryID = 'gallery-1';

    const imageCardMarkup = tmpltImageCard(resp);
    // console.dir(imageCardMarkup);

    const galleryMarkup = tmpltGallery({imageCards: imageCardMarkup});
    // console.log(galleryMarkup);
    if(galleryRef.textContent!==''){
        galleryRef.textContent='';
        // console.warn(galleryRef);
    }
    galleryRef.insertAdjacentHTML('beforeend',galleryMarkup);

    // return resp;
  });
}
function hndlLoadMore(event){
    pageCounter += 1;
    getImagesAsync(searchRequest, pageCounter).then(resp => {
        console.log(resp);
        // const galleryID = 'gallery-1';
    
        const imageCardMarkup = tmpltImageCard(resp);
        // console.dir(imageCardMarkup);
    
        const galleryMarkup = tmpltGallery({imageCards: imageCardMarkup});
        // console.log(galleryMarkup);
       
        galleryRef.insertAdjacentHTML('beforeend',galleryMarkup);
    
        // return resp;
      });
    
}

const timeDebounce = 1000; // ms to wait after input puse
const hndlSearchInputDebounced = _.debounce(hndlSearchInput, timeDebounce);

searchFormRef.addEventListener('input', hndlSearchInputDebounced);
loadMoreRef.addEventListener('click', hndlLoadMore)