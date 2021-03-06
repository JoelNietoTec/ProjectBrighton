var clientsController = function ($scope, $q, $http, crud, format) {

    $scope.getClients = function () {
        $scope.items = {};
        crud.getItems($scope.apiURL + "Clients")
            .then(function (d) {
                d = format.frmDates(d);
                $scope.items = d;
            });
    };

    $scope.initObjects = function () {
        $q.all([
            crud.getItems($scope.apiURL + "Industries").then(function (d) { $scope.industries = d; }),
            crud.getItems($scope.apiURL + "ClientTypes").then(function (d) { $scope.types = d; }),
            crud.getItems($scope.apiURL + "Employees").then(function (d) { $scope.attorneys = d; }),
            crud.getItems($scope.apiURL + "Countries").then(function (d) { $scope.countries = d; }),
        ]);
    };

    $scope.createClient = function () {
        $scope.newClient = {};
        $scope.newClient.ClientContacts = [];
        $scope.correlative = 1;
        format.toggleModal('#newClientModal', 'show');
    };

    $scope.addClient = function () {
        var client = $scope.newClient;
        client.Status = 1;
        crud.addItem($scope.apiURL + "Clients", client)
            .then(function (d) {
                console.log(d);
                country = $scope.countries.filter(function (c) { return c.Id == d.CountryId });
                industry = $scope.industries.filter(function (i) { return i.Id == d.IndustryId });
                attorney = $scope.attorneys.filter(function (a) { return a.Id == d.EmployeeId });
                type = $scope.types.filter(function (t) { return t.Id == d.ClientTypeId });
                $scope.newClient = {};
                d.Country = country[0];
                d.Industry = industry[0];
                d.Employee = attorney[0];
                d.ClientType = type[0];
                d.CreateDate = Date.now();
                $scope.items.push(d);
                $scope.items = format.frmDates($scope.items);
                format.toggleModal('#newClientModal', 'hide');
            });
    };

    $scope.editClient = function (item) {
        $scope.edit = true;
        $scope.selectedItem = item;
        $scope.editedClient = angular.copy($scope.selectedItem);
        format.toggleModal('#editClientModal', 'show');
    };

    $scope.unlockClient = function () {
        $scope.edit = false;
        $scope.correlative = $scope.editedClient.ClientContacts.length + 1;
    };

    $scope.updateClient = function () {
        if (angular.toJson($scope.editedClient) === angular.toJson($scope.selectedItem)) {
            format.toggleModal('#editClientModal', 'hide');
        } else {
            var client = $scope.editedClient;
            client = format.cleanObject(client, ["Country", "Industry", "ClientType", "Employee"]);
            console.log(client);
            crud.updateItem($scope.apiURL + "Clients", client.Id, client)
                .then(function (d) {
                    format.toggleModal('#editClientModal', 'hide');
                    $scope.editedClient = {};
                    $scope.getClients();
                });
        };
    };

    $scope.addContact = function () {
        $scope.newContact.Correlative = $scope.correlative;
        if(!$scope.newContact.CLientId)
            $scope.newContact.ClientId = $scope.editedClient.Id;

        console.log($scope.editedClient);
        if (!$scope.editedClient) {
            $scope.newClient.ClientContacts.push($scope.newContact);
        } else {
            $scope.editedClient.ClientContacts.push($scope.newContact);
        }
        console.log()
        $scope.newContact = {};
        $scope.correlative = $scope.correlative + 1;
    };

    $scope.initObjects();
    $scope.getClients();
};

clientsController.$inject = ['$scope', '$q', '$http', 'crudService', 'formatService'];