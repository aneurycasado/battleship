app.factory("SpriteEvent", ($rootScope, Ship, Guess, ColorFilter) => {
	let drawShips = true;
	let placeGuess = false;
	let opponentsTurn = false;
	$rootScope.$on("drawShipsFalse", () => {
		drawShips = false;
		placeGuess = true;
	});
	$rootScope.$on("opponentsTurn", () => placeGuess = false);
	$rootScope.$on("playersTurn", () => placeGuess = true);
	$rootScope.$on("gameOver", () => placeGuess = false);
	$rootScope.$on("showShipsView", () => placeGuess = false);
	$rootScope.$on("showGuessesView", () => {
		if(!opponentsTurn) placeGuess = true
	});
	const clickOnGridNode = function(){
		if(drawShips){
			if(!this.containsShip) Ship.placeShip.call(this);
		}else if(placeGuess){
			if(!this.containsGuess) Guess.placeGuess.call(this);
		}
	}

	const mouseOverGridNode = function() {
		let filter = new PIXI.filters.ColorMatrixFilter();
		if(drawShips){
			if(!this.containsShip) filter.matrix = ColorFilter.greenFilter;
			else filter.matrix = ColorFilter.redFilter;
		}else{
			if(!this.containsGuess) filter.matrix = ColorFilter.greenFilter;
			else filter.matrix = ColorFilter.redFilter;
		}
		this.img.filters = [filter];
	}

	const mouseOutGridNode = function() {
		this.img.filters = null;
	}

	return {
		clickOnGridNode,
		mouseOutGridNode,
		mouseOverGridNode,
		drawShips,
	}

})