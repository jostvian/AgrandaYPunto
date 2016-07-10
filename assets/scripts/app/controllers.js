/**
 * Created by davir on 7/9/2016.
 */
var app = angular.module('agranda-y-punto');

var controller = app.controller("user-register", ['$scope',function($cope){
    $userRegister = this;
    var months = [
        {
            name: 'Enero',
            value: 0
        },
        {
            name:'Febrero',
            value: 1
        },
        {
            name: 'Marzo',
            value: 2
        },
        {
            name: 'Abril',
            value: 3
        },
        {
            name: 'Mayo',
            value: 4
        },
        {
            name: 'Junio',
            value: 5
        },
        {
            name:'Julio',
            value: 6
        },
        {
            name: 'Agosto',
            value: 7
        },
        {
            name: 'Septiembre',
            value: 8
        },
        {
            name: 'Octubre',
            value: 9
        },
        {
            name: 'Noviembre',
            value: 10
        },
        {
            name: 'Diciembre',
            value: 11
        }
    ];
    var days = [
        {
            name: '01',
            value: 1
        },
        {
            name: '01',
            value: 1
        }
    ];
    $userRegister.months = months;
    $userRegister.days = days;
}]);