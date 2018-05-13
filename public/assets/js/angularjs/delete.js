var app = angular.module('delete', []);
app.controller('deleteController', function($scope) {
    checkLogin();
    $scope.productImgUrl = $scope.$parent.productImgUrl;
    $scope.productName = $scope.$parent.productName;
    $scope.go = go;
    $scope.delete = () => {
        firebase.database().ref('/products/' + $scope.$parent.productId).remove();
        go('stock');
    }
});