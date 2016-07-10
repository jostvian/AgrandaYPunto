/**
 * Created by davir on 7/9/2016.
 */
var app = angular.module('agranda-y-punto');

app.controller("UserRegister", ['$scope',function($scope){
    uc = this;
    uc.rows = [
        {
            code: '',
            invoice: ''
        }
    ];
    uc.addRow=function(){
        uc.rows.push({
            code: '',
            invoice: ''
        })
    };
}]);
