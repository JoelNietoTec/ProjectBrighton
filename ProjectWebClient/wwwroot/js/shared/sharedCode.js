var shared = angular.module('sharedCode', ["ngToast", "ngAnimate"]);

shared.config(['ngToastProvider', function (ngToast) {
    ngToast.configure({
        animation: 'slide',
        verticalPosition: 'bottom',
        horizontalPosition: 'left', 
        timeout: 2000
    });
}]);

shared.factory('crudService', crudService);

shared.factory('formatService', formatService);

shared.directive('loadingPanel', loadingPanel);