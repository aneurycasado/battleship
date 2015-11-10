//This is the player object that contains the player's ship locations and 
//their guesses
var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	type: String,
	ships: [String],
	guesses: [String]
});

mongoose.model('Player', schema);