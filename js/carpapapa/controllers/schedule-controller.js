angular
    .module('inspinia')
    .controller('CPScheduleController', ['$scope', '$timeout', '$q', '$stateParams', '$location', '$window', '$filter', '$uibModal', 'CPProductService',
    function($scope, $timeout, $q, $stateParams, $location, $window, $filter, $uibModal, CPProductService) {

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        console.log('date', date);

        // Events
        $scope.events = [
            {title: 'All Day',start: new Date(y, m, 1)},
            {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
            {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
            {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ];

        $scope.open = function (date, data) {
            console.log('yes');
            var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'views/modals/schedule-modal.html',
              controller: 'CPScheduleModalController',
              scope: $scope,
            //   controllerAs: '$ctrl',
              resolve: {
                data: function () {
                  return { 'date': date, 'data': $scope.events };
                }
              }
            });

            // modalInstance.result.then(function (selectedItem) {
            //   $ctrl.selected = selectedItem;
            // }, function () {
            // //   $log.info('Modal dismissed at: ' + new Date());
            // });
          };


        var imageUpdated = true;
        console.log('Schedule Controller');




        /* message on eventClick */
        $scope.onEventClick = function( event, allDay, jsEvent, view ){
            console.log('eventClick');
            $scope.alertMessage = (event.title + ': Clicked ');
        };
        /* message on Drop */
        $scope.onDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
            console.log('eventDrop');
            $scope.alertMessage = (event.title +': Droped to make dayDelta ' + dayDelta);
        };
        /* message on Resize */
        $scope.onResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view){
            $scope.alertMessage = (event.title +': Resized to make dayDelta ' + minuteDelta);
        };

        $scope.onDayClick = function(date, jsEvent, view) {
            console.log('event', $filter('date')(date, 'MM/dd/yyyy'));
            $scope.open(date);
        };

        /* config object */
        $scope.uiConfig = {
            calendar:{
                height: 450,
                editable: true,
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                eventClick: $scope.onEventClick,
                eventDrop: $scope.onDrop,
                eventResize: $scope.onResize,
                dayClick: $scope.onDayClick
            }
        };

        /* Event sources array */
        $scope.eventSources = [$scope.events];

    }])
