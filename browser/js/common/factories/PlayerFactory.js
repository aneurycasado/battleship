app.factory("PlayerFactory", () => {
	const shipsToPlace = 10;
	const shipsHit = 0;
	const shipsLeft = 10;
	return {
		shipsToPlace,
		shipsHit,
		shipsLeft,
	}
})