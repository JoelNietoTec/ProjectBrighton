var configApp = angular.module('configApp', ["sharedCode", "ngToast"]);

configApp.run(function($rootScope){
    $rootScope.apiURL = "http://localhost:8080/api/";
});

configApp.controller('employeesController', employeesController);

configApp.controller('industriesController', industriesController);

configApp.controller('positionsController', positionsController);

configApp.controller('mattertypesController', mattertypesController);

configApp.controller('clienttypesController', clienttypesController);