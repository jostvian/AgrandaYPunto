/**
 * Created by davir on 7/5/2016.
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CodeSchema = new Schema({
    code: { type: String, required: true, index: { unique: true } },
    invoice: { type: String, required: true, index: { unique: true } },
    client: { type: String, required:true }

});


module.exports = mongoose.model("Code", CodeSchema);