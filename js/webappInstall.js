//webappInstall.js
//detects if the webpage is installed on mobile, if not, load splash.html to force user install

console.log("test page loaded, status is uodatedagain:");

var currentProtocol=window.location.protocol;
var navStat=navigator.standalone;
console.log(currentProtocol);
console.log(navStat);

// if (window.location.protocol == 'app:') {
//  //leave things alone

// }else {
//  $( "body" ).load( "splash.html" );
// }

// if (currentProtocol == "app:"){
// 	console.log("say ahh");
// }else{
// 	console.log("say no");
// 	$( "body" ).load( "splash.html" );
// }

if (!navStat) {
	$( "body" ).load( "splash.html" );
}