// reload populate list from localStorage
const likedMovs = JSON.parse(localStorage.getItem("likedMovies"));
const NoFav = document.querySelector("#middlePage");
updateEmptyState(likedMovs);
showNumbers(likedMovs);

// revise fuction for remove btn
const removeBtn = document.getElementById("removeBtn");
removeBtn.addEventListener("click", () => {
  const likes = document.querySelectorAll("#likedcard");
  likes.forEach((item) => item.remove());
  numContainer.remove();
  NoFav.classList.remove("hidden");
  localStorage.removeItem("likedMovies");
  localStorage.removeItem("savedNotes");
  likedMovs = [];
});

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

likedMovs.forEach((element) => {
  const favoriteContainer = document.getElementById("favourites-container");
  const div = document.createElement("div");
  div.id = "likedcard";
  div.className = div.className =
    "relative border border-gray-600 p-3 m-2 overflow-hidden rounded-xl duration-300 hover:scale-105 hover:border-purple-800 group";
  const posterMovie = document.createElement("img");
  posterMovie.src = element.path;
  posterMovie.alt = element.title;
  posterMovie.className = "movie_img";
  div.appendChild(posterMovie);
  favoriteContainer.appendChild(div);

  const Title = document.createElement("p");
  Title.innerHTML = element.title;
  Title.className = "text-white font-bold group-hover:text-purple-300 text-left";
  div.appendChild(Title);

  const year = document.createElement("span");
  year.innerHTML = element.realeaseYear;
  year.className = "px-3 py-1 m-2 text-sm rounded-full text-violet-300 bg-violet-950";
  div.appendChild(year);

  const language = document.createElement("span");
  language.innerHTML = element.language;
  language.className = "px-3 py-1 text-sm rounded-full text-violet-300 bg-violet-950";
  div.appendChild(language);

  const top = document.createElement("div");
  const rating = document.createElement("span");
  rating.innerHTML = element.rate;
  rating.className = "absolute px-2 m-2.5 rounded-full bg-amber-500 before:content-['\u2605']";
  top.appendChild(rating);

  const heart = document.createElement("span");
  heart.textContent = "\u2665";
  heart.id = "liked";
  heart.className = "absolute right-5";
  top.appendChild(heart);
  div.prepend(top);

  heart.addEventListener("click", () => {
    clickLike(heart, "likedMovies", element);
    div.remove();
    const likedMovs = JSON.parse(localStorage.getItem("likedMovies"));
    const numMovies = likedMovs.length;
    const numCards = document.querySelector("#numCards");
    numCards.innerHTML = `${numMovies} Movie(s) selected: `;
    updateEmptyState(likedMovs);
    if (numMovies === 0) {
      numCards.remove();
    }
  });

  // add notes for each favourite movie
  function getNote() {
    return JSON.parse(localStorage.getItem("likedMovies")) || [];
  }
  function setNote(favs) {
    localStorage.setItem("likedMovies", JSON.stringify(favs));
  }

  const form = document.createElement("form");
  const textContent = document.createElement("input");
  textContent.id = "userInput";
  textContent.placeholder = "enter your note";
  textContent.className = "border p-1 mt-4 w-full rounded-md";
  const btnSave = document.createElement("button");
  btnSave.id = "save";
  btnSave.innerText = "save";
  btnSave.className = "px-2 py-1 mt-1 bg-blue-500 hover:bg-blue-400 text-white rounded";
  const p = document.createElement("p");
  p.className = "text-left text-white text-sm";
  form.appendChild(textContent);
  form.appendChild(btnSave);
  form.appendChild(p);
  div.appendChild(form);
  console.log(btnSave, element);

  btnSave.addEventListener("click", (event) => {
    // prevent page reload
    event.preventDefault();
    const newNote = textContent.value.trim();
    let favs = getNote();
    // Update the movie's note
    favs = favs.map((movie) => {
      if (movie.id === element.id) {
        return { ...movie, note: newNote };
      }
      return movie;
    });
    setNote(favs);
    p.innerText = `NOTE: ${newNote}`;
    p.className = "p-1 mt-4 text-left text-white text-sm bg-blue-900";

    btnSave.remove();
    textContent.remove();
    const editBtn = document.createElement("button");
    editBtn.innerText = "edit";
    editBtn.className = "items-left px-2 py-1 mt-1 bg-blue-100 hover:bg-blue-400 text-black rounded";
    editBtn.addEventListener("click", () => {});
    form.appendChild(editBtn);
  });
});

// I revised your synac to function by mingshen
function showNumbers(likedMovs) {
  const numMovies = likedMovs.length;
  const numContainer = document.querySelector("#numContainer");
  const likeNum = document.createElement("p");
  likeNum.id = "numCards";
  likeNum.innerHTML = `${numMovies} Movie(s) selected: `;
  numContainer.appendChild(likeNum);
}

function updateEmptyState(likedMovs) {
  if (likedMovs.length === 0) {
    NoFav.classList.remove("hidden");
  } else {
    NoFav.classList.add("hidden");
  }
}
