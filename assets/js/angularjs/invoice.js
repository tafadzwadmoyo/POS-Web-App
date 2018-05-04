var app = angular.module('invoice', []);
app.controller('invoiceController', function($scope) {
    $scope.String = String;
    firebase.database().ref('/invoices/' + $scope.$parent.invoiceId).once('value', ).then(function(invoice) {
        $scope.invoice = invoice.val();
    });
    if ($scope.$parent.refund) {
        $('.invoice-refund').css('display', 'block');
        $('.not-invoice-refund').css('display', 'none');
    }
});