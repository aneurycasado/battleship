var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	type: String,
	ships: [String],
	guesses: [String]
});

mongoose.model('Player', schema);