angular
    .module('inspinia')
    .controller('CPImagesModalController', ['$scope', '$uibModalInstance', 'CPProductService', 'data',
    function($scope, $uibModalInstance, CPProductService, data) {
        console.log('data', data);

        console.log('image', $scope.myImage);
        console.log(new Image($scope.myImage));

        var image = new Image();
        image.src = $scope.myImage;
        console.log('asfd', image);
        console.log('width', image.width);
        console.log('height', image.height);

        $scope.testHeight = 50;
        if (data) {
            // console.log('data.data', data.data);
            // console.log('date', data.date);
            // var result = data.data.filter(function(event) {
            //     console.log('event!!!', event.start.toString());
            //     if (event.start.toString() == data.date) {
            //         event.title = 'testing';
            //         return event.start;
            //     }
            //     // event.start == data.date
            // });
            // console.log('result', result);
        }


        $scope.close = function() {
            console.log('closed');
            $uibModalInstance.close();
        }

        $scope.createEvent = function() {
            console.log('createEvent');
            console.log('title', $scope.name);
            // console.log('test', $ctrl.testing);
            // $uibModalInstance.close();
        }
    }])
