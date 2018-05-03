/*
    Designed by Tafadzwa
*/

var app = angular.module('stock', []);

app.controller('stockController', function($scope) {
    $scope.setStock = function(product, value) {
        if (value < 0) value = 0;
        var updates = {};
        updates['/products/' + product['id'] + "/stock"] = value;
        firebase.database().ref().update(updates);
        product['stock'] = value;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.go = go;
    $scope.parseInt = parseInt;
});