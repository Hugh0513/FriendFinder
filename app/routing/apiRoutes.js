var fs = require('fs');

// Friends Data
// =============================================================
/*
//var friends = require("../data/friends.js"); // This becomes just object {} ...
var friends = require("../data/test.json"); // This works.
//var friends = require("../data/test.js"); // This does not works. Unexpected token
console.log(friends);
*/
var friends = require("../data/friends.json"); // This works.
//console.log(friends);

/*
var fs = require("fs");
var friends = "";
fs.readFile("app/data/friends.js", "utf8", function(err, data) { // This path(app/data/test.json) works.
	if (err) {
	    return console.log(err);
	 }
	console.log(data);
	//friends = data;
	friends = data.replace("\n", "");
});
*/

var MAIN = {};
exports.apiRoutes = MAIN;  // Exports to surver.js

MAIN.method = function(app){
	//document.print("apiRoutes"); // Error
	//console.log("addRoutes");

	// Display a JSON of all possible friends.
	app.get("/api/friends", function(req, res) {

	  return res.json(friends); 	
	  console.log("get /api/friends");

	});

	// Handle incoming survey results and compatibility logic.
	app.post("/api/friends", function(req, res) {
 		console.log("post /api/friends at apiRoutes.js");
 		//console.log(req.body);
 		//console.log(req); // At this moment, it is already 'scores[]'
	  	var newfriend = req.body;
	  	//res.json();
	  	console.log(req.body.name); // OK
	  	console.log(req.body.photo); // OK

	 	//newfriend.routeName = newfriend.name.replace(/\s+/g, "").toLowerCase();
	 	//console.log(req); // This is so long
	  	//console.log(newfriend);

	  	console.log(friends[0].scores); // OK
	  	console.log(newfriend);
	  	//console.log(newfriend.scores);// undefind
	  	console.log(newfriend['scores[]']);// OK
	  	console.log(newfriend['scores[]'][0]);// OK

	  	var scoresArray = newfriend['scores[]'];
	  	/*
	  	// this way doesn't chage the type
	  	scoresArray.map(function (element) { return Number(element); }); 
	  	*/
	  	for (var i = 0; i < scoresArray.length; i++) {
	  		scoresArray[i] = parseInt(scoresArray[i]);
	  	}
	  	console.log(scoresArray); 

	  	// Because propaty name 'scores' becomes 'scores[]', set values into new object again. 
	  	var newfriendObj = {
	  		name: req.body.name,
	  		photo: req.body.photo,
	  		scores: scoresArray
	  	}

	  	console.log(newfriendObj);

	  	// Why does it become 'scores[]' and not just 'scores'?
	  	//console.log(newfriend.'scores[]');// Error
	  	//console.log(newfriend.scores[]);//Error

	  	// Calculate difference with existing objects before pushing new charactor into friends array
		var bestMatchDiff = 100; // total difference of a friend who matches the most 
		var bestMatchID = 0;
		console.log(friends.length);
	    for (var i = 0; i < friends.length; i++) { // loop for friends
	    	var difference = 0;
			for (var j = 0; j < 10; j++) { // loop for scores
				if (friends[i].scores[j] > newfriendObj.scores[j])
	    			difference += friends[i].scores[j] - newfriendObj.scores[j];
	    		else {
					difference += newfriendObj.scores[j] - friends[i].scores[j];
	    		}
	    	}    	
	    	if (difference < bestMatchDiff){
	    		bestMatchDiff = difference;
	    		bestMatchID = i;
	    	}
	    		console.log("difference:" + difference);
	    		console.log("bestMatchID:" + bestMatchID);
	    }

	    // Add new friend into friends array
		//friends.push(newfriend);
		friends.push(newfriendObj);
		console.log(friends);

		// Print all friends into file.(overwrite)
		var printData = friends.toString();
		console.log("printData: " + printData); //[object Object],[object Object],[object Object],[object Object]
		console.log(JSON.stringify(printData)); //[object Object],[object Object],[object Object],[object Object]
		
		fs.writeFileSync("./app/data/friends.json", JSON.stringify(friends), function (err) {
		//fs.writeFileSync("./app/data/friends.json", JSON.stringify(printData.replace(/([.*+?^=!:${}()|[\]\/\\])/g, /\n/)), function (err) {
		    if (err) {
		        throw err;
		    }
	  	});

		//res.json(newfriendObj); // just return myself for test
		res.json(friends[bestMatchID]);

	}); // End of app.post
 
}; // End of MAIN.method