const apiToken = "e88deaad2c5706752bff03d4decee143";
const page = 1;
const apiURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiToken}&page=${page}`;

const fetchMovies = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // array of movies
      const Movies = data.results;
      addToLocalStorage("Movies", data.results);
      data.results.forEach((movie) => {
        const movieList = {
          title: movie.title,
          imgURL: movie.poster_path,
          date: movie.release_date,
          language: movie.original_language,
        };
        addPersonalCard(movieList);
        // console.log(movieList);
      });
    })
    .catch((error) => console.error("Error:", error));
};

const addToLocalStorage = (keyname, value) => {
  localStorage.setItem(keyname, JSON.stringify(value));
  console.log("Updated array:", value);
};

const addPersonalCard = (data) => {
  const PersonalContainer = document.getElementById("personal-container");
  PersonalContainer.innerHTML += `
    <div class="card">
      <img src="assets/imgs/favourite.png" class="icons hidden" id="liked"/>
      <img src="https://image.tmdb.org/t/p/w500${data.imgURL}" alt="movie" class="movie_img" />
      <h4 class='text-xl font-bold pt-2'>${data.title}</h4>
      <span class= "thin text-base text-gray-400">${data.date}</span>
      <span class= "thin text-sm text-gray-400" >${data.language}</span>
    </div>`;
};

const selectLikes = () => {
  const clickLikes = document.querySelector("#personal-container");
  console.log(clickLikes);
  // clickLikes.addEventListener("click", (event) => {});
};

fetchMovies(apiURL);
selectLikes();
