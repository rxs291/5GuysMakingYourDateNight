

var mealName = '';
var youtubeLink = '';
var thumbnail = '';
var instructions = '';
 

////this pulls meals by first letter, not for functional use yet
var testing = "https://www.themealdb.com/api/json/v1/1/search.php?f=c"


///this pulls us a random meal
var randomMeal = "https://www.themealdb.com/api/json/v1/1/random.php" 

////requestByName API works WITHOUT HAVING TO REMOVE THE SPACES
var requestByName = "https://www.themealdb.com/api/json/v1/1/search.php?s=Duck Confit" ;

var requestCatergoryList = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Miscellaneous"
 

/////THIS WILL NOT BE USED, ONLY FOR REFERENCE. SHOULD BE A DROPDOWN SELECTION
var requestCatergorys = "https://www.themealdb.com/api/json/v1/1/categories.php"


async function workInProgress(){  

fetch(testing)
.then(function (response) {
  return response.json();
})
.then(function (data) {   

    console.log(data)   

 
    /////this FOR LOOP iterates through all the returns of the API search. 
    //// THISONLY WORKS FOR THE 'requestByName' API source, due to formatting
    /////by the API
    for(var i = 0; i<data.meals.length; i++){

        //////HERE IS WHERE WE WILL MAKE THE ID CARDS WITH INFORMATION PURGED FROM THE API
        mealName = data.meals[i].strMeal          ////THIS PULLS NAME 
        youtubeLink = data.meals[i].strYoutube      //// THIS PULLS YOUTUBE LINK 
        thumbnail = data.meals[i].strMealThumb     /// THIS PULL THUMBNAIL 
        instructions = data.meals[i].strInstructions
        var ingredientList = [];
        var combinedARR = [];

        console.log(data.meals[i].strMeal)
        console.log(data.meals[i].strYoutube)
        console.log(data.meals[i].strMealThumb)
        console.log(data.meals[i].strInstructions)


        for (const key in data.meals[i]){   
             
 

            if(key.includes("strMeasure") && data.meals[i][key] !== null && data.meals[i][key] !== "" && data.meals[i][key] !== " " || key.includes("strIngredient") && data.meals[i][key] !== null && data.meals[i][key] !== "" && data.meals[i][key] !== " "){ 
             
                
    
                ingredientList.push(data.meals[i][key])   


            }  


        }

        for (var j = 0; j <ingredientList.length/2; j++){
                 
            combinedARR.push(ingredientList[j] + " " + ingredientList[j + ingredientList.length/2])  

            }  

        ///// THIS IS THE LOCATION WHERE WE WILL CREATE THE DIV ELEMENT THAT WILL HOUSE THE LIST OF INGRIDENTS
        console.log(combinedARR) ////// THIS THE LIST THAT WILL GO ON THE CARD 
     
 
 

    }

 
}
)
}

workInProgress()