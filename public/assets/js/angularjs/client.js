var app = angular.module('client', []);
app.controller('clientController', function($scope) {
    $('#menu_li').hide();
    $('#bottom_menu').hide();
    $scope.profile = { name: "Tafadzwa Moyo", imgurl: "assets/images/profile_pic.jpg", role: "Manager" }
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
app.controller('clientLoginController', function($scope) {
    $('#menu_li').hide();
    $('#bottom_menu').hide();
    $scope.login = () => {
        var email = $('#login-email-input').val().replace("@", "__-at-__").replace(".", "__-dot-__");
        firebase.database().ref('/users/' + email).once('value').then(function() {
            go('client/' + email);
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error.code);
            console.log(error.message);
            // ...
        });
    }
    $scope.enterLogin = function(keyEvent) {
        if (keyEvent.which === 13)
            $scope.login();
    }
});