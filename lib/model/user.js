/**
 * Created by davir on 7/5/2016.
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Cipher =  require('../cipher'),
    cipher = new Cipher();

var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

UserSchema.pre('save', function(next) {
    var user = this;

// only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

// generate a salt
    cipher.encrypt(user.password, function(encrypted){
        user.password = encrypted;
        next();
    });

});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    cipher.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model("User", UserSchema);