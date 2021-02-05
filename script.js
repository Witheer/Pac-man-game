// Authors
//P1:Armando 
//P2:Carlos Martinez 
//P3: Jacob



let walls = [];
let ghosts = [];
let player;

let coins = [];
let score;
let gameIsOver;
let coinsCollected;
let chasePlayer;
let gameOverPlayed;

let chompSound, gameOverSound, victorySound, hitSound, oneUpSound;

let lives;

let powerUps;

function preload() {
	chompSound = loadSound("chomp.mp3");
	gameOverSound = loadSound("GameOver.wav");
	victorySound = loadSound("Victory.wav");
	hitSound = loadSound("hit.wav");
	oneUpSound = loadSound("oneUp.wav");
}

function setup() {
	// Canvas & color settings
	createCanvas(420, 560)
	colorMode(HSB)
	noStroke();
	frameRate(60);

	createMaze();

	ghosts[0] = new ghost(20, 20, 0);
	ghosts[1] = new ghost(380, 20, 320);
	ghosts[2] = new ghost(40, 460, 180);
	ghosts[3] = new ghost(380, 460, 35);
	player = new playerClass(200, 320);
	score = 0;
	gameIsOver = false;
	gameOverPlayed = false;
	chasePlayer = false;

	generateCoins();
	coinsCollected = 0;
	score -= 10;
	


	lives = new live();
	powerUps = new powerUp();
	gameTime = 1;

}

function draw() {
	background(5);


 

	for (var i = 0; i < coins.length; i++) {
		coins[i].draw();
	}

	drawUI();

	//draw maze
	for (var i = 0; i < walls.length; i++) {
		walls[i].draw();
	}


	lives.draw();

	powerUps.draw();

	for (var i = 0; i < ghosts.length; i++) {
		ghosts[i].move();
		ghosts[i].draw();
	}

	player.draw();
	player.move();

	resetGame();
	ghostUpdate();

}

function generateCoins() {

	var finishGenerating = false;
	var hitWall = [];
	var coinX = 0;
	var coinY = 0;

	while (!finishGenerating) {

		for (var i = 0; i < walls.length; i++) {
			hitWall[i] = collideRectCircle(walls[i].x, walls[i].y, walls[i].w, walls[i].h, coinX + 10, coinY + 10, 5);
		}

		if (hitWall.includes(true)) {
			if (coinX < 400) {
				coinX += 20;
			} else if (coinY < 480) {
				coinY += 20;
				coinX = 0;

			} else {
				finishGenerating = true;
			}
		} else {
			coins[coins.length] = new coin(coinX, coinY);
			if (coinX < 400) {
				coinX += 20;
			} else if (coinY < 480) {
				coinY += 20;
				coinX = 0;

			} else {
				finishGenerating = true;
			}
		}

	}

}

function createMaze() {
		let newMaze = random([1,2,3]);

		if (newMaze == 1) {
			//left wall
			walls[walls.length] = new wall(0, 0, 20, 240);
			walls[walls.length] = new wall(0, 260, 20, 240);
			//right wall
			walls[walls.length] = new wall(400, 0, 20, 240);
			walls[walls.length] = new wall(400, 260, 20, 240);
			//middle walls
			walls[walls.length] = new wall(-40, 220, 140, 20);
			walls[walls.length] = new wall(-40, 260, 140, 20);
			walls[walls.length] = new wall(320, 220, 140, 20);
			walls[walls.length] = new wall(320, 260, 140, 20);

			walls[walls.length] = new wall(120, 200, 60, 20);
			walls[walls.length] = new wall(240, 200, 60, 20);
			walls[walls.length] = new wall(240, 180, 20, 20);
			walls[walls.length] = new wall(240, 280, 60, 20);
			walls[walls.length] = new wall(240, 300, 20, 20);
			walls[walls.length] = new wall(120, 280, 60, 20);
			walls[walls.length] = new wall(200, 180, 20, 140);
			walls[walls.length] = new wall(120, 240, 180, 20);
			walls[walls.length] = new wall(160, 180, 20, 20);
			walls[walls.length] = new wall(160, 300, 20, 20);
			//top walls
			walls[walls.length] = new wall(0, 0, 420, 20);
			walls[walls.length] = new wall(160, 40, 40, 60);
			walls[walls.length] = new wall(220, 40, 40, 60);
			walls[walls.length] = new wall(160, 120, 100, 40);
			//bottom walls
			walls[walls.length] = new wall(0, 480, 420, 20);
			walls[walls.length] = new wall(160, 400, 40, 60);
			walls[walls.length] = new wall(220, 400, 40, 60);
			walls[walls.length] = new wall(160, 340, 100, 40);
			//corners
			walls[walls.length] = new wall(40, 40, 100, 20);
			walls[walls.length] = new wall(280, 40, 100, 20);
			walls[walls.length] = new wall(40, 440, 100, 20);
			walls[walls.length] = new wall(280, 440, 100, 20);
			//sides
			walls[walls.length] = new wall(40, 300, 60, 120);
			walls[walls.length] = new wall(40, 80, 60, 120);
			walls[walls.length] = new wall(320, 300, 60, 120);
			walls[walls.length] = new wall(320, 80, 60, 120);

			walls[walls.length] = new wall(120, 320, 20, 100);
			walls[walls.length] = new wall(280, 320, 20, 100);
			walls[walls.length] = new wall(120, 80, 20, 100);
			walls[walls.length] = new wall(280, 80, 20, 100);
		} else if (newMaze == 2) {

			//top walls
			walls[walls.length] = new wall(0, 0, 420, 20);

			walls[walls.length] = new wall(140,40, 60, 40);
			walls[walls.length] = new wall(220,40, 60, 40);

			walls[walls.length] = new wall(100,100, 60, 40);
			walls[walls.length] = new wall(180,100, 60, 40);
			walls[walls.length] = new wall(260,100, 60, 40);
			
			//bottom walls
			walls[walls.length] = new wall(0, 480, 420, 20);

			walls[walls.length] = new wall(140,420, 60, 40);
			walls[walls.length] = new wall(220,420, 60, 40);

			walls[walls.length] = new wall(100,360, 60, 40);
			walls[walls.length] = new wall(180,360, 60, 40);
			walls[walls.length] = new wall(260,360, 60, 40);

			//left walls
			walls[walls.length] = new wall(0, 0, 20, 160);
			walls[walls.length] = new wall(-40, 140, 120, 20);

			walls[walls.length] = new wall(0, 180, 20, 140);
			walls[walls.length] = new wall(-40, 180, 120, 20);
			walls[walls.length] = new wall(-40, 300, 120, 20);

			walls[walls.length] = new wall(0, 340, 20, 160);
			walls[walls.length] = new wall(-40, 340, 120, 20);

			walls[walls.length] = new wall(40, 40, 80, 40);
			walls[walls.length] = new wall(40, 40, 40, 80);

			walls[walls.length] = new wall(40, 420, 80, 40);
			walls[walls.length] = new wall(40, 380, 40, 80);

			walls[walls.length] = new wall(40, 220, 40, 60);

			//right walls
			walls[walls.length] = new wall(400, 0, 20, 160);
			walls[walls.length] = new wall(340, 140, 120, 20);

			walls[walls.length] = new wall(400, 180, 20, 140);
			walls[walls.length] = new wall(340, 180, 120, 20);
			walls[walls.length] = new wall(340, 300, 120, 20);

			walls[walls.length] = new wall(400, 340, 20, 160);
			walls[walls.length] = new wall(340, 340, 120, 20);

			walls[walls.length] = new wall(300, 40, 80, 40);
			walls[walls.length] = new wall(340, 40, 40, 80);

			walls[walls.length] = new wall(300, 420, 80, 40);
			walls[walls.length] = new wall(340, 380, 40, 80);

			walls[walls.length] = new wall(340, 220, 40, 60);

			//middle walls
			walls[walls.length] = new wall(100, 160, 100, 20);
			walls[walls.length] = new wall(220, 160, 100, 20);

			walls[walls.length] = new wall(100, 320, 100, 20);
			walls[walls.length] = new wall(220, 320, 100, 20);

			walls[walls.length] = new wall(100, 200, 100, 40);
			walls[walls.length] = new wall(220, 200, 100, 40);
			walls[walls.length] = new wall(100, 260, 100, 40);
			walls[walls.length] = new wall(220, 260, 100, 40);
		} else if (newMaze == 3) {
			//top walls
			walls[walls.length] = new wall(0, 0, 420, 20);

			walls[walls.length] = new wall(40, 40, 20, 120);
			walls[walls.length] = new wall(40, 40, 80, 20);

			walls[walls.length] = new wall(200, 40, 20, 120);
			walls[walls.length] = new wall(140, 40, 140, 20);

			walls[walls.length] = new wall(360, 40, 20, 120);
			walls[walls.length] = new wall(300, 40, 80, 20);

			walls[walls.length] = new wall(80, 80, 40, 80);
			walls[walls.length] = new wall(140, 80, 40, 80);
			walls[walls.length] = new wall(240, 80, 40, 80);
			walls[walls.length] = new wall(300, 80, 40, 80);
			
			//bottom walls
			walls[walls.length] = new wall(0, 480, 420, 20);

			walls[walls.length] = new wall(40, 340, 20, 120);
			walls[walls.length] = new wall(40, 440, 80, 20);

			walls[walls.length] = new wall(200, 340, 20, 120);
			walls[walls.length] = new wall(140, 440, 140, 20);

			walls[walls.length] = new wall(360, 340, 20, 120);
			walls[walls.length] = new wall(300, 440, 80, 20);

			
			walls[walls.length] = new wall(80, 340, 40, 80);
			walls[walls.length] = new wall(140, 340, 40, 80);
			walls[walls.length] = new wall(240, 340, 40, 80);
			walls[walls.length] = new wall(300, 340, 40, 80);

			//left walls
			walls[walls.length] = new wall(0, 20, 20, 160);
			walls[walls.length] = new wall(-40, 180, 140, 60);


			walls[walls.length] = new wall(0, 320, 20, 160);
			walls[walls.length] = new wall(-40, 260, 140, 60);

			//right walls
			walls[walls.length] = new wall(400, 20, 20, 160);
			walls[walls.length] = new wall(320, 180, 140, 60);

			walls[walls.length] = new wall(400, 320, 20, 160);
			walls[walls.length] = new wall(320, 260, 140, 60);

			//middle walls
			walls[walls.length] = new wall(120, 180, 60, 60);
			walls[walls.length] = new wall(120, 260, 60, 60);
			walls[walls.length] = new wall(240, 180, 60, 60);
			walls[walls.length] = new wall(240, 260, 60, 60);

			walls[walls.length] = new wall(200, 180, 20, 140);

		}
	

} 

class wall {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	draw() {
		fill(250, 80, 100);
		rect(this.x, this.y, this.w, this.h);
		fill(5);
		rect(this.x + 10, this.y + 10, this.w - 20, this.h - 20);
	}

}

class ghost {
	constructor(x, y, c) {
		this.originalX = x;
		this.originalY = y;
		this.x = x;
		this.y = y;
		this.dTop;
		this.dDown;
		this.dLeft;
		this.dRight;
		this.hitTop = [];
		this.hitDown = [];
		this.hitRight = [];
		this.hitLeft = [];
		this.smallestDirection;
		this.destinationX = x;
		this.destinationY = y;
		this.color = c;
		this.gameTime=1;
		this.slowDownTime=0;
	}

	draw() {
		fill(this.color, 80, 100);
		rect(this.x, this.y, 20, 20);

		this.slowDown();
	}

	//the point the ghost is trying to reach
	destination(x, y) {
		this.destinationX = x;
		this.destinationY = y;
	}

	reset() {
		this.x = this.originalX;
		this.y = this.originalY;
	}

	move() {
		//makes sure that the ghost only changes direction when inside a tile
		if (this.x % 20 == 0 && this.y % 20 == 0) {
			this.pathFinder();
		}


		if (this.x < -20) {
			this.x = 420
		} else if (this.x > 420) {
			this.x = -20;
		}

		//moves ghost towards the closest direction to the player
		if (this.smallestDirection == "Down") {
			this.y += 2 * this.gameTime;
		} else if (this.smallestDirection == "Top") {
			this.y -= 2 * this.gameTime;
		} else if (this.smallestDirection == "Right") {
			this.x += 2 * this.gameTime;
		} else if (this.smallestDirection == "Left") {
			this.x -= 2 * this.gameTime;
		}

	}

	pathFinder() {
		// checks to see if the ghost hits any of ther walls and where is it hitting it at
		this.collideWall();

		//calculates the distance between the ghost and the player and find the direction closests to the player and prevents the ghost from going backwards
		if (!this.hitDown.includes(true) && this.smallestDirection !== "Top") {
			this.dDown = calculateDistance(this.x, this.destinationX, this.y + 20, this.destinationY);
		} else {
			this.dDown = 100000;
		}
		if (!this.hitRight.includes(true) && this.smallestDirection !== "Left") {
			this.dRight = calculateDistance(this.x + 20, this.destinationX, this.y, this.destinationY);
		} else {
			this.dRight = 100000;
		}
		if (!this.hitTop.includes(true) && this.smallestDirection !== "Down") {
			this.dTop = calculateDistance(this.x, this.destinationX, this.y - 20, this.destinationY);
		} else {
			this.dTop = 100000;
		}
		if (!this.hitLeft.includes(true) && this.smallestDirection !== "Right") {
			this.dLeft = calculateDistance(this.x - 20, this.destinationX, this.y, this.destinationY);
		} else {
			this.dLeft = 100000;
		}

		// compares and find the direction that is closest to the player
		if (this.dDown <= this.dRight && this.dDown <= this.dTop && this.dDown <= this.dLeft) {
			this.smallestDirection = "Down";
		} else if (this.dRight <= this.dDown && this.dRight <= this.dTop && this.dRight <= this.dLeft) {
			this.smallestDirection = "Right";
		} else if (this.dTop <= this.dDown && this.dTop <= this.dRight && this.dTop <= this.dLeft) {
			this.smallestDirection = "Top";
		} else if (this.dLeft <= this.dDown && this.dLeft <= this.dRight && this.dLeft <= this.dTop) {
			this.smallestDirection = "Left";
		}

	}

	collideWall() {

		// checks to see if the ghost hits any of ther walls and where is it hitting it at
		for (var i = 0; i < walls.length; i++) {

			this.hitTop[i] = collidePointRect(this.x + 10, this.y - 10, walls[i].x, walls[i].y, walls[i].w, walls[i].h);
			this.hitDown[i] = collidePointRect(this.x + 10, this.y + 20, walls[i].x, walls[i].y, walls[i].w, walls[i].h);
			this.hitRight[i] = collidePointRect(this.x + 20, this.y + 10, walls[i].x, walls[i].y, walls[i].w, walls[i].h);
			this.hitLeft[i] = collidePointRect(this.x - 10, this.y + 10, walls[i].x, walls[i].y, walls[i].w, walls[i].h);

		}

	}

		slowDown() {
		if (frameCount >= this.slowDownTime && this.x%20 == 0 && this.y%20 ==0) {
			this.gameTime = 1;
		}
	}

}

class playerClass {
	constructor(x, y) {
		this.originalX = x;
		this.originalY = y;
		this.x = x;
		this.y = y;
		this.lastKey;
		this.currentDirection;
		this.speed = 2;
		this.hitTop = [];
		this.hitDown = [];
		this.hitRight = [];
		this.hitLeft = [];
		this.lives = 3;
	}

	draw() {
		if (!gameIsOver) {
			fill(55, 80, 100);
			rect(this.x, this.y, 20, 20);
		}

	}

	move() {

		this.collideGhost();

		if (!gameIsOver) {
			this.collideWall()

			if (this.x < -20) {
				this.x = 420
			} else if (this.x > 420) {
				this.x = -20;
			}



			if (keyIsDown(DOWN_ARROW) && !this.hitDown.includes(true)) {
				this.lastKey = "Down";
			} else if (keyIsDown(UP_ARROW) && !this.hitTop.includes(true)) {
				this.lastKey = "Up";
			} else if (keyIsDown(RIGHT_ARROW) && !this.hitRight.includes(true)) {
				this.lastKey = "Right";
			} else if (keyIsDown(LEFT_ARROW) && !this.hitLeft.includes(true)) {
				this.lastKey = "Left";
			}


			if (this.currentDirection == "Down" && !this.hitDown.includes(true)) {
				this.y += this.speed;
					if (chasePlayer) {
					ghosts[1].destination(player.x, player.y + 80);
				} else {
					ghosts[1].destination(380, 20);
				}
			} else if (this.currentDirection == "Up" && !this.hitTop.includes(true)) {
				this.y -= this.speed;
					if (chasePlayer) {
					ghosts[1].destination(player.x, player.y - 80);
					} else {
					ghosts[1].destination(380, 20);
				}
			} else if (this.currentDirection == "Right" && !this.hitRight.includes(true)) {
				this.x += this.speed;
					if (chasePlayer) {
					ghosts[1].destination(player.x + 80, player.y);
				} else {
					ghosts[1].destination(380, 20);
				}
			} else if (this.currentDirection == "Left" && !this.hitLeft.includes(true)) {
				this.x -= this.speed;
					if (chasePlayer) {
					ghosts[1].destination(player.x - 80, player.y);
				} else {
					ghosts[1].destination(380, 20);
				}
			}

			//makes sure that the player only changes direction when inside a tile
			if (this.x % 20 == 0 && this.y % 20 == 0) {
				this.currentDirection = this.lastKey;
			}

		}
	}

	collideWall() {

		// checks to see if the player hits any of ther walls and where is it hitting it at
		for (var i = 0; i < walls.length; i++) {

			this.hitTop[i] = collidePointRect(this.x + 10, this.y, walls[i].x, walls[i].y, walls[i].w, walls[i].h);
			this.hitDown[i] = collidePointRect(this.x + 10, this.y + 20, walls[i].x, walls[i].y, walls[i].w, walls[i].h);
			this.hitRight[i] = collidePointRect(this.x + 20, this.y + 10, walls[i].x, walls[i].y, walls[i].w, walls[i].h);
			this.hitLeft[i] = collidePointRect(this.x, this.y + 10, walls[i].x, walls[i].y, walls[i].w, walls[i].h);

		}

	}

	collideGhost() {
		var hitGhost = [];
		for (var i = 0; i < ghosts.length; i++) {
			hitGhost[i] = collidePointRect(this.x + 10, this.y + 10, ghosts[i].x+5, ghosts[i].y+5, 10, 10);

		}

		if (hitGhost.includes(true)) {
			if (this.lives > 0) {
				for (var i = 0; i < ghosts.length; i++) {
					ghosts[i].reset();

				}
				hitSound.play();
				this.reset();
				this.lives--;
			} else {
				gameIsOver = true;
				if (!gameOverPlayed) {
					hitSound.play();
					gameOverSound.play();
					gameOverPlayed = true;
				}
			}

		}
	}

	reset() {
		this.x = this.originalX;
		this.y = this.originalY;
		chasePlayer = false;
	}

}

class coin {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.isColleded = false;
	}

	draw() {
		if (!this.isColleded) {
			ellipse(this.x + 10, this.y + 10, 5);
			this.collideWithPlayer();
		}

	}

	collideWithPlayer() {
		if (collideRectCircle(player.x, player.y, 20, 20, this.x + 10, this.y + 10, 5)) {
			score += 10;
			coinsCollected++;
			this.isColleded = true;
			chompSound.stop();
			chompSound.play();


		}
	}

}


class live {
	constructor() {

		this.x = 10000;
		this.y = 20;
		this.spawnCD = 600;
		this.hitWall = [];

	}

	collidePlayer() {

		if (collideRectRect(this.x + 5, this.y + 5, 10, 10, player.x, player.y, 20, 20)) {
			player.lives++;
			this.x = 10000;
			oneUpSound.play();
		}

	}

	draw() {
		fill(55, 80, 100);
		rect(this.x + 5, this.y + 5, 10, 10);

		this.collidePlayer();
		this.spawn();
	}

	spawn() {

		while (frameCount >= this.spawnCD && player.lives < 3) {
			this.x = Math.floor(random(0, 21)) * 20;
			this.y = Math.floor(random(0, 25)) * 20;

			for (var i = 0; i < walls.length; i++) {

				this.hitWall[i] = collidePointRect(this.x + 10, this.y + 10, walls[i].x, walls[i].y, walls[i].w, walls[i].h);
			}

			if (!this.hitWall.includes(true)) {
				this.spawnCD = frameCount + random(600,1800);
			}	
		}
	}
}

class powerUp {
	constructor() {

		this.x = 10000;
		this.y = 20;
		this.spawnCD = 600;
		this.hitWall = [];

	}

	collidePlayer() {
			//checks if power up collides with the player
		if (collideRectRect(this.x + 5, this.y + 5, 10, 10, player.x, player.y, 20, 20)) {
			this.x = 10000;
			oneUpSound.play();
			for (var i = 0; i < ghosts.length; i++) {
				ghosts[i].gameTime = 0.25;
				ghosts[i].slowDownTime = frameCount + 300;
			}
			
			
		}

	}

	draw() {
		fill(180, 80, 100);
		rect(this.x + 5, this.y + 5, 10, 10);

		this.collidePlayer();
		this.spawn();
	}

	spawn() {
		//spawns power up in a random tile that does not hit a wall
		while (frameCount >= this.spawnCD) {
			this.x = Math.floor(random(0, 21)) * 20;
			this.y = Math.floor(random(0, 25)) * 20;

			for (var i = 0; i < walls.length; i++) {

				this.hitWall[i] = collidePointRect(this.x + 10, this.y + 10, walls[i].x, walls[i].y, walls[i].w, walls[i].h);
			}

			if (!this.hitWall.includes(true)) {
				this.spawnCD = frameCount + random(1800,3000);
			}	
		}
	}

}


function calculateDistance(x2, x1, y2, y1) {
	//calculates the distance between two points
	var distance = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
	return distance;
}


function drawUI() {
	textSize(25);
	text("Score: " + score, 20, 530);
	text("Lives: " + player.lives, 300, 530)

}

function resetGame() {

	// checks if game is over and the player has pressed mouse to reset game
	if (gameIsOver && mouseIsPressed) {
		walls = [];
		createMaze();

		ghosts = [];
		ghosts[0] = new ghost(20, 20, 0);
		ghosts[1] = new ghost(380, 20, 320);
		ghosts[2] = new ghost(40, 460, 180);
		ghosts[3] = new ghost(380, 460, 35);
		player.reset();
		chasePlayer = false;
		player.lives = 3;
		coins = [];
		generateCoins();
		gameIsOver = false;
		score = 0;
		coinsCollected = 0;
		gameOverPlayed = false;
		lives = new live();
		powerUps = new powerUp();
		
	}

		// checks to see if all coins have been collected
	if (coinsCollected == coins.length) {
		walls = [];
		createMaze();
		ghosts = [];
		ghosts[0] = new ghost(20, 20, 0);
		ghosts[1] = new ghost(380, 20, 320);
		ghosts[2] = new ghost(40, 460, 180);
		ghosts[3] = new ghost(380, 460, 35);
		victorySound.play();
		chasePlayer = false;
		player.reset();
		coins = [];
		generateCoins();
		score+= 1000;
		coinsCollected = 0;
		lives = new live();
		powerUps = new powerUp();

	}

}


function ghostUpdate() {

  //cooldown for ghost to start following the player or going back to their corners 
	if (frameCount % 600 == 0) {
		if (chasePlayer) {
			chasePlayer = false;
		} else {
			chasePlayer = true;
		}
	}

	if (chasePlayer) {
		//update blue ghost
		if (frameCount % 360) {
			ghosts[2].destination(random(width), random(height - 60));
		}


		// update orange ghost
		var distanceFromPlayer = calculateDistance(ghosts[3].x, player.x, ghosts[3].y, player.y);
		if (distanceFromPlayer <= 120) {
			ghosts[3].destination(player.x, player.y);
		} else {
			ghosts[3].destination(400, 460);
		}

		//update red ghost
		ghosts[0].destination(player.x, player.y);
	} else {
		ghosts[0].destination(20, 20);
		ghosts[2].destination(40, 460);
		ghosts[3].destination(380, 460);
	}


}