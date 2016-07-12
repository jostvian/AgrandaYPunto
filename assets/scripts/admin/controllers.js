/**
 * Created by davir on 7/9/2016.
 */
var app = angular.module('agranda-y-punto.admin');

app.controller("ClientAdmin", ['$scope', 'ClientService', '$uibModal', function ($scope, clientService, $uibModal) {
    var cc = this;
    cc.hpQuant = 34;
    cc.spQuant = 23;
    cc.ipQuant = 3;
    clientService.getUsers(function (users) {
        cc.data = users;
    });
    cc.clientDetail = function (identification) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'adminModalContent.html',
            windowTemplateUrl: 'adminModalWindow.html',
            controller: 'ClientDetail',
            controllerAs: 'cd',
            resolve: {
                identification: function () {
                    return identification;
                }
            }
        });
    };
}]);
app.controller("ClientDetail", ['$scope', '$uibModalInstance', 'identification', 'ClientService', function ($scope, uibModalInstance, identification, clientService) {
    var cd = this;
    clientService.getUser(identification, function (client) {
        cd.client = client;
    });
    clientService.getCodes(identification, function (codes) {
        cd.codes = codes;
    });
}]);