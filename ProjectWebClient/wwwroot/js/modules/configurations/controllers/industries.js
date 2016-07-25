var industriesController = function ($scope, $http, crudService, formatService) {

    $scope.newIndustry = {};

    $scope.getIndustries = function () {
        $scope.items = {};
        crudService.getItems($scope.apiURL + "Industries")
            .then(function (d) {
                d = formatService.frmDates(d);
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
                formatService.toggleModal('#newIndustryModal', 'hide');
            });
    };

    $scope.editIndustry = function (item) {
        $scope.selectedItem = item;
        $scope.editedIndustry = angular.copy($scope.selectedItem);
    };

    $scope.updateIndustry = function () {
        if (angular.toJson($scope.editedIndustry) === angular.toJson($scope.selectedItem)) {
            formatService.toggleModal('#editIndustryModal', 'hide');
        } else {
            var industry = $scope.editedIndustry;
            crudService.updateItem($scope.apiURL + "Industries", industry.Id, industry)
                .then(function (d) {
                    industry.frmtModifyDate = moment().startOf('minute').fromNow();
                    $scope.getIndustries();
                    formatService.toggleModal('#editIndustryModal', 'hide');
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