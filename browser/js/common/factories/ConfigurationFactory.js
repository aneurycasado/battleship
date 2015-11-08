app.factory('ConfigurationFactory', () => {
	let canvasSettings = {
		width: 1000,
		rows: 5,
		cols: 5
	}
	canvasSettings.cellSize = canvasSettings.width / canvasSettings.cols;
	canvasSettings.height = canvasSettings.rows * canvasSettings.cellSize;
	return canvasSettings;
});