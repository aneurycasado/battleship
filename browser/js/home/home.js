app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: "HomeController"
    });
});

app.controller("HomeController", ($rootScope, $scope, GameFactory, PlayerFactory, MapFactory, ConfigurationFactory, ShipFactory, GuessFactory) => {
	let renderer = PIXI.autoDetectRenderer(ConfigurationFactory.width, ConfigurationFactory.height, {})
	$("#mainContainer").append(renderer.view);
	let mainContainer = new PIXI.Container();
	$scope.game = GameFactory.game;
	$scope.gameID = null;
	$scope.player = PlayerFactory;
	$scope.startGame = () => {
		let opponent = PlayerFactory.createAIOpponent();
		let player = PlayerFactory.player;
		let game = {
			opponent: opponent,
			player: player
		}
		GameFactory.createGame(game).then((savedGame) => {
			savedGame._id;
			console.log(savedGame);
		});
		console.log("Start Game");
	}
	mainContainer.addChild(MapFactory.yourMap.container);
	// mainContainer.addChild(MapFactory.opponentMap.container);
	mainContainer.addChild(ShipFactory.container);
	// mainContainer.addChild(GuessFactory.container);
	$rootScope.$on("shipPlaced", () => {
		console.log(PlayerFactory.player.ships);
		$scope.$apply();
	});
	animate();
	function animate() {
    	requestAnimationFrame(animate);
    	// render the root container
    	renderer.render(mainContainer);
	}
})