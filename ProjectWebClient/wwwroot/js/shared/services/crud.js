var crudService = function ($http) {
    var crudFunctions = {};

    crudFunctions.getItems = function (apiURL) {
        var promise = $http.get(apiURL)
            .then(function (response) {
                return response.data;
            }, function (response) {
                console.log(response);
            });
        return promise;
    };

    crudFunctions.addItem = function (apiURL, element) {
        console.log(element);
        var promise =
            $http.post(
                apiURL,
                angular.toJson(element),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function (response) {
                    console.log(response);
                    return response.data;
                }, function (response) {
                    console.log(response);
                });
        return promise;
    };

    crudFunctions.updateItem = function (apiURL, id, element) {
        if (apiURL.slice(-1) != "/")
            apiURL = apiURL + "/";
        var promise =
            $http.put(
                apiURL + id,
                angular.toJson(element),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function (response) {
                    console.log(response);
                    return response.data;
                }, function (response) {
                    console.log(response);
                });
        return promise;
    };
    return crudFunctions;
}

crudService.$inject = ['$http'];