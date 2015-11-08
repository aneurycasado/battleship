app.factory('ConfigurationFactory', () => {
	let canvasSettings = {
		width: $(window).width(),
		rows: 5,
		cols: 5,
		mapSettings: {}
	}
	canvasSettings.cellSize = canvasSettings.width / canvasSettings.cols;
	canvasSettings.height = (canvasSettings.rows * canvasSettings.cellSize)/2;
	canvasSettings.mapSettings.cellSize = canvasSettings.cellSize / 2;
	canvasSettings.mapSettings.width = canvasSettings.width/2;
	canvasSettings.mapSettings.height = canvasSettings.height;
	return canvasSettings;
});