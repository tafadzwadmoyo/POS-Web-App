var app = angular.module('refund', []);
app.controller('refundController', function($scope) {
    checkLogin($scope);
    $scope.String = String;
    $scope.go = go;
});