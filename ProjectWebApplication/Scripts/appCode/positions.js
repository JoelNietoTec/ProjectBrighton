var positionsController = function ($scope, $http) {
    $http.get("http://localhost:24616/api/Positions")
        .success(function (data) {
            console.log(data);
        })
        .error(function (err) {
            console.log(err.description);
        });
}

positionsController.$inject = ['$scope', '$http'];