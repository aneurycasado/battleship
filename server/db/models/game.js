var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	player: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Player'
	},
	opponent: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Player'
	},
	timeStarted: {
		type: Date,
		default: Date.now
	},
	timeEnded: {
		type: Date
	}
})

mongoose.model('Game', schema);