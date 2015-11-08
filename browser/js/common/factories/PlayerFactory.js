app.factory("PlayerFactory", () => {
	let shipsToPlace = 10;
	let shipsHit = 0;
	let shipsLeft = 10;
	let theirTurn = true;
	let player = {ships: [], guesses: []};
	const createAIOpponent = () => {
		let ships = [];
		let guesses = [];
		while(ships.length !== 10){
			let x = Math.floor(Math.random()*5);
			let y = Math.floor(Math.random()*5);
			let ship = x.toString() + "," + y.toString();
			if(x !== 5 && y !== 5 && ships.indexOf(ship) === -1){
				ships.push(ship);
			}
		}
		while(guesses.length !== 25){
			let x = Math.floor(Math.random()*5);
			let y = Math.floor(Math.random()*5);
			let guess = x.toString() + "," + y.toString();
			if(x !== 5 && y !== 5 && guesses.indexOf(guess) === -1){
				guesses.push(guess);
			}
		}
		return {
			ships,
			guesses,
		}
	}
	return {
		theirTurn,
		shipsToPlace,
		shipsHit,
		shipsLeft,
		player,
		createAIOpponent,
	}
});