let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp').then(() => {
    console.log('Connected to localhost');
}).catch(() => {
    mongoose.connect('mongodb://nodetodoapi:nodetodoapi123@ds111461.mlab.com:11461/nodetodoapi');
    console.log('Connected to Heroku');
});

module.exports = {
    mongoose
};