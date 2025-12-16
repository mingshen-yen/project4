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
  Title.className = "text-white font-bold group-hover:text-purple-300 text-left";
  cardZ.appendChild(Title);

  const year = document.createElement("span");
  year.innerHTML = element.realeaseYear;
  year.className = "text-gray-400 text-sm";
  cardZ.appendChild(year);

  const typeMovie = document.createElement("div");
  typeMovie.innerHTML = element.type;
  typeMovie.className = "absolute bottom-4 right-5 rounded-full text-violet-300 bg-violet-950 pr-2 pl-2";
  cardZ.appendChild(typeMovie);

  const rating = document.createElement("div");
  rating.innerHTML = element.rate;
  rating.className = "absolute top-4 left-5 rounded-full bg-amber-500  pl-2 pr-3  before:content-['\u2605']";
  cardZ.appendChild(rating);

  const heart = document.createElement("span");
  heart.textContent = "\u2665";
  heart.className = "absolute top-3 right-4 text-5xl font-bold text-red-500 cursor-pointer hover:bg-red-500 rounded-xl";
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
  const form = document.createElement("form");
  form.innerHTML = `
    <input id="userInput" type="text" class="border p-2 w-full rounded-md"
            placeholder="Enter a note"/>
        <button id="save" class="bg-blue-500 hover:bg-blue-400 text-white rounded">save</button>
        <ul></ul>
    `;
  cardZ.appendChild(form);
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

// take personal notes to localStorage
const input = document.getElementById("userInput");
const btnSubmit = document.getElementById("save");
const ul = document.querySelector("ul");

// function for store input
function InputStoreArray() {
  // get the input text
  const value = input.value;
  //   const id = movie.id;
  console.log("input:", value);

  //Get existing array from localStorage OR start with empty array
  let storedArray = JSON.parse(localStorage.getItem("savedNotes")) || [];

  // Add new value at the beginning of the array
  storedArray.unshift(value);

  // Save updated array back to localStorage
  localStorage.setItem("savedNotes", JSON.stringify(storedArray));
  console.log("Updated array:", storedArray);

  // clear the input
  input.value = "";
  return value;
}

// reload populate list from localStorage
window.addEventListener("load", function () {
  const storedArray = JSON.parse(localStorage.getItem("savedNotes")) || [];

  storedArray.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li); // keep original order
  });
});

// add event listener for click submit
btnSubmit.addEventListener("click", (event) => {
  // prevent page reload
  event.preventDefault();

  // add a new input to ul
  const newInput = InputStoreArray();
  console.log(newInput);
  const li = document.createElement("li");
  li.innerText = newInput;
  // add to the top of ul
  ul.appendChild(li);
});
