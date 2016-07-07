var matterTypesController = function ($scope, $http) {

    $scope.NewMatterType = {};

    $scope.getMatterTypes = function () {
        $scope.items = [];

        $http.get("http://localhost:24616/api/MatterTypes")
            .success(function (data) {
                console.log(data);
                $scope.items = data;
            })
            .error(function (err) {
                console.log(err.description);
            });
    };

    $scope.addMatterType = function () {
        var matterType = {
            Name: $scope.NewMatterType.Name
        };
        console.log(matterType);
        $http.post(
            "http://localhost:24616/api/MatterTypes",
            JSON.stringify(matterType),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        .success(function (data, status, headers, config) {
            $scope.NewMatterType = {};
            $scope.items.push(data);
            console.log(data);
        })
        .error(function (data, status, headers, config) {
            console.log(error);
        });
    };

    $scope.removeMatterType = function (item) {
        $http.delete("http://localhost:24616/api/MatterTypes/" + item.Id)
            .success(function (data) {
                $scope.items = $scope.items.filter(function (matterType) {
                    return matterType !== item;
                });
            })
            .error(function (error) {
                console.log(error);
            });
    };

    $scope.getMatterTypes();
};

matterTypesController.$inject = ['$scope', '$http'];