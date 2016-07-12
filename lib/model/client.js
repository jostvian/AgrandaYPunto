/**
 * Created by davir on 7/5/2016.
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ClientSchema = new Schema({
    name: { type: String, required: true },
    identification: { type: String, required: true, index: { unique: true } },
    identType: { type: String },
    birth: { type:Date },
    cellPhone: { type: String, required: true },
    phone: { type:String },
    address: { type:String },
    city: { type:String },
    email: { type:String },
    points: { type:Number, required: true },
    franchise: { type:String }
});

ClientSchema.virtual('codes', {
    ref: 'Code',
    localField: 'identification',
    foreignField: 'client'
});


module.exports = mongoose.model("Client", ClientSchema);