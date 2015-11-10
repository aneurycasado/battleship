//This directive provides the html for the currentState of the game
//The different states are 
//Place Ships
//Your Move
//Opponents Move
//Player Won
//Opponent Won

app.directive("currentState", () => {
	return {
		restrict: "E",
		templateUrl: "js/common/directives/currentState/currentState.html"
	}
});