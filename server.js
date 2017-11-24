// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Friends Data
// =============================================================
//var friends = require("./app/data/friends.js");
/*
var friends = [
{
  "name": "Ahmed",
  "photo":"https://en.wikipedia.org/wiki/Ahmed_I#/media/File:Sultan_I._Ahmet.jpg",
  "scores":[
      5,
      1,
      4,
      4,
      5,
      1,
      2,
      5,
      4,
      1
    ]
},
{
  "name":"Anthony",
  "photo":"https://en.wikipedia.org/wiki/Anthony_Kiedis#/media/File:2016_RiP_Red_Hot_Chili_Peppers_-_Anthony_Kiedis_-_by_2eight_-_DSC0349.jpg",
  "scores":[
      5,
      1,
      4,
      4,
      5,
      1,
      2,
      5,
      4,
      1
    ]
},
{
  "name":"John",
  "photo":"https://en.wikipedia.org/wiki/John_Frusciante#/media/File:JohnFruscianteAugust2006.jpg",
  "scores":[
      5,
      1,
      4,
      4,
      5,
      1,
      2,
      5,
      4,
      1
    ]
}
]
*/

// Routes
// =============================================================
//require("./app/routing/apiRoutes.js"); <- This doesn't work...
var htmls = require("./app/routing/htmlRoutes.js").htmlRoutes;
htmls.method(app, path);

var apis = require("./app/routing/apiRoutes.js").apiRoutes;
apis.method(app);


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
