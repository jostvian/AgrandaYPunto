/**
 * Created by davir on 7/5/2016.
 */
var express = require('express');
var router = express.Router();
var debug = require('debug')('agranda_y_punto:login-route');
/* GET the login page. */


module.exports = function(passport){
    debug('construct');
    router.get('/', function(req, res, next) {
        res.render('login', {title: 'Login Page'});
    });

    router.post('/', passport.authenticate('local', { successRedirect: '/users',
        failureRedirect: '/login/',
        failureFlash: false 
    }
    ));
    return router;
};