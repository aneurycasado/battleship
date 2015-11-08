app.factory("ShipFactory", ($rootScope, PlayerFactory, ConfigurationFactory, GameFactory) => {
	let ships = [];
	let container = new PIXI.Container();
	class Ship{
		constructor(x,y){
			this.position = {x: x, y: y};
			let imgPosition = [this.position.x * ConfigurationFactory.mapSettings.cellSize + (ConfigurationFactory.mapSettings.cellSize/2), this.position.y * ConfigurationFactory.mapSettings.cellSize + (ConfigurationFactory.mapSettings.cellSize/2)]
			this.img = new PIXI.Sprite(PIXI.Texture.fromImage("/images/circle.png"));
			this.img.position.x = imgPosition[0];
			this.img.position.y = imgPosition[1];
			this.img.anchor.x = .5; 
			this.img.anchor.y = .5;
			this.img.texture.width = ConfigurationFactory.mapSettings.cellSize/2; 
			this.img.width = ConfigurationFactory.mapSettings.cellSize/2;
			this.img.height = ConfigurationFactory.mapSettings.cellSize/2;
		}
	}

	const placeShip = function(){
		if(GameFactory.game.state === "placeShips" && this.initialPosition === 0){
			let newShip = new Ship(this.x, this.y);
			ships.push(newShip);
			container.addChild(newShip.img);
			PlayerFactory.shipsToPlace--;
			PlayerFactory.player.ships.push(this.x.toString() + "," + this.y.toString())
			$rootScope.$emit("shipPlaced");
		}else if(GameFactory.game.state === "finishedPlacing"){
			console.log("Can't place anymore");
		}else if(this.initialPosition !== 0){
			console.log("That is your guesses");
		}
	}

	return {
		placeShip,
		container,
	}
});