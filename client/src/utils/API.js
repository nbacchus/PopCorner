export const searchMovie = (query) => {
  return fetch(`http://api.tvmaze.com/search/shows?q=${query}`)
};

// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': '256e0eef2amsh49706671ceaafc8p16bbbbjsn0b7ffca4e93e',
//     'X-RapidAPI-Host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com'
//   }
// };

// // const query = "friends";

// export const searchMovie = (query) => {
//   fetch(`https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${query}`, options)
//     .then(response => response.json())
//     // .then(response => console.log(response))
//     .catch(err => console.error(err));
// };