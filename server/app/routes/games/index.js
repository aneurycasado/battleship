'use strict';
//Implements the api for a game
//This api all the four http methods
let router = require('express').Router();
module.exports = router;
let mongoose = require('mongoose');
let Game = mongoose.model('Game');
let Player = mongoose.model('Player');
//Get the game
router.get("/:id", (req,res) => {
	let gameID = req.params.id; 
	Game.findOne({_id: gameID}).populate("player opponent")
	.then((game) => {
		res.status(200).json(game);
	});
})
//Create the game with a reference to a player and opponent
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
		res.status(201).json(savedGame);
	})
})
//This put routes adds a guess to the player in the game and
//checks to see if they struck an opponent ship.
//It then sends the client a true or false value.
router.put("/:id", (req,res) => {
	let gameID = req.params.id;
	let guess = req.body.guess;
	let hit = false;
	Game.findOne({_id: gameID}).populate("player opponent")
	.then((game) => {
		let player = game.player;
		let opponent = game.opponent;
		player.guesses.push(guess);
		if(opponent.ships.indexOf(guess) !== -1){
			hit = true;
		}else{
			hit = false;
		}
		return player.save();
	})
	.then((savedPlayer) => {
		res.status(200).json(hit);
	});
})
//This route deletes a game
router.delete("/:id", (req,res) => {
	let gameID = req.params.id; 
	Game.findOne({_id: gameID})
	.then((game) => {
		return game.remove();
	})
	.then(() => {
		res.sendStatus(204);
	});
})