

var mealName = '';
var youtubeLink = '';
var thumbnail = '';
var ingredientList = [];
var combinedARR = [];


var testing = "http://api.openweathermap.org/geo/1.0/direct?q=austin&limit=1&appid=31fbadef98a417ef6f0e39d36c133d27" 

var testing2 = "https://www.themealdb.com/api/json/v1/1/search.php?f=a"

var testingRandom = "https://www.themealdb.com/api/json/v1/1/random.php"




 
console.log(testingRandom)
 
fetch(testing2)
.then(function (response) {
  return response.json();
})
.then(function (data) {   
    console.log(data)  
    console.log(Object.keys(data.meals[0]))


    for (const key in data.meals[0]){ 
        if(key.includes("strMeasure") && data.meals[0][key] !== null && data.meals[0][key] !== "" || key.includes("strIngredient") && data.meals[0][key] !== null && data.meals[0][key] !== ""){

            ingredientList.push(data.meals[0][key]) 
        }
    }

    console.log(ingredientList)
    for (var i = 0; i <ingredientList.length/2; i++){
        combinedARR.push(ingredientList[i] + " " + ingredientList[i + ingredientList.length/2])
    }
    
    console.log(combinedARR)

    for(var i = 0; i<=data.meals.length; i++){
        mealName = data.meals[i].strMeal          ////THIS PULLS NAME 
        youtubeLink = data.meals[i].strYoutube      //// THIS PULLS YOUTUBE LINK 
        thumbnail = data.meals[i].strMealThumb     /// THIS PULL THUMBNAIL



 

    var string = data.meals[i]["strIngredient" + "1"]
    console.log(string)
    console.log(typeof data.meals[i]) 
    
    // for (const key in data.meals[i]){
    //     // if (key.textContent.includes("strIngredient"))
    //     if(key.includes("strIngredient") && data.meals[0][key] !== null && data.meals[0][key] !== ""){
    //     console.log(`${key}: ${data.meals[i][key]}`) 
    //     }

    // }
 
 

    }

 
}
)
 