var guy = [];
var count = 10;
var squish = 0;
let timer = 10;
var dead = [];

function preload(){
	for( var i = 0; i < count; i++){
		guy[i] = new Walker("spiderSprite.png", random(30,640), random(30,480), random(3,9), random([-1,1]));
		dead = loadImage("squished.png");
	}
}

function setup() {
  createCanvas(640,480);
  imageMode(CENTER);
}

function mousePressed(){
	for( var i = 0; i < count; i++){
		guy[i].squish(mouseX, mouseY);
	}
}

function mouseReleased(){
	for( var i = 0; i < count; i++){
		guy[i].drop();
	}
}
function draw() {
	background(220);

	for( var i = 0; i < count; i++){
		guy[i].draw();
		if(squish === 10){
			guy[i].draw;
		}
	}

	textSize(25);	
	text("Squished: " + squish, 20, 30);
	text("Time left: " + timer, 250, 30);
	if((frameCount % 60 == 0) && (timer > 0)){
		timer--;
	}
	if (timer === 0){
		fill('red');
		rect(230, 220, 160, 90);
		fill("Black");
		text("Game Over!", 250, 250);
		text("Score:" + squish, 250, 300);
		guy[i].moving = 0;
	}
}

function Walker(imageName, x, y, speed, moving){
	this.spriteSheet = loadImage(imageName);
	this.frame = 0;
	this.x = x;
	this.y = y;
	this.moving = moving;
	this.facing = moving;
	this.speed = speed;

	this.draw = function(){
		
		push();
		translate(this.x,this.y);
		if(this.facing<0){
			scale(-1.0,1.0);
		}

		if(this.moving ==0){
			image(this.spriteSheet, 0, 0, 80, 80, 0, 0, 80, 80);
		}
		else{
			if(this.frame ==0){
				image(this.spriteSheet, 0, 0, 80, 80, 80, 0, 80, 80);
			}
			if(this.frame ==1){
				image(this.spriteSheet, 0, 0, 80, 80, 160, 0, 80, 80);
			}
			if(this.frame ==2){
				image(this.spriteSheet, 0, 0, 80, 80, 240, 0, 80, 80);
			}
			if(this.frame ==3){
				image(this.spriteSheet, 0, 0, 80, 80, 320, 0, 80, 80);
			}
			if(this.frame ==4){
				image(this.spriteSheet, 0, 0, 80, 80, 400, 0, 80, 80);
			}
			if(this.frame ==5){
				image(this.spriteSheet, 0, 0, 80, 80, 480, 0, 80, 80);
			}
			if(this.frame ==6){
				image(this.spriteSheet, 0, 0, 80, 80, 560, 0, 80, 80);
			}
			if(this.frame ==7){
				image(this.spriteSheet, 0, 0, 80, 80, 640, 0, 80, 80);
			}

			if(frameCount %6 ==0){
				this.frame = (this.frame+1)%8;
				this.x = this.x + this.moving * this.speed;
				
				//change character direction
				if(this.x<30){
					this.moving = 1;
					this.facing = 1;
				}
				if(this.x > width - 30){
					this.moving = -1;
					this.facing = -1;
				}

				if(squish > 3){
					this.x = this.x + this.moving * (this.speed + 3);
				}
			}

			
 		}
	
		pop();

		this.go = function(direction){
			this.moving = direction;
			this.facing = direction;
		}

		this.stop = function(){
			this.moving = 0;
			this.frame = 3;
		}

		this.grab = function(x, y){
			if(this.x-40 < x && x<this.x+40 && this.y-40 < y && y < this.y+40){
				this.stop();
				this.mouseX = x;
				this.mouseY = y;
				this.initialX = this.x;
				this.initialY = this.y;
			}
		}

		this.drag = function(x,y){
			if(this.moving == 0){
				this.x = (x-this.mouseX) + this.initialX;
				this.y = (y-this.mouseY) + this.initialY;
			}
		}

		this.drop = function(){
			this.go(this.facing);
		}

		this.squish = function(x,y){
			if((this.x-40<x && x < this.x+40 && this.y-40<y && y<this.y+40) && (this.spriteSheet !== dead)) {
			  this.moving = 0;
			  this.spriteSheet=dead;
			  squish = squish + 1;
			  this.update = function() {}
			}
		  }
	}
}