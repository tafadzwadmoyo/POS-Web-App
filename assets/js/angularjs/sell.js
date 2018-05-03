/*
    Designed by Tafadzwa
*/

var app = angular.module('sell', []);
var cart = {};
setSubTotal = ($scope) => {
    var subtotal = 0;
    for (i in cart) {
        subtotal += parseInt(cart[i]['qty']) * parseInt(cart[i]['s-price'])
    }
    $scope.subtotal = subtotal;
    if (!$scope.$$phase) {
        $scope.$apply();
    }

}
app.controller('sellController', function($scope) {
    $scope.$parent.$parent.productsJSON;
    $scope.$parent.$parent.products;

    $scope.go = go;
    $scope.cart = cart;
    $scope.setSubTotal = () => {
        setSubTotal($scope);
    }
    $scope.setSubTotal();
    $scope.addToCart = (id, qty) => {
        if ($scope.$parent.$parent.productsJSON[id]) {
            $scope.cart[id] = $scope.$parent.$parent.productsJSON[id];
            $scope.cart[id]['qty'] = parseInt(qty);
            cart[id] = $scope.cart[id];
            $scope.setSubTotal();
        }
    }
    if ($scope.stateParams && $scope.stateParams['id'] && $scope.stateParams['qty']) {
        $scope.addToCart($scope.stateParams['id'], $scope.stateParams['qty'])
    }
    $scope.setQty = (id, value) => {
        if (value < 0) value = 0;
        cart[id]['qty'] = value;
        $scope.cart = cart;
        $scope.setSubTotal();
    }
    $scope.parseInt = parseInt;
    $scope.delete = (id) => {
        delete cart[id];
        $scope.cart = cart;
        $scope.setSubTotal();
    }
});

app.controller('paymentController', function($scope) {
    $scope.setSubTotal = () => {
        setSubTotal($scope);
    }
    $scope.setSubTotal();
    $scope.go = go;
    $scope.purchase = () => {
        var updates = {};
        for (i in cart) {
            value = parseInt($scope.$parent.$parent.productsJSON[cart[i]['id']]['stock']) - parseInt(cart[i]['qty']);
            if (value < 0) value = 0;
            console.log($scope.$parent.$parent.productsJSON[cart[i]['id']]);
            updates['/products/' + cart[i]['id'] + "/stock"] = value;
        }
        firebase.database().ref().update(updates);
        cart = {};
        go('payment_thank_you');
    }
});