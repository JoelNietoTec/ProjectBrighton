var clienttypesController = function ($scope, $http, crudService, formatService) {

    $scope.newClientType = {};

    $scope.getClientTypes = function () {
        $scope.items = {};
        crudService.getItems($scope.apiURL + "ClientTypes")
            .then(function (d) {
                d = formatService.frmDates(d);
                $scope.items = d;
            });
    };

    $scope.addClientType = function () {
        var clienttype = $scope.newClientType;
        crudService.addItem($scope.apiURL + "ClientTypes", clienttype)
            .then(function (d) {
                $scope.newClientType = {};
                d.relCreateDate = moment().startOf('minute').fromNow();
                $scope.items.push(d);
                formatService.toggleModal('#newClientTypeModal', 'hide');
            });
    };

    $scope.editClientType = function (item) {
        $scope.selectedItem = item;
        $scope.editedClientType = angular.copy($scope.selectedItem);
    };

    $scope.updateClientType = function () {
        if (angular.toJson($scope.editedClientType) === angular.toJson($scope.selectedItem)) {
            formatService.toggleModal('#editClientTypeModal', 'hide');
        } else {
            var clienttype = $scope.editedClientType;
            crudService.updateItem($scope.apiURL + "ClientTypes", clienttype.Id, clienttype)
                .then(function (d) {
                    clienttype.frmtModifyDate = moment().startOf('minute').fromNow();
                    $scope.getClientTypes();
                    formatService.toggleModal('#editClientTypeModal', 'hide');
                });
        }
    };

    $scope.removeClientType = function (item) {
        $http.delete($scope.apiURL + "ClientTypes/" + item.Id)
            .success(function (data) {
                $scope.items = $scope.items.filter(function (clienttype) {
                    return clienttype !== item;
                });
            })
            .error(function (error) {
                console.log(error);
            });
    };

    $scope.getClientTypes();
};

clienttypesController.$inject = ['$scope', '$http', 'crudService', 'formatService'];