//webappInstall.js
//detects if the webpage is installed on mobile, if not, load splash.html to force user install

console.log("test page loaded, status is:");
console.log(window.location.protocol);

// if (window.location.protocol == 'app:') {
//  //leave things alone

// }else {
//  $( "body" ).load( "splash.html" );
// }

if (window.location.protocol == "app:"){
	console.log("say ahh");
}else{
	console.log("say no");
}