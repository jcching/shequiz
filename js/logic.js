
	//pick a random question to start with
	var questionNum = Math.floor(Math.random()*bank.length);
	//set down the flag
	var answered = false;
	var pastquestions;//array to store past questions
	var totalQuestionCount=0;
	var correctQuestionCount=0;
	var percentCorrect=0;
	var officeOnly = false;

$(function() {
	//$(window).unload(saveSettings); //autosaves settings on close


    loadSettings();
	//draw
	drawQuestion(questionNum);

	//click handlers
	$( "#ansA" ).click(function() {
	  	if(answered){
			questionNum = Math.floor(Math.random()*bank.length);
			drawQuestion(questionNum);
		}else{
			drawAnswer(questionNum,0);
		}
	});
	$( "#ansB" ).click(function() {	  	
		if(answered){
			questionNum = Math.floor(Math.random()*bank.length);
			drawQuestion(questionNum);
		}else{
			drawAnswer(questionNum,1);
		}
	});
	$( "#ansC" ).click(function() {
	  	if(answered){
			questionNum = Math.floor(Math.random()*bank.length);
			drawQuestion(questionNum);
		}else{
			drawAnswer(questionNum,2);
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

}

function drawAnswer(num,selected){

	var ansNum;
	var logoToAdd;
	var correct;

	if (!answered) {
		//this code only runs if the question is in unanswered state

		//color code answers
		if (bank[num].ans=="A") {
			ansNum=0;

			$("#ansA").addClass("list-group-item-success");
			// $("#ansB").addClass("list-group-item-danger");
			// $("#ansC").addClass("list-group-item-danger");


		}else if(bank[num].ans=="B") {

			ansNum=1;
			$("#ansB").addClass("list-group-item-success");

			// $("#ansA").addClass("list-group-item-danger");
			// $("#ansC").addClass("list-group-item-danger");

		}else if(bank[num].ans=="C") {

			ansNum=2;
			$("#ansC").addClass("list-group-item-success");

			// $("#ansB").addClass("list-group-item-danger");
			// $("#ansA").addClass("list-group-item-danger");

		}

		//check answer

		if (selected==ansNum) {
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
		percentCorrect=Math.floor(100*(correctQuestionCount/totalQuestionCount));

		var statString= correctQuestionCount+"/"+totalQuestionCount+" @ "+percentCorrect+"%"
		console.log(statString);
		
		$("#stats").text(statString);


		answered =true;


	}
}

function loadSettings() {
	//only load if settings exist
	if (!(localStorage.categoryOption === undefined)) {
	    $('#categoryOption').val(localStorage.categoryOption);
	    $('#qLowerRangeSelect').val(localStorage.qLowerRangeSelect);
	    $('#qUpperRangeSelect').val(localStorage.qUpperRangeSelect);
	    $("#staffId").val(localStorage.staffId);
    }
}

function saveSettings() {
    localStorage.categoryOption = $('#categoryOption').val();
    localStorage.qLowerRangeSelect = $('#qLowerRangeSelect').val();
    localStorage.qUpperRangeSelect = $("#qUpperRangeSelect").val();
    localStorage.staffId = $('#staffId').val();
}
