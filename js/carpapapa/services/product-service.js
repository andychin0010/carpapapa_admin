angular
    .module('inspinia')
    .service('CPProductService', ['$timeout', '$http', 'Upload', function($timeout, $http, Upload) {

        var HOST = 'http://localhost:8081';

        this.createProduct = function(product) {
            return $http({
                method: 'POST',
                url: HOST + '/products/create',
                data: product
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }

        this.updateProduct = function(product) {
            return $http({
                method: 'POST',
                url: HOST + '/products/' + product.id + '/update',
                data: product
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }

        this.getProductById = function(id) {
            return $http({
                method: 'GET',
                url: HOST + '/products/' + id + '?approvedImages=false',
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }

        this.addProductImage = function(productId, file, type) {
            console.log('file', file);
            // console.log('http://localhost:8081/images/' + type + '/products/' + productId + '/upload');
            return Upload.upload({
                url: HOST + '/images/types/' + type + '/products/' + productId + '/create',
                data: {file: file}
            })
        }

        this.overwriteImage = function(id, path, file) {
            // var newFile = file.substr(file.indexOf('base64,') + 'base64,'.length);
            return Upload.upload({
                url: HOST + '/images/' + id + '/overwrite',
                data: {
                    path: path,
                    file: file
                }
            })
        }

        this.updateProductImage = function(id, type, order) {
            return $http({
                method: 'POST',
                url: HOST + '/images/' + id + '/update?type=' + type + '&order=' + order
            })
        }

        this.updateProductImages = function(productId, images) {
            console.log('productid', productId);
            console.log(images);
            return $http({
                method: 'POST',
                url: HOST + '/images/products/' + productId + '/update',
                data: images
            })
        }

        this.deleteProductImage = function(id) {
            return $http({
                method: 'POST',
                url: HOST + '/images/' + id + "/delete"
            })
        }

        this.getImagesByProductId = function(productId) {
            return $http({
                method: 'GET',
                url: HOST + '/images/products/' + productId + '?approved=false'
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }

        this.updateProductOptions = function(productId, options) {
            console.log('productId', productId);
            console.log('options', options);
            return $http({
                method: 'POST',
                url: HOST + '/products/' + productId + '/options/ensure',
                data: options
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }

        this.getProductOptionsByProductId = function(id) {
            return $http({
                method: 'GET',
                url: HOST + '/products/' + id + '/options',
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }

        this.getProducts = function(limit, offset) {
            return $http({
                method: 'GET',
                url: HOST + '/products?all=true&status=INVENTORY&limit=' + limit + '&offset=' + offset
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }

        this.getInventoryProducts = function() {
            return $http({
                method: 'GET',
                url: HOST + '/products?all=true&status=INVENTORY&limit=1000'
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }

        this.getInventoryHistory = function(soldAfter, soldBefore) {
            var url = HOST + '/products?all=true&status=SOLD&limit=1000';

            if (soldAfter) { url += '&soldAfter=' + soldAfter; }
            if (soldBefore) { url += '&soldBefore=' + soldBefore; }

            return $http({
                method: 'GET',
                url: url
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }

        this.searchProducts = function(limit, offset, state, make, model, exColor, year, vin) {
            var url = HOST + '/products/search?';

            if (limit) { url += '&limit=' + limit; }
            if (offset) { url += '&offset=' + offset; }
            if (state) { url += '&state=' + state; }
            if (make) { url += '&make=' + make; }
            if (model) { url += '&model=' + model; }
            if (exColor) { url += '&exColor=' + exColor; }
            if (year) { url += '&year=' + year; }
            if (vin) { url += '&vin=' + vin; }

            return $http({
                method: 'GET',
                url: url
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }

        this.deleteProductById = function(id) {
            var url = HOST + '/products/' + id + '/delete';
            console.log('delete', url);
            return $http({
                method: 'POST',
                url: url
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }

        this.createProductQRCode = function(vin) {
            var url = HOST + '/qr/' + vin + '/create';
            return $http({
                method: 'POST',
                url: url
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }

        this.getInventoryChecklist = function() {
            var url = HOST + '/qr/checklist';
            return $http({
                method: 'GET',
                url: url
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }

        this.getKeyManagements = function() {
            var url = HOST + '/key_managements';
            return $http({
                method: 'GET',
                url: url
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }

        this.getAvailableLocations = function() {
            var url = HOST + '/key_managements/available_locations';
            return $http({
                method: 'GET',
                url: url
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }

        this.addLocation = function(vin, location) {
            return $http({
                method: 'POST',
                url: HOST + '/key_managements/create?vin=' + vin + '&location=' + location
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }

        this.deleteLocation = function(vin, location) {
            return $http({
                method: 'POST',
                url: HOST + '/key_managements/vins/' + vin + '/locations/' + location + '/delete'
            }).then(function success(response) {
                return response.data;
            }, function error(response) {
                return null;
            })
        }
    }])
