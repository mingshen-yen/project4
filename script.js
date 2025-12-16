// get input value on form submit
const input = document.getElementById("userInput");
const btnSubmit = document.getElementById("submit");
const ul = document.querySelector("ul");
const btnReload = document.getElementById("reload");

// function for store input
function InputStoreArray() {
  // get the input text
  const value = input.value;
  if (!value) {
    console.log("please enter quotes!");
    return;
  }
  console.log("input:", value);

  //Get existing array from localStorage OR start with empty array
  let storedArray = JSON.parse(localStorage.getItem("savedInputArray")) || [];

  // Add new value at the beginning of the array
  storedArray.unshift(value);

  // Save updated array back to localStorage
  localStorage.setItem("savedInputArray", JSON.stringify(storedArray));
  console.log("Updated array:", storedArray);

  // clear the input
  input.value = "";
  return value;
}

// reload populate list from localStorage
window.addEventListener("load", function () {
  const storedArray = JSON.parse(localStorage.getItem("savedInputArray")) || [];

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
  ul.prepend(li);
});

// reload the window
btnReload.addEventListener("click", () => {
  window.location.reload();
  localStorage.clear();
});
