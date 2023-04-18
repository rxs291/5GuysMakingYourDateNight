//Joe's fetch API work for Drinks
const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

// getRandomCocktail();
// searchCocktailsByName('Jitterbug');
// searchCocktailsByIngredient('Bourbon')

// Fetch a random cocktail
async function getRandomCocktail() {
  const response = await fetch(`${API_URL}random.php`);
  const data = await response.json();
  // console.log(data.drinks[0])
  return data.drinks[0];
}

//Search cocktails by name
async function searchCocktailsByName(name) {
  const response = await fetch(`${API_URL}search.php?s=${name}`);
  const data = await response.json();
  console.log(data.drinks);
  return data.drinks;
}

// Search cocktails by ingredient
async function searchCocktailsByIngredient(ingredient) {
  const response = await fetch(`${API_URL}filter.php?i=${ingredient}`);
  const data = await response.json();
  console.log(data.drinks)
  return data.drinks;
}

// Get cocktail details by ID
// async function getCocktailDetailsById(id) {
//   const response = await fetch(`${API_URL}lookup.php?i=${id}`);
//   const data = await response.json();
//   return data.drinks[0];
// }
async function main() {
  const cocktailObject = await getRandomCocktail();
  ingredientsMeasurementMatch(cocktailObject);
}

// Function to console log the ingredients next to the measurements
function ingredientsMeasurementMatch(object) {
  console.log(object)
  for (let i = 1; i <= 15; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;

    const ingredient = object[ingredientKey];
    const measure = object[measureKey];

    if (ingredient && ingredient.trim() !== "") {
      console.log(`${ingredient}: ${measure ? measure.trim() : "Not specified"}`);
    } else {
      break;
    }
  }
}


main();