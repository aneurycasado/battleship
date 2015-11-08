app.factory("ShipFactory", ($rootScope, PlayerFactory, ConfigurationFactory, GameFactory) => {
	let ships = [];
	let guesses = [];
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

	class OpponentGuess{
		constructor(x,y, opts){
			this.position = {x: x, y: y};
			let imgPosition = [this.position.x * ConfigurationFactory.mapSettings.cellSize + (ConfigurationFactory.mapSettings.cellSize/2), this.position.y * ConfigurationFactory.mapSettings.cellSize + (ConfigurationFactory.mapSettings.cellSize/2)]
			if(opts.success){
				this.img = new PIXI.Sprite(PIXI.Texture.fromImage("/images/check.png"));
			}else{
				this.img = new PIXI.Sprite(PIXI.Texture.fromImage("/images/wrong.png"));
			}
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
		if(GameFactory.game.state === "placeShips"){
			let newShip = new Ship(this.x, this.y);
			ships.push(newShip);
			container.addChild(newShip.img);
			PlayerFactory.shipsToPlace--;
			PlayerFactory.player.ships.push(this.x.toString() + "," + this.y.toString())
			$rootScope.$emit("shipPlaced");
		}
	}

	const redrawShips = function(){
		ships.forEach((ship) => {
			container.addChild(ship.img);
		})
		guesses.forEach((guess) => {
			container.addChild(guess.img);
		});
	}

	const addOpponentsGuess = (guess) => {
		console.log(guess);
		console.log("add Opponents Guess");
		let success = false;
		let location = {x: parseInt(guess[0]), y: parseInt(guess[2])};
		ships.forEach((ship) => {
			if(ship.position.x === location.x && ship.position.y === location.y){
				success = true;
			}
		});
		let newGuess = new OpponentGuess(location.x, location.y, {success: success})
		guesses.push(newGuess);
		container.addChild(newGuess.img);
	}
	return {
		placeShip,
		container,
		redrawShips,
		addOpponentsGuess
	}
});