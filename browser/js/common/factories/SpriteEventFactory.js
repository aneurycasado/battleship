app.factory("SpriteEventFactory", () => {
	const mouseOverGridNode = function() {
		console.log(this);
		let filter = new PIXI.filters.ColorMatrixFilter();
        filter.matrix = [
                		1,0,0,0,
                		0,2,0,0.5,
                		0,0,1,0,
                		0,0,0,1
        				];
        this.img.filters = [filter];
	}

	const mouseOutGridNode = function() {
		this.img.filters = null;
	}
	return {
		mouseOutGridNode,
		mouseOverGridNode
	}
})