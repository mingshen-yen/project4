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

likedMovs.forEach((element) => {
  //making the cards for journal page
  //   console.log(element.path);
  const favoriteContainer = document.getElementById("favourites-container");
  const cardZ = document.createElement("div");
  cardZ.id = "likedcard";
  cardZ.className = cardZ.className =
    "relative border border-gray-600 p-3 m-4 overflow-hidden rounded-xl max-w-xs transition transform duration-300 hover:scale-105 hover:border-purple-800 group";
  const posterMovie = document.createElement("img");
  posterMovie.src = element.path;
  posterMovie.alt = element.title;
  posterMovie.className = "rounded-lg mb-8 w-full object-contain ";
  cardZ.appendChild(posterMovie);
  favoriteContainer.appendChild(cardZ);

  const Title = document.createElement("p");
  Title.innerHTML = element.title;
  Title.className =
    "text-white font-bold group-hover:text-purple-300 text-left";
  cardZ.appendChild(Title);

  const year = document.createElement("span");
  year.innerHTML = element.realeaseYear;
  year.className = "text-gray-400 text-sm";
  cardZ.appendChild(year);

  const typeMovie = document.createElement("div");
  typeMovie.innerHTML = element.type;
  typeMovie.className =
    "absolute bottom-4 right-5 rounded-full text-violet-300 bg-violet-950 pr-2 pl-2";
  cardZ.appendChild(typeMovie);

  const rating = document.createElement("div");
  rating.innerHTML = element.rate;
  rating.className =
    "absolute top-4 left-5 rounded-full bg-amber-500  pl-2 pr-3  before:content-['\u2605']";
  cardZ.appendChild(rating);

  const heart = document.createElement("span");
  heart.textContent = "\u2665";
  heart.className =
    "absolute top-3 right-4 text-5xl font-bold text-red-500 cursor-pointer hover:bg-red-500 rounded-xl";
  cardZ.appendChild(heart);
  //remove btn <- I think (remove btn).listener should be outside of this forEach, so i move this part to line 29: // revise fuction for remove btn
  //   const removeBtn = document.getElementById("removeBtn");
  //   removeBtn.addEventListener("click", () => {
  //     cardZ.remove();
  //     NoFav.classList.remove("hidden");
  //     localStorage.removeItem("likedMovies");
  //     likedMovs = [];
  //   });

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
  textContent.className = "border p-2 w-full rounded-md";
  const btnSave = document.createElement("button");
  btnSave.id = "save";
  btnSave.innerText = "save";
  btnSave.className = "bg-blue-500 hover:bg-blue-400 text-white rounded";
  const p = document.createElement("p");
  p.className = "text-left text-white text-sm";
  form.appendChild(textContent);
  form.appendChild(btnSave);
  form.appendChild(p);
  cardZ.appendChild(form);
  console.log(btnSave, element);

  btnSave.addEventListener("click", (event) => {
    // prevent page reload
    event.preventDefault();
    const newNote = textContent.value.trim();
    element.note = newNote;
    console.log(element);

    let favs = getNote();
    // Update the movie's note
    favs = favs.map((movie) => {
      if (movie.id === element.id) {
        return { ...movie, note: newNote };
      }
      return movie;
    });
    setNote(favs);
    p.innerText = `note: ${newNote}`;

    //     const rmBtn = document.createElement("button");
    //     rmBtn.addEventListener("click", () => {
    //       p.remove();
    //     });
    //     p.appendChild(rmBtn);
  });
});

// I revised your synac to function by mingshen
function showNumbers(likedMovs) {
  const numMovies = likedMovs.length;
  const numContainer = document.querySelector("#numContainer");
  const likeNum = document.createElement("p");
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
