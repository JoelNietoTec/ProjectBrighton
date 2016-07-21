var positionsController = function ($scope, $http, crudService, formatService) {

    $scope.newPosition = {};

    $scope.getPositions = function () {
        $scope.items = {};
        crudService.getItems($scope.apiURL + "Positions")
            .then(function (d) {
                d = formatService.frmDates(d);
                console.log(d);
                $scope.items = d;
            });
    };

    $scope.addPosition = function () {
        var position = $scope.newPosition;
        crudService.addItem($scope.apiURL + "Positions", position)
            .then(function (d) {
                $scope.newPosition = {};
                d.frmCreateDate = moment().startOf('minute').fromNow();
                $scope.items.push(d);
                formatService.closeModal('#newPositionModal');
            });
    };

    $scope.editPosition = function (item) {
        $scope.selectedItem = item;
        $scope.editedPosition = angular.copy($scope.selectedItem);
    };

    $scope.updatePosition = function () {
        if (angular.toJson($scope.editedPosition) === angular.toJson($scope.selectedItem)) {
            formatService.closeModal('#editPositionModal');
        } else {
            var position = $scope.editedPosition;
            crudService.updateItem($scope.apiURL + "Positions", position.Id, position)
                .then(function (d) {
                    console.log(position);
                    position.frmModifyDate = moment().startOf('minute').fromNow();
                    $scope.getPositions();
                    formatService.closeModal('#editPositionModal');
                });
        };
    };

    $scope.removePositions = function (item) {
        $http.delete("http://localhost:8080/api/Positions" + item.Id)
            .success(function (data) {
                $scope.items = $scope.items.filter(function (position) {
                    return position != item;
                });
            })
            .error(function (error) {
                console.log(error)
            });
    };

    $scope.getPositions();
};

positionsController.$inject = ['$scope', '$http', 'crudService', 'formatService'];