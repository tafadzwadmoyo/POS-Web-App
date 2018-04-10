/*
    Designed by Tafadzwa Moyo
*/

app=angular.module('pos', ['chatMessageBox','messageBox','overlayMenu', 'profile', 'ui.router']);
app.controller('posController', function($scope) {
    $scope.openCloseMenu=openCloseMenu;
})
app.config(function($stateProvider, $urlRouterProvider) {
    for (i in pages){
        var state={
            name: pages[i].content,
            url: "/"+pages[i].target,
            templateUrl:pages[i].url,
            controller: function($scope){
                $scope.$parent.title=$scope.$resolve.$state$.name;
                resizeMenu();
            }
        };
        $stateProvider.state(state);
    }
    $urlRouterProvider.otherwise('/home');
    
  });