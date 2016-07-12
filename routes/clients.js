var express = require('express');
var router = express.Router();
const Client = require('../lib/model/client');
const Code = require('../lib/model/code');
const mail = require('../lib/mail');
const _ =require('underscore');

/* GET users listing. */
router.get('/', function (req, res, next) {
    if (!req.user) {
        return res.redirect('/login/');
    }
    Client.find({}).select('name points identification').exec(function (err, users) {
        if (err) return next(err);
        res.render('clients', {title: 'Clients admin page', user: req.user, clients:users});
    });
    
});

router.get('/client/:user_id', function (req, res, next) {
    Client.findOne({identification: req.params.user_id}, function (err, client) {
        if (err) {
            res.send(err);
        } else {
            res.json(client);
        }
    });
});

router.get('/client/:user_id/codes', function (req, res, next) {
    Client.findOne({identification: req.params.user_id}).populate('codes').exec(function (err, client) {
        if (err) {
            res.send(err);
        } else {
            res.json(client.codes);
        }
    });
});

router.post('/checkcodes', function (req, res, next) {
    var rows = req.body;
    if (rows) {
        var codes = rows.map(function (code) {
            return code.code;
        });
        var uniqueCodes = _.uniq(codes);
        if(codes.length != uniqueCodes.length){
            var dupArr = [];
            var groupedByCount = _.countBy(rows, function (item) {
                return item.code;
            });
            for (var name in groupedByCount) {
                if (groupedByCount[name] > 1) {
                    console.log(name);
                    dupArr.push(name);
                }
            }
            return res.json(dupArr.map(function(dup){
                return {code:dup};
            }));
        }
        Code.find({
            "code": {
                "$in": codes
            }
        }, function (err, docs) {
            if (err) {
                return res.send(err);
            } else {
                if (docs.length > 0) {
                    res.json(docs);
                } else {
                    res.send(false);
                }
            }
        });
    } else {
        res.send(false);
    }
});


/* GET users listing JSON. */
router.get('/client', function (req, res, next) {
    if (!req.user) {
        return res.redirect('/login/');
    }
    Client.find({}).select('name points').exec(function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

router.post('/client', function (req, res, next) {
    if (req.body) {
        var codes = req.body.rows;
        delete req.body['rows'];
        var client = new Client(req.body);
        client.points = codes.length * 2000;
        client.save(function(err){
            if(err) res.send(err);
            else{
                mail.incription(client.email);
                res.json({message:'OK'});
            }
        });
        codes.forEach(function (rcode, index) {
            var code = new Code(rcode);
            code.client = client.identification;
            code.save(function(err){
               if(err){

               }
            });
        });
    } else {
        next();
    }
});


module.exports = router;
