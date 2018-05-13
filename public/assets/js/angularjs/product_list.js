/*
    Designed by Tafadzwa
*/

var app = angular.module('productList', []);

app.controller('productListController', function($scope) {
    checkLogin($scope);
    if ($scope.$parent.$parent.products) {

    } else setTimeout(null, 1000);
    if ($scope.$parent.$parent.products) {

    } else setTimeout(null, 1000);
    $scope.productsJSON = $scope.$parent.$parent.productsJSON;
    $scope.products = $scope.$parent.$parent.products;
    $scope.go = go;
});