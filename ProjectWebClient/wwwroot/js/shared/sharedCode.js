var shared = angular.module('sharedCode', []);

shared.factory('crudService', crudService);

shared.factory('formatService', formatService);


shared.directive('loadingPanel', loadingPanel);