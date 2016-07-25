var legalApp = angular.module('legalApp', ["sharedCode"]);

legalApp.run(function ($rootScope) {
    $rootScope.apiURL = "http://localhost:8080/api";
});