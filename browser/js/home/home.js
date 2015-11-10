app.config(($stateProvider) => {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: "HomeController"
    });
});

app.controller("HomeController", ($rootScope, $timeout, $scope, Game, Player, Map, Configuration, Ship, Guess, SpriteEvent, EventFunction) => {
	$scope.game = Game.game;
	$scope.player = Player;
	$scope.opponent = Player.createAIOpponent();
	$scope.gameID = null;
	$scope.playerID = null;
	$scope.opponentID = null;
	$scope.gameOver = false;
	$scope.gameOverMessage = "";
	$rootScope.$on("shipPlaced", EventFunction.shipPlaced.bind(null,$scope));
	$rootScope.$on("guessPlaced", function(event,guess){
		EventFunction.guessPlaced(guess,$scope)
	});
	$rootScope.$on("opponentsTurn", EventFunction.opponentsTurn.bind(null,$scope)); 
	$rootScope.$on("opponentHit", EventFunction.opponentHit.bind(null,$scope));
	$rootScope.$on("opponentMissed", EventFunction.opponentMissed.bind(null,$scope));
	$rootScope.$on("opponentPlayed", EventFunction.opponentPlayed.bind(null,$scope));
	$rootScope.$on("playerWon", EventFunction.playerWon.bind(null,$scope));
	$rootScope.$on("opponentWon", EventFunction.opponentWon.bind(null,$scope)); 
	let renderer = PIXI.autoDetectRenderer(Configuration.width, Configuration.height, {})
	$("#mainContainer").append(renderer.view);
	let mainContainer = new PIXI.Container();
	mainContainer.addChild(Map.map.container);
	mainContainer.addChild(Ship.container);
	mainContainer.addChild(Guess.container);
	animate();
	function animate() {
    	requestAnimationFrame(animate);
    	// render the root container
    	renderer.render(mainContainer);
	}
})