function clickSignIn(){
	$("#WelcomeScreen").hide();
	$("#SignInPage").show();
}

function clickLogIn(){
	$("#WelcomeScreen").hide();
	$("#LogInPage").show();
}

function gotogame(){
	$("#WelcomeScreen").hide();
	$("#gamePage").show();
}
function clickToSettings(){
	$("#LogInPage").hide();
	$("#Settings").show();
	$.modal.close();
}

function goToSettingsFromSignIn(){
    $("#SignInPage").hide();
    $("#Settings").show();
    $.modal.close();
  }

 function menuToWelcome(){
	$("#WelcomeScreen").show();
	$("#SignInPage").hide();
	$("#LogInPage").hide();
	$("#gamePage").hide();
	$("#Settings").hide();
	$.modal.close();
 }

 function menuToSignIn(){
	$("#WelcomeScreen").hide();
	$("#SignInPage").show();
	$("#LogInPage").hide();
	$("#gamePage").hide();
	$("#Settings").hide();
	$.modal.close();
 }

 function menuToLogIn(){
	$("#WelcomeScreen").hide();
	$("#SignInPage").hide();
	$("#LogInPage").show();
	$("#gamePage").hide();
	$("#Settings").hide();
	$.modal.close();
 }

function menuToAbout(){
	$("#AboutPage").modal();
}

function closeModal(){
	$.modal.close();
}

function StartGame(){
	$("#gamePage").show();
	$("#Settings").hide();
	$.modal.close();
}


