angular
    .module('inspinia')
    .controller('CPImagesModalController', ['$scope', '$uibModalInstance', '$uibModal', 'CPProductService', 'data',
    function($scope, $uibModalInstance, $uibModal, CPProductService, data) {
        console.log('data', data);

        $scope.images = [
            { path: 'images/3be37e5d-ee6a-4a33-829b-df2f083382ef.JPG' },
            { path: 'images/3be37e5d-ee6a-4a33-829b-df2f083382ef.JPG' },
            { path: 'images/3be37e5d-ee6a-4a33-829b-df2f083382ef.JPG' },
            { path: 'images/3be37e5d-ee6a-4a33-829b-df2f083382ef.JPG' },
            { path: 'images/3be37e5d-ee6a-4a33-829b-df2f083382ef.JPG' },
            { path: 'images/3be37e5d-ee6a-4a33-829b-df2f083382ef.JPG' }
        ];

        CPProductService.getImagesByProductId(data.id).then(
            function(response) {
                console.log('response', response);
                // $scope.images = response;
            }
        );
        // $scope.testHeight = 50;
        // if (data) {
        //     // console.log('data.data', data.data);
        //     // console.log('date', data.date);
        //     // var result = data.data.filter(function(event) {
        //     //     console.log('event!!!', event.start.toString());
        //     //     if (event.start.toString() == data.date) {
        //     //         event.title = 'testing';
        //     //         return event.start;
        //     //     }
        //     //     // event.start == data.date
        //     // });
        //     // console.log('result', result);
        // }

        $scope.editImage = function(image) {
            console.log("edit Images", image);

            console.log('yes');
            var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'views/modals/schedule-modal.html',
            //   controller: 'CPImagesModalController',
              scope: $scope,
            //   appendTo: '.testing',
              windowClass: 'zindex',
            //   size: 'lg',
              resolve: {
                data: function () {
                  return { id: $scope.id };
                }
              }
            });
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
