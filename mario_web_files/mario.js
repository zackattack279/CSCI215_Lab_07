// JavaScript for creating interactive animations on a canvas 
////////////////////////////////////////////////////////////////////
// Create a Mario object which contains all the info about Mario
// Objects are nice because they allow up to keep all the relevent 
// info about an item in one place.

var Mario;
////////////////////////////////////////////////////////////////////


window.onload = init; // calls the function named "init"
// declare the background image
var bgImage = new Image();

// Is called when the window loads;
function init() {
	
	// Initialize Mario Object
	Mario = {
		x: 100,
		y: 280,
		w: 50,
		h: 80,
		JumpSound: new Audio('jump.wav'),
		Image: (function() {	var temp = new Image();
								temp.src = "mario1.png"; 
								return temp;})(),
		moving: "no",
		timer: "",
		timerInterval: 10
	};

	bgImage.src = "bg.jpg";
	//Mario.theImage.src = "marioturnsright.png";
	draw();
}

////////////////////////////////////////////////////////////////////

function draw() {

	// Get Drawing Area
	var ctx = document.getElementById("mario").getContext("2d");
	
	// If you want to display images on the canvas when it is initially
	// loaded, you must do it this way
	bgImage.onload = function(){
		ctx.drawImage(bgImage, 0, 0); 
	}	
	Mario.Image.onload = function(){
		ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h); 
	}
		

	/////////////////////////////////////////////////////////////////
	var render = function () {
		ctx.drawImage(bgImage, 0, 0); 
		renderMario();
	}

	/////////////////////////////////////////////////////////////////
	// Separate the code that draws Mario into a separate function. This
	// Will make it easier to scale up this program to something more
	// complicated
	
	function renderMario(){
		if (Mario.y > 200 && Mario.moving == "up") {
			Mario.Image.src = "mario2.png";
			ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
			// Change the y value each time 
			Mario.y -= 5; // move 5 px up
		}else if(Mario.y <= 200 && Mario.moving == "up"){
			Mario.moving = "down";
		} else if(Mario.y < 280 && Mario.moving == "down"){
			Mario.Image.src = "mario2.png";
			ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
			Mario.y += 5; // move 5 px back down after a jump
		}else if(Mario.y == 280 && Mario.moving == "no"){
			Mario.moving = "up";
			Mario.JumpSound.play();
		}else{
			Mario.moving = "no";
			Mario.Image.src = "mario1.png";
			ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
			clearInterval(Mario.timer); // kills the timer
		}	
	}
	///////////////////////////////////////////////////////////////////
	// Monitor key strokes for user input:
	//
	// If Enter/Return is pressed, then call the render function
	// which paints the new scene to the canvas. 
	//
	
	document.body.onkeydown = function(e) {  // listen for a key

    	e = event || window.event;             // any kind of event
    	var keycode = e.charCode || e.keyCode; // any kind of key
		
		// The user wants Mario to jump:
    	if(keycode === 13 && Mario.moving == "no") {  
        	Mario.timer = setInterval(render, Mario.timerInterval); 
    	}
	}
	
} // close draw() 
