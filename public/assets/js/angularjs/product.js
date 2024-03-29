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
    checkLogin($scope);

    function readURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('#product-image').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }

    $("#product-new-image").change(function() {
        readURL(this);
    });
    if ($scope.$parent.productId == 'new') {
        var newPostKey = firebase.database().ref().child('products').push().key;

        $scope.product = {
            "c-price": "cost",
            "category": "category",
            "color": "Product Color",
            "description": "Description of product",
            "id": newPostKey,
            "imgurl": '/assets/images/placeholder.jpg',
            "name": "Product Name",
            "s-price": "price",
            "stock": "qty"
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }

    } else getProduct.get($scope.$parent.productId).then(function(data) {
        $scope.product = data.val();
        firebase.storage().ref('images/').child($scope.product['imgId']).getDownloadURL().then(function(url) {
            // Or inserted into an <img> element:

            $scope.product['imgurl'] = url;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        })
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    })

    $scope.save = () => {
        if ($('#product-new-image').get(0).files.length > 0) {
            var newPostKey = firebase.database().ref().child('files/images').push().key;
            var updates = {
                productId: $scope.product['id'],
                id: newPostKey
            };

            firebase.database().ref('files/images/' + newPostKey).update(updates);

            var file = $("#product-new-image")[0].files[0];
            var name = file.name.split('.');
            var type = name[name.length - 1];
            var storageRef = firebase.storage().ref("images/" + newPostKey + '.' + type);
            storageRef.put(file);
            $scope.product['imgId'] = newPostKey + '.' + type;
        }
        $scope.product['name'] = $("#product-title :input").val();
        $scope.product['color'] = $("#product-color :input").val();
        $scope.product['s-price'] = $("#product-selling-price :input").val();
        $scope.product['c-price'] = $("#product-cost-price :input").val();
        $scope.product['description'] = $("#product-description :input").val();
        $scope.product['stock'] = $("#product-quantity :input").val();
        delete $scope.product['imgurl'];
        var updates = {};
        updates['/products/' + $scope.product['id']] = $scope.product;
        firebase.database().ref().update(updates);


        go("stock");
    }

});