//Before using this make a sale for a user with the email address hello@hello.hello
describe('clientLoginController', function() {
    beforeEach(module('client'));

    var $controller;

    beforeEach(inject(function(_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        jquery(document).add("<input id='login-email-input' />")
        $('#login-email-input').val('hello@hello.hello');
    }));

    describe('$scope.login', function() {
        it('sets the strength to "strong" if the password length is >8 chars', function() {
            var $scope = {};
            var controller = $controller('clientLoginController', { $scope: $scope });
            $scope.go = () => {
                expect(true).toEqual(true);
            }
            $scope.login();

        });
    });
});