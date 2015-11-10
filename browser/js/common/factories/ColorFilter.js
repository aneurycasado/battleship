//This factory provides the SpriteEvent factory with the green and red color 
//for when a user hovers over a grid node
app.factory("ColorFilter", ()=> {
	const greenFilter = [
                			0,0,0,0,
                			0,2,0,0,
                			0,0,0,0,
                			0,0,0,0
        				];
    const redFilter = 	[
                			2,0,0,0,
                			0,0,0,0,
                			0,0,0,0,
                			0,0,0,0
        				];
    return {
    	greenFilter,
    	redFilter,
    }
})