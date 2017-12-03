angular
    .module('inspinia')
    .controller('CPCustomersController', ['$scope', '$timeout', '$q', '$stateParams', '$location', '$window', 'CPCustomerService',
    function($scope, $timeout, $q, $stateParams, $location, $window, CPCustomerService) {
        $scope.customer = {};

        init();

        function init() {
            getCustomers();
        }

        function getCustomers() {
            CPCustomerService.getCustomers().then(
                function(data) {
                    $scope.customers = data;
                    console.log(data);
                    $timeout(function() {
                        $('.footable').trigger('footable_initialize');
                    }, 100)

                }
            );
        }

        $scope.addCustomer = function(customer) {
            if (customer && customer.name) {
                CPCustomerService.createCustomer(customer).then(
                    function() {
                        $scope.customer = {};
                        getCustomers();
                    }
                )
            }
            console.log('customer', customer);
        }

        $scope.updateCustomer = function(customer) {
            if (customer.id) {
                CPCustomerService.updateCustomer(customer).then(
                    function() {
                        $scope.customer = {};
                        getCustomers();
                    }
                )
            }
        }

        $scope.search = function(searchTerm) {
            if (!searchTerm) {
                getCustomers();
            } else {
                CPCustomerService.searchCustomers(searchTerm).then(
                    function(data) {
                        console.log('search', data);
                        $scope.customers = data;
                        $timeout(function() {
                            $('.footable').trigger('footable_initialize');
                        }, 100)
                    }
                )
            }
        }

        $scope.editRow = function(customer) {
            $scope.customer = customer;
            // customer.isEdit = true;
            // console.log(customer);
        }

        $scope.cancelEdit = function() {
            $scope.customer = {};
        }
    }])

angular.module('inspinia').filter('tel', function () {
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        if (country == 1) {
            country = "";
        }

        number = number.slice(0, 3) + ' - ' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    };
});
