// global vars
const searchResult = [];
let likedMovs = [];
const MovieTrendArr = [];
const TMDBurl = "https://api.themoviedb.org/3/trending/movie/week?api_key=e88deaad2c5706752bff03d4decee143";
const apiToken = "e88deaad2c5706752bff03d4decee143";
const page = 1;
const apiURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiToken}&page=${page}`;
//-----------------------------

const fetchpopularMovies = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const Movies = data.results;
      addToLocalStorage("Movies", Movies);

      Movies.forEach((movie) => {
        const movieList = {
          id: movie.id,
          title: movie.title,
          rate: movie.vote_average.toFixed(1),
          path: `https://image.tmdb.org/t/p/w342${movie.poster_path}`,
          realeaseYear: movie.release_date.split("-")[0],
          type: movie.media_type,
          language: movie.original_language.toUpperCase(),
          note: "",
        };

        const likedMovs = JSON.parse(localStorage.getItem("likedMovies")) || [];
        addCard(movieList, "popular-container", likedMovs);
      });
    })
    .catch((error) => console.error("Error:", error));
};

const addToLocalStorage = (keyname, value) => {
  localStorage.setItem(keyname, JSON.stringify(value));
};

const addCard = (data, container, likedMovs) => {
  const Container = document.getElementById(container);
  const div = document.createElement("div");
  div.className =
    "relative border border-gray-600 p-3 m-2 overflow-hidden rounded-xl duration-300 hover:scale-105 hover:border-purple-800 group";
  div.innerHTML += `
      <img src="${data.path}" alt="movie" class="movie_img" />
    `;
  const Title = document.createElement("p");
  Title.innerHTML = data.title;
  Title.className = "text-white font-bold group-hover:text-purple-300 text-left";
  div.appendChild(Title);

  const year = document.createElement("span");
  year.innerHTML = data.realeaseYear;
  year.className = "px-3 py-1 m-2 text-sm rounded-full text-violet-300 bg-violet-950";
  div.appendChild(year);

  const language = document.createElement("span");
  language.innerHTML = data.language;
  language.className = "px-3 py-1 text-sm rounded-full text-violet-300 bg-violet-950";
  div.appendChild(language);

  const top = document.createElement("div");
  const rating = document.createElement("span");
  rating.innerHTML = data.rate;
  rating.className = "absolute px-2 m-2.5 rounded-full bg-amber-500 before:content-['\u2605']";
  top.appendChild(rating);

  const heart = document.createElement("span");
  heart.textContent = "\u2665";
  heart.className = "absolute right-5";

  // check if the card is already in the Liked array
  const index = likedMovs.findIndex((m) => m.id === data.id);
  if (index === -1) {
    heart.id = "unliked";
  } else {
    heart.id = "liked";
  }

  top.appendChild(heart);
  div.prepend(top);
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

//searching in titles:
function searchArray(phrase, movieArray, searchResultArray) {
  phrase = phrase.toLowerCase().trim();
  if (!phrase) return [];

  const words = phrase.split(" ");
  movieArray.forEach((movie) => {
    console.log(movie.title);
    const title = (movie.title || "").toLowerCase();

    // check if any word matches
    const found = words.every((word) => title.includes(word));
    if (found) {
      searchResult.push(movie);
      // Save updated array back to localStorage
      localStorage.setItem(searchResultArray, JSON.stringify(movie));
    }
  });
}
const input = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
  const Movies = JSON.parse(localStorage.getItem("Movies")) || [];
  const searchResultArray = JSON.parse(localStorage.getItem("searchResults")) || [];

  console.log("hi");
  const phrase = input.value;
  console.log(phrase);
  const searchResult = searchArray(phrase, Movies, searchResultArray);
  console.log("Found movies:", searchResult);
});

//---------------------------------------------------------------TRENDING-----------------------------
//---------------------------------this lined should not be removed ----------------------------------
const fetchMovies = async () => {
  const response = await fetch(TMDBurl);
  const data = await response.json();
  console.log(data);
  createMovieCard(data);
  searchSetup(MovieTrendArr);
};

fetchMovies();

const createMovieCard = (data) => {
  makeMovieCards(data);
};
//----------------------------------------------functions Zeinab--------------------------------------

function searchSetup(MovieArr) {
  const input = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  searchBtn.addEventListener("click", () => {
    const phrase = input.value;
    searchResult.length = 0;
    searchArray(phrase, MovieArr);
    console.log("Found movies:", searchResult);
    input.value = "";
    const container = document.getElementById("trendingMovies");
    const containerPop = document.getElementById("popular");
    if (!phrase) return;
    containerPop.innerHTML = "";
    container.innerHTML = "";
    container.innerHTML = `<h1 class="text-4xl text-white font-bold">Search Result:</h1>`;
    searchResult.forEach((movie) => {
      container.innerHTML += `
    <div class="p-4   mb-2">
         <h2 class="text-xl ">${movie.title}</h2>
      <p class="text-left">Rating: ${movie.rate},Release Year: ${movie.realeaseYear} </p>
    </div>
  `;
    });
    if (searchResult.length == 0)
      container.innerHTML += `<p class="text-left text-xl"> No movie has been found for your serach!</p>`;
  });
}

function makeMovieCards(data) {
  const trendingCard = document.getElementById("card-container");

  data.results.forEach((element) => {
    const cardZ = document.createElement("div");
    cardZ.className =
      "relative border border-gray-600 p-3 m-2 overflow-hidden rounded-xl duration-300 hover:scale-105 hover:border-purple-800 group";
    const posterMovie = document.createElement("img");
    posterMovie.src = `https://image.tmdb.org/t/p/w342${element.poster_path}`;
    posterMovie.alt = data.title;
    posterMovie.className = "movie_img";
    cardZ.appendChild(posterMovie);
    trendingCard.appendChild(cardZ);

    //create object:
    const MovieObject = {
      title: element.title,
      rate: element.vote_average.toFixed(1),
      realeaseYear: element.release_date.split("-")[0],
      type: element.media_type,
      id: element.id,
      path: `https://image.tmdb.org/t/p/w342${element.poster_path}`,
      language: element.original_language.toUpperCase(),
      note: "",
    };
    // add this fetch result to localStorage
    addToLocalStorage("TrendingMovies", MovieObject);

    MovieTrendArr.push(MovieObject);
    //adding info from object to card:
    const Title = document.createElement("p");
    Title.innerHTML = MovieObject.title;
    Title.className = "text-white font-bold group-hover:text-purple-300 text-left";
    cardZ.appendChild(Title);

    const year = document.createElement("span");
    year.innerHTML = MovieObject.realeaseYear;
    year.className = "px-3 py-1 m-2 text-sm rounded-full text-violet-300 bg-violet-950";
    cardZ.appendChild(year);

    const typeMovie = document.createElement("span");
    typeMovie.innerHTML = MovieObject.language;
    typeMovie.className = "px-3 py-1 text-sm rounded-full text-violet-300 bg-violet-950";
    cardZ.appendChild(typeMovie);

    const top = document.createElement("div");
    const rating = document.createElement("span");
    rating.innerHTML = MovieObject.rate;
    rating.className = "absolute px-2 m-2.5 rounded-full bg-amber-500 before:content-['\u2605']";
    top.appendChild(rating);

    const heart = document.createElement("span");
    heart.textContent = "\u2665";
    // check if new liked card is already in the array or not
    const likedMovs = JSON.parse(localStorage.getItem("likedMovies")) || [];
    const index = likedMovs.findIndex((m) => m.id === element.id);
    if (index === -1) {
      heart.id = "unliked";
    } else {
      heart.id = "liked";
    }
    heart.className = "absolute right-5";
    top.appendChild(heart);
    cardZ.prepend(top);

    heart.addEventListener("click", () => {
      clickLike(heart, "likedMovies", MovieObject);
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
//localStorage.clear();

//searching in titles:
function searchArray(phrase, movieArray) {
  phrase = phrase.toLowerCase().trim();
  if (!phrase) return [];

  const words = phrase.split(" ");
  movieArray.forEach((movie) => {
    const title = (movie.title || "").toLowerCase();

    // check if any word matches
    const found = words.every((word) => title.includes(word));
    if (found) {
      searchResult.push(movie);
    }
  });
}
//-----------------------------------------functions Zeinab---------------------------------------
//----------------------------------------this needs to be here!---------------------------------------
