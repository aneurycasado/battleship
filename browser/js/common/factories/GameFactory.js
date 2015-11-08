app.factory("GameFactory", ($rootScope, PlayerFactory) => {
	let game = {
		state: "placeShips",
	};
	$rootScope.$on("shipPlaced", () => {
		if(PlayerFactory.shipsToPlace === 0){
			game.state = "finishedPlacing";
		}
	});
	return {
		game,	
	}
})