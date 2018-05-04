var app = angular.module('client', []);
app.controller('clientController', function($scope) {
    $scope.invoices = [];
    $scope.go = go;
    $scope.String = String;
    firebase.database().ref('/users/' + $scope.$parent.clientId + '/invoices').on('value', function(invoice_ids) {
        firebase.database().ref('/invoices/').once('value', ).then(function(invoices) {
            for (i in invoice_ids.val()) {
                $scope.invoices.push(invoices.val()[i]);
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
    });
});