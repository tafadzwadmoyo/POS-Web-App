var app = angular.module('login', []);
app.controller('loginController', function($scope) {
    $scope.login = () => {
        firebase.auth().signInWithEmailAndPassword($('#login-email-input').val(), $('#login-password-input').val()).then(function() {
            go('home');
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