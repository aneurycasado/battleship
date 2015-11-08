app.factory('MapFactory', (ConfigurationFactory, ShipFactory, SpriteEventFactory) => {
	let yourMap;
	let opponentMap;
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
			this.initialPosition = opts.initialPosition
			this.coords = {x: x * ConfigurationFactory.mapSettings.cellSize, y: y * ConfigurationFactory.mapSettings.cellSize};
			
			this.img = new PIXI.Sprite(PIXI.Texture.fromImage("/images/background/tile.jpeg"));
			this.img.interactive = true;
			if(opts.initialPosition === 0){
				this.containsShip = false;
				this.img.click = SpriteEventFactory.clickOnGridNodeShip.bind(this);
			}else{
				this.containsGuess = false;
				this.img.click = SpriteEventFactory.clickOnGridNodeGuess.bind(this)
			}
			this.img.mouseover = SpriteEventFactory.mouseOverGridNode.bind(this);
			this.img.mouseout = SpriteEventFactory.mouseOutGridNode.bind(this);
			this.img.position.x = this.coords.x;
	        this.img.position.y = this.coords.y;
	        this.img.texture.width = ConfigurationFactory.mapSettings.cellSize; 
			this.img.width = ConfigurationFactory.mapSettings.cellSize;
			this.img.height = ConfigurationFactory.mapSettings.cellSize;
		}
	}

	const insertNodes = (grid, map, opts) => {
		let newGrid = grid.slice();
		newGrid.forEach((row) => {
			row = row.slice();
		})
		for(let row = 0; row < newGrid.length; row++){
			for(let col = 0; col < newGrid[row].length; col++){
				newGrid[row][col] = new GridNode(col,row, opts)
				map.container.addChild(newGrid[row][col].img)
			}
		}
		return newGrid;
	}

	class Map{
		constructor(grid, opts){
			this.container = new PIXI.Container();
			this.grid = insertNodes(grid,this, opts)
		}
	}

	const init = () => {
		yourMap = new Map(grid, {initialPosition: 0});
		let displacement = ConfigurationFactory.mapSettings.width + ConfigurationFactory.mapSettings.cellSize;
		opponentMap = new Map(grid, {initialPosition: displacement});
		opponentMap.container.x = ConfigurationFactory.mapSettings.width + ConfigurationFactory.mapSettings.cellSize;
	}

	init();
	return {
		yourMap,
		opponentMap,
	}
});