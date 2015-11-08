'use strict';
let router = require('express').Router();
module.exports = router;
let mongoose = require('mongoose');
let Game = mongoose.model('Game');
let Player = mongoose.model('Player');
router.get("/:id", (req,res) => {
	let gameID = req.params.id; 
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
router.put("/:id", (req,res) => {
	let gameID = req.params.id;
	let guess = req.body.guess;
	console.log("The guess",guess);
	let hit = false;
	Game.findOne({_id: gameID}).populate("player opponent")
	.then((game) => {
		let player = game.player;
		let opponent = game.opponent;
		player.guesses.push(guess);
		console.log("Guess",guess);
		console.log("Opponent ships", opponent.ships)
		if(opponent.ships.indexOf(guess) !== -1){
			hit = true;
		}else{
			hit = false;
		}
		return player.save();
	})
	.then((savedPlayer) => {
		res.json(hit);
	});
})