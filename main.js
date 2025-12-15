const apiToken = "e88deaad2c5706752bff03d4decee143";
const page = 1;
const apiURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiToken}&page=${page}`;

// const fetchMovies = (url) => {
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data); // array of movies
//       const Movies = data.results;
//       addToLocalStorage("Movies", Movies);
//       Movies.forEach((movie) => {
//         const movieList = {
//           id: movie.id,
//           title: movie.title,
//           imgURL: movie.poster_path,
//           date: movie.release_date,
//           language: movie.original_language,
//         };
//         addPersonalCard(movieList);
//         // console.log(movieList);
//       });
//     })
//     .catch((error) => console.error("Error:", error));
// };

const addToLocalStorage = (keyname, value) => {
  //Get existing array from localStorage OR start with empty array
  let value = JSON.parse(localStorage.getItem(keyname)) || [];
  // Save updated array back to localStorage
  localStorage.setItem(keyname, JSON.stringify(value));
  console.log("Updated array:", value);
};

const addPersonalCard = (data) => {
  const PersonalContainer = document.getElementById("personal-container");
  const div = document.createElement("div");
  div.className = "card";
  PersonalContainer.appendChild(div);
  div.innerHTML += `
      <img src="assets/imgs/favourite.png" class="icons hidden" id="liked"/>
      <img src="https://image.tmdb.org/t/p/w500${data.imgURL}" alt="movie" class="movie_img" />
      <h4 class='text-xl font-bold pt-2'>${data.title}</h4>
      <span class= "thin text-base text-gray-400">${data.date}</span>
      <span class= "thin text-sm text-gray-400" >${data.language}</span>
    `;

  div.addEventListener("click", () => {
    console.log("liked:", data.title);
    addToLocalStorage("liked", data.title);
  });
};

const selectLikes = () => {
  const clickLikes = document.querySelector("#personal-container");
  console.log(clickLikes);
};

fetchMovies(apiURL);
selectLikes();

// searchResult = []
// likedMovies = []
const searchResult = [];
const MovieTrendArr = [];

// Trending Movies
let likedMovs = [];
const TMDBurl = "https://api.themoviedb.org/3/trending/movie/week?api_key=e88deaad2c5706752bff03d4decee143";

//let likedMovs = []; // localstorage for favorites called: likedMovies

const fetchMovies = async () => {
  const response = await fetch(TMDBurl);
  const data = await response.json();
  console.log(data);
  createMovieCard(data);
};

fetchMovies();

const createMovieCard = (data) => {
  makeMovieCards(data);
};
//-------------------------------------------------------functions(zeinab)

function makeMovieCards(data) {
  const trendingCard = document.getElementById("card-container");

  data.results.forEach((element) => {
    const cardZ = document.createElement("div");
    cardZ.className =
      "relative border border-gray-600 p-3 m-4 overflow-hidden rounded-xl max-w-xs   transition transform duration-300 hover:scale-105 hover:border-purple-800  group";
    const posterMovie = document.createElement("img");
    posterMovie.src = `https://image.tmdb.org/t/p/w342${element.poster_path}`;
    posterMovie.alt = data.title;
    posterMovie.className = "rounded-lg mb-8 w-full object-contain ";
    cardZ.appendChild(posterMovie);
    trendingCard.appendChild(cardZ);
    //card mousover
    cardZ.addEventListener("mouseover", () => {});

    //create object:
    const MovieObject = {
      title: element.title,
      rate: element.vote_average.toFixed(1),
      realeaseYear: element.release_date.split("-")[0],
      type: element.media_type,
      id: element.id,
    };
    MovieTrendArr.push(MovieObject);
    //adding info from object to card:
    const Title = document.createElement("p");
    Title.innerHTML = MovieObject.title;
    Title.className = "text-white font-bold group-hover:text-purple-300 text-left";
    cardZ.appendChild(Title);

    const year = document.createElement("span");
    year.innerHTML = MovieObject.realeaseYear;
    year.className = "text-gray-400   text-sm";
    cardZ.appendChild(year);

    const typeMovie = document.createElement("div");
    typeMovie.innerHTML = MovieObject.type;
    typeMovie.className = "absolute bottom-4 right-5  rounded-full text-violet-300 bg-violet-950 pr-2 pl-2";
    cardZ.appendChild(typeMovie);

    const rating = document.createElement("div");
    rating.innerHTML = MovieObject.rate;
    rating.className = "absolute top-4 left-5  rounded-full bg-amber-500  pl-2 pr-3  before:content-['\u2605']";
    cardZ.appendChild(rating);

    const heart = document.createElement("span");
    heart.textContent = "\u2661";
    heart.className = "absolute top-3 right-4 text-3xl font-bold text-white cursor-pointer hover:bg-red-500 rounded-xl";
    cardZ.appendChild(heart);

    heart.addEventListener("click", () => {
      doOnLikeSymbol(heart, MovieObject);
    });
  });
}
function doOnLikeSymbol(heart, movie) {
  //change the color of heart
  if (heart.textContent === "\u2661") {
    heart.textContent = "\u2665";
    heart.classList.remove("text-white", "text-3xl");
    heart.classList.add("text-red-500", "text-5xl");
  } else if (heart.textContent === "\u2665") {
    heart.textContent = "\u2661";
    heart.classList.remove("text-red-500", "text-5xl");
    heart.classList.add("text-white", "text-3xl");
  }

  // make an array of liked movies
  likedMovs = JSON.parse(localStorage.getItem("likedMovies")) || [];

  const index = likedMovs.findIndex((m) => m.id === movie.id);

  if (index === -1) {
    likedMovs.push(movie);
  } else {
    likedMovs.splice(index, 1);
  }

  localStorage.setItem("likedMovies", JSON.stringify(likedMovs));
}
//-------------------------------------------------------functions(zeinab)
