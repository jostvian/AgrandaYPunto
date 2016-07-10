var express = require('express');
var router = express.Router();
var User = require('../lib/model/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(!req.user){
        // res.redirect('/login/');
    }
   res.render('users', {title:'Admin page', user: req.user});
});

module.exports = router;
