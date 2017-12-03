angular.module('inspinia').filter('textTrim', function () {
    return function (text) {
        if (!text || text.length <= 90) {
            return text;
        } else {
            return text.substring(0, 90).trim() + '...';
        }
    };
});
