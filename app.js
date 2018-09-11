var express = require("express"),
  request = require("request"),
  rp = require("request-promise");

var app = express();
require("dotenv").config();
//Variable Declarations
var parsedOpenWeatherBody = "",
  bdsWeather = "",
  unixDate = "";

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// HOMEPAGE ROUTE
app.get("/", function(req, res) {
  rp(process.env.WEATHER_API).then(function(openWeatherBody) {
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
    rp(process.env.UNSPLASH_API + "&query=barbados").then(function(wallpaper) {
      res.render("index", {
        weather: parsedOpenWeatherBody,
        unixDate: unixDate,
        weatherAlert: bdsWeather,
        wallpaper: JSON.parse(wallpaper)
      });
    });
  }
});

// Tell Express to listen for requests on port 3000 (starts server)
app.listen(process.env.PORT, function() {
  //Logs "Server has started" to the console when server has been started
  console.log("Server has started");
});


