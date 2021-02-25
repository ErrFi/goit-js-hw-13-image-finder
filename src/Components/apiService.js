const myPixabayAPIKey = '20359812-1a8cb06279a89fe4a16bcb413';

async function getDataAsync(search){
  try {
     return await fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${search}&page=1&per_page=12&key=${myPixabayAPIKey}`)
      .then(resp=>(resp.ok)
      ?resp.json()
      :Promise.reject('not found '+ resp.status))
      .catch((err)=>{console.warn(err)});
    } catch (err) {
        console.log("Error catched......");
      throw err;
    }
}
// webformatURL - ссылка на маленькое изображение для списка карточек
// largeImageURL - ссылка на большое изображение (смотри пункт 'дополнительно')
// likes - количество лайков
// views - количество просмотров
// comments - количество комментариев
// downloads - количество загрузок
export async function getImagesAsync(search, page=1, per_page=12){
    try {
       return await fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${search}&page=${page}&per_page=${per_page}&key=${myPixabayAPIKey}`)
        .then(resp=>(resp.ok)
        ?resp.json()
        :Promise.reject('not found '+ resp.status))
        .catch((err)=>{console.warn(err)})

      } catch (err) {
          console.log("Error catched......");
        throw err;
      }
}
