var resizeMenu = function() {
    //position overlay-menu
    var bottom = 0
    if ($('#nav-bar').length !== 0) {
        var bottom = $('#nav-bar').position().top + $('#nav-bar').outerHeight(true) + 20;
    } else {
        var bottom = $('.top-panel').position().top + $('.top-panel').outerHeight(true) + 20;
    }
    var h = $("#bottom_menu").position().top - bottom;
    $("#overlay_menu").css({ top: bottom, height: h });

}
var go = function(path) {
    $("#overlay_menu").hide("slide", { direction: "left" }, 500);
    window.location = "#!/" + path;
}
$(document).ready(function() {

    //Calculate Margin-Bottom for #main
    var margin = $('#bottom_menu').outerHeight(true) + 30;
    $("#main").css({ marginBottom: margin });

});
$(window).resize(function() {
    resizeMenu();
});