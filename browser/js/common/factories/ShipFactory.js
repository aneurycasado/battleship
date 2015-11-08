app.factory("ShipFactory", () => {
	let container = new PIXI.Container();
	let ships = [];
	const canPlaceShip = () => {
		console.log("Works")
	}
	return {
		canPlaceShip,
	}
});