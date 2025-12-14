const url =
  "https://api.themoviedb.org/3/movie/popular?api_key=e88deaad2c5706752bff03d4decee143";
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

// Trending Movies

const TMDBurl =
  "https://api.themoviedb.org/3/trending/movie/week?api_key=e88deaad2c5706752bff03d4decee143";

const MovieTrendArr = [];
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
    };
    MovieTrendArr.push(MovieObject);
    //adding info from object to card:
    const Title = document.createElement("p");
    Title.innerHTML = MovieObject.title;
    Title.className =
      "text-white font-bold group-hover:text-purple-300 text-left";
    cardZ.appendChild(Title);

    const year = document.createElement("span");
    year.innerHTML = MovieObject.realeaseYear;
    year.className = "text-gray-400   text-sm";
    cardZ.appendChild(year);

    const typeMovie = document.createElement("div");
    typeMovie.innerHTML = MovieObject.type;
    typeMovie.className =
      "absolute bottom-4 right-5  rounded-full text-violet-300 bg-violet-950 pr-2 pl-2";
    cardZ.appendChild(typeMovie);

    const rating = document.createElement("div");
    rating.innerHTML = MovieObject.rate;
    rating.className =
      "absolute top-4 left-5  rounded-full bg-amber-500  pl-2 pr-3  before:content-['\u2605']";
    cardZ.appendChild(rating);

    const heart = document.createElement("span");
    heart.textContent = "\u2661";
    heart.className =
      "absolute top-3 right-4 text-3xl font-bold text-white cursor-pointer hover:bg-red-500 rounded-xl";
    cardZ.appendChild(heart);

    heart.addEventListener("click", () => {
      doOnLikeSymbol(heart);
    });
  });
}

function doOnLikeSymbol(heart) {
  if (heart.textContent === "\u2661") {
    heart.textContent = "\u2665";
    heart.classList.remove("text-white", "text-3xl");
    heart.classList.add("text-red-500", "text-5xl");
  } else if (heart.textContent === "\u2665") {
    heart.textContent = "\u2661";
    heart.classList.remove("text-red-500", "text-5xl");
    heart.classList.add("text-white", "text-3xl");
  }

  //change the color of heart
  // make an array of liked movies
}
