angular
    .module('inspinia')
    .service('CPOfferService', ['$http', function($http) {

        var HOST = 'http://localhost:8081';

        this.createOffer = function(offer) {
            return $http({
                method: 'POST',
                url: HOST + '/offers/create',
                data: offer
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }

        this.getOfferId = function(id) {
            return $http({
                method: 'GET',
                url: HOST + '/offers/' + id,
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }

        this.getOffersByProductId = function(productId) {
            return $http({
                method: 'GET',
                url: HOST + '/offers/products/' + productId
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }

        this.getOffers = function(limit, offset) {
            return $http({
                method: 'GET',
                url: HOST + '/offers'
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }
    }])
