/**
 * Created by davir on 7/10/2016.
 */
(function (app) {
    var userService = function ($http, $resource) {
        var Client = $resource('/clients/client/:clientId', {clientId: '@id'}, {});
        var Code = $resource('/clients/client/:clientId/codes/:codeId', {codeId: '@id'});
        return {
            getUsers: function (cb) {
                Client.query({}, function (clients) {
                    cb(clients);
                });
            },
            getUser: function (identification, cb) {
                Client.get({clientId: identification}, function (client) {
                    cb(client);
                });
            },
            getCodes: function (identification, cb) {
                Code.query({clientId:identification}, function(codes){
                    cb(codes);
                });
            }
        };
    };
    app.service('ClientService', ['$http', '$resource', userService]);
})(angular.module('agranda-y-punto.admin'));