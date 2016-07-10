/**
 * Created by davir on 7/5/2016.
 */

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./model/user');
var debug = require('debug')('agranda_y_punto:auth');
debug('construct');

passport.use(new LocalStrategy(
    function(userName, password, done){
        debug('Local strategy construct');
        User.findOne({username: userName}, function(err, user){
            if(err) return done(err);
            if(!user){
                return done(null, false, {message: 'Nombre de usuario no existe.'});
            }
            user.comparePassword(password, function(err, result){
                if(err) return done(err);
                if(!result){
                    return done(null, false, {message: 'Contraseña incorrecta.'});
                }else{
                    return done(null, user);
                }
            });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

module.exports = passport;