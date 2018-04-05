/*
    Designed by Tafadzwa Moyo
    Deals with the message box. 
*/

var app = angular.module('profile', []);
app.controller('profileController', function($scope) {
    $scope.profile={name: "Tafadzwa Moyo", imgurl: "/assets/images/profile_pic.jpg", role: "Manager"}
});