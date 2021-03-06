angular
    .module('inspinia')
    .controller('CPInventoriesInventoryController', ['$scope', '$timeout', '$q', '$stateParams', '$location', '$window', '$filter', '$uibModal', 'CPProductService', 'DTOptionsBuilder',
    function($scope, $timeout, $q, $stateParams, $location, $window, $filter, $uibModal, CPProductService, DTOptionsBuilder) {

        // setInterval(function(){
        //     checkInventory();
        // },60000)

        $scope.inventoryProducts = {};
        $scope.missingVin = [];
        var productsMap = {};

        // $scope.inventoryChecklistDtOptions = DTOptionsBuilder.newOptions()
        //     .withDisplayLength(100);
        //
        // $scope.keyChecklistDtOptions = DTOptionsBuilder.newOptions()
        //     .withDisplayLength(100);

        // Inventory Datatable
        console.log('testing', DTOptionsBuilder);
        console.log($scope.inventoryDtOptions);
        $scope.inventoryDtOptions = DTOptionsBuilder.newOptions().withDisplayLength(100);

            // .withDOM('<"html5buttons"B>lTfgitp');
            // .withButtons([
            //     {extend: 'copy'},
            //     {extend: 'csv'},
            //     {extend: 'excel', title: 'ExampleFile'},
            //     {extend: 'pdf', title: 'ExampleFile'},
            //
            //     {extend: 'print',
            //         customize: function (win){
            //             $(win.document.body).addClass('white-bg');
            //             $(win.document.body).css('font-size', '10px');
            //
            //             $(win.document.body).find('table')
            //                 .addClass('compact')
            //                 .css('font-size', 'inherit');
            //         }
            //     }
            // ]);

        CPProductService.getInventoryProducts().then(
            function(data) {
                $scope.inventoryProducts = data.products;

                angular.forEach(data.products, function(product) {
                    if (product.vin) {
                        productsMap[product.vin] = product;
                    } else {
                        $scope.missingVin.push(product);
                    }
                })

                checkInventory();
            }
        )

        CPProductService.getKeyManagements().then(
            function(data) {
                $scope.keyManagements = data;
                console.log('keyManagements', $scope.keyManagements);
            }
        )

        CPProductService.getAvailableLocations().then(
            function(data) {
                console.log('locations', data);
            }
        )

        function checkInventory() {
            var currentTime = Date.now();

            CPProductService.getInventoryChecklist().then(
                function(data) {
                    console.log('testing', data);
                    $scope.inInventory = [];
                    $scope.missingInventory = [];
                    $scope.unknownInventory = [];

                    angular.forEach(data, function(productCheck) {
                        if (productCheck.vin in productsMap) {
                            productsMap[productCheck.vin].lastCheckTimestamp = productCheck.lastCheckTimestamp;
                            if ((Math.abs(currentTime - productCheck.lastCheckTimestamp) / 36e5) < 20) {
                                productsMap[productCheck.vin].inInventory = true;
                            }
                        } else {
                            $scope.unknownInventory.push(productCheck);
                        }
                    })

                    angular.forEach(productsMap, function(product) {
                        if (product.inInventory) {
                            $scope.inInventory.push(product);
                        } else {
                            $scope.missingInventory.push(product);
                        }
                    })
                }
            )
        }
    }])
