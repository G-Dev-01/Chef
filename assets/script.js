const searchForm = document.querySelector("form"),
  searchOutcomeDiv = document.querySelector(".search-results"),
  resultHeading = document.querySelector(".search-info");
let searchQuery = "";
const APP_ID = "def28225";
const APP_key = "4d408cb8687d7bdbb15249b5c13b8c91";
const baseURL = `https://api.edamam.com/search?q=cake&app_id=${APP_ID}&app_key=${APP_key}`;

function searchMeal(e) {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
}
searchForm.addEventListener("submit", searchMeal);
async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=6`;
  const response = await fetch(baseURL);
  const data = await response.json();
  {
  
    if (data.hits.length === 0) {
      resultHeading.innerHTML = `<h3 class="results-heading">No Results!!! Please try again with different Keyword</h3>`;
    } else {
          generateHTML(data.hits);
    console.log(data);
      resultHeading.innerHTML = `<h2 class="results-heading">Search result(s) for '${searchQuery}'</h2>`;
    }
  }
}

function generateHTML(results) { 
    let expectedresults = "";
  results.map((result) => {
    expectedresults += `
    <div class="col-sm-3 results">
        <div class="card" style="width: 17rem;">
            <img class="card-img-top" src="${result.recipe.image}" alt="image">
             <div class="card-body">
              <h2 class="recipe-name">${result.recipe.label}</h2>
               <a class="see-recipe" href="${
                 result.recipe.url
               }" target="_blank">See Recipe</a>
        </div>
            <p class="card-text">Allergens: ${result.recipe.cautions}</p>
            <p class="card-text">Source: ${result.recipe.source}</p>
            <p class="card-text">Estimated Cal: ${result.recipe.calories.toFixed(0)}</p>
            <p class="card-text">Macronutrients:
              <ul>
                <li class="item-info-data">Carbohydrates: ${result.recipe.totalNutrients.CHOCDF.quantity.toFixed(1)}g</li>
                <li class="item-info-data">Proteins: ${result.recipe.totalNutrients.PROCNT.quantity.toFixed(1)}g</li>
                <li class="item-info-data">Fats: ${result.recipe.totalNutrients.FAT.quantity.toFixed(1)}g</li>
              </ul>
             </p>
        </div>
        </div>
        `;
  });
  searchOutcomeDiv.innerHTML = expectedresults;
}
