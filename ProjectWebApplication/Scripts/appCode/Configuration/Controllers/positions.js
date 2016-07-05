var positionsController = function ($scope, $http) {

    $scope.NewPosition = {};

    $scope.getPositions = function () {
        $scope.items = [];

        $http.get("http://localhost:24616/api/Positions")
            .success(function (data) {
                console.log(data);
                $scope.items = data;
            })
            .error(function (err) {
                console.log(err.description);
            });
    }

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
            $scope.NewPosition = {};
            $scope.items.push(data);
            console.log(data);
        })
        .error(function (data, status, headers, config) {
            console.log(error);
        })
    }

    $scope.removePosition = function (item) {
        $http.delete("http://localhost:24616/api/Positions/" + item.Id)
            .success(function (data) {
                $scope.items = $scope.items.filter(function (position) {
                    return position !== item;
                });
            })
            .error(function (error) {
                console.log(error);
            });
    }

    $scope.getPositions();
}

positionsController.$inject = ['$scope', '$http'];