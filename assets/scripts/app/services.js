/**
 * Created by davir on 7/10/2016.
 */
(function (app) {
    var userService = function ($http, $resource) {
        var User = $resource('/clients/client/:userId', {userId: '@id'},{
            checkcodes: {method:'POST'}
        });
        return {
            checkUser: function (id, cb) {
                User.get({userId: id}, function (user) {
                    cb(user.name !== undefined);
                });
            },
            checkPoints: function(cant, cb) {
                cb(cant >= 40000);
            },
            createUser: function(user, cb){
                var pUser = new User(user);
                pUser.$save();
                cb(pUser);
            },
            checkCodes: function(codes, cb){
                $http({
                    method:"POST",
                    url: "/clients/checkcodes",
                    data: codes
                }).then(function successCallback(response){
                    cb(response.data);
                }
                );
            }
        };
    };
    app.service('UserService', ['$http', '$resource', userService]);
})(angular.module('agranda-y-punto'));