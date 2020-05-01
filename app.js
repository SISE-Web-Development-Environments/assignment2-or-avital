var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var maxTimeForGame =100;// get from user - max time for thr game
var numOfFoffInBoard=50; //get from user
var rightKey=39;
var leftKey=37;
var upKey=38;
var downKey=40;
var numofGhost=1; // ? get real name -OR
var lastMoveCellG1;
var color5point="red";
var color10point="yellow";
var color15point="blue";
var startgame=false;
var temp;
var numOfLives=5;
var foodOnBoardUpdate;
var ghostArray = [];
var magicDrawerCount=0;


var gameBackroundSong= new Audio("songs/pac-man-intro.mp3");
gameBackroundSong.loop=true;
var totalDeathMusic= new Audio("songs/pacman-death.mp3");
totalDeathMusic.loop=false;
var lifeLostMusic= new Audio("songs/pacman-lostlife.mp3");
lifeLostMusic.loop=false;
var victoryMusic= new Audio("songs/victory-song.mp3");
lifeLostMusic.loop=false;


$(document).ready(function() {
	context = canvas.getContext("2d");
	//var cellSize = canvas.height/10;
});

var face=new Object(); // fce of pacman move with direction
face.y=1.85;
face.x=0.15;

var ghost=new Object();

var magic50= new Object();

var pill1= new Object();



function Start() { // setup -first drow 
	if(startgame){
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = numOfFoffInBoard; //num of points of food 
	var numof5points=Math.round(0.6*food_remain);
	var numof15points= Math.round(0.3*food_remain);
	var numof25points= food_remain-numof5points-numof15points;
	foodOnBoardUpdate=numOfFoffInBoard;
	var pacman_remain = 1; 
	start_time = new Date();
	shape.i = 1;
	shape.j = 1;
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 5 && j == 0) || (i == 9 && j == 0) || (i == 8 && j == 9) ||(i == 3 && j == 3) ||(i == 3 && j == 7) ||
				(i == 6 && j == 1) || (i == 9 && j == 1) || (i == 9 && j == 8) ||(i == 6 && j == 5) ||(i == 3 && j == 6) ||
				(i == 1 && j == 0) || (i == 8 && j == 0) || (i == 3 && j == 2) ||(i == 6 && j == 6) ||(i == 2 && j == 6) ||
				(i == 0 && j == 9) || (i == 1 && j == 9) || (i == 2 && j == 2) ||(i == 7 && j == 5) ||(i == 6 && j == 2) ||
				(i == 0 && j == 8) || (i == 9 && j == 9) || (i == 2 && j == 3) ||(i == 7 && j == 6) ||(i == 7 && j == 2)
			) {
				board[i][j] = 4; // obstical wall
			} else { 

				//check place of ghost - (i == 0 && j == 0)!!!!!!!
				var randomNum = Math.random(); 
				if (randomNum <= (1.0 * food_remain) / cnt) { // if buger then x- we will drow food
					
					var randomNum2 = Math.random(); 
					if(randomNum2>=0 && randomNum2<0.6 && numof5points>0){ //  60% of food of 5 points
						board[i][j] = 11;
						numof5points--;
						food_remain--;
					}
					else if(randomNum2>=0.6 && randomNum2<0.9 &&numof15points>0){ //  30% of food of 15 points
						board[i][j] = 12;
						numof15points--;
						food_remain--;
					}
					else if(numof25points>0){
						board[i][j] = 13; // 10% of food of 25 points
						numof25points--;
						food_remain--;
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
	var emptyCell ;
	while (numof5points > 0) {
		emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 11; //food
		food_remain--;
		numof5points--;
	}
	while (numof15points > 0) {
		emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 12; //food
		food_remain--;
		numof15points--;
	}
	while (numof25points > 0) {
		emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 13; //food
		food_remain--;
		numof25points--;
	}
	if(pacman_remain!=0){
		emptyCell = findRandomEmptyCell(board);
		shape.i=emptyCell[0];
		shape.j=emptyCell[1];
		board[emptyCell[0]][emptyCell[1]] = 2; //pacman
		pacman_remain--;
	}
	
	
	putGhostsOnBord(); //paint ghosts
	
	//magic 50
	emptyCell=findRandomEmptyCell(board);
	magic50.lastItem=board[emptyCell[0]][emptyCell[1]];
	magic50.i=emptyCell[0];
	magic50.j=emptyCell[1];  
	board[emptyCell[0]][emptyCell[1]] = 50;

	emptyCell=findRandomEmptyCell(board);
	pill1.i=emptyCell[0];
	pill1.j=emptyCell[1];  
	board[emptyCell[0]][emptyCell[1]] = 60;

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
	   
	var numof11=0;
	for(var n=0;n<10;n++){
		for(var m=0;m<10;m++){
			if(board[n][m]==11 ){
				numof11++;
			}
		}
	}
	var numof12=0;
	for(var n=0;n<10;n++){
		for(var m=0;m<10;m++){
			if(board[n][m]==12 ){
				numof12++;
			}
		}
	}
	var numof13=0;
	for(var n=0;n<10;n++){
		for(var m=0;m<10;m++){
			if(board[n][m]==13 ){
				numof13++;
			}
		}
	}
	gameBackroundSong.play();
	interval = setInterval(UpdatePosition, 120); // get from user
	//interval = setInterval(intervalFancs, 120); 
}
}

function intervalFancs(){
	UpdatePosition();
	UpdatePositionGhost();
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

function putGhostsOnBord(){
	for(var v=0;v<numofGhost;v++){
		ghostArray[v]=new Object();
		if(v==0){
			lastMoveCellG1=board[0][0]; // ????????????
			ghostArray[v].lastItem=board[0][0];
			board[0][0]= 3;
			ghostArray[v].x=0;
			ghostArray[v].y=0;
		}else if(v==1){
			ghostArray[v].lastItem=board[0][9];
			board[0][9]=3;
			ghostArray[v].x=0;
			ghostArray[v].y=9;
		}
		else if(v==2){
			ghostArray[v].lastItem=board[9][0];
			board[9][0]=3;
			ghostArray[v].x=9;
			ghostArray[v].y=0;
		}
		else if(v==3){
			ghostArray[v].lastItem=board[9][9];
			board[9][9]=3;
			ghostArray[v].x=9;
			ghostArray[v].y=9;
		}
	}
	
}

function GetKeyPressed() {
	if (keysDown[upKey]) { // up ---------> put key the user chose
		return 1;
	}
	if (keysDown[downKey]) { // down ---------> put key the user chose
		return 2;
	}
	if (keysDown[leftKey]) { // left ---------> put key the user chose
		return 3;
	}
	if (keysDown[rightKey]) { // right ---------> put key the user chose
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
			}
			// else if (board[i][j] == 3) { //ghost
			// 	 var img=document.getElementById("ghost");
			// 	 context.drawImage(img, ghost.x*60, ghost.y*60,60,60);
			// } 
			else if (board[i][j] == 11) { //if is food of 5 points
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = color5point; //color
				context.fill();
			} else if (board[i][j] == 4) { // if is wall 
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			} else if (board[i][j] == 12) { //if is red food - food of 15 points
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = color10point; //color
				context.fill();
			} else if (board[i][j] == 13) { //if is food of 25 points - blue
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = color15point; //color
				context.fill();
			}
		}
	}
	//drow ghosts
	var img=document.getElementById("ghost");
	for(var k=0;k<numofGhost;k++){
		context.drawImage(img, ghostArray[k].x*60, ghostArray[k].y*60,60,60);
	}
	//draw cherry
	if(magic50 !=undefined){
	var appleImg= document.getElementById("apple");
	context.drawImage(appleImg, magic50.i*60, magic50.j*60,60,60);
	}
	//draw pill
	if(pill1!= undefined){
		var pillImg= document.getElementById("pill");
		context.drawImage(pillImg, pill1.i*60, pill1.j*60,60,60);
	}
}

function bestMoveOfGhost(){
	
	for(var q=0;q<numofGhost;q++){
		var minDistance =1.7976931348623157E+10308;//Infinity;
		var currBestMove;
		var Ysub=Math.abs(shape.j- ghostArray[q].y);
		var Xsub= Math.abs(shape.i-ghostArray[q].x);
		//var angle=Math.atan(opposite / adjacent);
		
		 // down
		if (ghostArray[q].y < 9 && board[ghostArray[q].x][ghostArray[q].y + 1] != 4 ) { // && ghostArray[q].prevMove != "left"
				var rightYCalc=Math.abs(shape.j-(ghostArray[q].y+1));	
				var right= Xsub+rightYCalc;
				if(right<minDistance){
					minDistance=right;
					currBestMove=6;
					//isChanges = true
				}	
			}
		// up
		else if(ghostArray[q].y > 0 && board[ghostArray[q].x][ghostArray[q].y - 1] != 4 ){
			var leftYCalc=Math.abs(shape.j-(ghostArray[q].y-1));
			var left=Xsub+leftYCalc;
			if(left<minDistance){
				minDistance=left;
				currBestMove=7;
				//isChanges = true
			}	
		}
		// left ? 
		else if(ghostArray[q].x > 0 && board[ghostArray[q].x - 1][ghostArray[q].y] != 4){
			var upXCalc=Math.abs(shape.i-(ghostArray[q].x-1));
			var up=Ysub+upXCalc;
			if(up<minDistance){
				minDistance=up;
				currBestMove=8;
				//isChanges = true
			}
		}
		// right ? 
		else if(ghostArray[q].x < 9 && board[ghostArray[q].x + 1][ghostArray[q].y] != 4){
			var downXCala=Math.abs(shape.i-(ghostArray[q].x+1));
			var down=Ysub+downXCala;
			if(down<minDistance){
				minDistance=down;
				currBestMove=9;
				//isChanges = true
			}
		}
		var x;
		ghostArray[q].bestMove=currBestMove;
	}
	return true; // calc witch durction is beter - up down left right
	//if up is the best way -> return 1 , right->rturn 2
	// 		left->3 , right->4
}

function UpdatePositionGhost() {

	var nextMove= bestMoveOfGhost();
	for(var w=0;w<numofGhost;w++){
		board[ghostArray[w].x][ghostArray[w].y] = ghostArray[w].lastItem; // put last object: lastMoveCellG1
		var ghostMove= ghostArray[w].bestMove;
		if (ghostMove == 7) { // (up on baord!!) (like pacman-in paint)
				ghostArray[w].lastItem=board[ghostArray[w].x][ghostArray[w].y-1];
				ghostArray[w].y=ghostArray[w].y-1;
			}
		if (ghostMove == 6) { //  (right on baord!!) (down like pacman-in paint)
				ghostArray[w].lastItem=board[ghostArray[w].x][ghostArray[w].y + 1];
				ghostArray[w].y=ghostArray[w].y+1;
			}
		if (ghostMove == 8) { //( on baord!!!) (left like pacman-on paint)
				ghostArray[w].lastItem=board[ghostArray[w].x-1][ghostArray[w].y];
				ghostArray[w].x=ghostArray[w].x-1;
			}
		if (ghostMove == 9) {//( on baord!!)  (right like pacmanon-on paint)
				ghostArray[w].lastItem=board[ghostArray[w].x+1][ghostArray[w].y]; 
				ghostArray[w].x=ghostArray[w].x+1;
			}
		board[ghostArray[w].x][ghostArray[w].y] = 3; 
	}
}

function UpdateMagic50Position(){
	board[magic50.i][magic50.j] = magic50.lastItem;
	var directiongood=false;
	var direction;
	while( !directiongood){
		direction=Math.floor(Math.random() * 7);
		if (direction== 1) { // up 
			if (magic50.j > 0 && board[magic50.i][magic50.j - 1] != 4 && board[magic50.i][magic50.j - 1] != 3 && board[magic50.i][magic50.j - 1] !=2) {
			magic50.lastItem=board[magic50.i][magic50.j-1];
			magic50.j--;
			directiongood=true;
			}
		}
		if (direction == 2) { // down
			if (magic50.j < 9 && board[magic50.i][magic50.j + 1] != 4 && board[magic50.i][magic50.j + 1] != 3 && board[magic50.i][magic50.j + 1] != 2) {
			magic50.lastItem=board[magic50.i][magic50.j+1];
			magic50.j++;
			directiongood=true;
			}
		}	
	if (direction == 3) { //left
		if (magic50.i > 0 && board[magic50.i - 1][magic50.j] != 4 &&board[magic50.i - 1][magic50.j] != 3 &&board[magic50.i - 1][magic50.j] != 2) {
			magic50.lastItem=board[magic50.i-1][magic50.j];
			magic50.i--;
			directiongood=true;
		}
	}
	if (direction == 4) {//right
		if (magic50.i < 9 && board[magic50.i + 1][magic50.j] != 4 && board[magic50.i + 1][magic50.j] != 3 && board[magic50.i + 1][magic50.j] != 2) {
			magic50.lastItem=board[magic50.i+1][magic50.j];
			magic50.i++;
			directiongood=true;
		}
	}
	if(direction==0 ||directiongood==5 || direction==6){
		directiongood=true;
	}
	}
	board[magic50.i][magic50.j]  = 50; 
	
}

function UpdatePosition() { 
	magicDrawerCount++;
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed(); // last move of user
	var pacmanEatenByGhost=false;
	if (foodOnBoardUpdate == 0) { // end game - needs to be : no food in game
		gameBackroundSong.pause();
		victoryMusic.play();
		window.clearInterval(interval);
		window.alert("Game completed");

	}
	for(var index=0;index<numofGhost;index++){
		if(shape.i== ghostArray[index].x && shape.j==ghostArray[index].y){
			pacmanEatenByGhost=true;
		}
	}
	if(pacmanEatenByGhost){// end of game
		score= score-10;
		$("#life"+numOfLives+"").css('opacity', 0); // hide
		numOfLives=numOfLives-1;
		window.clearInterval(interval);
		gameBackroundSong.pause();
		gameBackroundSong.currentTime = 0;
		if(numOfLives==0){// end of final game
			totalDeathMusic.play();
			$("#endOfGameNoLives").modal();
		}
		else{//start new game in curr
			lifeLostMusic.play();
			$("#pacmanDie").modal({
				escapeClose: false,
				clickClose: false,
				showClose: false
			  });

		}
	}
	else{
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
			score=score+5;
			foodOnBoardUpdate--;
	}
		if(board[shape.i][shape.j] == 12){
			score=score+15;
			foodOnBoardUpdate--;
	}
		if(board[shape.i][shape.j] == 13){
			score=score+25;
			foodOnBoardUpdate--;
	}
	if(board[shape.i][shape.j] == 50){//eat magic 50
		score=score+50;
		if(magic50.lastItem==11){
			score=score+5;
			foodOnBoardUpdate--;
		}else if(magic50.lastItem==12){
			score=score+15;
			foodOnBoardUpdate--;
		}else if(magic50.lastItem==13){
			score=score+25;
			foodOnBoardUpdate--;
		}
		magic50=undefined;
	}
	if(board[shape.i][shape.j] == 60){
		//PILL !!!!!!!!!!!
		//new
		score=score+1;
	}
	board[shape.i][shape.j] = 2;  //!! #
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	
	if (score >= 20 && time_elapsed <= 10) { //???
			pac_color = "green";
	}


	UpdatePositionGhost();
	
	if(magic50 !=undefined && magicDrawerCount%5==0){
		UpdateMagic50Position();
	}
	
	if(magicDrawerCount%5==0){
		if(pill1 !=undefined){
			board[pill1.i][pill1.j]=0;
			pill1=undefined;
		}
		else{
			pill1=new Object();
			var empty= findRandomEmptyCell(board);
			pill1.i=emptyCell[0];
			pill1.j=emptyCell[1];  
			board[emptyCell[0]][emptyCell[1]] = 60;
		}
		UpdateMagic50Position();
	}
	
	Draw();
	
	}
	
	
	
}

function pacmanDies(){
	$.modal.close();
	for(var i=0;i<numofGhost;i++){
		board[ghostArray[i].x][ghostArray[i].y] = ghostArray[i].lastItem; // put last object: lastMoveCellG1
	}
	//board[shape.i][shape.j]=0;
	var indexes= findRandomEmptyCell(board);
	shape.i = indexes[0];
	shape.j = indexes[1];
	board[indexes[0]][indexes[1]]=2;
	putGhostsOnBord();
	Draw();
	gameBackroundSong.play();
	interval = setInterval(UpdatePosition, 120);
}
