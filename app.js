var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var maxTimeForGame =100;// get from user - max time for thr game
const numOfFoffInBoard=50; //get from user
var right;
var color5point;
var color10point;
var color15point;
var numofGoast;

$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});

var face=new Object(); // fce of pacman move with direction
face.y=1.85;
face.x=0.15;



function Start() { // setup -first drow 
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = numOfFoffInBoard; //num of points of food 
	var pacman_remain = 1; 
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 0 && j == 0) || (i == 9 && j == 0) || (i == 8 && j == 9) ||(i == 3 && j == 3) ||(i == 3 && j == 7) ||
				(i == 0 && j == 1) || (i == 9 && j == 1) || (i == 9 && j == 8) ||(i == 6 && j == 5) ||(i == 3 && j == 6) ||
				(i == 1 && j == 0) || (i == 8 && j == 0) || (i == 3 && j == 2) ||(i == 6 && j == 6) ||(i == 2 && j == 6) ||
				(i == 0 && j == 9) || (i == 1 && j == 9) || (i == 2 && j == 2) ||(i == 7 && j == 5) ||(i == 6 && j == 2) ||
				(i == 0 && j == 8) || (i == 9 && j == 9) || (i == 2 && j == 3) ||(i == 7 && j == 6) ||(i == 7 && j == 2)
			) {
				board[i][j] = 4; // obstical wall
			} else { 
				var randomNum = Math.random(); 
				if (randomNum <= (1.0 * food_remain) / cnt) { // if buger then x- we will drow food
					food_remain--;
					var randomNum2 = Math.random(); 
					if(randomNum2>=0 && randomNum2<0.6){ //  60% of food of 5 points
						board[i][j] = 11;
					}
					else if(randomNum2>=0.6 && randomNum2<0.9){ //  30% of food of 15 points
						board[i][j] = 12;
					}
					else{
						board[i][j] = 13; // 10% of food of 25 points
					}
					
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;// pacman - difult #
				} else {
					board[i][j] = 0; // empty
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1; //food
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	   
	
	interval = setInterval(UpdatePosition, 250); // get from user
}


function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) { // up ---------> put key the user chose
		return 1;
	}
	if (keysDown[40]) { // down ---------> put key the user chose
		return 2;
	}
	if (keysDown[37]) { // left ---------> put key the user chose
		return 3;
	}
	if (keysDown[39]) { // right ---------> put key the user chose
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j]==2) { //if is  #
				context.beginPath();
				context.arc(center.x, center.y, 30, (Math.PI*face.x), (Math.PI*face.y)); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 11, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			// }else if (board[i][j] == 21) { //pacmanUp
			// 	context.beginPath();
			// 	context.arc(center.x, center.y, 30, - 0.7,  -0.6*Math.PI); // half circle
			// 	context.lineTo(center.x, center.y);
			// 	context.fillStyle = pac_color; //color
			// 	context.fill();
			// 	context.beginPath();
			// 	context.arc(center.x-15, center.y - 15, 5, 0, 2 * Math.PI); // circle
			// 	context.fillStyle = "black"; //color
			// 	context.fill();
			} else if (board[i][j] == 11) { //if is food of 5 points
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) { // if is wall 
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			} else if (board[i][j] == 12) { //if is red food - food of 15 points
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "red"; //color
				context.fill();
			} else if (board[i][j] == 13) { //if is food of 25 points - blue
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "blue"; //color
				context.fill();
			}
		}
	}
}


function UpdatePosition() { 
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed(); // last move of user
	var faceDirection=24;
	if (x == 1) { // up 
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			//faceDirection=21;//'pacmanUp';
			face.y=3.35;
			face.x=1.6; 
			shape.j--;
		}
	}
	if (x == 2) { // down
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			//faceDirection=22;//'pacmanDown';
			face.y=2.3;
			face.x=0.7; 
			shape.j++;
		}
	}
	if (x == 3) { //left
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			//faceDirection=23;//'pacmanLeft';
			face.y=2.9;
			face.x=1.1; 
			shape.i--;
		}
	}
	if (x == 4) {//right
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			//faceDirection=24;//'pacmanRight';
			face.y=1.85;
			face.x=0.15; 
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 11) { // chek the type of food! update score
		score++;
	}
	if(board[shape.i][shape.j] == 12){
		score=score+15;
	}
	if(board[shape.i][shape.j] == 13){
		score=score+25;
	}

	board[shape.i][shape.j] = 2;  //!! #
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) { //???
		pac_color = "green";
	}
	if (score == 50) { // end game 
		window.clearInterval(interval);
		window.alert("Game completed");
	}else if(time_elapsed>=maxTimeForGame){
		window.clearInterval(interval);
		window.alert("Time  pass - Game finish :( ");
	} else {
		Draw();
	}
}
