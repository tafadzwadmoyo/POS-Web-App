var resizeMenu=function(){
    //position overlay-menu
    var bottom = $('#nav-bar').position().top + $('#nav-bar').outerHeight(true)+20;
    var h =$("#bottom_menu").position().top-bottom;
    $("#overlay_menu").css({top:bottom, height: h});

}
$( document ).ready(function() {
    
    //Calculate Margin-Bottom for #main
    var margin = $('#bottom_menu').outerHeight(true)+30; 
    $("#main").css({marginBottom :margin});

    resizeMenu();
    
});
$( window ).resize(function() {
    resizeMenu();
  });

