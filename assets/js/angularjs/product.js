/*
    Designed by Tafadzwa
*/

var app = angular.module('product', []);
app.factory('getProduct', function() {
    var services = {};
    services.get = (id) => {
        return firebase.database().ref('/products/' + id + '/').once('value');
    }
    return services;
});

app.controller('productController', function($scope, getProduct) {
    if ($scope.$parent.productId == 'new') {
        var newPostKey = firebase.database().ref().child('products').push().key;

        $scope.product = {
            "c-price": "cost",
            "category": "category",
            "color": "Product Color",
            "description": "Description of product",
            "id": newPostKey,
            "name": "Product Name",
            "s-price": "price",
            "stock": "qty"
        }

    } else getProduct.get($scope.$parent.productId).then(function(data) {
        $scope.product = data.val();
    })
    $scope.save = () => {
        $scope.product['name'] = $("#product-title :input").val();
        $scope.product['color'] = $("#product-color :input").val();
        $scope.product['s-price'] = $("#product-selling-price :input").val();
        $scope.product['c-price'] = $("#product-cost-price :input").val();
        $scope.product['description'] = $("#product-description :input").val();
        $scope.product['stock'] = $("#product-quantity :input").val();
        var updates = {};
        updates['/products/' + $scope.product['id']] = $scope.product;
        firebase.database().ref().update(updates);
        go("stock");
    }

});