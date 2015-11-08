app.factory("SpriteEventFactory", (ShipFactory, GuessFactory) => {
	const clickOnGridNodeShip = function(){
		if(!this.containsShip){
			ShipFactory.placeShip.call(this);
			this.containsShip = true;
		}
	}

	const clickOnGridNodeGuess = function(){
		if(!this.containsGuess){
			GuessFactory.placeGuess.call(this);
			this.containsGuess = true;
		}
	}

	const mouseOverGridNode = function() {
		let filter = new PIXI.filters.ColorMatrixFilter();
        filter.matrix = [
                		1,0,0,0,
                		0,2,0,0.5,
                		0,0,1,0,
                		0,0,0,1
        				];
        this.img.filters = [filter];
	}

	const mouseOutGridNode = function() {
		this.img.filters = null;
	}

	return {
		clickOnGridNodeShip,
		clickOnGridNodeGuess,
		mouseOutGridNode,
		mouseOverGridNode,
	}

})