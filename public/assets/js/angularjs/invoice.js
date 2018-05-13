var app = angular.module('invoice', []);
app.controller('invoiceController', function($scope) {
    //checkLogin();
    $scope.String = String;
    firebase.database().ref('/invoices/' + $scope.$parent.invoiceId).once('value', ).then(function(invoice) {
        $scope.invoice = invoice.val();
        $scope.invoice.items_og = $scope.invoice.items;
    });
    if ($scope.$parent.refund) {
        $scope.refund = true;
    } else {
        $scope.refund = false;
    }
    $scope.save = () => {
        var updates = {};

        for (i in $scope.invoice.items) {
            updates['/products/' + i + "/stock"] = $scope.$parent.$parent.productsJSON[i].stock - ($scope.invoice.items_og[i]['qty'] - $scope.invoice.items[i]['qty'])
        }
        delete $scope.invoice.items_og;
        updates['/invoices/' + $scope.$parent.invoiceId] = $scope.invoice;
        console.log(updates);
        firebase.database().ref().update(updates);
        go('refund');
    }
    $scope.setSubTotal = () => {
        var subtotal = 0;
        for (i in $scope.invoice.items) {
            subtotal += parseInt($scope.invoice.items[i]['qty']) * parseInt($scope.invoice.items[i]['s-price'])
        }
        $scope.invoice.subtotal = subtotal;
        $scope.invoice.vat = subtotal * .15;
        $scope.invoice.total = subtotal * 1.15;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }

});