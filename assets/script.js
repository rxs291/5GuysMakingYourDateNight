




var testing = "http://api.openweathermap.org/geo/1.0/direct?q=austin&limit=1&appid=31fbadef98a417ef6f0e39d36c133d27" 
 


fetch(testing)
.then(function (response) {
  return response.json();
})
.then(function (data) {   
  lon = data[0].lon
  lat =  data[0].lat  

  var newApiSearch = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&limit=1&appid=31fbadef98a417ef6f0e39d36c133d27"
}
)