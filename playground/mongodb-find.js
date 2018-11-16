const DBName = 'TodoApp';
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/' + DBName, (error, client) => {
    if (error) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db(DBName);

    /*db.collection('Todos').find({
        //_id: new ObjectID('5bed2a695483e91be4ffb6ca')
    }).count().then((count) => {
        console.log(`Todos count: ${count}`);
        //console.log(JSON.stringify(docs, undefined, 4));
    }, (error) => {
        console.log('Unable to fetch todos', error);
    });*/

    db.collection('Users').find({
        name: 'Andrew'
    }).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 4));
    }, (error) => {
        console.log('Unable to fetch users', error);
    });

   client.close();
});