var app = angular.module('targetPage', []);
var changePage=function ($scope, targetValue) {
    //$scope must be defind otherwise it crashes
    jQuery(targetValue+"-page").removeClass('main-inactive');
    jQuery($scope.current_active+"-page").addClass('main-inactive');
    $scope.current_active=targetValue;
    $("#overlay_menu").hide( "slide", { direction: "left"  }, 500 );
}
app.controller('targetPageController', function($scope) {
    $scope.pages =pages;
    $scope.current_active='home';
    $scope.changeTarget=function (targetValue){changePage($scope, targetValue)};
});

for (var page in pages){
    angular.module('targetPage').component(pages[page].target+'Page', {
        templateUrl: pages[page].url,
        bindings: { 
            data: '='  //Two way binding here, may cause errors in future
        }
    });
}