app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: "HomeController"
    });
});

app.controller("HomeController", ($rootScope, $scope, GameFactory, PlayerFactory, MapFactory, ConfigurationFactory, ShipFactory, GuessFactory, SpriteEventFactory) => {
	$scope.game = GameFactory.game;
	$scope.player = PlayerFactory;
	$scope.opponent = PlayerFactory.createAIOpponent();
	$scope.gameID = null;
	$scope.playerID = null;
	$scope.opponentID = null;
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
			//$scope.$digest();
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
		console.log("Guess in guessPlaced", guess);
		let information = {
			gameID: $scope.gameID,
			playerID: $scope.playerID,
			guess: guess
		}
		GameFactory.checkGuess(information).then((hit) => {
			if(hit){
				$rootScope.$emit("rightGuess",guess)
				console.log("Success");
			}else{
				$rootScope.$emit("wrongGuess",guess)
				console.log("Failure");
			}
			window.setTimeout(function(){
				PlayerFactory.theirTurn = false;
				$rootScope.$emit("opponentsTurn");
				$scope.showShips();
			},1000);			
		});
	});
	$rootScope.$on("opponentsTurn", () => {
		window.setTimeout(function(){
			let guess = $scope.opponent.guesses[$scope.opponent.currentGuess];	
			$scope.opponent.currentGuess++;
			ShipFactory.addOpponentsGuess(guess);
		}, 1000);
		window.setTimeout(function(){
			PlayerFactory.theirTurn = true;
			$rootScope.$emit("playersTurn");
			$scope.showGuesses();
		},2000);
	});

	animate();
	function animate() {
    	requestAnimationFrame(animate);
    	// render the root container
    	renderer.render(mainContainer);
	}
})