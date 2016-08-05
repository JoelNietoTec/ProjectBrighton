var shared = angular.module('sharedCode', ["ngToast", "ngAnimate", "ngTable"]);

shared.config(['ngToastProvider', function (ngToast) {
    ngToast.configure({
        animation: 'slide',
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
    });
}]);

shared.factory('crudService', crudService);

shared.factory('formatService', formatService);

shared.directive('loadingPanel', loadingPanel);