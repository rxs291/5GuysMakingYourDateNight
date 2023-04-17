//Joe's fetch API work for Drinks
const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

// Fetch a random cocktail
async function getRandomCocktail() {
  const response = await fetch(`${API_BASE_URL}random.php`);
  const data = await response.json();
  console.log(data.drinks[0])
  return data.drinks[0];
}

// Search cocktails by name
// async function searchCocktailsByName(name) {
//   const response = await fetch(`${API_BASE_URL}search.php?s=${name}`);
//   const data = await response.json();
//   return data.drinks;
// }

// Search cocktails by ingredient
// async function searchCocktailsByIngredient(ingredient) {
//   const response = await fetch(`${API_BASE_URL}filter.php?i=${ingredient}`);
//   const data = await response.json();
//   return data.drinks;
// }

// Get cocktail details by ID
// async function getCocktailDetailsById(id) {
//   const response = await fetch(`${API_BASE_URL}lookup.php?i=${id}`);
//   const data = await response.json();
//   return data.drinks[0];
// }
