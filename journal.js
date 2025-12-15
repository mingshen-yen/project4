// import * from script

// reload populate list from localStorage
window.addEventListener("load", function () {
  console.log("welcome");
  const likedArray = JSON.parse(localStorage.getItem("likedMovies"));
  const noLikesContainer = document.querySelector("#nolikes");
  console.log(noLikesContainer);
  if (likedArray) {
    noLikesContainer.classList.add("hidden");
  } else if (!likedArray) {
    noLikesContainer.classList.remove("hidden");
  }
  console.log(likedArray);
  likedArray.forEach((data) => {
    addPopularCard(data);
  });
});

const addPopularCard = (data) => {
  const Container = document.getElementById("favourites-container");
  const div = document.createElement("div");
  div.className = "card hover:scale-105 hover:border-purple-800 hover:text-purple-300";
  div.innerHTML += `
      <img src="https://image.tmdb.org/t/p/w500${data.imgURL}" alt="movie" class="movie_img" />
      <h4>${data.title}</h4>
      <span class= "thin text-base text-gray-400">${data.realeaseYear}</span>
      <span class= "thin text-sm text-gray-400" >${data.language}</span>
      <form>
        <input id="userInput" type="text" class="border p-2 w-full rounded-md"
            placeholder="Enter a note"/>
        <button id="save" class="bg-blue-500 hover:bg-blue-400 text-white rounded">save</button>
      </form>
    `;
  Container.appendChild(div);
};
