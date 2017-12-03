angular
    .module('inspinia')
    .service('CPCustomerService', ['$timeout', '$http', function($timeout, $http) {

        var HOST = 'http://localhost:8081';

        this.createCustomer = function(customer) {
            return $http({
                method: 'POST',
                url: HOST + '/customers/create',
                data: customer
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }

        this.updateCustomer = function(customer) {
            return $http({
                method: 'POST',
                url: HOST + '/customers/' + customer.id + '/update',
                data: customer
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }

        this.getCustomerById = function(id) {
            return $http({
                method: 'GET',
                url: HOST + '/customers/' + id,
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }

        this.getCustomers = function(limit, offset) {
            return $http({
                method: 'GET',
                url: HOST + '/customers?all=true&limit=' + limit + '&offset=' + offset
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }

        this.getCustomerCount = function() {
            return $http({
                method: 'GET',
                url: HOST + '/customers/count'
            }).then(function sucess(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }

        this.searchCustomers = function(searchTerm) {
            return $http({
                method: 'GET',
                url: HOST + '/customers/search?searchTerm=' + searchTerm
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }
    }])
