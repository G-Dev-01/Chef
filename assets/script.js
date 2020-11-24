const searchForm = document.querySelector("form"),
  searchOutcomeDiv = document.querySelector(".search-outcome"),
  container = document.querySelector(".container"),
  resultHeading = document.querySelector(".result-heading");

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
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=40`;
  const response = await fetch(baseURL);
  const data = await response.json();
  {
    generateHTML(data.hits);
    console.log(data);
    if (data.hits.length === 0) {
      resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
    } else {
      resultHeading.innerHTML = `<h2>Search result for '${searchQuery}'</h2>`;
    }
  }
}

function generateHTML(results) {
  container.classList.remove("intro");
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
        <div class="item">
            <img src="${result.recipe.image}" alt="image">
             <div class="flex-container">
              <h2 class="recipe-name">${result.recipe.label}</h2>
               <a class="see-recipe" href="${
                 result.recipe.url
               }" target="_blank">See Recipe</a>
        </div>
            <p class="item-info">Allergens: ${result.recipe.cautions}</p>
            <p class="item-info">Source: ${result.recipe.source}</p>
            <p class="item-info">Estimated Cal: ${result.recipe.calories.toFixed(0)}</p>
            <p class="item-info">Macronutrients:
              <ul>
                <li class="item-info-data">Carbohydrates: ${result.recipe.totalNutrients.CHOCDF.quantity.toFixed(1)}g</li>
                <li class="item-info-data">Proteins: ${result.recipe.totalNutrients.PROCNT.quantity.toFixed(1)}g</li>
                <li class="item-info-data">Fats: ${result.recipe.totalNutrients.FAT.quantity.toFixed(1)}g</li>
              </ul>
             </p>
        </div>
        `;
  });
  searchOutcomeDiv.innerHTML = generatedHTML;
}
