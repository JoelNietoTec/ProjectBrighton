var positionsController = function ($scope, $http) {
    $scope.items = [];
    $scope.newPosition = {};

    $http.get("http://localhost:24616/api/Positions")
        .success(function (data) {
            console.log(data);
            $scope.items = data;
        })
        .error(function (err) {
            console.log(err.description);
        });
    $scope.addPosition = function () {
        $http.post("http://localhost:24616/api/Positions", {
            Name: $scope.newPosition.Name,
            Description: $scope.newPosition.Description
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