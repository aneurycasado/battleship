// This directive controls the three buttons in the game:
// Start Game - Hits the server and creates a new game
// Show Ships - Shows the player's ships
// Show Guesses - Shows the player's guesses

app.directive('buttons', () => {
	return {
		restrict: "E",
		templateUrl: "js/common/directives/buttons/buttons.html",
		controller: "ButtonsController"
	}
})

app.controller('ButtonsController', ($rootScope,$scope, Player, Ship, Game, Guess) => {
	$scope.startGame = () => {
		let opponent = $scope.opponent;
		let player = Player.player;
		let game = {
			opponent: opponent,
			player: player
		}
		Game.createGame(game).then((savedGame) => {
			$scope.gameID = savedGame._id;
			$scope.playerID = savedGame.player;
			$scope.opponentID = savedGame.opponent;
			Ship.container.removeChildren();
			Game.game.state = "makeGuess";
			Game.game.heading = "Make a Guess";
			Player.theirTurn = true;
			Game.game.started = true;
			$rootScope.$emit("drawShipsFalse");
		});
	}
	$scope.showShips = () => {
		$rootScope.$emit("showShipsView");
		Guess.container.removeChildren();
		Ship.redrawShips();

	}
	$scope.showGuesses = () => {
		$rootScope.$emit("showGuessesView");
		Ship.container.removeChildren();
		Guess.redrawGuesses();
	}
})