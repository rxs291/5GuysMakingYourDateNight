

var mealName = '';
var youtubeLink = '';
var thumbnail = '';
var instructions = '';
var testingContainer = document.querySelector(".testingContainer")
 

////this pulls meals by first letter, not for functional use yet
var testing = "https://www.themealdb.com/api/json/v1/1/search.php?f=c"


///this pulls us a random meal
var randomMeal = "https://www.themealdb.com/api/json/v1/1/random.php" 

////requestByName API works WITHOUT HAVING TO REMOVE THE SPACES
////THIS IS THE LINK THAT WILL GO INTO mealsByName
var requestByName = "https://www.themealdb.com/api/json/v1/1/search.php?s=Moussaka" ;


var requestCatergoryList = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef"
 

/////THIS WILL NOT BE USED, ONLY FOR REFERENCE. SHOULD BE A DROPDOWN SELECTION
var requestCatergorys = "https://www.themealdb.com/api/json/v1/1/categories.php"



fetch(requestCatergoryList)
.then(function (response) {
  return response.json();
})
.then(function (data) {   

    console.log(data)   
}
)







async function mealsByName(){  
 
fetch(randomMeal)
.then(function (response) {
  return response.json();
})
.then(function (data) {   

    /////this console log is uncessary, only for reference use!!!!!!!!
    console.log(data)   

 
    /////this FOR LOOP iterates through all the returns of the API search. 
    //// THISONLY WORKS FOR THE 'requestByName' API source, due to formatting
    /////by the API
    for(var i = 0; i<data.meals.length; i++){

        //////HERE IS WHERE WE WILL MAKE THE ID CARDS WITH INFORMATION PURGED FROM THE API
        mealName = data.meals[i].strMeal          ////THIS PULLS NAME 
        youtubeLink = data.meals[i].strYoutube      //// THIS PULLS YOUTUBE LINK 
        thumbnail = data.meals[i].strMealThumb     /// THIS PULLS THUMBNAIL 
        instructions = data.meals[i].strInstructions
        var ingredientList = [];
        var combinedARR = []; 

        console.log(data.meals[i].strMeal)
        console.log(data.meals[i].strYoutube)
        console.log(data.meals[i].strMealThumb)
        console.log(data.meals[i].strInstructions) 


        ///card container
        var card = document.createElement('div');
        card.classList.add('card');
        var cardBody = document.createElement('div')


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
     
        
        ///card container 
        var card = document.createElement('div');
        card.classList.add('card');
        ////card body
        var cardBody = document.createElement('div');



        var imageFood = document.createElement('img'); 
        imageFood.setAttribute("src", thumbnail) ;
        console.log(thumbnail)  ;
        console.log(imageFood.src) ; 
        imageFood.width = "100"; 

        var cardMealName = document.createElement("h5");
        cardMealName.textContent = mealName;
 
        var cardIngred = document.createElement('p');
        cardIngred.textContent = combinedARR.toString();

        var cardInstruct = document.createElement('p');
        cardInstruct.textContent = instructions;

        var cardTuber = document.createElement('a');
        var link = document.createTextNode(youtubeLink);
        cardTuber.appendChild(link);
        cardTuber.title = youtubeLink;
        cardTuber.href = youtubeLink;

        cardBody.appendChild(imageFood);
        cardBody.appendChild(cardMealName);
        cardBody.appendChild(cardIngred);
        cardBody.appendChild(cardInstruct);
        cardBody.appendChild(cardTuber);
        

        card.appendChild(cardBody);
        testingContainer.appendChild(card); 
 
 

    }

 
}
)
}

mealsByName()