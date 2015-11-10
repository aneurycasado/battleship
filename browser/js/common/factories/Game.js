app.factory("Game", ($rootScope, Player, $http) => {
	let game = {
		state: "placeShips",
		heading: "Place Ships",
		started: false,
	};
	let gameID = null; 
	$rootScope.$on("shipPlaced", () => {
		if(Player.shipsToPlace === 0){
			game.state = "finishedPlacing";
			game.heading = "You have no more ships to place. Begin the game!";
			Player.theirTurn = false;
		}
	});

	const createGame = (game) => {
		return $http.post("/api/games/",game).then(response => response.data);
	}
	const checkGuess = (information) => {
		let guess = {
			guess: information.guess,
			playerID: information.playerID,
		}
		gameID = information.gameID;
		return $http.put("/api/games/"+information.gameID,guess).then(response => response.data);
	}
	return {
		game,
		createGame,
		checkGuess,	
	}
})