//var express = require("express");
//var app = express();
//var path = require("path");

//require("../../server.js");

//console.log("htmlRoutes");
/*
// route to survey
app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "survey.html"));
});

// Default. Route to home
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});
*/

var MAIN = {};
exports.htmlRoutes = MAIN;

MAIN.method = function(app, path){

	app.get("/survey", function(req, res) {
	  res.sendFile(path.join(__dirname, "../public/survey.html"));
	});

	app.get("/", function(req, res) {
	  res.sendFile(path.join(__dirname, "../public/home.html"));
	});

};