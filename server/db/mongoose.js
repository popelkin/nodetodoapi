let mongoose = require('mongoose');
let env = require('./../../.env');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp' || env.MONGODB_URI);

module.exports = {
    mongoose
};