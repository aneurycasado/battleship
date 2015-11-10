app.directive('buttons', () => {
	return {
		restrict: "E",
		templateUrl: "js/common/directives/buttons/buttons.html",
		controller: "ButtonsController"
	}
})

app.controller('ButtonsController', ($rootScope,$scope, PlayerFactory, ShipFactory, GameFactory, GuessFactory) => {
	$scope.startGame = () => {
		let opponent = $scope.opponent;
		let player = PlayerFactory.player;
		let game = {
			opponent: opponent,
			player: player
		}
		GameFactory.createGame(game).then((savedGame) => {
			$scope.gameID = savedGame._id;
			$scope.playerID = savedGame.player;
			$scope.opponentID = savedGame.opponent;
			ShipFactory.container.removeChildren();
			GameFactory.game.state = "makeGuess";
			GameFactory.game.heading = "Make a Guess";
			PlayerFactory.theirTurn = true;
			GameFactory.game.started = true;
			$rootScope.$emit("drawShipsFalse");
		});
	}
	$scope.showShips = () => {
		GuessFactory.container.removeChildren();
		ShipFactory.redrawShips();
	}
	$scope.showGuesses = () => {
		ShipFactory.container.removeChildren();
		GuessFactory.redrawGuesses();
	}
})