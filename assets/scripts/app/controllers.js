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
        ],
        identType: ''
    };
    uc.points = 0;
    function calculatePoints() {
        uc.points = uc.user.rows.length * 2000;
    }

    function checkPoints() {

    }

    uc.addRow = function () {
        uc.user.rows.push({
            code: '',
            invoice: ''
        });
        calculatePoints();
    };

    uc.addUser = function (form) {
        if (!form.$valid) {
            return modal('¡ Verifica !', 'Los campos del formulario con (*)\r son obligatorios.');
        }
        calculatePoints();
        userService.checkPoints(uc.points, function (result) {
            if (!result) {
                return modal('¡LO SENTIMOS!', 'Debes cargar como mínimo 40.000 puntos para participar.');
            } else {
                userService.checkUser(uc.user.identification, function(result){
                    if(result){
                        return modal('¡LO SENTIMOS!', 'Este número de cédula ya ha sido registrado.');
                    }else{
                        userService.checkCodes(uc.user.rows,function(result){
                            if(result){
                                return modal('¡LO SENTIMOS!', 'Este número de bono ya ha sido registrado.' + result[0].code);
                            }else{
                                userService.createUser(uc.user, function(){
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
                                        ],
                                        identType: ''
                                    };
                                    return modal('¡Tus puntos han sido enviados con éxito!', 'Por favor revisa tu correo..');
                                });
                            }
                        });
                    }
                });
            }
        });
    };

    function modal(title, message) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'myModalContent.html',
            controller: 'ModalController',
            resolve: {
                message: function () {
                    return message;
                },
                header: function () {
                    return title;
                }
            }
        });
    }
}]);
app.controller("ModalController", ['$scope', '$uibModalInstance', 'message', 'header', function ($scope, uibModalInstance, message, header) {
    $scope.message = message;
    $scope.header = header;
    $scope.ok = function () {
        uibModalInstance.close();
    };
}]);