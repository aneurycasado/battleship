app.factory("GuessFactory", ($rootScope,ConfigurationFactory, PlayerFactory) => {
	let guesses = [];
	let results = [];
	let container = new PIXI.Container();
	class Guess{
		constructor(x,y){
			this.position = {x: x, y: y};
			let imgPosition = [this.position.x * ConfigurationFactory.mapSettings.cellSize + (ConfigurationFactory.mapSettings.cellSize/2), this.position.y * ConfigurationFactory.mapSettings.cellSize + (ConfigurationFactory.mapSettings.cellSize/2)]
			this.img = new PIXI.Sprite(PIXI.Texture.fromImage("/images/x.png"));
		
			this.img.position.x = imgPosition[0]
			this.img.position.y = imgPosition[1];
			this.img.anchor.x = .5; 
			this.img.anchor.y = .5;
			this.img.texture.width = ConfigurationFactory.mapSettings.cellSize/2; 
			this.img.width = ConfigurationFactory.mapSettings.cellSize/2;
			this.img.height = ConfigurationFactory.mapSettings.cellSize/2;
		}
	}

	class Result{
		constructor(x,y,opts){
			this.position = {x: x, y: y};
			let imgPosition = [this.position.x * ConfigurationFactory.mapSettings.cellSize + (ConfigurationFactory.mapSettings.cellSize/2), this.position.y * ConfigurationFactory.mapSettings.cellSize + (ConfigurationFactory.mapSettings.cellSize/2)]
			if(opts.success){
				this.img = new PIXI.Sprite(PIXI.Texture.fromImage("/images/check.png"));
			}else{
				this.img = new PIXI.Sprite(PIXI.Texture.fromImage("/images/wrong.png"))
			}
			this.img.position.x = imgPosition[0]
			this.img.position.y = imgPosition[1];
			this.img.anchor.x = .5; 
			this.img.anchor.y = .5;
			this.img.texture.width = ConfigurationFactory.mapSettings.cellSize/2; 
			this.img.width = ConfigurationFactory.mapSettings.cellSize/2;
			this.img.height = ConfigurationFactory.mapSettings.cellSize/2;
		}
	}

	$rootScope.$on("rightGuess", (event, guess) => {
		let success = true; 
		let location = {x: parseInt(guess[0]), y: parseInt(guess[2])}
		let result = new Result(location.x, location.y, {success: success});
		results.push(result);
		container.addChild(result.img);
	})
	$rootScope.$on("wrongGuess", (event, guess) => {
		let success = false; 
		let location = {x: parseInt(guess[0]), y: parseInt(guess[2])}
		let result = new Result(location.x, location.y, {success: success});
		results.push(result);
		container.addChild(result.img);
	})
	const placeGuess = function(){
		let newGuess = new Guess(this.x, this.y);
		guesses.push(newGuess);
		PlayerFactory.player.guesses.push(this.x.toString() +","+this.y.toString())
		container.addChild(newGuess.img);
		let guess = this.x.toString() + "," + this.y.toString();
		console.log("Guess in placeGuess",guess)
		$rootScope.$emit("guessPlaced", guess);
	}

	const redrawGuesses = () => {
		guesses.forEach((guess) => {
			container.addChild(guess.img);
		});
		results.forEach((result) => {
			container.addChild(result.img);
		});
	}

	return {
		placeGuess,
		redrawGuesses,
		container,
	}
})