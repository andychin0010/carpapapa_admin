angular
    .module('inspinia')
    .controller('CPInventoriesInventoryController', ['$scope', '$timeout', '$q', '$stateParams', '$location', '$window', '$filter', '$uibModal', 'CPProductService', 'DTOptionsBuilder',
    function($scope, $timeout, $q, $stateParams, $location, $window, $filter, $uibModal, CPProductService, DTOptionsBuilder) {

        $scope.inventoryProducts = {};

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
                $scope.inventoryProducts = data.products;
            }
        )
    }])
