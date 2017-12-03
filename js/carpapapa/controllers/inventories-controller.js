angular
    .module('inspinia')
    .controller('CPInventoriesController', ['$scope', '$timeout', '$q', '$stateParams', '$location', '$window', '$filter', '$uibModal', 'CPProductService', 'DTOptionsBuilder',
    function($scope, $timeout, $q, $stateParams, $location, $window, $filter, $uibModal, CPProductService, DTOptionsBuilder) {

        $scope.monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

        $scope.inventoryProducts = {};
        $scope.inventoryHistory = {};

        var date = new Date();

        // Inventory Datatable
        $scope.inventoryDtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100)
            .withDOM('<"html5buttons"B>lTfgitp')
            .withButtons([
                {extend: 'copy'},
                {extend: 'csv'},
                {extend: 'excel', title: 'ExampleFile'},
                {extend: 'pdf', title: 'ExampleFile'},

                {extend: 'print',
                    customize: function (win){
                        $(win.document.body).addClass('white-bg');
                        $(win.document.body).css('font-size', '10px');

                        $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                    }
                }
            ]);

        CPProductService.getInventoryProducts().then(
            function(data) {
                console.log('inventories', data);
                $scope.inventoryProducts = data.products;
            }
        )

        // History Datatable
        $scope.historyDtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100)
            .withDOM('<"html5buttons"B>lTfgitp')
            .withButtons([
                {extend: 'copy'},
                {extend: 'csv'},
                {extend: 'excel', title: 'ExampleFile'},
                {extend: 'pdf', title: 'ExampleFile'},

                {extend: 'print',
                    customize: function (win){
                        $(win.document.body).addClass('white-bg');
                        $(win.document.body).css('font-size', '10px');

                        $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                    }
                }
            ]);



        $scope.updateInventoryHistory = function(month) {
            $scope.month = month;
            $scope.monthPrev = (month - 1 < 0) ? 11 : month - 1;
            $scope.monthNext = (month + 1 > 11) ? 0 : month + 1;

            var firstDay = new Date(date.getFullYear(), month, 1);
            var lastDay = new Date(date.getFullYear(), month + 1);

            CPProductService.getInventoryHistory(firstDay.getTime() / 1000, lastDay.getTime() / 1000).then(
                function(data) {
                    console.log('inventories', data);
                    $scope.inventoryHistory = data.products;
                }
            )
        }

        $scope.updateInventoryHistory(date.getMonth());


    }])
