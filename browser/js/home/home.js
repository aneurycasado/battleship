app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: "HomeController"
    });
});

app.controller("HomeController", ($scope, GameFactory, MapFactory, ConfigurationFactory) => {
	let renderer = PIXI.autoDetectRenderer(ConfigurationFactory.width, ConfigurationFactory.height, {backgroundColor : 0x1099bb})
	$("#mainContainer").append(renderer.view);
	let mainContainer = new PIXI.Container();
	mainContainer.addChild(MapFactory.map.container);
	animate();
	function animate() {
    	requestAnimationFrame(animate);
    	// render the root container
    	renderer.render(mainContainer);
	}
})