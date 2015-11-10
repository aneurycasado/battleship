//This factory defines the functions that run when certain events are fired by the game

app.factory("EventFunction", ($rootScope, $timeout, Player, Game, Ship) => {
	const shipPlaced = function(scope) {
		scope.$apply();
	}
//When a user places a guess, the game hits the server and verifies this guess against 
//the information contained for an opponents ships.
	const guessPlaced = (guess,scope) => {
		$rootScope.$emit("doneGuessing");
		Player.theirTurn = false;
		let information = {
			gameID: scope.gameID,
			playerID: scope.playerID,
			guess: guess
		}
		Game.checkGuess(information).then((hit) => {
			if(hit){
				scope.game.heading = "You Hit the Opponent's Ship"; 
				Player.shipsHit++;
				if(Player.shipsHit === 10){
					$rootScope.$emit("playerWon");
				}
				$rootScope.$emit("rightGuess",guess)
			}else{
				scope.game.heading = "You Missed the Opponent's Ship";
				$rootScope.$emit("wrongGuess",guess)
			}
			$timeout(function(){
				scope.showShips();
				$rootScope.$emit("opponentsTurn");
			},500);			
		});
	}

	const opponentsTurn = function(scope) {
		if(!scope.gameOver){
			$timeout(function(){
				let guess = scope.opponent.guesses[scope.opponent.currentGuess];	
				scope.opponent.currentGuess++;
				Ship.addOpponentsGuess(guess);
				$rootScope.$emit("opponentPlayed");
			}, 1000);
		}
	
	}

	const opponentHit = function(scope){
		scope.game.heading = "The Opponent Hit Your Ship"
	}

	const opponentMissed = function(scope){
		scope.game.heading = "The Opponent Missed Your Ship"
	}

	const opponentPlayed = function(scope){
		if(!scope.gameOver){
			$timeout(function(){
				Player.theirTurn = true;
				$rootScope.$emit("playersTurn");
				scope.showGuesses();
			},1000);
		}
	}

	const playerWon = function(scope) {
		$rootScope.$emit("gameOver");
		scope.gameOver = true;
		scope.game.heading = "Congrats You Won";
	}

	const opponentWon = function(scope) {
		console.log("Called");
		$rootScope.$emit("gameOver");
		scope.gameOver = true;
		scope.game.heading = "Sorry You Lost";
	}
	return {
		shipPlaced,
		guessPlaced,
		opponentsTurn,
		opponentHit,
		opponentMissed,
		opponentPlayed,
		playerWon,
		opponentWon
	}
})