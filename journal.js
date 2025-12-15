const likedMovs = JSON.parse(localStorage.getItem("likedMovies")) || [];

likedMovs.forEach((element) => {
  console.log(element.path);
  const favoriteContainer = document.getElementById("favourites-container");
  const cardZ = document.createElement("div");
  cardZ.className = cardZ.className =
    "relative border border-gray-600 p-3 m-4 overflow-hidden rounded-xl max-w-xs   transition transform duration-300 hover:scale-105 hover:border-purple-800  group";
  const posterMovie = document.createElement("img");
  const srchelp = element.poster_path;
  posterMovie.src = element.path;
  posterMovie.alt = element.title;
  posterMovie.className = "rounded-lg mb-8 w-full object-contain ";
  cardZ.appendChild(posterMovie);
  favoriteContainer.appendChild(cardZ);
  console.log(posterMovie.src, " ", srchelp);
  const Title = document.createElement("p");
  Title.innerHTML = element.title;
  Title.className =
    "text-white font-bold group-hover:text-purple-300 text-left";
  cardZ.appendChild(Title);

  const year = document.createElement("span");
  year.innerHTML = element.realeaseYear;
  year.className = "text-gray-400   text-sm";
  cardZ.appendChild(year);

  const typeMovie = document.createElement("div");
  typeMovie.innerHTML = element.type;
  typeMovie.className =
    "absolute bottom-4 right-5  rounded-full text-violet-300 bg-violet-950 pr-2 pl-2";
  cardZ.appendChild(typeMovie);

  const rating = document.createElement("div");
  rating.innerHTML = element.rate;
  rating.className =
    "absolute top-4 left-5  rounded-full bg-amber-500  pl-2 pr-3  before:content-['\u2605']";
  cardZ.appendChild(rating);

  const heart = document.createElement("span");
  heart.textContent = "\u2665";
  heart.className =
    "absolute top-3 right-4 text-5xl font-bold text-red-500 cursor-pointer hover:bg-red-500 rounded-xl";
  cardZ.appendChild(heart);
  const removeBtn = document.getElementById("removeBtn");
  removeBtn.addEventListener("click", () => {
    cardZ.remove();

    localStorage.clear();
  });
});
