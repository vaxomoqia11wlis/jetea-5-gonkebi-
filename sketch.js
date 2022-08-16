var carImage
var car 

var enemyImage
var enemy 

var enemys = []
var score = 0 

intervalId = setInterval(()=> {
	score++
},100)

var fuchu = true  
var ky = true 

var interval
var gameover = false 

function preload() {
	carImage = loadImage("images/car.png")
	enemyImage = loadImage("images/otherCar.png")
}

function setup() {
	createCanvas(400,600)
	car = new Car()
	for(var i = 0; i < enemys.length; i++){
		enemys[i] = new Enemy()
	}
}


interval = setInterval(()=> {
	enemys.push(new Enemy())
},1000)


function draw() {
	background(51)

	stroke("yellow")
	strokeWeight(5)
	line(200,0,200,600)


	stroke("white")
	line(20,0,20,600)

	stroke("white")
	line(380,0,380,600)

	car.show()


	for(var i = 0; i < enemys.length; i++){
		enemys[i].show()
		enemys[i].move()
	}
	car.detect()

	stroke(0)
	fill(255)
	textSize(20)
	text(score,30,25)

	if (gameover) {
		textSize(30)
		fill(255)
		stroke(0)
		text("Click to Restart", 100,30)
	};

}

function keyPressed() {
	car.move()
}

function mousePressed() {
	if (gameover) {
		location.reload()
	};
}

function Car() {
	this.x = 15
	this.y = 380		
	this.w = 200
	this.h = 200

	this.show = function () {
		image(carImage,this.x,this.y,this.w,this.h)
	}

	this.move = function () {
		if (ky) {
			if (keyCode == RIGHT_ARROW) {
				this.x = 185  	
			};
			if (keyCode == LEFT_ARROW) {
				this.x = 15
			};
		};
	}
	this.detect = function () {
		for(var i = 0; i < enemys.length; i++){
			if ((this.x == 15 && enemys[i].x == 0) || (this.x == 185 && enemys[i].x == 200)) {
				if (this.y <= enemys[i].y + enemys[i].h && this.y > enemys[i].y) {
					gameover = true  
					fuchu = false 
					clearInterval(interval)
					clearInterval(intervalId)
					ky = false 

				};
			};
		}
	}
}

function Enemy() {
	var xs = [0,200]

	var randomX = Math.floor(Math.random() * xs.length)

	this.y = -50
	this.x = xs[randomX]
	this.w = 200
	this.h = 200

	this.yspeed = 10

	this.show = function () {
		image(enemyImage,this.x,this.y,this.w,this.h)
	}
	this.move = function () {
		if (fuchu) {
			this.y += this.yspeed 
		};
	}
}