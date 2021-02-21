// export default async function getImagesAsync(search){
//     try {
//        return await fetch(`https://restcountries.eu/rest/v2/name/${search}`)
//         .then(resp=>(resp.ok)
//         ?resp.json()
//         :Promise.reject('not found '+ resp.status))
//         .catch((err)=>{console.warn(err)});
//       //   console.log("getCountriesAsync:\n",result);

//         // return result;
//       } catch (err) {
//           console.log("Error catched......");
//         throw err;
//       }
// }

const myPixabayAPIKey = '20359812-1a8cb06279a89fe4a16bcb413';

export async function getImagesAsync(search){
    try {
       return await fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${search}&page=1&per_page=12&key=${myPixabayAPIKey}`)
        .then(resp=>(resp.ok)
        ?resp.json()
        :Promise.reject('not found '+ resp.status))
        .catch((err)=>{console.warn(err)});
      //   console.log("getCountriesAsync:\n",result);

        // return result;
      } catch (err) {
          console.log("Error catched......");
        throw err;
      }
}
