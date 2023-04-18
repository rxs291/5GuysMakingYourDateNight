document.addEventListener('DOMContentLoaded', function () {
  // Initialize Materialize dropdown menu
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
  const submitButton = document.querySelector('#submit-btn');
  const drinkType = document.querySelector('#drink-select');
  const cardTitle = document.querySelector('#card-title');
  const drinkImage = document.querySelector('img');
  const ingredientsList = document.querySelector('#ingredients-list');
  var alcoholic = false;
  // const verticalCardContainer = document.getElementById('#vertical-card-container');
  // verticalCardContainer.style.visibility ="hidden";

  submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    // console.log(drinkType.value, typeof drinkType.value);\
    drinkPreference = drinkType.value;
    // console.log(drinkPreference);
    if (drinkPreference === 'Alcoholic') {
      alcoholic = true;
      getRandomDrinkByAlcoholPreference(alcoholic).then((drink) => {
        console.log(drink);
      });
    } else if (drinkPreference === 'Non-Alcoholic') {
      alcoholic = false;
      getRandomDrinkByAlcoholPreference(alcoholic).then((drink) => {
        console.log(drink);
      });
    } else {
      drink = getRandomCocktail();
      console.log(drink);
    }
  });

  // Fetch a random cocktail
  async function getRandomCocktail() {
    const response = await fetch(`${API_URL}random.php`);
    const data = await response.json();
    // console.log(data.drinks[0])
    return data.drinks[0];
  }


  async function getRandomDrinkByAlcoholPreference(alcoholic) {
    const randomUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

    while (true) {
      try {
        const response = await fetch(randomUrl);
        const data = await response.json();
        const drink = data.drinks[0];

        if (alcoholic && drink.strAlcoholic === 'Alcoholic') {
          return drink;
        } else if (!alcoholic && drink.strAlcoholic === 'Non_Alcoholic') {
          return drink;
        }
      } catch (error) {
        console.error('Error fetching drink:', error);
      }
    }
  }

  // Usage:
  // getRandomDrinkByAlcoholPreference(true) for alcoholic drink
  // getRandomDrinkByAlcoholPreference(false) for non-alcoholic drink
  // getRandomDrinkByAlcoholPreference(true).then((drink) => {
  //   console.log(drink);
  // });



  function fetchDrinkAPI(apiUrl) {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
  }

  function populateCard(drinkDetails) {
    cardTitle.textContent = drinkDetails.strDrink;
    drinkImage.src = drinkDetails.strDrinkThumb;
    drinkImage.alt = drinkDetails.strDrink;

    ingredientsList.innerHTML = '';
    for (let i = 1; i <= 15; i++) {
      const ingredient = drinkDetails['strIngredient' + i];
      const measure = drinkDetails['strMeasure' + i];

      if (ingredient && measure) {
        const listItem = document.createElement('li');
        listItem.textContent = `${measure.trim()} - ${ingredient.trim()}`;
        ingredientsList.appendChild(listItem);
      } else {
        break;
      }
    }
  }
});


//This was some testing of the API with console logs


// //Joe's fetch API work for Drinks
// const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

// // getRandomCocktail();
// // searchCocktailsByName('Jitterbug');
// // searchCocktailsByIngredient('Bourbon')

// // Fetch a random cocktail
// async function getRandomCocktail() {
//   const response = await fetch(`${API_URL}random.php`);
//   const data = await response.json();
//   // console.log(data.drinks[0])
//   return data.drinks[0];
// }

// //Search cocktails by name
// async function searchCocktailsByName(name) {
//   const response = await fetch(`${API_URL}search.php?s=${name}`);
//   const data = await response.json();
//   console.log(data.drinks);
//   return data.drinks;
// }

// // Search cocktails by ingredient
// async function searchCocktailsByIngredient(ingredient) {
//   const response = await fetch(`${API_URL}filter.php?i=${ingredient}`);
//   const data = await response.json();
//   console.log(data.drinks)
//   return data.drinks;
// }

// // Get cocktail details by ID
// // async function getCocktailDetailsById(id) {
// //   const response = await fetch(`${API_URL}lookup.php?i=${id}`);
// //   const data = await response.json();
// //   return data.drinks[0];
// // }

// //Gets a random drink then logs the ingredients next to the measurements
// async function randomWithIngredients() {
//   const cocktailObject = await getRandomCocktail();
//   console.log(cocktailObject);
//   ingredientsMeasurementMatch(cocktailObject);
// }

// // Function to console log the ingredients next to the measurements
// function ingredientsMeasurementMatch(object) {
//   // Check if a video link exists and log it
//   if (object.strVideo) {
//     console.log(`Video link: ${object.strVideo}`);
//   } else {
//     console.log("No video link available.");
//   }

//   // Log the ingredients and their measurements
//   for (let i = 1; i <= 15; i++) {
//     const ingredientKey = `strIngredient${i}`;
//     const measureKey = `strMeasure${i}`;

//     const ingredient = object[ingredientKey];
//     const measure = object[measureKey];

//     if (ingredient && ingredient.trim() !== "") {
//       console.log(`${ingredient}: ${measure ? measure.trim() : "Not specified"}`);
//     } else {
//       break;
//     }
//   }
// }

// //function to filter drinks by alcoholic/non-alcoholic

// // Fetch all drinks
// async function fetchDrinks() {
//   try {
//     const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');
//     const data = await response.json();
//     return data.drinks;
//   } catch (error) {
//     console.error('Error fetching drinks:', error);
//     return [];
//   }
// }

// // Filter drinks by alcohol content
// function filterDrinksByAlcohol(drinks, isAlcoholic) {
//   return drinks.filter(drink => {
//     if (!drink.strAlcoholic) {
//       return false;
//     }

//     if (isAlcoholic) {
//       return drink.strAlcoholic.toLowerCase() === 'alcoholic';
//     } else {
//       return drink.strAlcoholic.toLowerCase() === 'non alcoholic';
//     }
//   });
// }


// // Main function to fetch and filter drinks
// async function main() {
//   const drinks = await fetchDrinks();
//   console.log(drinks, typeof drinks)
//   const alcoholicDrinks = filterDrinksByAlcohol(drinks, true);
//   const nonAlcoholicDrinks = filterDrinksByAlcohol(drinks, false);

//   console.log('Alcoholic Drinks:', alcoholicDrinks);
//   console.log('Non-Alcoholic Drinks:', nonAlcoholicDrinks);
// }

// main();

// Declare an async function called getRandomDrinkByAlcoholPreference with a default parameter alcoholic set to true
  // async function getRandomDrinkByAlcoholPreference(alcoholic = true) {
  //   // Set alcoholFilter based on the alcoholic parameter
  //   const alcoholFilter = alcoholic ? 'Alcoholic' : 'Non_Alcoholic';
  //   // Construct the filter URL using the alcoholFilter value
  //   const filterUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alcoholFilter}`;

  //   try {
  //     // Fetch the list of drinks based on the alcohol preference from the API
  //     const response = await fetch(filterUrl);
  //     // Convert the response to JSON format
  //     const data = await response.json();
  //     // Extract the array of drinks from the JSON data
  //     const drinks = data.drinks;
  //     console.log(drinks)

  //     // If no drinks are found, log an error message and return
  //     if (!drinks || drinks.length === 0) {
  //       console.error('No drinks found for the given preference');
  //       return;
  //     }

  //     // Select a random drink from the list of drinks
  //     const randomDrink = drinks[Math.floor(Math.random() * drinks.length)];
  //     // Extract the drink ID from the randomDrink object
  //     const drinkId = randomDrink.idDrink;

  //     // Construct the lookup URL using the drink ID
  //     const lookupUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
  //     // Fetch the full details of the selected drink using the lookup URL
  //     const lookupResponse = await fetch(lookupUrl);
  //     // Convert the lookup response to JSON format
  //     const lookupData = await lookupResponse.json();

  //     // Return the first element of the drinks array from the lookupData (the full details of the random drink)
  //     return lookupData.drinks[0];
  //   } catch (error) {
  //     // Log any errors that occur during the fetching process
  //     console.error('Error fetching drink:', error);
  //   }
  // }

  // // Usage:
  // // getRandomDrinkByAlcoholPreference(true) for alcoholic drink
  // // getRandomDrinkByAlcoholPreference(false) for non-alcoholic drink
  // getRandomDrinkByAlcoholPreference(true).then((drink) => {
  //   // Log the full details of the random drink
  //   console.log(drink);
  // });