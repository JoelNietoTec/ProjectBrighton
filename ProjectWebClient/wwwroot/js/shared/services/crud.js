var crudService = function ($http, ngToast) {
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

    crudFunctions.getItem = function (apiURL, id) {
        if (apiURL.slice(-1) != "/")
            apiURL = apiURL + "/";
        var promise =
            $http.get(apiURL + id)
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    console.log(response);
                });
        return promise;
    };

    crudFunctions.addItem = function (apiURL, element) {
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
                    crudFunctions.message('success', '<span> Elemento creado exitosamente! <i class="fa fa-check"></i></span>');
                    return response.data;
                }, function (response) {
                    crudFunctions.message('danger', '<span> El elemento no se pudo crear!  <i class="fa fa-times"></i></span>');
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
                    crudFunctions.message('success', '<span><span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x "></i> <i class="fa fa-check fa-stack-1x fa-inverse"></i></span> Elemento modificado exitosamente! </span>');
                    return response.data;
                }, function (response) {
                    crudFunctions.message('danger', '<span> El elemento no se pudo eliminar!  <i class="fa fa-times"></i></span>');
                    console.log(response);
                });
        return promise;
    };

    crudFunctions.message = function (type, content) {
        ngToast.create({
            className: type,
            content: content,
            dismissButton: true
        });
    };

    return crudFunctions;
}

crudService.$inject = ['$http', 'ngToast']; 