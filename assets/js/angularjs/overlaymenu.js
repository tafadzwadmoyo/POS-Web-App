var app = angular.module('overlayMenu', []);

app.controller('overlayMenuController', function($scope) {
    $scope.menu_items = [{target: "Tafadzwa Moyo", icon: "/assets/images/profile_pic.jpg", content: "Hello World!"},{target: "Tafadzwa Moyo", icon: "/assets/images/profile_pic.jpg", content: "Hello World!"}];
});


angular.module('overlayMenu').component('menuItem', {
    templateUrl: '/assets/html/menu_item.html',
    bindings: { 
        message: '='  //Two way binding here, may cause errors in future
    }
});