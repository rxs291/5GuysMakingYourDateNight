




var testing = "http://api.openweathermap.org/geo/1.0/direct?q=austin&limit=1&appid=31fbadef98a417ef6f0e39d36c133d27" 

var testing2 = "www.themealdb.com/api/json/v1/1/search.php?s=chicken&key=1"
 
console.log(testing2)

fetch(testing2)
.then(function (response) {
  return response.json();
})
.then(function (data) {   
    console.log(data)

  lon = data[0].lon
  lat =  data[0].lat  

  var newApiSearch = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&limit=1&appid=31fbadef98a417ef6f0e39d36c133d27"
}
)