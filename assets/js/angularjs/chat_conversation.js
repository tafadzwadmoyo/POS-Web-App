/*
    Designed by Tafadzwa Moyo
    Deals with the chat conversation item. 
*/

var app = angular.module('chatConversation', []);

app.controller('chatConversationController', function($scope) {
    $("#chat-conversation-input-box").css("bottom", $(window).height() - $("#bottom_menu").position().top);
    console.log($("#bottom_menu").position().top);
});


angular.module('chatConversation').component('chatConversationItem', {
    templateUrl: 'assets/html/chat_conversation_item.html',
    bindings: {
        message: '=' //Two way binding here, may cause errors in future
    }
});