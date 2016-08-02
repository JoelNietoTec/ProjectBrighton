var employeesController = function ($scope, $http, crudService, formatService, ngToast) {

    $scope.newEmployee = {};

    $scope.getEmployees = function () {
        $scope.items = {};
        ngToast.create({
            content: 'Message',
            dismissOnTimeout: false
        });
        crudService.getItems($scope.apiURL + "Employees")
            .then(function (d) {
                d = formatService.frmDates(d);
                $scope.items = d;
            });
    };

    $scope.createEmployee = function () {
        crudService.getItems($scope.apiURL + "Positions")
            .then(function (d) {
                $scope.positions = d;
                formatService.toggleModal('#newEmployeeModal', 'show');
            });
    };

    $scope.addEmployee = function () {
        var employee = $scope.newEmployee;
        employee.StartDate = moment(employee.StartDate, "DD/MM/YYYY");
        crudService.addItem($scope.apiURL + "Employees", employee)
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
    };

    $scope.updateEmployee = function () {
        if (angular.toJson($scope.editedEmployee) === angular.toJson($scope.selectedItem)) {
            formatService.toggleModal('#editEmployeeModal', 'hide');
        } else {
            var employee = $scope.editedEmployee;
            crudService.updateItem($scope.apiURL + "Employees", employee.Id, employee)
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

employeesController.$inject = ['$scope', '$http', 'crudService', 'formatService', 'ngToast'];