var express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
request = require("request");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//Tells Express to look into the public folder to find files(Shows express that public directory exists)
app.use(express.static("public"));


app.get("/", function(req, res) {
  request(
    "http://api.openweathermap.org/data/2.5/weather?q=Bridgetown,BB&appid=0c07f5b25a6c999fb6684c3a582694a1&units=metric",
    function(error, response, weatherBody) {
      var parsedBody = JSON.parse(weatherBody);
      // Conv ert API value (seconds since Epoch Time) to milliseconds since Epoch Time. Epoch time: 1st Jan 1970 00:00.
      var unixDate = new Date(parsedBody.dt * 1000);
      console.log("Open weather error:", error); // Print the error if one occurred
      console.log("Open weather statusCode:", response && response.statusCode); // Print the response status code if a response was received

      // Pulls Data from Barbados Weather Org as a Text File
      request("http://barbadosweather.org/", function(error, response, body) {
        // var alertBody = JSON.parse(body);
        console.log("Barbados Weather error:", error); // Print the error if one occurred
        console.log("Barbados Weather statusCode:", response && response.statusCode); // Print the response status code if a response was received
        // console.log("body:", body); // Print the HTML for the homepage.
        res.render("index", {
          body: parsedBody,
          unixDate: unixDate,
          alertBody: body
        });
      });
    }
  );
});

// Tell Express to listen for requests on port 3000 (starts server)
app.listen(process.env.PORT, process.env.IP, function() {
  //Logs "Server has started" to the console when server has been started
  console.log("Server has started");
});
