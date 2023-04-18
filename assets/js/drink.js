document.addEventListener('DOMContentLoaded', function () {
  // Initialize Materialize dropdown menu
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
  const submitButton = document.querySelector('#submit-btn');
  const drinkType = document.querySelector('#drink-select');
  const cardTitle = document.querySelector('#card-title');
  const drinkImage = document.querySelector('img');
  const ingredientsList = document.querySelector('#ingredients-list');

  submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    // console.log(drinkType.value, typeof drinkType.value);
    drinkPreference = drinkType.value;
    console.log(drinkPreference);
    getRandom(drinkPreference).then((drink) => {
      console.log(drink);
      updateDrinkDetails(drink);
    });
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


  async function getNonAlcoholicDrinkCount() {
    const nonAlcoholicDrinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic';
    const response = await fetch(nonAlcoholicDrinksUrl);
    const data = await response.json();
    const drinks = data.drinks;
    return drinks.length;
  }

  getNonAlcoholicDrinkCount().then((count) => {
    console.log("Number of non-alcoholic drinks:", count);
  });

  async function getAlcoholicDrinkCount() {
    const alcoholicDrinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic';
    const response = await fetch(alcoholicDrinksUrl);
    const data = await response.json();
    const drinks = data.drinks;
    return drinks.length;
  }
  
  getAlcoholicDrinkCount().then((count) => {
    console.log("Number of alcoholic drinks:", count);
  });
  

});
