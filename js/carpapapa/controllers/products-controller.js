angular
    .module('inspinia')
    .controller('CPProductsController', ['$scope', '$timeout', '$q', '$stateParams', '$location', '$window', 'CPProductService',
    function($scope, $timeout, $q, $stateParams, $location, $window, CPProductService) {
        var PAGE_LIMIT = 12;

        init();

        function init() {
            CPProductService.getProducts(PAGE_LIMIT, 0).then(
                function(data) {
                    console.log(data);
                    $scope.products = data.products;
                    $scope.productCount = data.count;
                }
            )
        }

        $scope.pageChange = function() {
            CPProductService.getProducts(PAGE_LIMIT, PAGE_LIMIT * ($scope.currentPage - 1)).then(
                function(data) {
                    console.log(data);
                    $scope.products = data.products;
                    $scope.productCount = data.count;
                }
            )
            console.log($scope.currentPage);
        }

        $scope.search = function(searchTerm) {
            if (searchTerm) {
                if (searchTerm.split(" ").length > 1) {
                    var firstTerm = searchTerm.substr(0,searchTerm.indexOf(' '));
                    if (/^\d+$/.test(firstTerm)) {
                        var model = searchTerm.substr(searchTerm.indexOf(' ')+1);

                        CPProductService.searchProducts(PAGE_LIMIT, PAGE_LIMIT * ($scope.currentPage - 1), undefined, undefined, model, undefined, firstTerm).then(
                            function(data) {
                                console.log(data);
                                $scope.products = data.products;
                                $scope.productCount = data.count;
                            }
                        )
                    } else {
                        CPProductService.searchProducts(PAGE_LIMIT, PAGE_LIMIT * ($scope.currentPage - 1), undefined, undefined, searchTerm).then(
                            function(data) {
                                console.log(data);
                                $scope.products = data.products;
                                $scope.productCount = data.count;
                            }
                        )
                    }
                } else {
                    if (/^\d+$/.test(searchTerm) && (parseInt(searchTerm) > 1000)) {
                        CPProductService.searchProducts(PAGE_LIMIT, PAGE_LIMIT * ($scope.currentPage - 1), undefined, undefined, undefined, undefined, searchTerm).then(
                            function(data) {
                                console.log(data);
                                $scope.products = data.products;
                                $scope.productCount = data.count;
                            }
                        )
                    } else {
                        CPProductService.searchProducts(PAGE_LIMIT, PAGE_LIMIT * ($scope.currentPage - 1), undefined, undefined, searchTerm).then(
                            function(data) {
                                console.log(data);
                                $scope.products = data.products;
                                $scope.productCount = data.count;
                            }
                        )
                    }
                }
            } else {
                init();
            }

            // console.log(searchTerm.split(" "));
            // var terms = searchTerm.split(" ");
            // console.log(terms[0]);
            // console.log(/^\d+$/.test(terms[0]));
            // CPProductService.searchProducts()
            // console.log('ysarae');
        }
    }])
