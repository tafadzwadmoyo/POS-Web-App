/*
    Designed by Tafadzwa Moyo
    Deals with the message box. 
*/

var app = angular.module('chatMessageBox', []);

app.controller('chatMessageBoxController', function($scope) {
    checkLogin($scope);
    $scope.messages = [{ sender: "Tafadzwa Moyo", senderimg: "assets/images/profile_pic.jpg", content: "Hello World!" }, { sender: "Tafadzwa Moyo", senderimg: "assets/images/profile_pic.jpg", content: "Hello World!" }, { sender: "Tafadzwa Moyo", senderimg: "assets/images/profile_pic.jpg", content: "Hello World!" }];
});


angular.module('chatMessageBox').component('chatMessageBox', {
    templateUrl: 'assets/html/chat_message_box.html',
    bindings: {
        message: '=' //Two way binding here, may cause errors in future
    }
});