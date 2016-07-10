/**
 * Created by davir on 7/10/2016.
 */
(function (app) {
    var userService = function ($http, $resource) {
        var User = $resource('/user/:userId', {userId: '@id'});
        return {
            cheackUser: function (id, cb) {
                user.get({userId: id}, function (user) {
                    cb(user !== undefined);
                });
            },
            checkPoints: function(cant, cb) {
                cb(cant >= 40000);
            }
        }
    };
    app.service('UserService', ['$http', '$resource', userService]);
})(angular.module('agranda-y-punto'));