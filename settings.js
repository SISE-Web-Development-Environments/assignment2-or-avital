
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
      rightDirection=choosen;
      document.getElementById("rk").innerHTML = rightDirection;
      right=rightDirection;
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
      leftDirection=choosen;
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
      upDirection=choosen;
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
      downDirection=choosen;
      document.getElementById("dk").innerHTML = downDirection;
  //left=left;
  }
  document.removeEventListener("keydown", downKeyChoosen);
  document.getElementById("downkey").style.background="none";
}


$(function() {
    $("#signin-form").validate({
        rules: {
            
          },
        
          messages: {
           
              
          },
    
        });
      });