var positionsController = function ($scope, $http) {
    $scope.items = [];
    $scope.NewPosition = {};

    $http.get("http://localhost:24616/api/Positions")
        .success(function (data) {
            console.log(data);
            $scope.items = data;
        })
        .error(function (err) {
            console.log(err.description);
        });
    $scope.addPosition = function () {
        var position = {
            Name: $scope.NewPosition.Name,
            Description: $scope.NewPosition.Description
        }
        console.log(position);
        $http.post(
            "http://localhost:24616/api/Positions",
            JSON.stringify(position),
            {
                headers: {
                    'Content-Type': 'application/json'
                }           
        })
        .success(function (data, status, headers, config) {
            $scope.items.push($scope.newPosition);
            $scope.addPosition = {};
        })
        .error(function (data, status, headers, config) {
            console.log(error);
        })
    }
}

positionsController.$inject = ['$scope', '$http'];