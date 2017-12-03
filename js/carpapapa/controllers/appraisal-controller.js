angular
    .module('inspinia')
    .controller('CPAppraisalController', ['$scope', '$timeout', '$q', '$stateParams', '$state', '$location', '$window', '$uibModal', 'CPProductService', 'CPDataService',
    function($scope, $timeout, $q, $stateParams, $state, $location, $window, $uibModal, CPProductService, CPDataService) {

        console.log("appraisal controller");

        $scope.manufacturerBrands = [
            'ACURA','ALFA ROMEO','ASTON MARTIN','AUDI',
            'BENTLEY','BMW','BUGATTI','BUICK','CADILLAC',
            'CHEVROLET','CHRYSLER','CITROEN','DODGE',
            'FERRARI','FIAT','FORD','GEELY','GENERAL MOTORS',
            'GMC','HONDA','HYUNDAI','INFINITI','JAGUAR',
            'JEEP','KIA','KOENIGSEGG','LAMBORGHINI',
            'LAND ROVER','LEXUS','MASERATI','MAZDA','MCLAREN',
            'MERCEDES BENZ','MINI','MITSUBISHI','NISSAN',
            'PAGANI','PEUGEOT','PORSCHE','RAM','RENAULT',
            'ROLLS ROYCE','SAAB','SUBARU','SUZUKI',
            'TESLA','TOYOTA','VOLKSWAGEN','VOLVO'
        ];

        $scope.vehicle = {};
        $scope.customer = {};

        $scope.appraisal = function() {
            console.log('vehicle', $scope.vehicle);
            console.log('customer', $scope.customer);

            var url = '/appraisal.html#?';

            if ($scope.customer && $scope.customer.name) {
                url += '&name=' + $scope.customer.name + " ";
            }

            if ($scope.customer && $scope.customer.phone) {
                url += '&phone=' + formatPhoneNumber($scope.customer.phone) + " ";
            }

            if ($scope.vehicle) {
                if ($scope.vehicle.year) {
                    url += '&year=' + $scope.vehicle.year + " ";
                }

                if ($scope.vehicle.make) {
                    url += '&make=' + $scope.vehicle.make.toUpperCase() + " ";
                }

                if ($scope.vehicle.model) {
                    url += '&model=' + $scope.vehicle.model + " ";
                }

                if ($scope.vehicle.vin) {
                    url += '&vin=' + $scope.vehicle.vin.toUpperCase() + " ";
                }

                if ($scope.vehicle.color) {
                    url += '&color=' + $scope.vehicle.color.toUpperCase() + " ";
                }

                if ($scope.vehicle.mileage) {
                    url += '&mileage=' + $scope.vehicle.mileage + " ";
                }

                if ($scope.vehicle.cr) {
                    url += '&cr=' + $scope.vehicle.cr + " ";
                }

                if ($scope.vehicle.offer) {
                    url += '&offer=' + $scope.vehicle.offer + " ";
                }
            }

            $window.open(url, '_blank');
        }

        function formatPhoneNumber(s) {
          var s2 = (""+s).replace(/\D/g, '');
          var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
          return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
        }

    }])
