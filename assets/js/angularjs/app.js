/*
    Designed by Tafadzwa Moyo
*/

/*getProductImageUrl = (product) => {
    storageRef.child('images/stars.jpg').getDownloadURL().then(function(url)
        // Or inserted into an <img> element:
        var img = document.getElementById('myimg'); img.src = url;
    }).catch(function(error) {
    // Handle any errors
});
}*/
app = angular.module('pos', ['chatConversation', 'chatMessageBox', 'client', 'delete', 'invoice', 'login', 'messageBox', 'overlayMenu', 'product', 'productList', 'profile', 'refund', 'sales', 'sell', 'stock', 'ui.router']);
app.controller('posController', function($scope) {
    var user = firebase.auth().currentUser;

    if (user || ($scope.title && $scope.title == 'Login')) {
        // User is signed in.
    } else {
        go('login');
    }
    $scope.openCloseMenu = openCloseMenu;
    $scope.go = go;
    $scope.productsJSON = productsJSON;
    $scope.products = products;
    var getUrls = (arr, i) => {
        if (i >= arr.length) return;
        firebase.storage().ref('images/').child(arr[i]['imgId'] + '.png').getDownloadURL().then(function(url) {
            // Or inserted into an <img> element:

            productsJSON[arr[i]['id']]['imgurl'] = url;
            products[i]['imgurl'] = url;
            $scope.productsJSON = productsJSON;
            $scope.products = products;

            if (!$scope.$$phase) {
                $scope.$apply();
            }
            getUrls(arr, i + 1);
        })
    }
    firebase.database().ref('/products/').on('value', function(data) {
        var tempJSON = data.val();
        productsJSON = tempJSON;
        products = $.map(tempJSON, function(el) { return el });
        $scope.productsJSON = tempJSON;
        $scope.products = products;
        getUrls(products, 0);
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });
    firebase.database().ref('/invoices/').on('value', function(invoices) {
        var tempJSON = invoices.val();
        $scope.invoicesJSON = tempJSON;
        $scope.invoices = $.map(tempJSON, function(el) { return el });;
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

    var clientState = {
        name: 'Client',
        url: "/client/:id",
        templateUrl: 'assets/html/client.html',
        controller: function($scope, $stateParams) {
            $scope.$parent.title = 'Client Zone';
            $scope.clientId = $stateParams.id;
            resizeMenu();
        }

    };
    $stateProvider.state(clientState);

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

    var invoiceState = {
        name: 'Invoice',
        url: "/invoice?id&refund",
        templateUrl: 'assets/html/Invoice.html',
        controller: function($scope, $stateParams) {
            $scope.$parent.title = 'Invoice';
            $scope.invoiceId = $stateParams.id;
            $scope.refund = $stateParams.refund;
            resizeMenu();
        }

    };
    $stateProvider.state(invoiceState);

    var loginState = {
        name: 'login',
        url: "/login",
        templateUrl: 'assets/html/login.html',
        controller: function($scope) {
            $scope.$parent.title = 'Login';
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