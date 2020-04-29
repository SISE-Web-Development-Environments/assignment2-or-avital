
var rightDirection="";
var leftDirection="";
var upDirection="";
var downDirection="";



//RIGHT
function rightButtonclick(){
    document.getElementById("rk").innerHTML = "none";
    document.getElementById("errorR").style.display="none";
    document.getElementById("rightkey").style.background="yellow";
	document.addEventListener("keydown", rightKeyChoosen);
 }

function rightKeyChoosen(e) {
    let choosen= e.key;
  
  if(choosen==leftDirection || choosen== upDirection|| choosen== downDirection){
      document.getElementById("errorR").style.display="block";
  }else{
      rightDirection=e.keyCode;
      document.getElementById("rk").innerHTML = rightDirection;
  }
  document.removeEventListener("keydown", rightKeyChoosen);
  document.getElementById("rightkey").style.background="none";
}

//LEFT
function leftButtonclick(){
    document.getElementById("lk").innerHTML = "none";
    document.getElementById("errorL").style.display="none";
    document.getElementById("leftkey").style.background="yellow";
	document.addEventListener("keydown", leftKeyChoosen);
 }

function leftKeyChoosen(e) {
    let choosen= e.key;
  
  if(choosen==rightDirection || choosen== upDirection|| choosen== downDirection){
    document.getElementById("errorL").style.display="block";
  }else{
      leftDirection=e.keyCode;
      document.getElementById("lk").innerHTML = leftDirection;
  //left=left;
  }
  document.removeEventListener("keydown", leftKeyChoosen);
  document.getElementById("leftkey").style.background="none";
}

//UP
function upButtonclick(){
    document.getElementById("uk").innerHTML = "none";
    document.getElementById("errorU").style.display="none";
    document.getElementById("upkey").style.background="yellow";
	document.addEventListener("keydown", upKeyChoosen);
 }

function upKeyChoosen(e) {
    let choosen= e.key;
  
  if(choosen==rightDirection || choosen== leftDirection|| choosen== downDirection){
    document.getElementById("errorU").style.display="block";
  }else{
      upDirection=e.keyCode;
      document.getElementById("uk").innerHTML = upDirection;
    //left=left;
  }
  
  document.removeEventListener("keydown", upKeyChoosen);
  document.getElementById("upkey").style.background="none";
}

//DOWN
function downButtonclick(){
    document.getElementById("dk").innerHTML = "none";
    document.getElementById("errorD").style.display="none";
    document.getElementById("downkey").style.background="yellow";
	document.addEventListener("keydown", downKeyChoosen);
 }

function downKeyChoosen(e) {
    let choosen= e.key;
  
  if(choosen==rightDirection || choosen== leftDirection|| choosen== upDirection){
    document.getElementById("errorD").style.display="block";
  }else{
      downDirection=e.keyCode;
      document.getElementById("dk").innerHTML = downDirection;
  //left=left;
  }
  document.removeEventListener("keydown", downKeyChoosen);
  document.getElementById("downkey").style.background="none";
}

function differentName(){
         
        upDirection=38;
        downDirection=40;
        rightDirection=39;
        leftDirection=37;
        
        document.getElementById("uk").innerHTML = upDirection;
        document.getElementById("dk").innerHTML = downDirection;
        document.getElementById("rk").innerHTML = rightDirection;
        document.getElementById("lk").innerHTML = leftDirection;

        document.getElementById("5point").value= getRandomColor();
        document.getElementById("10point").value= getRandomColor();
        document.getElementById("15point").value= getRandomColor();

        color5point=  document.getElementById("5point").value;
        color10point= document.getElementById("10point").value;
        color15point= document.getElementById("15point").value;


        numOfFoffInBoard= 50 +Math.floor(Math.random() * Math.floor(40));
        document.getElementById("numofBalls").value=numOfFoffInBoard;
        maxTimeForGame= 60+Math.floor(Math.random() * Math.floor(200));
        document.getElementById("gamelength").value=maxTimeForGame;
    
    }
        
       
      function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }





$(function() {
    $("#setting-form").validate({
        rules: {
            numofBalls:{
                min: 50,
                max: 90,
                required: true,
                number: true
            },
            gamelength:{
                min: 60,
                required: true,
                number: true
            }
        },
        messages: {
            numofBalls:{
                min: "the minimal number of balls is 50",
                max: "the maximum number of balls is 90",
            },
            gamelength:{
                min: "the minimal game length is 60 seconds"
            }
              
        }
    });
 });
    


      