/**
 * Created by davir on 7/5/2016.
 */
const mongoose = require('mongoose');

mongoose.connect('mongodb://test:test@ds015335.mlab.com:15335/agranda_y_punto');

module.exports = mongoose.connection;