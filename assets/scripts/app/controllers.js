/**
 * Created by davir on 7/9/2016.
 */
var app = angular.module('agranda-y-punto');

app.controller("UserRegister", ['$scope', 'UserService', '$uibModal', function ($scope, userService, $uibModal) {
    uc = this;
    uc.rows = [
        {
            code: '',
            invoice: ''
        }
    ];
    uc.points = 0;
    function calculatePoints() {
        uc.points = uc.rows.length * 2000;
    }

    uc.addRow = function () {
        uc.rows.push({
            code: '',
            invoice: ''
        });
        calculatePoints();
    };

    uc.addUser = function () {
        console.log('Chones');
        calculatePoints();
        userService.checkPoints(uc.points, function (result) {
            if(!result){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalController',
                    resolve: {
                        message: function () {
                            return 'Debe contar con mínimo 40000 puntos';
                        }
                    }
                });
                    // alert('Debe contar con mínimo 40000 puntos');
            }else{

            }
        });
    }
}]);
app.controller("ModalController", ['$scope',  '$uibModalInstance', 'message', function ($scope, uibModalInstance, message) {
    $scope.message = message;
}]);