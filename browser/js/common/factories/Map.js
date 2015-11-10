app.factory('Map', (Configuration, Ship, SpriteEvent) => {
	let map;
	let grid = [
					[0,0,0,0,0], 
					[0,0,0,0,0], 
					[0,0,0,0,0], 
					[0,0,0,0,0], 
					[0,0,0,0,0], 
				   ]
	class GridNode{
		constructor(x,y){
			this.x = x; 
			this.y = y;
			this.coords = {x: x * Configuration.mapSettings.cellSize, y: y * Configuration.mapSettings.cellSize};
			this.img = new PIXI.Sprite(PIXI.Texture.fromImage("/images/tile.png"));
			this.img.interactive = true;
			this.img.click = SpriteEvent.clickOnGridNode.bind(this);
			this.img.mouseover = SpriteEvent.mouseOverGridNode.bind(this);
			this.img.mouseout = SpriteEvent.mouseOutGridNode.bind(this);
			this.img.position.x = this.coords.x;
	        this.img.position.y = this.coords.y;
	        this.img.texture.width = Configuration.mapSettings.cellSize; 
			this.img.width = Configuration.mapSettings.cellSize;
			this.img.height = Configuration.mapSettings.cellSize;
		}
	}

	const insertNodes = (grid, map) => {
		let newGrid = grid.slice();
		newGrid.forEach((row) => {
			row = row.slice();
		})
		for(let row = 0; row < newGrid.length; row++){
			for(let col = 0; col < newGrid[row].length; col++){
				newGrid[row][col] = new GridNode(col,row)
				map.container.addChild(newGrid[row][col].img)
			}
		}
		return newGrid;
	}

	class Map{
		constructor(grid){
			this.container = new PIXI.Container();
			this.grid = insertNodes(grid,this)
		}
	}

	const init = () => {
		map = new Map(grid);
	}

	init();
	return {
		map
	}
});