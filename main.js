const url = "https://api.themoviedb.org/3/movie/popular?api_key=e88deaad2c5706752bff03d4decee143";
const fetchMovie = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results); // array of movies
      data.results.forEach((movie) => {
        console.log(movie.title);
        console.log(movie.backdrop_path);
        console.log(movie.release_date);
        console.log(movie.original_language);
      });
    })
    .catch((error) => console.error("Error:", error));
};
fetchMovie();
// fetch("https://api.themoviedb.org/3/movie/550?api_key=e88deaad2c5706752bff03d4decee143")
//   .then((res) => res.json())
//   .then((data) => console.log(data));
