#Aneury Casado's Battleship App

##Gist
This node.js application implements a battleship game. The web interface leverages Angular.js for the front-end logic, PIXI.js for rendering and MongoDB for the API server. 

##Key Technologies
Node, Express, Angular, MongoDB, PIXI, gulp 

##How to use
First and foremost, you need node and npm installed on your computer. I was using node 12.7 and npm 2.11.3.  

Here is a great walkthrough
https://docs.npmjs.com/getting-started/installing-node

Once both are installed run npm install. This might take a minute.

After npm install has finished, run npm start to boot up the server. 

Once the server is started, you can navigate to either http://127.0.0.1:1337/ or http://localhost:1337/ in your web browser to begin using the application. 

If you experience any trouble, don't hesitate to contact me at aneury.casado@gmail.com 

##Code Review 
For the code review, I suggest going in this order

start in the server folder 
	-start.js
	-main.js
	app folder 
		-index.js
		configure folder 
			-index.js
		routers folder
			-index.js
			games folder
			This is where all the api routes are for the game
				-index.js
		views folder 
			-index.html
continue to the browser folder
	js folder
		-app.js 
		home folder
			-home.html
			-home.js
		common folder
			directives folder
				-all files
			factories folder
				-all files

I want to thank you for taking time out of your day to review my code and I hope my solution is adequate.

Thanks,
Aneury Casado