
	//pick a random question to start with
	var questionNum = Math.floor(Math.random()*bank.length);
	//set down the flag for next question
	var answered = false;
	//save the correct answer for drawAnswer
	var correctAnswer = 0;

	var pastquestions;//array to store past questions (unused)
	
	//stat counters 
	var totalQuestionCount=0;
	var correctQuestionCount=0;
	var percentCorrect=0;
	var streakCounter=0;

	//settings flags
	var officeOnly = false;
	var qUpperRange = 1853;
	var qLowerRange = 1;
	var staffId;

$(function() {
	//$(window).unload(saveSettings); //autosaves settings on close


    loadSettings();
	//draw
	drawRandomQuestion();

	//click handlers
	$( "#ansA" ).click(function() {
	  	if(answered){
			drawRandomQuestion();
		}else{
			drawAnswer(0);
		}
	});
	$( "#ansB" ).click(function() {	  	
		if(answered){
			drawRandomQuestion();
		}else{
			drawAnswer(1);
		}
	});
	$( "#ansC" ).click(function() {
	  	if(answered){
			drawRandomQuestion();
		}else{
			drawAnswer(2);
		}
	});

	$("#numberSearchButton").click(function(){
		var searchNumber = $("#numberSearchBox").val()-1;
		drawQuestion(searchNumber);
		$('#searchModal').modal('toggle');
		$('.navbar-collapse').collapse('hide'); 
	});

	$("#saveSettingsBtn").click(function(){
		saveSettings();
		$('#settingsModal').modal('toggle');
		$('.navbar-collapse').collapse('hide'); 
	});

	//change handler to make sure range goes small>large
	$( "#qLowerRangeSelect" ).change(function() {
		var lowervalue=parseInt($( "#qLowerRangeSelect" ).val());
		$( "#qUpperRangeSelect" ).html(generateRangeList(lowervalue));
	});


	//start the timer
	$('#timer').timer({
    	format: '%M:%S'
	});

});

function drawQuestion(num) {
	answered = false;//clear the answered state
	$("#refLabel").text(bank[num].ref);
	$("#refLabel").append("<h6>"+bank[num].source+"</h6>");

	$("#questionLabel").text(bank[num].question);

	$("#ansA>p").text(bank[num].a);
	$("#ansB>p").text(bank[num].b);
	$("#ansC>p").text(bank[num].c);
	//clear the color codes
	$("#ansA").removeClass("list-group-item-success");
	$("#ansA").removeClass("list-group-item-danger");
	$("#ansB").removeClass("list-group-item-success");
	$("#ansB").removeClass("list-group-item-danger");
	$("#ansC").removeClass("list-group-item-success");
	$("#ansC").removeClass("list-group-item-danger");
        // update the question number so that draw answer will always produce the correct result
        questionNum = num;

    //save the correct answer 
    //in global variable so drawAnswer will work correctly
    
    if (bank[num].ans=="A") {
    	correctAnswer = 0;
    }else if (bank[num].ans=="B") {
    	correctAnswer = 1;
    }else if (bank[num].ans=="C") {
    	correctAnswer = 2;
    }

}

function drawAnswer(selected){

	var logoToAdd;
	var correct;

	if (!answered) {
		//this code only runs if the question is in unanswered state
		
		//run this first to prevent multi logging
		answered =true;

		//color code answers
		if (correctAnswer === 0) {

			$("#ansA").addClass("list-group-item-success");
			// $("#ansB").addClass("list-group-item-danger");
			// $("#ansC").addClass("list-group-item-danger");


		}else if(correctAnswer === 1) {

			$("#ansB").addClass("list-group-item-success");

			// $("#ansA").addClass("list-group-item-danger");
			// $("#ansC").addClass("list-group-item-danger");

		}else if(correctAnswer === 2) {

			$("#ansC").addClass("list-group-item-success");

			// $("#ansB").addClass("list-group-item-danger");
			// $("#ansA").addClass("list-group-item-danger");

		}

		//check answer

		if (selected==correctAnswer) {
			console.log("Correct!");
			correct=true;
			logoToAdd="<span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>";
		}else{
			correct=false;
			logoToAdd="<span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>"
		}

		//add tick cross
		if (selected==0) {
			$("#ansA>p").append(logoToAdd);
			if (!correct) {$("#ansA").addClass("list-group-item-danger");}
		}else if (selected==1) {
			$("#ansB>p").append(logoToAdd);
			if (!correct) {$("#ansB").addClass("list-group-item-danger");}
		}else if (selected==2){
			$("#ansC>p").append(logoToAdd);
			if (!correct) {$("#ansC").addClass("list-group-item-danger");}
		}

		//also add tickcross to record
		$("#answerRecord").append(logoToAdd);

		//update stat counters
		totalQuestionCount++;
		if (correct){correctQuestionCount++;}
		percentCorrect=Math.round(100*(correctQuestionCount/totalQuestionCount));

		var statString= correctQuestionCount+"/"+totalQuestionCount+" @ "+percentCorrect+"%"
		console.log(statString);
		
		$("#stats").text(statString);




		if (correct) {
			streakCounter++;
			//check if this breaks local records
			//if it does save it to local
					var currentTime = new Date();
			if (localStorage.highScore === undefined) {
				localStorage.highScore=streakCounter;
				localStorage.recordDate=currentTime.toString();
			}else if (streakCounter>localStorage.highScore){
				localStorage.highScore=streakCounter;
				localStorage.recordDate=currentTime.toString();
			}
		}else{
			streakCounter=0;
		}


	}


}

function loadSettings() {
	//only load if settings exist
	if (!(localStorage.categoryOption === undefined)) {
	    $('#categoryOption').val(localStorage.categoryOption);
	    $('#qLowerRangeSelect').val(localStorage.qLowerRangeSelect);
	    $('#qUpperRangeSelect').val(localStorage.qUpperRangeSelect);
	    $("#staffId").val(localStorage.staffId);

	    //load settings into local variables also
	    if (localStorage.categoryOption === 1) {
	    	officeOnly=true;
	    }else{
	    	officeOnly=false;
	    }

		qLowerRange=parseInt(localStorage.qLowerRangeSelect);
		qUpperRange=parseInt(localStorage.qUpperRangeSelect);
		staffId=localStorage.staffId;

    }

    if (!(localStorage.highScore === undefined)) {

		$("#personalBest").html(localStorage.highScore);
		$("#dateforPersonBest").html(localStorage.recordDate);
    }
}

function saveSettings() {
    localStorage.categoryOption = $('#categoryOption').val();
    localStorage.qLowerRangeSelect = $('#qLowerRangeSelect').val();
    localStorage.qUpperRangeSelect = $("#qUpperRangeSelect").val();
    localStorage.staffId = $('#staffId').val();

    //load it into the runtime variables
    loadSettings();
}

function randomQuestionNumber(){

	//returns a random question number filtered by settings
	var compliantNumber;
	var span=qUpperRange-qLowerRange;


	var arrayCache=officeArray;

	if(officeOnly){
		//delete all elements in the array above and below
		//filter values
		arrayCache=$.grep( arrayCache, function( n, i ) {
  			return n > qLowerRange;
		});

		arrayCache=$.grep( arrayCache, function( n, i ) {
  			return n < qUpperRange;
		});

		//now pick a random element from the filtered array
		var i = Math.floor(Math.random()*arrayCache.length);
		compliantNumber = arrayCache[i];
	}else{
		compliantNumber=Math.floor((Math.random() * span) + qLowerRange); 
	}

	return compliantNumber;
}

function drawRandomQuestion(){
	drawQuestion(randomQuestionNumber());
}

function generateRangeList(min){
	var optionsArray=["<option value=\"100\">100</option>",
	"<option value=\"200\">200</option>",
	"<option value=\"300\">300</option>",
	"<option value=\"400\">400</option>",
	"<option value=\"500\">500</option>",
	"<option value=\"600\">600</option>",
	"<option value=\"700\">700</option>",
	"<option value=\"800\">800</option>",
	"<option value=\"900\">900</option>",
	"<option value=\"1000\">1000</option>",
	"<option value=\"1100\">1100</option>",
	"<option value=\"1200\">1200</option>",
	"<option value=\"1300\">1300</option>",
	"<option value=\"1400\">1400</option>",
	"<option value=\"1500\">1500</option>",
	"<option value=\"1583\" selected=\"selected\">1583</option>"]

	var removeValue=Math.floor(min/100);

	//remove leftmost elements
	optionsArray.splice(0,removeValue);

	return optionsArray.join(" ");



}
