//webappInstall.js
//detects if the webpage is installed on mobile, if not, load splash.html to force user install


if (window.navigator.standalone == true) {
 //leave things alone

}else {
 //$( "body" ).load( "splash.html" );
}