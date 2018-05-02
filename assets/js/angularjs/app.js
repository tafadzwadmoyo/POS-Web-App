/*
    Designed by Tafadzwa Moyo
*/

app = angular.module('pos', ['chatConversation', 'chatMessageBox', 'delete', 'messageBox', 'overlayMenu', 'product', 'productList', 'profile', 'sell', 'stock', 'ui.router']);
app.controller('posController', function($scope) {
    $scope.openCloseMenu = openCloseMenu;
    $scope.go = go;
    firebase.database().ref('/products/').on('value', function(data) {
        $scope.productsJSON = data.val();
        $scope.products = $.map(data.val(), function(el) { return el });
        $scope.$apply();
    });
});
app.factory('product', function(id) {
    return firebase.database().ref('/products/' + id + "/").once('value');
});
app.config(function($stateProvider, $urlRouterProvider) {
    for (i in pages) {
        if (pages[i].target != "sell") {
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

    }
    $urlRouterProvider.otherwise('/home');



    var chatConversationState = {
        name: 'Chat Conversation',
        url: "/chat_conversation",
        templateUrl: 'assets/html/chat_conversation.html',
        controller: function($scope) {
            $scope.$parent.title = 'Chat';
            resizeMenu();
        }

    };
    $stateProvider.state(chatConversationState);

    var deleteState = {
        name: 'Delete',
        url: "/delete?id&name&imgurl",
        templateUrl: 'assets/html/delete.html',
        controller: function($scope, $stateParams) {
            $scope.productId = $stateParams.id;
            $scope.productName = $stateParams.name;
            $scope.productImgUrl = $stateParams.imgurl;
            $scope.$parent.title = 'Delete';
            resizeMenu();
        }

    };
    $stateProvider.state(deleteState);

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
        url: "/product/:id",
        templateUrl: 'assets/html/product.html',
        controller: function($scope, $stateParams) {
            $scope.productId = $stateParams.id;
            resizeMenu();
        }
    };
    $stateProvider.state(productState);

    var poductListState = {
        name: 'Product List',
        url: "/productlist",
        templateUrl: 'assets/html/sell-product-list.html',
        controller: function($scope) {
            resizeMenu();
        }
    };
    $stateProvider.state(poductListState);

    var sellState = {
        name: 'sell',
        url: "/sell?id&qty",
        templateUrl: 'assets/html/sell.html',
        controller: function($scope, $stateParams) {
            $scope.$parent.title = "Sell";
            $scope.stateParams = $stateParams;
            resizeMenu();
        }
    };
    $stateProvider.state(sellState);

});