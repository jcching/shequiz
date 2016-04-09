
	//pick a random question to start with
	var questionNum = Math.floor(Math.random()*bank.length);
	//set down the flag
	var answered = false;
	var pastquestions;

$(function() {

	//draw
	drawQuestion(questionNum);


	$( "#bodyContainer" ).click(function() {
		//whole page responder
		// if(answered){
		// 	questionNum = Math.floor(Math.random()*bank.length);
		// 	drawQuestion(questionNum);
		// }
	});
		//drawAnswer(questionNum,1);

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

}

function drawAnswer(num,selected){

	var ansNum;
	var logoToAdd;

	if (!answered) {
		//this code only runs if the question is in unanswered state

		//color code answers
		if (bank[num].ans=="A") {
			ansNum=0;

			$("#ansA").addClass("list-group-item-success");
			$("#ansB").addClass("list-group-item-danger");
			$("#ansC").addClass("list-group-item-danger");


		}else if(bank[num].ans=="B") {

			ansNum=1;
			$("#ansB").addClass("list-group-item-success");

			$("#ansA").addClass("list-group-item-danger");
			$("#ansC").addClass("list-group-item-danger");

		}else if(bank[num].ans=="C") {

			ansNum=2;
			$("#ansC").addClass("list-group-item-success");

			$("#ansB").addClass("list-group-item-danger");
			$("#ansA").addClass("list-group-item-danger");

		}

		//check answer

		if (selected==ansNum) {
			console.log("Correct!");
			logoToAdd="<span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>";
		}else{
			logoToAdd="<span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>"
		}

		//add tick cross
		if (selected==0) {
			$("#ansA>p").append(logoToAdd);
		}else if (selected==1) {
			$("#ansB>p").append(logoToAdd);
		}else if (selected==2){
			$("#ansC>p").append(logoToAdd);
		}

		//also add tickcross to record
		$("#answerRecord").append(logoToAdd);

		answered =true;

	}
}