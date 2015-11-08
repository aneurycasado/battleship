app.factory("SpriteEventFactory", ($rootScope,ShipFactory, GuessFactory) => {
	let drawShips = true;
	let placeGuess = false;
	$rootScope.$on("drawShipsFalse", () => {
		drawShips = false;
		placeGuess = true;
	});
	$rootScope.$on("opponentsTurn", () => {
		placeGuess = false;
	});
	$rootScope.$on("playersTurn", () => {
		placeGuess = true;
	});
	$rootScope.$on("gameOver", () => {
		placeGuess = false;
	})
	const clickOnGridNode = function(){
		if(drawShips){
			if(!this.containsShip){
				ShipFactory.placeShip.call(this);
				this.containsShip = true;
			}
		}else if(placeGuess){
			if(!this.containsGuess){
				GuessFactory.placeGuess.call(this);
				this.containsGuess = true;
			}
		}
	}

	const mouseOverGridNode = function() {
		let filter = new PIXI.filters.ColorMatrixFilter();
		if(drawShips){
			if(!this.containsShip){
        		filter.matrix = [
                		0,0,0,0,
                		0,2,0,0,
                		0,0,0,0,
                		0,0,0,0
        				];
			}else{
				filter.matrix = 
				[
                	2,0,0,0,
                	0,0,0,0,
                	0,0,0,0,
                	0,0,0,0
        		];
			}
			this.img.filters = [filter];
		}else{
			if(!this.containsGuess){
        		filter.matrix = [
                		0,0,0,0,
                		0,2,0,0,
                		0,0,0,0,
                		0,0,0,0
        				];
			}else{
				filter.matrix = 
				[
                	2,0,0,0,
                	0,0,0,0,
                	0,0,0,0,
                	0,0,0,0
        		];
			}
			this.img.filters = [filter];
		}
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