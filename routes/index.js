var express = require('express');
var router = express.Router();
const Client = require('../lib/model/client');

/* GET home page. */
router.get('/',
    function (req, res, next) {
        res.render('index', {title: 'Express'});
    });

router.post('/user',
    function (req, res) {
        var codes = req.body.rows;
        delete req.body['rows'];
        var client = new Client(req.body);
        client.save();
    });

module.exports = router;
