var industriesController = function ($scope, $http, crudService, formatService) {

    $scope.NewIndustry = {};

    $scope.getIndustries = function () {
        crudService.getItems($scope.apiURL + "Industries")
            .then(function (d) {
                d.forEach(function (e) {
                    e.frmtCreateDate = formatService.relativeTime(e.CreateDate);
                    e.frmtModifyDate = formatService.relativeTime(e.ModifyDate);
                }, this);
                $scope.items = d;
            });
    };

    $scope.addIndustry = function () {
        var industry = $scope.newIndustry;
        crudService.addItem($scope.apiURL + "Industries", industry)
            .then(function (d) {
                $scope.newIndustry = {};
                d.frmtCreateDate = moment().startOf('minute').fromNow();
                $scope.items.push(d);
                console.log(d);
                $(document).ready(function () {
                    $('#newModal').modal('hide');
                });
            })
    }

    $scope.editIndustry = function (item) {
        $scope.editedIndustry = {};
        console.log(item.$index);
        $scope.selectedItem = item;
        $scope.editedIndustry = angular.copy($scope.selectedItem);
        console.log(item);
    };

    $scope.updateIndustry = function () {
        if (angular.toJson($scope.editedIndustry) === angular.toJson($scope.selectedItem)) {
            $(document).ready(function () {
                $('#editModal').modal('hide');
            });
        } else {
            var industry = $scope.editedIndustry;
            crudService.updateItem($scope.apiURL + "Industries", industry.Id, industry)
                .then(function (d) {
                    industry.frmtModifyDate = moment().startOf('minute').fromNow();
                    console.log($scope.selectedItem);
                    $scope.selectedItem = industry;
                    $(document).ready(function () {
                        $('#editModal').modal('hide');
                    });
                });
        }
    };

    $scope.removeIndustry = function (item) {
        $http.delete($scope.apiURL + "Industries/" + item.Id)
            .success(function (data) {
                $scope.items = $scope.items.filter(function (industry) {
                    return industry !== item;
                });
            })
            .error(function (error) {
                console.log(error);
            });
    };

    $scope.getIndustries();
};

industriesController.$inject = ['$scope', '$http', 'crudService', 'formatService'];