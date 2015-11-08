app.factory('MapFactory', (ConfigurationFactory, ShipFactory, SpriteEventFactory) => {
	let map;
	let grid = [
					[0,0,0,0,0], 
					[0,0,0,0,0], 
					[0,0,0,0,0], 
					[0,0,0,0,0], 
					[0,0,0,0,0], 
				   ]
	class GridNode{
		constructor(x,y,opts){
			this.x = x; 
			this.y = y;
			this.coords = {x: x * ConfigurationFactory.cellSize, y: y * ConfigurationFactory.cellSize};
			this.containsShip = false;
			this.img = new PIXI.Sprite(PIXI.Texture.fromImage("/images/background/tile.png"));
			this.img.interactive = true;
			this.img.click = ShipFactory.canPlaceShip.bind(this);
			this.img.mouseover = SpriteEventFactory.mouseOverGridNode.bind(this);
			this.img.mouseout = SpriteEventFactory.mouseOutGridNode.bind(this);
			this.img.position.x = this.coords.x;
	        this.img.position.y = this.coords.y;
	        this.img.texture.width = ConfigurationFactory.cellSize; 
			this.img.width = ConfigurationFactory.cellSize;
			this.img.height = ConfigurationFactory.cellSize;
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
		map = new Map(grid)
	}
	init();
	return {
		map,
	}
});