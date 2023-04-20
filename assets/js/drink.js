document.addEventListener('DOMContentLoaded', function () {
  // Initialize Materialize dropdown menu
  const randomUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
  const submitButton = document.querySelector('#submit-btn');
  const drinkType = document.querySelector('#menu2');
  const foodType = document.querySelector('#menu1')
  const cardTitle = document.querySelector('#card-title');
  const drinkImage = document.querySelector('#imageDrink');
  const ingredientsList = document.querySelector('#ingredients-list');

  ///ADDING FOOD VARIABLES FOR SECOND CARD///////////



  const cardTitle2 = document.querySelector('#card-title2');
  const foodImage = document.querySelector('#imageFood');
  const ingredientsList2 = document.querySelector('#ingredients-list2');
  const youtubeVideo = document.querySelector('#youtubeVideo');
  categoriesFood = ["Breakfast", "Side", "Starter", "Dessert", "Beef", "Chicken", "Pork", "Lamb", "Goat", "Pasta", "Seafood", "Vegetarian", "Vegan", "Miscellaneous", "Random"]

  const randomMeal = "https://www.themealdb.com/api/json/v1/1/random.php"


  ////THIS IS THE GENERATE BUTTON THAT ACTIVIATES ON USER SELECTION IN THE MENUS.
  submitButton.addEventListener('click', function (e) {
    e.preventDefault();


    const foodPreference = foodType.value
    const drinkPreference = drinkType.value;

    if (drinkPreference === "") {
      generateRandomDrink();

    } else if (drinkPreference) {
      getRandom(drinkPreference).then((drink) => {
        updateDrinkDetails(drink);
      })
    } else {
      console.log("error");
    }

    if (categoriesFood[foodPreference - 1] === "Random") {
      getMeal(randomMeal);
    } else if (categoriesFood[foodPreference - 1] > "0") {

      var requestCatergoryList = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoriesFood[foodPreference - 1]}`;
      generateListfromCatergory(requestCatergoryList);

    } else {
      getMeal(randomMeal);
    }

  });

  async function getRandom(preference) {
    if (preference.toLowerCase() === 'non alcoholic') {
      const nonAlcoholicDrinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic';
      const response = await fetch(nonAlcoholicDrinksUrl);
      const data = await response.json();
      const drinks = data.drinks;
      const randomIndex = Math.floor(Math.random() * drinks.length);
      const randomNonAlcoholicDrinkId = drinks[randomIndex].idDrink;
      const drinkDetailsUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randomNonAlcoholicDrinkId}`;
      const drinkResponse = await fetch(drinkDetailsUrl);
      const drinkData = await drinkResponse.json();
      return drinkData.drinks[0];
    } else {
      const randomUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
      while (true) {
        try {
          const response = await fetch(randomUrl);
          const data = await response.json();
          const drink = data.drinks[0];

          if (preference.toLowerCase() === 'alcoholic' && drink.strAlcoholic === 'Alcoholic') {
            return drink;
          }
        } catch (error) {
          console.error('Error fetching drink:', error);
        }
      }
    }
  }

  function updateDrinkDetails(drink) {
    cardTitle.textContent = drink.strDrink;
    drinkImage.src = drink.strDrinkThumb;
    ingredientsList.innerHTML = '';

    // Add the instructions to the card
    const instructions = document.querySelector('#instructions');
    instructions.textContent = drink.strInstructions;

    for (let i = 1; i <= 15; i++) {
      if (drink[`strIngredient${i}`]) {
        const listItem = document.createElement('li');
        listItem.textContent = `${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`]}`;
        ingredientsList.appendChild(listItem);
      } else {
        break;
      }
    }
  }

  function getMeal(x) {
    fetch(x)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        meal1 = data.meals[0];

        mealName = meal1.strMeal          ////THIS PULLS NAME 
        youtubeLink = meal1.strYoutube      //// THIS PULLS YOUTUBE LINK 
        thumbnail = meal1.strMealThumb     /// THIS PULLS THUMBNAIL  

        cardTitle2.textContent = mealName;
        foodImage.src = thumbnail;
        if (youtubeLink) {
          youtubeVideo.innerHTML = `<a href ="` + youtubeLink + `" >Video available here!</a>`;
        }
        ingredientsList2.innerHTML = '';

        // Add the instructions to the card
        const instructions = document.querySelector('#instructions2');
        instructions.textContent = meal1.strInstructions;
        for (let i = 1; i <= 20; i++) {
          if (meal1[`strIngredient${i}`]) {
            const listItem = document.createElement('li');
            listItem.textContent = `${meal1[`strIngredient${i}`]} - ${meal1[`strMeasure${i}`]}`;
            ingredientsList2.appendChild(listItem);
          } else {
            break;

          }
        }
      })
  }

  function generateListfromCatergory(apiURL) {
    fetch(apiURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

        mealID = data.meals[Math.floor(Math.random() * data.meals.length)].strMeal
        var requestByName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealID}`;
        getMeal(requestByName)

      })
  }
  function generateRandomDrink() {
    fetch(randomUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        updateDrinkDetails(data.drinks[0]);
      })
  }

  //event listener for save button
  const saveButton = document.querySelector('#save-btn');
  saveButton.addEventListener('click', saveCurrentMealAndDrink);

  //function to save the current meal/drink combo to local storage
  function saveCurrentMealAndDrink() {
    // Get the current meal and drink details
    const currentMeal = {
      name: cardTitle2.textContent,
      image: foodImage.src,
      ingredients: Array.from(ingredientsList2.children).map(li => li.textContent),
      instructions: instructions2.textContent,
      youtubeLink: youtubeVideo.children.length > 0 ? youtubeVideo.children[0].href : null
    };

    const currentDrink = {
      name: cardTitle.textContent,
      image: drinkImage.src,
      ingredients: Array.from(ingredientsList.children).map(li => li.textContent),
      instructions: instructions.textContent
    };

    // Save the combination to local storage
    let savedCombinations = JSON.parse(localStorage.getItem('combinations')) || [];
    savedCombinations.push({ meal: currentMeal, drink: currentDrink });
    localStorage.setItem('combinations', JSON.stringify(savedCombinations));

    // Create a history button for the saved combination
    createHistoryButton(currentMeal, currentDrink);
  }

  function createHistoryButton(meal, drink) {
    const historyButtonsContainer = document.querySelector('#searchBars');

    // Create a new button element
    const historyButton = document.createElement('button');
    historyButton.className = 'history-btn';
    historyButton.textContent = `Meal: ${meal.name}, Drink: ${drink.name}`;

    // Set the event listener for the history button
    historyButton.addEventListener('click', () => {
      updateMealAndDrink(meal, drink);
    });

    // Append the history button to the container
    historyButtonsContainer.appendChild(historyButton);
  }

  //function to generate a history button with the saved information
  function updateMealAndDrink(meal, drink) {
    // Update meal details
    cardTitle2.textContent = meal.name;
    foodImage.src = meal.image;
    instructions2.textContent = meal.instructions;
    youtubeVideo.innerHTML = meal.youtubeLink ? `<a href="${meal.youtubeLink}">Video available here!</a>` : '';
    ingredientsList2.innerHTML = meal.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');

    // Update drink details
    cardTitle.textContent = drink.name;
    drinkImage.src = drink.image;
    instructions.textContent = drink.instructions;
    ingredientsList.innerHTML = drink.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
  }

  // Load saved combinations and create history buttons
  function loadSavedCombinations() {
    const savedCombinations = JSON.parse(localStorage.getItem('combinations')) || [];
    savedCombinations.forEach(combination => {
      createHistoryButton(combination.meal, combination.drink);
    });
  }

  // Call the loadSavedCombinations function when the page is loaded
  document.addEventListener('DOMContentLoaded', loadSavedCombinations);

});


// async function getNonAlcoholicDrinkCount() {
//   const nonAlcoholicDrinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic';
//   const response = await fetch(nonAlcoholicDrinksUrl);
//   const data = await response.json();
//   const drinks = data.drinks;
//   return drinks.length;
// }

// getNonAlcoholicDrinkCount().then((count) => {
//   console.log("Number of non-alcoholic drinks:", count);
// });

// async function getAlcoholicDrinkCount() {
//   const alcoholicDrinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic';
//   const response = await fetch(alcoholicDrinksUrl);
//   const data = await response.json();
//   const drinks = data.drinks;
//   return drinks.length;
// }

// getAlcoholicDrinkCount().then((count) => {
//   console.log("Number of alcoholic drinks:", count);
// });