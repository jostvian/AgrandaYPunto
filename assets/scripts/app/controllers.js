/**
 * Created by davir on 7/9/2016.
 */
var app = angular.module('agranda-y-punto');

app.controller("UserRegister", ['$scope', 'UserService', '$uibModal', function ($scope, userService, $uibModal) {
    uc = this;
    uc.user = {
        rows: [
            {
                code: '',
                invoice: ''
            },
            {
                code: '',
                invoice: ''
            }
        ]
    };
    uc.points = 0;
    function calculatePoints() {
        uc.points = uc.user.rows.length * 2000;
    }
    
    function checkPoints(){
        
    }

    uc.addRow = function () {
        uc.user.rows.push({
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
                            return '¡LO SENTIMOS! Debes cargar como mínimo 40.000 puntos para participar.';
                        }
                    }
                });
            }else{

            }
        });
        userService.createUser(uc.user);
    }
}]);
app.controller("ModalController", ['$scope',  '$uibModalInstance', 'message', function ($scope, uibModalInstance, message) {
    $scope.message = message;
    $scope.ok = function(){
        uibModalInstance.close();
    }
}]);