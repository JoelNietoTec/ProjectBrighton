var industriesController = function ($scope, $http) {

    $scope.NewIndustry = {};

    $scope.getIndustries = function () {
        $scope.items = [];

        $http.get("http://localhost:24616/api/Industries")
            .success(function (data) {
                console.log(data);
                $scope.items = data;
            })
            .error(function (err) {
                console.log(err.description);
            });
    }

    $scope.addIndustry = function () {
        var industry = {
            Name: $scope.NewIndustry.Name,
            Description: $scope.NewIndustry.Description
        }
        console.log(industry);
        $http.post(
            "http://localhost:24616/api/Industries",
            JSON.stringify(industry),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        .success(function (data, status, headers, config) {
            $scope.NewIndustry = {};
            $scope.items.push(data);
            console.log(data);
        })
        .error(function (data, status, headers, config) {
            console.log(error);
        })
    }

    $scope.removeIndustry = function (item) {
        $http.delete("http://localhost:24616/api/Industries/" + item.Id)
            .success(function (data) {
                $scope.items = $scope.items.filter(function (industry) {
                    return industry !== item;
                });
            })
            .error(function (error) {
                console.log(error);
            });
    }

    $scope.getIndustries();
}

industriesController.$inject = ['$scope', '$http'];