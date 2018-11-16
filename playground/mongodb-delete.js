const DBName = 'TodoApp';
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/' + DBName, (error, client) => {
    if (error) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db(DBName);

    // deleteMany
    /*db.collection('Todos').deleteMany({
        'text': "Eat lunch"
    }).then((result) => {
        console.log(result);
    });*/

    // deleteOne
    /*db.collection('Todos').deleteOne({
        'text': "Eat lunch"
    }).then((result) => {
        console.log(result);
    });*/

    // findOneAndDelete
    /*db.collection('Todos').findOneAndDelete({
        "_id" : ObjectID("5bed2a695483e91be4ffb6ca")
    }).then((result) => {
        console.log(result);
    });*/

    db.collection('Todos').deleteMany({
        "_id": ObjectID("5bee5fe1087ba64b1ba340e2")
    }).then((result) => {
        console.log(result);
    });

   client.close();
});