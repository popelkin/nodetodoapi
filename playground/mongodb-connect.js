const DBName = 'TodoApp';
const {MongoClient, ObjectID} = require('mongodb');

let obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/' + DBName, (error, client) => {
    if (error) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db(DBName);

    /*db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert todo', error);
        }

        console.log(JSON.stringify(result.ops, undefined, 4));
    });*/

    /*db.collection('Users').insertOne({
        name: 'Alexander Popelo',
        age: 31,
        location: 'Chernigov, Ukraine',
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert user', error);
        }

        console.log(JSON.stringify(result.ops, undefined, 4));
    });*/

   client.close();
});