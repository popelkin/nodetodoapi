let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://nodetodoapi:nodetodoapi123>@ds111461.mlab.com:11461/nodetodoapi' || 'mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose
};