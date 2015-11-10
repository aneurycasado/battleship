app.config(($stateProvider) => {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: "HomeController"
    });
});

app.controller("HomeController", ($rootScope, $timeout, $scope, GameFactory, PlayerFactory, MapFactory, ConfigurationFactory, ShipFactory, GuessFactory, SpriteEventFactory, EventFunctionFactory) => {
	$scope.game = GameFactory.game;
	$scope.player = PlayerFactory;
	$scope.opponent = PlayerFactory.createAIOpponent();
	$scope.gameID = null;
	$scope.playerID = null;
	$scope.opponentID = null;
	$scope.gameOver = false;
	$scope.gameOverMessage = "";
	$rootScope.$on("shipPlaced", EventFunctionFactory.shipPlaced.bind(null,$scope));
	$rootScope.$on("guessPlaced", function(event,guess){
		EventFunctionFactory.guessPlaced(guess,$scope)
	});
	$rootScope.$on("opponentsTurn", EventFunctionFactory.opponentsTurn.bind(null,$scope)); 
	$rootScope.$on("playerWon", EventFunctionFactory.playerWon.bind(null,$scope));
	$rootScope.$on("opponentWon", EventFunctionFactory.opponentWon.bind(null,$scope)); 
	let renderer = PIXI.autoDetectRenderer(ConfigurationFactory.width, ConfigurationFactory.height, {})
	$("#mainContainer").append(renderer.view);
	let mainContainer = new PIXI.Container();
	mainContainer.addChild(MapFactory.map.container);
	mainContainer.addChild(ShipFactory.container);
	mainContainer.addChild(GuessFactory.container);
	animate();
	function animate() {
    	requestAnimationFrame(animate);
    	// render the root container
    	renderer.render(mainContainer);
	}
})