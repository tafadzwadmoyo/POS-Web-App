/*
    Designed by Tafadzwa Moyo
    Deals with the message box. 
*/

var app = angular.module('messageBox', []);

app.controller('messageBoxController', function($scope) {
    $scope.messages = [{sender: "Tafadzwa Moyo", senderimg: "/assets/images/profile_pic.jpg", content: "Hello World!"},{sender: "Tafadzwa Moyo", senderimg: "/assets/images/profile_pic.jpg", content: "Hello World!"},{sender: "Tafadzwa Moyo", senderimg: "/assets/images/profile_pic.jpg", content: "Hello World!"}];
});


angular.module('messageBox').component('messageBox', {
    templateUrl: '/assets/html/message_box.html',
    bindings: { 
        message: '='  //Two way binding here, may cause errors in future
    }
});