//This directive provides the html for the player's information
//The information is 
//The number of ships the player has hit and 
//The number of ships the player has left

app.directive("playerInformation", () => {
	return {
		restrict: "E",
		templateUrl: "js/common/directives/playerInformation/playerInformation.html"
	}
});