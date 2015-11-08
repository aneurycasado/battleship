app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: "HomeController"
    });
});

app.controller("HomeController", ($scope, GameFactory, PlayerFactory, MapFactory, ConfigurationFactory, ShipFactory, GuessFactory) => {
	let renderer = PIXI.autoDetectRenderer(ConfigurationFactory.width, ConfigurationFactory.height, {})
	$("#mainContainer").append(renderer.view);
	let mainContainer = new PIXI.Container();
	mainContainer.addChild(MapFactory.yourMap.container);
	mainContainer.addChild(MapFactory.opponentMap.container);
	mainContainer.addChild(ShipFactory.container);
	mainContainer.addChild(GuessFactory.container);
	animate();
	function animate() {
    	requestAnimationFrame(animate);
    	// render the root container
    	renderer.render(mainContainer);
	}
})