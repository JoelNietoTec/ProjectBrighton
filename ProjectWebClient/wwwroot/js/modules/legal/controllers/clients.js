var clientsController = function ($scope, $q, $http, crudService, formatService) {
    var crud = crudService;
    var format = formatService;
    $scope.newClient = {};

    $scope.getClients = function () {
        $scope.items = {};
        crud.getItems($scope.apiURL + "Clients")
            .then(function (d) {
                d = format.frmDates(d);
                $scope.items = d;
            });
    };

    $scope.createClient = function () {
        console.log('Hi');
        $q.all([
            crud.getItems($scope.apiURL + "Industries").then(function (d) { $scope.industries = d; }),
            crud.getItems($scope.apiURL + "ClientTypes").then(function (d) { $scope.types = d; }),
            crud.getItems($scope.apiURL + "Employees").then(function (d) { $scope.attorneys = d; })
        ]).then(
            format.toggleModal('#newClientModal', 'show')
        );              
    };
};

clientsController.$inject = ['$scope', '$q', '$http', 'crudService', 'formatService'];