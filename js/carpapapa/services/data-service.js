angular
    .module('inspinia')
    .service('CPDataService', ['$timeout', '$http', 'Upload', function($timeout, $http, Upload) {
        var cropImage = {};
        var productId;
        var showImageTab = false;

        this.setShowImageTab = function() {
            this.showImageTab = true;
        }

        this.getShowImageTab = function() {
            if (this.showImageTab) {
                this.showImageTab = false;
                return true;
            } else {
                return false;
            }
        }

        this.setProductId = function(productId) {
            this.productId = productId;
        }

        this.getProductId = function() {
            return this.productId;
        }

        this.setCropImage = function(image) {
            this.cropImage = image;
        }

        this.getCropImage = function(image) {
            return this.cropImage;
        }

    }])
