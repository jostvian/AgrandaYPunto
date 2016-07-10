/**
 * Created by davir on 7/6/2016.
 */
var app = angular.module('agranda-y-punto',['ngResource',
    'ngAnimate',
    'ui.bootstrap',
    'rorymadden.date-dropdowns'
]);

app.config(['$locationProvider',
function( $locationProvider){
    $locationProvider.html5Mode(true);
    // $routeProvider
    //     .when("/", {
    //         templateUrl: 'templates/userForm.jade'
    //     })
    //     .otherwiere({
    //         redirectTo: "/"
    //     });
}]);