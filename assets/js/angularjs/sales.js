var app = angular.module('sales', []);
var sales_days = {};
app.controller('salesController', function($scope) {
    firebase.database().ref('/invoices/').on('value', function(data) {
        var invoices = data.val();
        var first = true;
        var d = new Date();
        var month = String(d.getMonth() + 1);
        var date = String(d.getDate());
        if (month.length == 1) {
            month = '0' + month;
        }
        if (date.length == 1) {
            date = '0' + date;
        }
        $scope.mindate = $scope.maxdate = String(d.getFullYear()) + '-' + month + '-' + date;
        $('#sales-period-start').val($scope.mindate);
        $('#sales-period-end').val($scope.maxdate);
        for (i in invoices) {
            if (first) {

                var month = String(invoices[i]['time-stamp']['month']);
                var date = String(invoices[i]['time-stamp']['date']);
                if (month.length == 1) {
                    month = '0' + month;
                }
                if (date.length == 1) {
                    date = '0' + date;
                }
                $scope.mindate = String(invoices[i]['time-stamp']['year']) + '-' + month + '-' + date;
                first = false;
            }
            var timeStamp = String(invoices[i]['time-stamp']['year']) + '-' + String(invoices[i]['time-stamp']['month']) + '-' + String(invoices[i]['time-stamp']['date']);
            if (sales_days[timeStamp]) {
                sales_days[timeStamp]['amount'] += parseInt(invoices[i]['total']);
            } else {
                sales_days[timeStamp] = {
                    'amount': parseInt(invoices[i]['total']),
                    'cost': 0,
                    'time-stamp': timeStamp,
                    'time-stamp-arr': invoices[i]['time-stamp']

                }
            }
            for (j in invoices[i]['items']) {
                sales_days[timeStamp]['cost'] += parseInt(invoices[i]['items'][j]['c-price']) * parseInt(invoices[i]['items'][j]['qty']);
            }
            $('#sales-period-start').val($scope.mindate);
            $('#sales-period-end').val($scope.maxdate);
        }



        $scope.changeRange = () => {
            var start = $('#sales-period-start').val().split("-");
            $('#sales-period-start').attr('max', $('#sales-period-end').val());
            var end = $('#sales-period-end').val().split("-");
            var cost = 0;
            var revenue = 0;
            $scope.sales_days = [];
            for (i in start) {
                start[i] = parseInt(start[i]);
            }
            for (i in end) {
                end[i] = parseInt(end[i]);
            }
            for (i in sales_days) {
                if ( //checking start conditions
                    ((sales_days[i]['time-stamp-arr']['year'] > start[0]) ||
                        (sales_days[i]['time-stamp-arr']['year'] == start[0] && sales_days[i]['time-stamp-arr']['month'] > start[1]) ||
                        (sales_days[i]['time-stamp-arr']['year'] == start[0] && sales_days[i]['time-stamp-arr']['month'] == start[1] && sales_days[i]['time-stamp-arr']['date'] >= start[2])) &&
                    //checking end conditions
                    ((sales_days[i]['time-stamp-arr']['year'] < end[0]) ||
                        (sales_days[i]['time-stamp-arr']['year'] == end[0] && sales_days[i]['time-stamp-arr']['month'] < end[1]) ||
                        (sales_days[i]['time-stamp-arr']['year'] == end[0] && sales_days[i]['time-stamp-arr']['month'] == end[1] && sales_days[i]['time-stamp-arr']['date'] <= end[2]))) {
                    $scope.sales_days.push(sales_days[i]);
                    cost += parseInt(sales_days[i]['cost']);
                    revenue += parseInt(sales_days[i]['amount']);
                }
            }
            $scope.revenue = revenue;
            $scope.profit = revenue - cost;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }
        $scope.changeRange();
    });
});