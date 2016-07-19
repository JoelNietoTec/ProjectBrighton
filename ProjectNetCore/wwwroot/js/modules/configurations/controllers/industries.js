var industriesController = function ($scope, $http) {

    $scope.NewIndustry = {};

    $scope.getIndustries = function () {
        $scope.items = [];

        $http.get($scope.apiURL + "Industries")
            .success(function (data) {             
                data.forEach(function(element) {
                    element.formattedDate = moment(element.CreateDate).startOf('minute').fromNow();
                }, this);
                $scope.items = data;
                console.log(data);
            })
            .error(function (err) {
                console.log(err);
            });
    };

    $scope.addIndustry = function () {
        var industry = $scope.newIndustry;
        console.log(industry);
        $http.post(
            $scope.apiURL + "Industries",
            JSON.stringify(industry),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        .success(function (data, status, headers, config) {
            $scope.NewIndustry = {};
            data.formattedDate = moment().startOf('minute').fromNow();
            $scope.items.push(data);
            console.log(data);
            $(document).ready(function() {
                $('#newModal').modal('hide');
            })
        })
        .error(function (data, status, headers, config) {
            console.log(error);
        });
    };


    $scope.editIndustry = function(item) {
        $scope.currentIndustry = item;
        console.log(item);
    };

    $scope.updateIndustry = function() {
        var industry = $scope.currentIndustry;
        $http.put(
            $scope.apiURL + "Industries/" + industry.Id,
            JSON.stringify(industry),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        .success(function(data, status, headers, config) {
            $scope.currentIndustry = {};
            data.formatModDate = moment().startOf('minute').fromNow();
            $scope.items = {}
            console.log(data);
            $scope.getIndustries();
            $(document).ready(function() {
                $('#editModal').modal('hide');
            })
        })
        .error(function (data, status, header, config) {
            console.log(error);
        });
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

industriesController.$inject = ['$scope', '$http'];