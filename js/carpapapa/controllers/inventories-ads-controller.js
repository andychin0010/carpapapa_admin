angular
    .module('inspinia')
    .controller('CPInventoriesAdsController', ['$scope', '$timeout', '$q', '$stateParams', '$location', '$window', '$filter', '$uibModal',
    function($scope, $timeout, $q, $stateParams, $location, $window, $filter, $uibModal) {

        $scope.ad = {};

        $scope.createAd = function(ad) {
            $window.open('/ads.html#?id1=' + ad.position1
             + '&id2=' + ad.position2
             + '&id3=' + ad.position3
             + '&id4=' + ad.position4
             + '&id5=' + ad.position5
             + '&id6=' + ad.position6
             + '&price1=' + (ad.price1 ? ad.price1 : '')
             + '&price2=' + (ad.price2 ? ad.price2 : '')
             + '&price3=' + (ad.price3 ? ad.price3 : '')
             + '&price4=' + (ad.price4 ? ad.price4 : '')
             + '&price5=' + (ad.price5 ? ad.price5 : '')
             + '&price6=' + (ad.price6 ? ad.price6 : '')
             , '_blank');
        }
    }])
