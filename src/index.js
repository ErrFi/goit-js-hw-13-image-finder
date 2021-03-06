import './styles.css';

// import libraries
const _ = require('lodash');

// import templates
const tmpltSearchForm = require('./templates/search-form.hbs');
const tmpltGallery = require('./templates/gallery.hbs');
const tmpltImageCard = require('./templates/image-card.hbs');
import { getImagesAsync } from './Components/apiService.js';
// import { createHtmlTagObject } from 'html-webpack-plugin';
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

// scrolling helpers>>>>>>>>>>>>>>>>>>
// for endless scroll:
const scrollPointerID = 'endless-scroll-pointer' ;
const scrollPointerRef = document.createElement("div");
scrollPointerRef.id = scrollPointerID;
// for loadMore 
const loadMorePointerID = 'load-more-pointer' ;
const loadMorePointerRef = document.createElement('div');
loadMorePointerRef.id = loadMorePointerID;

let pageCounter = 1;
let searchRequest = '';


function hndlSearchInput(event) {
    pageCounter = 1;
    searchRequest = event.target.value;

  getImagesAsync(searchRequest, pageCounter).then(resp => {
    console.log(resp);
    // const galleryID = 'gallery-1';

    if(document.getElementById(scrollPointerID)!=null){document.getElementById(scrollPointerID).remove()}
    if(document.getElementById(loadMorePointerID)!=null){document.getElementById(loadMorePointerID).remove()}

    const imageCardMarkup = tmpltImageCard(resp);
    // console.dir(imageCardMarkup);

    const galleryMarkup = tmpltGallery({imageCards: imageCardMarkup});
    // console.log(galleryMarkup);
    if(galleryRef.textContent!==''){
        galleryRef.textContent='';
        // console.warn(galleryRef);
    }
    galleryRef.insertAdjacentHTML('beforeend',galleryMarkup);
    galleryRef.appendChild(scrollPointerRef);

    // return resp;
  });
}
function updateGalleryMarkup(data){
  const imageCardMarkup = tmpltImageCard(data);
  const galleryMarkup = tmpltGallery({imageCards: imageCardMarkup});
  galleryRef.insertAdjacentHTML('beforeend',galleryMarkup);
}

function hndlLoadMore(event, per_page=12){
    pageCounter += 1;
    getImagesAsync(searchRequest, pageCounter, per_page).then(resp => {
        console.log(resp);    

        if(document.getElementById(scrollPointerID)!=null){document.getElementById(scrollPointerID).remove()};
        loadMorePointerRef.remove();
        if(document.getElementById(loadMorePointerID)!=null){document.getElementById(loadMorePointerID).remove()};

      // add loadMorePointer>>>>>>>
        galleryRef.appendChild(loadMorePointerRef);
        
        
      //  insert markup >>>>>>>>>>>>
        updateGalleryMarkup(resp);
        
        // scroll to loadMorePointer >>>>>>>>>>>>
        loadMorePointerRef.scrollIntoView({block: "top", behavior: "smooth"});//true
        

      // add scrollPointer for intersectObserver >>>>>>>
        galleryRef.appendChild(scrollPointerRef);
    
      return resp;
      })
      ;
    
}
function hndlEndlessScroll(event, per_page=12){
  pageCounter += 1;
  getImagesAsync(searchRequest, pageCounter, per_page).then(resp => {
    console.log(resp);    

    if(document.getElementById(scrollPointerID)!=null){document.getElementById(scrollPointerID).remove()};
  
  //  insert markup >>>>>>>>>>>>
    updateGalleryMarkup(resp);

  // add scrollPointer for intersectObserver >>>>>>>
    galleryRef.appendChild(scrollPointerRef);

  return resp;
  });
}

const observer = new IntersectionObserver(entries=>{
    if(!entries.some(entry=>entry.intersectionRatio>0)){
        return;
    }
    hndlEndlessScroll();

})

const timeDebounce = 500; // ms to wait after input puse
const hndlSearchInputDebounced = _.debounce(hndlSearchInput, timeDebounce);

searchFormRef.addEventListener('input', hndlSearchInputDebounced);
loadMoreRef.addEventListener('click', hndlLoadMore);
observer.observe(scrollPointerRef);
