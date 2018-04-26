/*
    Designed by Tafadzwa
*/

var app = angular.module('item', []);

app.controller('itemController', function($scope) {
    $scope.go = go;
});


angular.module('item').component('itemBox', {
    templateUrl: '/assets/html/item.html',
    bindings: {
        message: '=' //Two way binding here, may cause errors in future
    }
});