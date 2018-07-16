angular
    .module('inspinia')
    .controller('CPKeyManagementController', ['$scope', '$timeout', '$q', '$stateParams', '$location', '$window', 'CPProductService', 'DTOptionsBuilder',
    function($scope, $timeout, $q, $stateParams, $location, $window, CPProductService, DTOptionsBuilder) {

        $scope.inventoryDtOptions = DTOptionsBuilder.newOptions().withDisplayLength(100);
        $scope.assigned = {};
        $scope.error = {};

        getAvailableLocations();

        $scope.searchByVin = function(vin) {
            $scope.error.assignedProductError = '';

            CPProductService.searchProducts(null, null, null, null, null, null, null, vin).then(
                function(data) {
                    $scope.searched = true;
                    $scope.assigned.assignedProduct = data.products ? data.products[0] : null;
                }
            )
        }

        $scope.add = function() {
            if (!$scope.assigned.assignedProduct) {
                $scope.error.assignedProductError = 'Please make sure produce exists.';
            } else {
                $scope.error.assignedProductError = '';
            }

            if (!$scope.assigned.assignedLocation) {
                $scope.error.assignedLocationError = 'Please enter location.';
            } else if (!$scope.availableLocations.includes($scope.assigned.assignedLocation)) {
                $scope.error.assignedLocationError = 'Location ' + $scope.assigned.assignedLocation + ' is not available';
            } else {
                $scope.error.assignedLocationError = '';
            }

            if (!$scope.error.assignedProductError && !$scope.error.assignedLocationError) {
                CPProductService.addLocation($scope.assigned.assignedProduct.vin, $scope.assigned.assignedLocation).then(
                    function(data) {
                        $scope.keyManagements = data;
                        getAvailableLocations();
                    }
                )
            }
        }

        $scope.delete = function(vin, location) {
            CPProductService.deleteLocation(vin, location).then(
                function(data) {
                    $scope.keyManagements = data;
                    getAvailableLocations();
                }
            )
        }

        CPProductService.getKeyManagements().then(
            function(data) {
                $scope.keyManagements = data;
                console.log('keyManagements', $scope.keyManagements);
            }
        )

        function getAvailableLocations() {
            CPProductService.getAvailableLocations().then(
                function(data) {
                    console.log('locations', data);
                    $scope.availableLocations = data;
                }
            )
        }

    }])
