app.factory("GameFactory", ($rootScope, PlayerFactory, $http) => {
	let game = {
		state: "placeShips",
		heading: "Place Ships",
		started: false,
	};
	$rootScope.$on("shipPlaced", () => {
		if(PlayerFactory.shipsToPlace === 0){
			game.state = "finishedPlacing";
			game.heading = "You have no more ships to place. Begin the game!";
			PlayerFactory.theirTurn = false;
		}
	});

	const createGame = (game) => {
		return $http.post("/api/games/",game).then(response => response.data);
	}
	return {
		game,
		createGame,	
	}
})