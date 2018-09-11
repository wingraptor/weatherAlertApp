// $.ajax({
//   url:
//     "https://api.unsplash.com/photos/random?client_id=27473b4801cf5f88a2a27c8c192d262f6252f89609ee60008a8b198f987242e5&query=barbados",
//   type: "GET",
//   data: {
//     format: "json"
//   },
//   success: function(response) {
//     $("body").css("background-image", 
//     `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(${response.urls.regular})`);
//   },
//   error: function() {
//     alert("There was an error retrieving Unsplash Image");
//   }
// });