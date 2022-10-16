const pokoApp = {};

const placeHolderValue = "empty";
const pokemonURL = `https://pokeapi.co/api/v2/pokemon`;

// inlcude loading time out in the app.init
pokoApp.init = () => {
  pokoApp.setUpEventListeners();

}

async function getAPI(){
  const response = await fetch(pokemonURL);
  const data = await response.json();
  return data;
}
// make this fxn a method of the namespace obj. eg. app.getAPI()
getAPI()
  .then((data) => {

    let optionsHtml = "";
    const dropdown = document.getElementById("dropdown");

    // placeholder for first item on the dropdown menu
    const firstOption = `<option value=${placeHolderValue}> --- </option>`;
    
    // request all names from  API
    // create a list of names for the dropdown menu
    data.results.forEach((result) => {
      dropdown;
      // capitalize the first initial in each name
      const capFirstLetter = result.name[0].toUpperCase() + result.name.substring(1);

      // adding names to the list
      optionsHtml += `<option value="${result.url}">${capFirstLetter}</option>`;

    });
    // combine placeholder with names to have a full dropdown
    dropdown.innerHTML = firstOption + optionsHtml;

    // loader code
    const loaderElement = document.querySelector(".loader");
    const pokemonElement = document.querySelector("#mainDisplay");

    // code hides main display and shows loader image(message) while waiting for the API data
    loaderElement.classList.add("hide");
    pokemonElement.classList.remove("hide");


  })
  .catch((error)=> {
    if (error.message === "Not Found"){
      alert("No pokemon found!")
    } else {
      alert("Something is broken.")
    }
  })

//  event listener onchange
// displays  sprite when name is clicked
pokoApp.setUpEventListeners = () => {
document.querySelector("select").addEventListener("change", function() {
  const pokemonUrl = this.value;

  // shows image only when a name is clicked
  if (pokemonUrl !== placeHolderValue) {


      // API request to fetch and display image 
      fetch(pokemonUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const imageUrl = data.sprites.other.dream_world.front_default;
        const statsID = data.id; 
        const statsHeight = data.height; 
        const statsWeight = data.weight;  
        
        const pokemonCard = document.querySelector(".pokemonCard");
        pokemonCard.innerHTML = `<div class="pokemonName"> <p>${data.name}</p> <p>ID ${statsID}</p> </div><div class="imageContainer">
        <img class="image" src=${imageUrl} alt="Photo of a ${data.name}"/> </div> 
        <div class="pokeHeight"> <p>Height: ${statsHeight} dm</p></div>
        <div class="pokeWeight"> <p>Weight: ${statsWeight} hg</p></div>`;
      });
  } 
});
}


pokoApp.init();