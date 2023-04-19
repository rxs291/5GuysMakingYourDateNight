

var mealName = '';
var youtubeLink = '';
var thumbnail = '';
var instructions = '';
var testingContainer = document.querySelector(".testingContainer")
var menu1 = document.querySelector("#menu1");
var menu2 = document.querySelector("#menu2");
var myButton = document.querySelector(".searchBtn");
var categoriesFood = ["Breakfast", "Side","Starter","Dessert", "Beef","Chicken","Pork","Lamb","Goat","Pasta","Seafood","Vegetarian","Vegan","Random"]
 

////this pulls meals by first letter, not for functional use yet
var testing = "https://www.themealdb.com/api/json/v1/1/search.php?f=c"


///this pulls us a random meal
var randomMeal = "https://www.themealdb.com/api/json/v1/1/random.php" 

////requestByName API works WITHOUT HAVING TO REMOVE THE SPACES
////THIS IS THE LINK THAT WILL GO INTO mealsByName
var requestByName = "https://www.themealdb.com/api/json/v1/1/search.php?s=Ayam Percik" ;


var requestCatergoryList = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef"
 

/////THIS WILL NOT BE USED, ONLY FOR REFERENCE. SHOULD BE A DROPDOWN SELECTION
var requestCatergorys = "https://www.themealdb.com/api/json/v1/1/categories.php"



///////THIS IS THE EVENT LISTNER TO GRAB MENU VALUES ON CLICK, THEN USE THE APPROPRIATE API ACCORDINGLY 
myButton.addEventListener("click", function() {
    var menu1Value = menu1.value;
    var menu2Value = menu2.value;
     
    console.log(categoriesFood[menu1Value - 1], categoriesFood[menu2Value]);

    if (categoriesFood[menu1Value - 1] === "Random"){
        var container = document.querySelector('.testingContainer');
        container.innerHTML = "";
        mealsByName(randomMeal)
    }else if (menu1Value != "0" ){
        var container = document.querySelector('.testingContainer');
        container.innerHTML = ""; 
        requestCatergoryList = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + categoriesFood[menu1Value - 1];
        console.log(requestCatergoryList)
        requestFoodList(requestCatergoryList);

    } else {
        console.log("Error")
    }
});



///THIS FUNCTION WILL PULL THE LIST OF OPTIONS FOR THE USER TO PICK ON DEPENDING ON THE FOOD CATERGORY.
function requestFoodList(x){
fetch(x)
.then(function (response) {
  return response.json();
})
.then(function (data) {   

    console.log(data)   
    for(var i = 0; i<data.meals.length; i++){

        //////HERE IS WHERE WE WILL MAKE THE ID CARDS WITH INFORMATION PURGED FROM THE API
        mealName = data.meals[i].strMeal          ////THIS PULLS NAME 
        youtubeLink = data.meals[i].strYoutube      //// THIS PULLS YOUTUBE LINK 
        thumbnail = data.meals[i].strMealThumb     /// THIS PULLS THUMBNAIL  

        console.log(data.meals[i].strMeal) 
        console.log(data.meals[i].strMealThumb) 
        
        testingContainer.style.display = "flex" ;
        testingContainer.style.flexWrap = "wrap" ;

        ///card container 
        var card = document.createElement('div');
        card.classList.add('card');
        card.style.maxWidth = "50%";
        card.style.maxHeight = "50%"; 
        card.style.backgroundColor = 'transparent'  
        ////card body
        var cardBody = document.createElement('div');
        cardBody.style.border = "thick solid";
        
        // cardBody.width = "200";
        // cardBody.height = "200"; 
        cardBody.style.maxWidth = "50%";
        cardBody.style.maxHeight = "100%";
        cardBody.style.display = "block";
        cardBody.style.margin = "0 auto";
        cardBody.style.textAlign = "center"
        cardBody.style.borderRadius = "25px";  
        cardBody.style.overflow = "hidden"; 
        // cardBody.style.display = "flex";
        // cardBody.style.flexDirection = "column";

        /////image element
        var imageFood = document.createElement('img'); 
        imageFood.setAttribute("src", thumbnail) ; 
        imageFood.style.maxWidth = "50%";
        imageFood.style.width = "100%";
        imageFood.style.maxHeight = "50%"; 
        imageFood.style.borderRadius = "19px";
        // imageFood.style.objectPosition = "center";
        // imageFood.style.display = "block";
        // imageFood.style.margin = "auto";
        imageFood.style.border = "thin solid"

        var cardMealName = document.createElement("h5");
        var link = document.createElement("a");
        link.setAttribute("href", "#");
        link.style.color = "black";
        cardMealName.appendChild(link);
        link.textContent = mealName;  

        cardBody.appendChild(imageFood);
        cardBody.appendChild(cardMealName); 
        

        card.appendChild(cardBody);
        testingContainer.appendChild(card); 
 

}
}
)
}


 


async function mealsByName(requestByName){  
 
fetch(requestByName)
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

    //     cardTitle.textContent = data.meals[i].strMeal;
    //     foodImage.src = data.meals[i].strMealThumb;
    //     ingredientsList2.innerHTML = '';

    // // Add the instructions to the card
    //    var instructions2 = document.querySelector('#instructions2');
    //    instructions2.textContent = data.meals[i].strInstructions;
  
    //      for (let i = 1; i <= 15; i++) {
    //      if (drink[`strIngredient${i}`]) {
    //     const listItem = document.createElement('li');
    //     listItem.textContent = `${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`]}`;
    //     ingredientsList.appendChild(listItem);
    //   } else {
    //     break;
    //   }
    // }


        ///card container
        var card = document.createElement('div');
        card.classList.add('card');
        var cardBody = document.createElement('div')


        for (var key in data.meals[i]){   
             
 

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
        card.style.maxWidth = "50%";
        card.style.maxHeight = "50%"; 
        card.style.backgroundColor = 'transparent'
        card.style.textOverflow ="clip";
        card.style.whiteSpace = "nowrap";
        ////card body
        var cardBody = document.createElement('div');
        cardBody.style.border = "thick solid";
        
        // cardBody.width = "200";
        // cardBody.height = "200"; 
        cardBody.style.maxWidth = "50%";
        cardBody.style.maxHeight = "50%";
        cardBody.style.display = "block";
        cardBody.style.margin = "0 auto";
        cardBody.style.textAlign = "center"
        cardBody.style.borderRadius = "25px"; 
        cardBody.style.overflow = "overflow-wrap"; 
        // cardBody.style.display = "flex";
        // cardBody.style.flexDirection = "column";

        /////image element
        var imageFood = document.createElement('img'); 
        imageFood.setAttribute("src", thumbnail) ; 
        imageFood.style.maxWidth = "100%";
        imageFood.style.width = "100%";
        imageFood.style.maxHeight = "50%"; 
        imageFood.style.borderRadius = "19px";
        // imageFood.style.objectPosition = "center";
        // imageFood.style.display = "block";
        // imageFood.style.margin = "auto";
        imageFood.style.border = "thin solid"

        var cardMealName = document.createElement("h5");
        cardMealName.textContent = mealName;
 
        var cardIngred = document.createElement('p');
        cardIngred.textContent = combinedARR.toString();

        var cardInstruct = document.createElement('p');
        cardInstruct.textContent = instructions;
        cardInstruct.style.textOverflow= "ellipsis";

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