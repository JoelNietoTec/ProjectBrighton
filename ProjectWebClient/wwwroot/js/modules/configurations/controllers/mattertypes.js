var mattertypesController = function ($scope, $http, crudService, formatService) {

    $scope.newMatterType = {};

    $scope.getMatterTypes = function () {
        $scope.items = {};
        crudService.getItems($scope.apiURL + "MatterTypes")
            .then(function (d) {
                d = formatService.frmDates(d);
                $scope.items = d;
            });
    };

    $scope.addMatterType = function () {
        var mattertype = $scope.newMatterType;
        crudService.addItem($scope.apiURL + "MatterTypes", mattertype)
            .then(function (d) {
                $scope.newMatterType = {};
                d.relCreateDate = moment().startOf('minute').fromNow();
                $scope.items.push(d);
                formatService.toggleModal('#newMatterTypeModal', 'hide');
            });
    };

    $scope.editMatterType = function (item) {
        $scope.selectedItem = item;
        $scope.editedMatterType = angular.copy($scope.selectedItem);
    };

    $scope.updateMatterType = function () {
        if (angular.toJson($scope.editedMatterType) === angular.toJson($scope.selectedItem)) {
            formatService.toggleModal('#editMatterTypeModal', 'hide');
        } else {
            var MatterType = $scope.editedMatterType;
            crudService.updateItem($scope.apiURL + "MatterTypes", MatterType.Id, MatterType)
                .then(function (d) {
                    MatterType.frmtModifyDate = moment().startOf('minute').fromNow();
                    $scope.getMatterTypes();
                    formatService.toggleModal('#editMatterTypeModal', 'hide');
                });
        }
    };

    $scope.removeMatterType = function (item) {
        $http.delete($scope.apiURL + "MatterTypes/" + item.Id)
            .success(function (data) {
                $scope.items = $scope.items.filter(function (mattertype) {
                    return mattertype !== item;
                });
            })
            .error(function (error) {
                console.log(error);
            });
    };

    $scope.getMatterTypes();
};

mattertypesController.$inject = ['$scope', '$http', 'crudService', 'formatService'];