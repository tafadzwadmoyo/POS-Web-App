/*
    Designed by Tafadzwa Moyo
*/

app = angular.module('pos', ['chatMessageBox', 'item', 'messageBox', 'overlayMenu', 'profile', 'ui.router']);
app.controller('posController', function($scope) {
    $scope.openCloseMenu = openCloseMenu;
    $scope.go = go;
})
app.config(function($stateProvider, $urlRouterProvider) {
    for (i in pages) {
        var state = {
            name: pages[i].content,
            url: "/" + pages[i].target,
            templateUrl: pages[i].url,
            controller: function($scope) {
                $scope.$parent.title = $scope.$resolve.$state$.name;
                resizeMenu();
            }
        };
        $stateProvider.state(state);
    }
    $urlRouterProvider.otherwise('/home');

    var chatConversationState = {
        name: 'Chat Conversation',
        url: "/chat_conversation",
        templateUrl: 'assets/html/chat_conversation.html',
        controller: function($scope) {
            resizeMenu();
        }
    };
    $stateProvider.state(chatConversationState);

    var loginState = {
        name: 'login',
        url: "/login",
        templateUrl: 'assets/html/login.html',
        controller: function($scope) {
            resizeMenu();
        }
    };
    $stateProvider.state(loginState);

    var paymentState = {
        name: 'payment',
        url: "/payment",
        templateUrl: 'assets/html/payment.html',
        controller: function($scope) {
            resizeMenu();
        }
    };
    $stateProvider.state(paymentState);

    var paymentThankYouState = {
        name: 'payment-thank-you',
        url: "/payment_thank_you",
        templateUrl: 'assets/html/payment_thank_you.html',
        controller: function($scope) {
            resizeMenu();
        }
    };
    $stateProvider.state(paymentThankYouState);

    var productState = {
        name: 'product',
        url: "/product",
        templateUrl: 'assets/html/product.html',
        controller: function($scope) {
            resizeMenu();
        }
    };
    $stateProvider.state(productState);

});