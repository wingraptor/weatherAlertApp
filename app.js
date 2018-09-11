var express = require("express"),
  request = require("request"),
  rp = require("request-promise");

var app = express();

var parsedOpenWeatherBody = "",
  parsedbdsWeatherBody = "",
  bdsWeather = "",
  unixDate = "";

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// app.get("/", function(req, res) {
//   request(
//     "http://api.openweathermap.org/data/2.5/weather?q=Bridgetown,BB&appid=0c07f5b25a6c999fb6684c3a582694a1&units=metric",
//     function(error, response, weatherBody) {
//       var parsedBody = JSON.parse(weatherBody);
//       // Conv ert API value (seconds since Epoch Time) to milliseconds since Epoch Time. Epoch time: 1st Jan 1970 00:00.
//       var unixDate = new Date(parsedBody.dt * 1000);
//       console.log("Open weather error:", error); // Print the error if one occurred
//       console.log("Open weather statusCode:", response && response.statusCode); // Print the response status code if a response was received

//       // Pulls Data from Barbados Weather Org as a Text File
//       request("http://barbadosweather.org/", function(error, response, body) {
//         // var alertBody = JSON.parse(body);
//         console.log("Barbados Weather error:", error); // Print the error if one occurred
//         console.log("Barbados Weather statusCode:", response && response.statusCode); // Print the response status code if a response was received
//         // console.log("body:", body); // Print the HTML for the homepage.
// res.render("index", {
//   body: parsedBody,
//   unixDate: unixDate,
//   alertBody: body
// });
//       });
//     }
//   );
// });

app.get("/", function(req, res) {
  rp(
    "http://api.openweathermap.org/data/2.5/weather?q=Bridgetown,BB&appid=0c07f5b25a6c999fb6684c3a582694a1&units=metric"
  ).then(function(openWeatherBody) {
    parsedOpenWeatherBody = JSON.parse(openWeatherBody);
    unixDate = new Date(parsedOpenWeatherBody.dt * 1000);
    barbadosWeather();
  });
  function barbadosWeather() {
    rp("http://barbadosweather.org/").then(function(bdsWeatherText) {
      bdsWeather = bdsWeatherText;
      unsplashWallpaper();
    });
  }
  function unsplashWallpaper() {
    rp(
      "https://api.unsplash.com/photos/random?client_id=27473b4801cf5f88a2a27c8c192d262f6252f89609ee60008a8b198f987242e5&query=barbados"
    ).then(function(wallpaper) {
      res.render("index", {
        weather: parsedOpenWeatherBody,
        unixDate: unixDate,
        weatherAlert: bdsWeather,
        wallpaper:JSON.parse(wallpaper)
      });
    });
  }
});

// Tell Express to listen for requests on port 3000 (starts server)
app.listen(3000, function() {
  //Logs "Server has started" to the console when server has been started
  console.log("Server has started");
});
