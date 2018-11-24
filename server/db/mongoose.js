let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let fs = require('fs');
try {
    if (fs.existsSync('./../../.env')) {
        mongoose.connect(env.MONGODB_URI);
    } else {
        throw Error();
    }
} catch (err) {
    mongoose.connect('mongodb://localhost:27017/TodoApp');
}

module.exports = {
    mongoose
};