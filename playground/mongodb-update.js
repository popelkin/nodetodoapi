const DBName = 'TodoApp';
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/' + DBName, (error, client) => {
    if (error) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db(DBName);

    db.collection('Todos').findOneAndUpdate({
        _id : ObjectId("5bee620e087ba64b1ba34111")
    }, {
        $set: {
            text: "Andrew"
        },
        $inc: {
            age: 10
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

   client.close();
});