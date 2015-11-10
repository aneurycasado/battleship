app.factory("EventFunctionFactory", ($rootScope, $timeout, PlayerFactory,GameFactory,ShipFactory) => {
	const shipPlaced = function(scope) {
		scope.$apply();
	}

	const guessPlaced = (guess,scope) => {
		PlayerFactory.theirTurn = false;
		$rootScope.$emit("opponentsTurn");
		let information = {
			gameID: scope.gameID,
			playerID: scope.playerID,
			guess: guess
		}
		GameFactory.checkGuess(information).then((hit) => {
			if(hit){
				PlayerFactory.shipsHit++;
				if(PlayerFactory.shipsHit === 10){
					$rootScope.$emit("playerWon");
				}
				$rootScope.$emit("rightGuess",guess)
				console.log("Success");
			}else{
				$rootScope.$emit("wrongGuess",guess)
				console.log("Failure");
			}
			$timeout(function(){
				scope.showShips();
			},500);			
		});
	}

	const opponentsTurn = function(scope) {
		if(!scope.gameOver){
			$timeout(function(){
				let guess = scope.opponent.guesses[scope.opponent.currentGuess];	
				scope.opponent.currentGuess++;
				ShipFactory.addOpponentsGuess(guess);
			}, 1000);
			$timeout(function(){
				PlayerFactory.theirTurn = true;
				$rootScope.$emit("playersTurn");
				scope.showGuesses();
			},2000);
		}
	}

	const playerWon = function(scope) {
		$rootScope.$emit("gameOver");
		scope.gameOver = true;
		scope.gameOverMessage = "Congrats You Won";
	}

	const opponentWon = function(scope) {
		$rootScope.$emit("gameOver");
		scope.gameOver = true;
		scope.gameOverMessage = "Sorry You Lost";
	}

	return {
		shipPlaced,
		guessPlaced,
		opponentsTurn,
		playerWon,
		opponentWon
	}

})