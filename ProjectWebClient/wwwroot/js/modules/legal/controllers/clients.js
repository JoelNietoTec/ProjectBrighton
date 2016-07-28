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
        $scope.newClient = {};
        $q.all([
            crud.getItems($scope.apiURL + "Industries").then(function (d) { $scope.industries = d; }),
            crud.getItems($scope.apiURL + "ClientTypes").then(function (d) { $scope.types = d; }),
            crud.getItems($scope.apiURL + "Employees").then(function (d) { $scope.attorneys = d; }),
            crud.getItems($scope.apiURL + "Countries").then(function (d) { $scope.countries = d; })
        ]).then(
            format.toggleModal('#newClientModal', 'show')
            );
    };

    $scope.addClient = function () {
        var client = $scope.newClient;
        client.Status = 1;
        //console.log(client);
        crud.addItem($scope.apiURL + "Clients", client)
        .then(function (d) {
            $scope.newClient = {};
            format.toggleModal('#newClientModal', 'hide');
        });
    };

    $scope.getClients();
};

clientsController.$inject = ['$scope', '$q', '$http', 'crudService', 'formatService'];