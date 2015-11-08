app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: "HomeController"
    });
});

app.controller("HomeController", ($rootScope, $timeout, $scope, GameFactory, PlayerFactory, MapFactory, ConfigurationFactory, ShipFactory, GuessFactory, SpriteEventFactory) => {
	$scope.game = GameFactory.game;
	$scope.player = PlayerFactory;
	$scope.opponent = PlayerFactory.createAIOpponent();
	$scope.gameID = null;
	$scope.playerID = null;
	$scope.opponentID = null;
	$scope.gameOver = false;
	$scope.gameOverMessage = "";
	let renderer = PIXI.autoDetectRenderer(ConfigurationFactory.width, ConfigurationFactory.height, {})
	$("#mainContainer").append(renderer.view);
	let mainContainer = new PIXI.Container();
	mainContainer.addChild(MapFactory.map.container);
	mainContainer.addChild(ShipFactory.container);
	mainContainer.addChild(GuessFactory.container);
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
			console.log(savedGame);
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
	$rootScope.$on("shipPlaced", () => {
		console.log(PlayerFactory.player.ships);
		$scope.$apply();
	});
	$rootScope.$on("guessPlaced", (event,guess) => {
		PlayerFactory.theirTurn = false;
		$rootScope.$emit("opponentsTurn");
		let information = {
			gameID: $scope.gameID,
			playerID: $scope.playerID,
			guess: guess
		}
		GameFactory.checkGuess(information).then((hit) => {
			if(hit){
				PlayerFactory.shipsHit++;
				if(PlayerFactory.shipsHit === 10){
					$rootScope.$emit("playerWon");
				}
				$rootScope.$emit("rightGuess",guess)
				console.log("Success");
			}else{
				$rootScope.$emit("wrongGuess",guess)
				console.log("Failure");
			}
			$timeout(function(){
				$scope.showShips();
			},500);			
		});
	});
	$rootScope.$on("opponentsTurn", () => {
		if(!$scope.gameOver){
			$timeout(function(){
				let guess = $scope.opponent.guesses[$scope.opponent.currentGuess];	
				$scope.opponent.currentGuess++;
				ShipFactory.addOpponentsGuess(guess);
			}, 1000);
			$timeout(function(){
				PlayerFactory.theirTurn = true;
				$rootScope.$emit("playersTurn");
				$scope.showGuesses();
			},2000);
		}
	});
	$rootScope.$on("playerWon", () => {
		$rootScope.$emit("gameOver");
		$scope.gameOver = true;
		$scope.gameOverMessage = "Congrats You Won";
	});
	$rootScope.$on("opponentWon", () => {
		$rootScope.$emit("gameOver");
		$scope.gameOver = true;
		$scope.gameOverMessage = "Sorry You Lost";
	});
	animate();
	function animate() {
    	requestAnimationFrame(animate);
    	// render the root container
    	renderer.render(mainContainer);
	}
})