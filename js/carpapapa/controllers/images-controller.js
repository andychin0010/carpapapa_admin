angular
    .module('inspinia')
    .controller('CPImagesController', ['$scope', '$timeout', '$q', '$stateParams', '$state', '$location', '$window', '$uibModal', 'CPProductService', 'CPDataService',
    function($scope, $timeout, $q, $stateParams, $state, $location, $window, $uibModal, CPProductService, CPDataService) {

        var dataURItoBlob = function(dataURI) {
          var binary = atob(dataURI.split(',')[1]);
          var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
          var array = [];
          for(var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
          }
          return new Blob([new Uint8Array(array)], {type: mimeString});
        };

        $scope.image = CPDataService.getCropImage();
        console.log('image', $scope.image);

        if ($scope.image.type === 'DEFAULT') {
            $scope.cropWidth = 829;
            $scope.cropHeight = 726;
        } else if ($scope.image.type === 'ICON') {
            $scope.cropWidth = 585;
            $scope.cropHeight = 534;
        }

        $scope.overwriteImage = function(id, path, image) {
            var blob = new Blob([image], {type: 'image/jpg'});
            var result = dataURItoBlob(image);

            CPProductService.overwriteImage(id, path, result).then(
                function() {
                    CPDataService.setShowImageTab();
                    $state.go('commerce.product_update', {id: CPDataService.getProductId()});
                }
            )
        }
    }])
