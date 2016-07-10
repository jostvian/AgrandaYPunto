/**
 * Created by davir on 7/5/2016.
 */
const crypto = require('crypto');
const util = require('util');
const EventEmitter = require('events');
var debug = require('debug')('agranda_y_punto:cipher');

function Cipher() {
    EventEmitter.call(this);
}

util.inherits(Cipher, EventEmitter);


Cipher.prototype.encrypt = function (prov, cb) {
    debug('encriptiong');
    var _this = this;
    var encrypted = '';

    _this.cipher = crypto.createCipher('aes192', 'bSkBoFEqdPZiAbqkJQbw');
    _this.cipher.on('readable', function () {
        var data = _this.cipher.read();
        if (data)
            encrypted += data.toString('hex');
    });

    _this.cipher.on('end', function () {
        _this.emit('end', encrypted);
    });

    _this.on('end', function (encrypted) {
        debug('encripted');
        if (cb)
            cb(encrypted);
    });
    _this.cipher.write(prov);
    _this.cipher.end();
};

Cipher.prototype.compare = function (prov, target, cb) {
    debug(`Comparing prov:${prov} target:${target}`);
    this.encrypt(prov, function(encrypted){
        debug(`compared result ${encrypted}`);
        cb(null, encrypted === target);
    });
};


module.exports = Cipher;