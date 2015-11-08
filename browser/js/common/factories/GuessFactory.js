app.factory("GuessFactory", (ConfigurationFactory) => {
	let guesses = [];
	let container = new PIXI.Container();
	class Guess{
		constructor(x,y, opts){
			this.position = {x: x, y: y};
			let imgPosition = [this.position.x * ConfigurationFactory.mapSettings.cellSize + (ConfigurationFactory.mapSettings.cellSize/2), this.position.y * ConfigurationFactory.mapSettings.cellSize + (ConfigurationFactory.mapSettings.cellSize/2)]
			this.img = new PIXI.Sprite(PIXI.Texture.fromImage("/images/x.png"));
			this.img.position.x = imgPosition[0] + opts.initialPosition;
			this.img.position.y = imgPosition[1];
			this.img.anchor.x = .5; 
			this.img.anchor.y = .5;
			this.img.texture.width = ConfigurationFactory.mapSettings.cellSize/2; 
			this.img.width = ConfigurationFactory.mapSettings.cellSize/2;
			this.img.height = ConfigurationFactory.mapSettings.cellSize/2;
		}
	}

	const placeGuess = function(){
		let newGuess = new Guess(this.x, this.y, {initialPosition: this.initialPosition});
		guesses.push(newGuess);
		container.addChild(newGuess.img);
	}

	return {
		placeGuess,
		container,
	}
})