var employeesController = function ($scope, $http, crud, formatService) {
    $scope.newEmployee = {};

    $scope.getEmployees = function () {
        $scope.ready = false;
        $scope.items = {};
        crud.getItems($scope.apiURL + "Employees")
            .then(function (d) {
                d = formatService.frmDates(d);
                $scope.items = d;
                $scope.ready = true;
            });
    };

    $scope.initObjects = function() {
        crud.getItems($scope.apiURL + "Positions").then(function (d) { $scope.positions = d; });
    };

    $scope.createEmployee = function () {
        crud.getItems($scope.apiURL + "Positions")
            .then(function (d) {
                $scope.positions = d;
                formatService.toggleModal('#newEmployeeModal', 'show');
            });
    };

    $scope.addEmployee = function () {
        var employee = $scope.newEmployee;
        employee.StartDate = moment(employee.StartDate, "DD/MM/YYYY");
        crud.addItem($scope.apiURL + "Employees", employee)
            .then(function (d) {
                $scope.newEmployee = {};
                position = $scope.positions.filter(function (p) { return p.Id == d.PositionId });
                d.Position = position[0];
                d.CreateDate = Date.now();
                $scope.items.push(d);
                $scope.items = formatService.frmDates($scope.items);
                formatService.toggleModal('#newEmployeeModal', 'hide');
            });
    };

    $scope.editEmployee = function (item) {
        $scope.selectedItem = item;
        $scope.editedEmployee = angular.copy($scope.selectedItem);
        $('#edit-employee-date').datepicker('update', moment(item.StartDate).format("DD/MM/YYYY"));
        formatService.toggleModal('#editEmployeeModal', 'show');
    };

    $scope.updateEmployee = function () {
        if (angular.toJson($scope.editedEmployee) === angular.toJson($scope.selectedItem)) {
            formatService.toggleModal('#editEmployeeModal', 'hide');
        } else {
            var employee = $scope.editedEmployee;
            crud.updateItem($scope.apiURL + "Employees", employee.Id, employee)
                .then(function (d) {
                    employee.frmtModifyDate = moment().startOf('minute').fromNow();
                    $scope.getEmployees();
                    formatService.toggleModal('#editEmployeeModal', 'hide');
                });      
        }
    };

    $scope.removeEmployee = function (item) {
        $http.delete($scope.apiURL + "Employees/" + item.Id)
            .success(function (data) {
                $scope.items = $scope.items.filter(function (employee) {
                    return employee !== item;
                });
            })
            .error(function (error) {
                console.log(error);
            });
    };

    $scope.getEmployees();
};

employeesController.$inject = ['$scope', '$http', 'crudService', 'formatService'];