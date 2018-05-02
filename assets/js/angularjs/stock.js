/*
    Designed by Tafadzwa
*/

var app = angular.module('stock', []);

app.controller('stockController', function($scope) {
    $scope.setStock = function(product, value) {
        var updates = {};
        updates['/products/' + product['id'] + "/stock"] = value;
        firebase.database().ref().update(updates);
        product['stock'] = value;
    };
    $scope.go = go;
    $scope.parseInt = parseInt;
});