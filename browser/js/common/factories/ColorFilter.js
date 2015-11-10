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