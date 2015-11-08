'use strict';
let router = require('express').Router();
module.exports = router;
let mongoose = require('mongoose');
let Game = mongoose.model('Game');
let Player = mongoose.model('Player');
router.get("/:id", (req,res) => {
	let gameID = req.params.id 
	Game.findOne({_id: gameID})
	.then((game) => {
		res.json(game);
	});
})

router.post("/", (req,res) => {
	let player = req.body.player; 
	let opponent = req.body.opponent;
	let game = {
		player: null,
		opponent: null,
	}
	Player.create(player)
	.then((savedPlayer) => {
		game.player = savedPlayer._id;
		return Player.create(opponent);
	})
	.then((savedOpponent) => {
		game.opponent = savedOpponent._id;
		return Game.create(game)
	})
	.then((savedGame) => {
		res.json(savedGame);
	})
})