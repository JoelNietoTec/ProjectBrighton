var clientsController = function ($scope, $http, crudService, formatService) {
    var crud = crudService;
    var format = formatService;
    $scope.newClient = {};

    $scope.getClients = function(){
        $scope.items={};
        crud.getItems($scope.apiURL + "Clients")
        .then (function(d){
            d = format.frmDates(d);
            $scope.items = d;
        });
    };

    $scope.createClient = function () {
        
        
    };
}