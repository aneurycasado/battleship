//This factory defines the basic settings of the canvas
app.factory('Configuration', () => {
	let canvasSettings = {
		width: $(window).width()/2,
		rows: 5,
		cols: 5,
		mapSettings: {}
	}
	canvasSettings.cellSize = canvasSettings.width / canvasSettings.cols;
	canvasSettings.height = (canvasSettings.rows * canvasSettings.cellSize);
	canvasSettings.mapSettings.cellSize = canvasSettings.cellSize
	canvasSettings.mapSettings.width = canvasSettings.width
	canvasSettings.mapSettings.height = canvasSettings.height;
	return canvasSettings;
});