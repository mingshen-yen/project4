// global vars
const searchResult = [];
let likedMovs = [];
const MovieTrendArr = [];
const TMDBurl = "https://api.themoviedb.org/3/trending/movie/week?api_key=e88deaad2c5706752bff03d4decee143";
const apiToken = "e88deaad2c5706752bff03d4decee143";
const page = 1;
const apiURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiToken}&page=${page}`;
//-----------------------------

// reload liked list from localStorage and keep heart in clicked situation
window.addEventListener("load", function () {
  const likedMovs = JSON.parse(localStorage.getItem("likedMovies"));
  const Movies = JSON.parse(localStorage.getItem("Movies"));
});

const fetchpopularMovies = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // array of movies
      const Movies = data.results;
      addToLocalStorage("Movies", Movies);
      Movies.forEach((movie) => {
        const movieList = {
          id: movie.id,
          title: movie.title,
          rate: movie.vote_average.toFixed(1),
          imgURL: `https://image.tmdb.org/t/p/w342${movie.poster_path}`,
          realeaseYear: movie.release_date.split("-")[0],
          type: movie.media_type,
        };
        addCard(movieList);
      });
    })
    .catch((error) => console.error("Error:", error));
};

const addToLocalStorage = (keyname, value) => {
  //Get existing array from localStorage OR start with empty array
  // let storedArray = JSON.parse(localStorage.getItem(keyname)) || [];
  // Add new value at the beginning of the array
  // storedArray.unshift(value);
  // Save updated array back to localStorage
  localStorage.setItem(keyname, JSON.stringify(value));
  console.log("Updated array:", value);
};

const addCard = (data) => {
  const Container = document.getElementById("popular-container");
  const div = document.createElement("div");
  div.className = "card card-hover";
  div.innerHTML += `
      <img src="${data.imgURL}" alt="movie" class="movie_img" />
      <h4>${data.title}</h4>
      <span class= "thin text-base text-gray-400">${data.realeaseYear}</span>
    `;
  const heart = document.createElement("span");
  heart.textContent = "\u2665";
  heart.id = "unliked";
  div.prepend(heart);
  Container.appendChild(div);
  heart.addEventListener("click", () => {
    clickLike(heart, "likedMovies", data);
  });
};

const clickLike = (heart, keyname, data) => {
  //change the color of heart
  if (heart.id === "liked") {
    heart.id = "unliked";
  } else if (heart.id === "unliked") {
    heart.id = "liked";
  }
  // add new liked card to localStorage
  // Get existing array from localStorage OR start with empty array
  let likedMovs = JSON.parse(localStorage.getItem(keyname)) || [];

  // check if new liked card is already in the array or not
  const index = likedMovs.findIndex((m) => m.id === data.id);
  if (index === -1) {
    likedMovs.push(data);
  } else {
    likedMovs.splice(index, 1);
  }
  // Save updated array back to localStorage
  localStorage.setItem(keyname, JSON.stringify(likedMovs));
  console.log("Updated array:", likedMovs);
};

fetchpopularMovies(apiURL);

//-------------------------------------------------------functions(zeinab)

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

function makeMovieCards(data) {
  const trendingCard = document.getElementById("card-container");

  data.results.forEach((element) => {
    const cardZ = document.createElement("div");
    cardZ.className =
      "relative border border-gray-600 p-3 m-4 overflow-hidden rounded-xl max-w-xs transition transform duration-300 hover:scale-105 hover:border-purple-800 group";
    const posterMovie = document.createElement("img");
    posterMovie.src = `https://image.tmdb.org/t/p/w342${element.poster_path}`;
    posterMovie.alt = data.title;
    posterMovie.className = "rounded-lg mb-8 w-full object-contain ";
    cardZ.appendChild(posterMovie);
    trendingCard.appendChild(cardZ);

    //create object:
    const MovieObject = {
      title: element.title,
      rate: element.vote_average.toFixed(1),
      realeaseYear: element.release_date.split("-")[0],
      type: element.media_type,
      id: element.id,
      imgURL: posterMovie.src,
    };

    MovieTrendArr.push(MovieObject);
    //adding info from object to card:
    const Title = document.createElement("p");
    Title.innerHTML = MovieObject.title;
    Title.className = "text-white font-bold group-hover:text-purple-300 text-left";
    cardZ.appendChild(Title);

    const year = document.createElement("span");
    year.innerHTML = MovieObject.realeaseYear;
    year.className = "text-gray-400 text-sm";
    cardZ.appendChild(year);

    const typeMovie = document.createElement("div");
    typeMovie.innerHTML = MovieObject.type;
    typeMovie.className = "absolute bottom-4 right-5 rounded-full text-violet-300 bg-violet-950 pr-2 pl-2";
    cardZ.appendChild(typeMovie);

    const rating = document.createElement("div");
    rating.innerHTML = MovieObject.rate;
    rating.className = "absolute top-4 left-5 rounded-full bg-amber-500  pl-2 pr-3  before:content-['\u2605']";
    cardZ.appendChild(rating);

    const heart = document.createElement("span");
    heart.textContent = "\u2661";
    heart.className =
      "absolute top-3 right-4 text-3xl font-bold text-white cursor-pointer hover:bg-red-500 rounded-full";
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
  console.log(movie);

  localStorage.setItem("likedMovies", JSON.stringify(likedMovs));
}
//-------------------------------------------------------functions(zeinab)
//localStorage.clear();
// search function
const Movies = JSON.parse(localStorage.getItem("Movies"));
// for (let i = 0; i < Movies.length; i++) {
//   const key = localStorage.key(i);
//   if (key.includes("movie")) {
//     console.log("Matched key:", key);
//   }
// }
