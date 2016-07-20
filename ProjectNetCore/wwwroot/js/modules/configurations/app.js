var configApp = angular.module('configApp', ["sharedCode"]);

configApp.run(function($rootScope){
    $rootScope.apiURL = "http://localhost:8080/api/";
});

configApp.controller('industriesController', industriesController);