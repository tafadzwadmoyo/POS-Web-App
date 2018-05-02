/*
    Designed by Tafadzwa
*/

var app = angular.module('sell', []);
var cart = {};
var subtotal = 0;
app.controller('sellController', function($scope) {

    if ($scope.$parent.$parent.products) {

    } else setTimeout(null, 1000);
    if ($scope.$parent.$parent.products) {

    } else setTimeout(null, 1000);
    $scope.productsJSON = $scope.$parent.$parent.productsJSON;
    $scope.products = $scope.$parent.$parent.products;

    $scope.go = go;
    $scope.cart = cart;
    $scope.subtotal = subtotal;
    $scope.addToCart = (id, qty) => {
        if ($scope.$parent.$parent.productsJSON[id]) {
            $scope.cart[id] = $scope.$parent.$parent.productsJSON[id];
            $scope.cart[String(id)]['qty'] = parseInt(qty);
            cart[id] = $scope.cart[id];
            subtotal += $scope.cart[String(id)]['qty'] * parseInt($scope.cart[String(id)]['s-price']);
            $scope.subtotal = subtotal;
        }
    }
    if ($scope.stateParams && $scope.stateParams['id'] && $scope.stateParams['qty']) {
        $scope.addToCart($scope.stateParams['id'], $scope.stateParams['qty'])
    }
});