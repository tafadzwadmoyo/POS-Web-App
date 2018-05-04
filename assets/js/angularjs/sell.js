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
        firebase.database().ref('app-info/next-invoice-number').once('value').then(function(data) {
            // Or inserted into an <img> element:
            invoiceNumber = data.val();
            var updates = {};
            for (i in cart) {
                value = parseInt($scope.$parent.$parent.productsJSON[cart[i]['id']]['stock']) - parseInt(cart[i]['qty']);
                if (value < 0) value = 0;
                updates['/products/' + cart[i]['id'] + "/stock"] = value;
                updates['invoices/' + String(invoiceNumber) + '/items/' + cart[i]['id'] + '/qty'] = cart[i]['qty'];
                updates['invoices/' + String(invoiceNumber) + '/items/' + cart[i]['id'] + '/c-price'] = cart[i]['c-price'];
                updates['invoices/' + String(invoiceNumber) + '/items/' + cart[i]['id'] + '/s-price'] = cart[i]['s-price'];
                updates['invoices/' + String(invoiceNumber) + '/items/' + cart[i]['id'] + '/name'] = cart[i]['name'];
                updates['invoices/' + String(invoiceNumber) + '/items/' + cart[i]['id'] + '/id'] = cart[i]['id'];
            }

            var d = new Date();
            var timeStamp = {
                'year': d.getFullYear(),
                'month': d.getMonth() + 1,
                'date': d.getDate(),
                'hours': d.getHours(),
                'minutes': d.getMinutes(),
                'seconds': d.getSeconds()
            }

            updates['invoices/' + String(invoiceNumber) + '/subtotal'] = $scope.subtotal;
            updates['invoices/' + String(invoiceNumber) + '/vat'] = $scope.subtotal * .15;
            updates['invoices/' + String(invoiceNumber) + '/total'] = $scope.subtotal * 1.15;
            updates['invoices/' + String(invoiceNumber) + '/time-stamp'] = timeStamp;
            if ($('#sell-email-address-input').val().length > 2) {
                str = "Visit Microsoft!";
                var client = $('#sell-email-address-input').val().replace("@", "__-at-__");
                client = client.replace(".", "__-dot-__");
                updates['invoices/' + String(invoiceNumber) + '/client'] = client;
                updates['invoices/' + String(invoiceNumber) + '/invoiceNumber'] = invoiceNumber;
                updates['users/' + client + '/invoices/' + String(invoiceNumber)] = invoiceNumber;
            }

            updates['app-info/next-invoice-number'] = invoiceNumber + 1;
            firebase.database().ref().update(updates);
            cart = {};
            go('payment_thank_you');
        })
    }
});