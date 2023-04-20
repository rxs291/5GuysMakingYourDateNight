document.addEventListener("DOMContentLoaded", function () {
    // Initialize Materialize dropdown menu
    const randomUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    var elems = document.querySelectorAll("select");
    var instances = M.FormSelect.init(elems);
    const submitButton = document.querySelector("#submit-btn");
    const drinkType = document.querySelector("#menu2");
    const foodType = document.querySelector("#menu1");
    const cardTitle = document.querySelector("#card-title");
    const drinkImage = document.querySelector("#imageDrink");
    const ingredientsList = document.querySelector("#ingredients-list");
    var addSaveButton = true;
    const clearContainer = document.querySelector("#clear-container");
    const clearButton = document.querySelector("#clear-btn");
    const historyButtonsContainer =
        document.querySelector("#history-container");

    ///ADDING FOOD VARIABLES FOR SECOND CARD///////////
    const cardTitle2 = document.querySelector("#card-title2");
    const foodImage = document.querySelector("#imageFood");
    const ingredientsList2 = document.querySelector("#ingredients-list2");
    const youtubeVideo = document.querySelector("#youtubeVideo");
    categoriesFood = [
        "Breakfast",
        "Side",
        "Starter",
        "Dessert",
        "Beef",
        "Chicken",
        "Pork",
        "Lamb",
        "Goat",
        "Pasta",
        "Seafood",
        "Vegetarian",
        "Vegan",
        "Miscellaneous",
        "Random",
    ];
    const cardContainer1 = document.querySelector("#cardContainer1");
    const cardContainer2 = document.querySelector("#cardContainer2");

    const randomMeal = "https://www.themealdb.com/api/json/v1/1/random.php";

    //THIS IS THE GENERATE BUTTON THAT ACTIVATES ON USER SELECTION IN THE MENUS.
    submitButton.addEventListener("click", function (e) {
        e.preventDefault();
        cardContainer1.style.display = "block";
        cardContainer2.style.display = "block";

        const foodPreference = foodType.value;
        const drinkPreference = drinkType.value;

        if (drinkPreference === "") {
            generateRandomDrink();
        } else if (drinkPreference) {
            getRandom(drinkPreference).then((drink) => {
                updateDrinkDetails(drink);
            });
        } else {
            console.log("error");
        }

        if (categoriesFood[foodPreference - 1] === "Random") {
            getMeal(randomMeal);
        } else if (categoriesFood[foodPreference - 1] > "0") {
            var requestCatergoryList = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${
                categoriesFood[foodPreference - 1]
            }`;
            generateListfromCatergory(requestCatergoryList);
        } else {
            getMeal(randomMeal);
        }
    });
    // This function generates a random drink based on user preference
    async function getRandom(preference) {
        if (preference.toLowerCase() === "non alcoholic") {
            const nonAlcoholicDrinksUrl =
                "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
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
            const randomUrl =
                "https://www.thecocktaildb.com/api/json/v1/1/random.php";
            while (true) {
                try {
                    const response = await fetch(randomUrl);
                    const data = await response.json();
                    const drink = data.drinks[0];

                    if (
                        preference.toLowerCase() === "alcoholic" &&
                        drink.strAlcoholic === "Alcoholic"
                    ) {
                        return drink;
                    }
                } catch (error) {
                    console.error("Error fetching drink:", error);
                }
            }
        }
    }
    //This Function Updates the drink card
    function updateDrinkDetails(drink) {
        cardTitle.textContent = drink.strDrink;
        drinkImage.src = drink.strDrinkThumb;
        ingredientsList.innerHTML = "";

        // Add the instructions to the card
        const instructions = document.querySelector("#instructions");
        instructions.textContent = drink.strInstructions;

        for (let i = 1; i <= 15; i++) {
            if (drink[`strIngredient${i}`]) {
                const listItem = document.createElement("li");
                listItem.textContent = `${drink[`strIngredient${i}`]} - ${
                    drink[`strMeasure${i}`]
                }`;
                ingredientsList.appendChild(listItem);
            } else {
                break;
            }
        }
        //Save current drink to local storage
        localStorage.setItem("lastDisplayedDrink", JSON.stringify(drink));
    }
    //this function fetches the meal data and adds it to the meal card
    function getMeal(x) {
        fetch(x)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                meal1 = data.meals[0];
                //Stores the current meal into local storage
                localStorage.setItem(
                    "lastDisplayedMeal",
                    JSON.stringify(meal1)
                );

                mealName = meal1.strMeal; ////THIS PULLS NAME
                youtubeLink = meal1.strYoutube; //// THIS PULLS YOUTUBE LINK
                thumbnail = meal1.strMealThumb; /// THIS PULLS THUMBNAIL

                cardTitle2.textContent = mealName;
                foodImage.src = thumbnail;
                if (youtubeLink) {
                    youtubeVideo.innerHTML =
                        `<a href ="` +
                        youtubeLink +
                        `" >Video available here!</a>`;
                }
                ingredientsList2.innerHTML = "";

                // Add the instructions to the card
                const instructions = document.querySelector("#instructions2");
                instructions.textContent = meal1.strInstructions;
                for (let i = 1; i <= 20; i++) {
                    if (meal1[`strIngredient${i}`]) {
                        const listItem = document.createElement("li");
                        listItem.textContent = `${
                            meal1[`strIngredient${i}`]
                        } - ${meal1[`strMeasure${i}`]}`;
                        ingredientsList2.appendChild(listItem);
                    } else {
                        break;
                    }
                }
            });
    }
    //this function generates a list of meals by catagory
    //chooses a random meal, and gets the specific meal based on id
    function generateListfromCatergory(apiURL) {
        fetch(apiURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                mealID =
                    data.meals[Math.floor(Math.random() * data.meals.length)]
                        .strMeal;
                var requestByName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealID}`;
                getMeal(requestByName);
            });
    }
    //This function takes advantage of the drink API's random query to get a random drink
    function generateRandomDrink() {
        fetch(randomUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                updateDrinkDetails(data.drinks[0]);
            });
    }

    //event listener for save button
    const saveButton = document.querySelector("#save-btn");
    saveButton.addEventListener("click", saveCurrentMealAndDrink);

    //function to save the current meal/drink combo to local storage
    function saveCurrentMealAndDrink() {
        // Get the current meal and drink details
        cardContainer1.style.display = "block";
        cardContainer2.style.display = "block";

        const currentMeal = {
            name: cardTitle2.textContent,
            image: foodImage.src,
            ingredients: Array.from(ingredientsList2.children).map(
                (li) => li.textContent
            ),
            instructions: instructions2.textContent,
            youtubeLink:
                youtubeVideo.children.length > 0
                    ? youtubeVideo.children[0].href
                    : null,
        };

        const currentDrink = {
            name: cardTitle.textContent,
            image: drinkImage.src,
            ingredients: Array.from(ingredientsList.children).map(
                (li) => li.textContent
            ),
            instructions: instructions.textContent,
        };

        // Save the combination to local storage
        let savedCombinations =
            JSON.parse(localStorage.getItem("combinations")) || [];
        // Save the combination to local storage if it doesn't already exist
        if (!combinationExists(savedCombinations, currentMeal, currentDrink)) {
            savedCombinations.push({ meal: currentMeal, drink: currentDrink });
            localStorage.setItem(
                "combinations",
                JSON.stringify(savedCombinations)
            );

            // Create a history button for the saved combination
            createHistoryButton(currentMeal, currentDrink);
        }
        historyCheck();
    }
    //This function creates the history buttons
    function createHistoryButton(meal, drink) {
        // Create a new button element
        const historyButton = document.createElement("button");
        historyButton.classList.add = ("btn", "waves-effect", "history-btn");
        historyButton.textContent = `Meal: ${meal.name}, Drink: ${drink.name}`;

        // Set the event listener for the history button

        historyButton.addEventListener("click", () => {
            cardContainer1.style.display = "block";
            cardContainer2.style.display = "block";
            updateMealAndDrink(meal, drink);
        });

        // Append the history button to the container
        historyButtonsContainer.appendChild(historyButton);
    }

    //function to update meal and drink cards
    function updateMealAndDrink(meal, drink) {
        // Update meal details
        cardTitle2.textContent = meal.name || meal.strMeal;
        foodImage.src = meal.image || meal.strMealThumb;
        instructions2.textContent = meal.instructions || meal.strInstructions;
        youtubeVideo.innerHTML =
            meal.youtubeLink ||
            (meal.strYoutube
                ? `<a href="${meal.strYoutube}">Video available here!</a>`
                : "");
        ingredientsList2.innerHTML = "";
        if (Array.isArray(meal.ingredients)) {
            ingredientsList2.innerHTML = meal.ingredients
                .map((ingredient) => `<li>${ingredient}</li>`)
                .join("");
        } else {
            for (let i = 1; i <= 20; i++) {
                if (meal[`strIngredient${i}`]) {
                    const listItem = document.createElement("li");
                    listItem.textContent = `${meal[`strIngredient${i}`]} - ${
                        meal[`strMeasure${i}`]
                    }`;
                    ingredientsList2.appendChild(listItem);
                } else {
                    break;
                }
            }
        }

        // Update drink details
        cardTitle.textContent = drink.name || drink.strDrink;
        drinkImage.src = drink.image || drink.strDrinkThumb;
        instructions.textContent = drink.instructions || drink.strInstructions;
        ingredientsList.innerHTML = "";
        if (Array.isArray(drink.ingredients)) {
            ingredientsList.innerHTML = drink.ingredients
                .map((ingredient) => `<li>${ingredient}</li>`)
                .join("");
        } else {
            for (let i = 1; i <= 15; i++) {
                if (drink[`strIngredient${i}`]) {
                    const listItem = document.createElement("li");
                    listItem.textContent = `${drink[`strIngredient${i}`]} - ${
                        drink[`strMeasure${i}`]
                    }`;
                    ingredientsList.appendChild(listItem);
                } else {
                    break;
                }
            }
        }
    }

    // This function to check for existing combinations
    function combinationExists(savedCombinations, meal, drink) {
        return savedCombinations.some((combination) => {
            return (
                combination.meal.name === meal.name &&
                combination.drink.name === drink.name
            );
        });
    }
    // Load saved combinations and create history buttons
    function loadSavedCombinations() {
        const savedCombinations =
            JSON.parse(localStorage.getItem("combinations")) || [];
        savedCombinations.forEach((combination) => {
            createHistoryButton(combination.meal, combination.drink);
        });
    }

    // This function reloads the last cards on the screen on load/refresh from local storage
    loadSavedCombinations();

    const lastDisplayedMealJSON = localStorage.getItem("lastDisplayedMeal");
    const lastDisplayedDrinkJSON = localStorage.getItem("lastDisplayedDrink");

    if (lastDisplayedMealJSON && lastDisplayedDrinkJSON) {
        const lastDisplayedMeal = JSON.parse(lastDisplayedMealJSON);
        const lastDisplayedDrink = JSON.parse(lastDisplayedDrinkJSON);
        updateMealAndDrink(lastDisplayedMeal, lastDisplayedDrink);
    }

    function historyCheck() {
        if (historyButtonsContainer.children[0] && addSaveButton) {
            addSaveButton = false;
            clearContainer.style.display = "block";
        }

        clearButton.addEventListener("click", function () {
            localStorage.clear();
            historyButtonsContainer.innerHTML = "";
            clearContainer.style.display = "none";
            addSaveButton = true;
        });
    }
    historyCheck();
});
