let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI).then(() => {
}).catch(() => {
    mongoose.connect('mongodb://nodetodoapi:nodetodoapi123@ds111461.mlab.com:11461/nodetodoapi');
});

module.exports = {
    mongoose
};