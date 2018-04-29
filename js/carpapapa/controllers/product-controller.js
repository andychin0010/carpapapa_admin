angular
    .module('inspinia')
    .controller('CPProductController', ['$scope', '$timeout', '$q', '$stateParams', '$location', '$window', '$filter', '$uibModal', '$state', 'Upload', 'CPProductService', 'CPDataService',
    function($scope, $timeout, $q, $stateParams, $location, $window, $filter, $uibModal, $state, Upload, CPProductService, CPDataService) {
        var imageUpdated = true;


        $scope.$watchCollection('images', function(images) {
            if (!imageUpdated) {
                // Time out due to delay splice function
                $timeout(function() {
                    imageUpdated = true;
                    angular.forEach(images, function(value, index) {
                        value.order = index + 1;
                    })
                    CPProductService.updateProductImages($scope.product.id, images);
                }, 1000);
            }
            $timeout(function() {
                imageUpdated = false;
                console.log("set false.");
            }, 1000);
        })

        $scope.selectedSafetyOptions = {};
        $scope.selectedExteriorOptions = {};
        $scope.selectedInteriorOptions = {};
        $scope.offer = {apr: 5.99};
        $scope.temp = true;
        $scope.showImageTab = CPDataService.getShowImageTab();
        $scope.timeStamp = Date.now();

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

        $scope.exteriorOptions = [
            'LED Headlights',
            'LED Taillights',
            'Daytime Running Light',
            'Soft-Close Automatic Doors',
            'Aluminum Running Boards',
            'Keyless Entry',
            'Keyless Go',
            'Trailer Hitch',
            'Roof Rails',
            'M Sport Package',
            'MC Sport Line',
            'S Line',
            'AMG Package',
            'Illuminated Star',
            'Ash Grain Wood Trim',
            'Ceramic Brake',
            'Suspension Lift System',
            '17" Wheels',
            '18" Wheels',
            '19" Wheels',
            '20" Wheels',
            '21" Wheels',
            '22" Wheels'
        ];

        $scope.interiorOptions = [
            'Heated Front Seats',
            'Ventilated Front Seats',
            'Massage Seats',
            'Heated Back Seats',
            'Ventilated Back Seats',
            'Heated Steering Wheel',
            '3rd Row Seat',
            'Rear Window Shades',
            'Full Leather Interior',
            'Navigation System',
            'Moonroof',
            'Panorama Roof',
            'Bose Sound System',
            'Harman Kardon Sound System',
            'Bang & Olufsen Sound System',
            'Burmester Sound System',
            'Rear-Seat Entertainment',
            'Alcantara Steering Wheel',
            'Alcantara Leather Interior',
            'Carbon Fiber Trim',
            'Four-Zone Climate Control',
            'Bluetooth',
            'Wood Steering Wheel',
            'Carbon Fiber Steering Wheel',
            'Memory Seat',
            'Internet System',
            'Heated/Cooled Cup Holder',
            'Mini Fridge'
        ];

        $scope.safetyOptions = [
            'Driving Assistant',
            'Blind Spot Detection',
            'Rear View Camera',
            'Head-Up Display',
            'Surround View',
            'Parking Distance Control',
            'Night Vision Assistant',
            'Engine Start-Stop System'
        ];

        $scope.id = $stateParams.id;
        $scope.createStatus = 'fa fa-plus';
        $scope.updateStatus = 'fa fa-refresh';
        $scope.createImageStatus = 'fa fa-plus';
        $scope.updateOptionsStatus = 'fa fa-refresh';
        $scope.product = {};

        if ($scope.id) {
            CPProductService.getProductById($scope.id).then(
                function(product) {
                    console.log(product);
                    console.log('images', product.images);

                    processImages(product.images);
                    // $scope.images = [];
                    // $scope.icons = [];
                    //
                    // angular.forEach(product.images, function(image) {
                    //     console.log(image.type);
                    //     console.log(image);
                    //
                    //     if (image.type === 'DEFAULT') {
                    //         console.log('images', $scope.images);
                    //         $scope.images.push(image);
                    //     } else if (image.type === 'ICON') {
                    //         $scope.icons.push(image);
                    //     }
                    //
                    //     console.log('default', );
                    //     console.log('icon', $scope.icons);
                    //
                    // });

                    $scope.product = product;
                }
            )

            CPProductService.getProductOptionsByProductId($scope.id).then(
                function(options) {
                    angular.forEach(options, function(option) {
                        if (option.type == 'EXTERIOR') {
                            $scope.selectedExteriorOptions[option.option] = true;
                        } else if (option.type == 'INTERIOR') {
                            $scope.selectedInteriorOptions[option.option] = true;
                        } else if (option.type == 'SAFETY') {
                            $scope.selectedSafetyOptions[option.option] = true;
                        }
                    })
                }
            )
        }

        $scope.testing = function() {
                console.log('testingtesting');
        }

        $scope.createProduct = function(product) {
            createLoading();
            CPProductService.createProduct(product).then(
                function(product) {
                    createSucceed();
                    $scope.id = product.id;
                    $location.path('/commerce/product/' + product.id);
                }
            )
        }

        $scope.updateProduct = function(product) {
            updateLoading();
            validateProduct(product);

            CPProductService.updateProduct(product).then(
                function(product) {
                    updateSucceed();
                }
            )
        }

        $scope.deleteProductById = function(id) {
            CPProductService.deleteProductById(id).then(
                function() {
                    $state.go('commerce.products_grid');
                }
            )
        }

        $scope.addImage = function(product, imgFiles, imgType) {
            var promises = [];
            createImageLoading();

            console.log('scope', $scope.$parent);
            console.log('imgFiles', imgFiles);
            console.log('type', imgType);
            angular.forEach(imgFiles, function(imgFile) {
                promises.push(CPProductService.addProductImage(product.id, imgFile, imgType))
            })

            $q.all(promises).then(
                function () {
                    createImageSucceed();
                    refreshProductImages(product.id);

                    // openImageModal();
                }
            );
        }

        $scope.myUpload = function(file, files, events) {
            console.log('file!!!!', file);
            console.log('files!!!!!', files);
            console.log('events', events);
        }

        $scope.test = function(testFile, testInvalid) {
            console.log('testing!!!', testFile);
        }

        $scope.updateImage = function(id, type, order) {
            CPProductService.updateProductImage(id, type, order).then(
                function() {
                    refreshProductImages($scope.id);
                }
            )
        }

        $scope.deleteImage = function(id) {
            CPProductService.deleteProductImage(id).then(
                function() {
                    refreshProductImages($scope.id);
                }
            )
        }

        $scope.cropImage = function(image) {
            CPDataService.setProductId($scope.id);
            CPDataService.setCropImage(image);
            $state.go('forms.advanced_plugins');
        }

        $scope.updateOptions = function(productId) {
            updateOptionLoading();

            var options = [];

            angular.forEach($scope.selectedExteriorOptions, function(isSelected, key) {
                if (isSelected == true) {
                    options.push({
                        "type": "EXTERIOR",
                        "option": key
                    })
                }
            })

            angular.forEach($scope.selectedInteriorOptions, function(isSelected, key) {
                if (isSelected == true) {
                    options.push({
                        "type": "INTERIOR",
                        "option": key
                    })
                }
            })

            angular.forEach($scope.selectedSafetyOptions, function(isSelected, key) {
                if (isSelected == true) {
                    options.push({
                        "type": "SAFETY",
                        "option": key
                    })
                }
            })

            console.log(options);

            CPProductService.updateProductOptions(productId, options).then(
                function() {
                    updateOptionsSucceed();
                }
            );
        }

        $scope.print = function(id) {
            $window.open('/summary.html#?id=' + id, '_blank');
        }

        $scope.retailView = function(id) {
            $window.open('/retail_view.html#?id=' + id, '_blank');
        }

        $scope.offerSummary = function(productId, offer) {
            console.log('offer product', productId);
            console.log('offer', offer);
            $window.open('/offer.html#?id=' + productId + '&customerName=' + offer.customerName.toUpperCase() + '&salesName=' + offer.salesName.toUpperCase() + '&discount=' + offer.discount + '&apr=' + offer.apr, '_blank');
        }

        $scope.getQRCode = function(vin) {
            CPProductService.createProductQRCode(vin).then(
                function(data) {
                    $window.open(data.url, '_blank');
                }
            )
        }

        function createLoading() {
            $scope.createStatus = 'fa fa-refresh fa-spin';
        }

        function createSucceed() {
            $scope.createStatus = 'fa fa-check';
        }

        function updateLoading() {
            $scope.updateStatus = 'fa fa-refresh fa-spin'
        }

        function updateSucceed() {
            $scope.updateStatus = 'fa fa-check';
        }

        function createImageLoading() {
            $scope.createImageStatus = 'fa fa-refresh fa-spin';
        }

        function createImageSucceed() {
            $scope.createImageStatus = 'fa fa-check';
        }

        function updateOptionLoading() {
            $scope.updateOptionsStatus = 'fa fa-refresh fa-spin';
        }

        function updateOptionsSucceed() {
            $scope.updateOptionsStatus = 'fa fa-check';
        }

        function refreshProductImages(id) {
            CPProductService.getImagesByProductId(id).then(
                function(images) {
                    processImages(images);
                }
            )
        }

        function processImages(images) {
            $scope.images = [];
            $scope.icons = [];
            $scope.pendingImages = [];
            $scope.pendingIcons = [];

            angular.forEach(images, function(image) {
                if (!image.approved) {
                    if (image.type === 'DEFAULT') {
                        console.log('default');
                        $scope.pendingImages.push(image);
                    } else if (image.type === 'ICON'){
                        $scope.pendingIcons.push(image);
                    }
                } else {
                    if (image.type === 'DEFAULT') {
                        $scope.images.push(image);
                    } else if (image.type === 'ICON') {
                        $scope.icons.push(image);
                    }
                }
            });
        }

        function validateProduct(product) {
            if (product.make) {
                product.make = product.make.toUpperCase()
            }

            if (product.vin) {
                product.vin = product.vin.toUpperCase();
            }

            if (product.exColor) {
                product.exColor = product.exColor.toUpperCase();
            }

            if (product.inColor) {
                product.inColor = product.inColor.toUpperCase();
            }

            return product;
        }

        // function openImageModal() {
        //     console.log('yes');
        //     var modalInstance = $uibModal.open({
        //       animation: true,
        //       ariaLabelledBy: 'modal-title',
        //       ariaDescribedBy: 'modal-body',
        //       templateUrl: 'views/modals/images-modal.html',
        //       controller: 'CPImagesModalController',
        //       scope: $scope,
        //       size: 'sm',
        //     //   windowClass: 'xlg-modal',
        //       resolve: {
        //         data: function () {
        //         //   return { 'date': date, 'data': $scope.events };
        //         }
        //       }
        //     });
        // }
    }])
