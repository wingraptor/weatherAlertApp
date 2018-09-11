var express = require("express"),
    request = require("request"),
    rp      = require("request-promise");

var app = express();


//Variable Declarations
var parsedOpenWeatherBody = "",
    bdsWeather            = "",
    unixDate              = "";


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// HOMEPAGE ROUTE
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
