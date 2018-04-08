var app = angular.module('overlayMenu', []);

app.controller('overlayMenuController', function($scope) {
    $scope.menu_items = [{target: "chat", icon: "/assets/icons/overlay_menu/chat.png", content: "Chat"},
        {target: "sell", icon: "/assets/icons/overlay_menu/sell.png", content: "Sell"},
        {target: "stock", icon: "/assets/icons/overlay_menu/stock.png", content: "Stock"},
        {target: "refund", icon: "/assets/icons/overlay_menu/refund.png", content: "Refund"},
        {target: "sales", icon: "/assets/icons/overlay_menu/sales.png", content: "Sales Report"},
        {target: "balance", icon: "/assets/icons/overlay_menu/balance.png", content: "Balance Inquiry"},
        {target: "discount", icon: "/assets/icons/overlay_menu/discount.png", content: "Discount"},
        {target: "settings", icon: "/assets/icons/overlay_menu/settings.png", content: "Settings"},
        {target: "feedback", icon: "/assets/icons/overlay_menu/feedback.png", content: "Send Feedback"},
        {target: "help", icon: "/assets/icons/overlay_menu/help.png", content: "Help"}];
    $scope.changeTarget=function (targetValue){changePage($scope, targetValue)};  
});


angular.module('overlayMenu').component('menuItem', {
    templateUrl: '/assets/html/menu_item.html',
    bindings: { 
        item: '=',  //Two way binding here, may cause errors in future,
        changeTarget: '&'
    }
});