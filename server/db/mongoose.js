let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
try {
    mongoose.connect('mongodb://localhost:27017/TodoApp');
    console.log('Connected to localhost');
} catch(error) {
    mongoose.connect('mongodb://nodetodoapi:nodetodoapi123@ds111461.mlab.com:11461/nodetodoapi');
    console.log('Connected to Heroku');
}

module.exports = {
    mongoose
};