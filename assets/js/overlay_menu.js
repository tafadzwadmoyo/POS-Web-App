/*
    Designed by Tafadzwa Moyo
    Handles the functionality of the overlay menu
*/
var openCloseMenu = function() {
    resizeMenu();
    var d = $("#overlay_menu").css('display');
    if (d == 'block') {
        $("#overlay_menu").hide("slide", { direction: "left" }, 500);
        //$("#overlay_menu").css('display' , 'none');
    } else {
        $("#overlay_menu").show("slide", { direction: "left" }, 500);
        //$("#overlay_menu").css('display' , 'block');
    }
}