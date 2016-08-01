var legalApp = angular.module('legalApp', ["sharedCode", "ngTable"]);

legalApp.run(function ($rootScope) {
    $rootScope.apiURL = "http://localhost:8080/api/";
});

legalApp.controller('clientsController', clientsController);