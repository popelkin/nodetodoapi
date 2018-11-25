let express = require('express');
let bodyParser = require('body-parser');
let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');
const {ObjectId} = require('mongodb');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (request, response) => {
    let todo = new Todo({
        text: request.body.text
    });

    todo.save().then((doc) => {
        response.send(doc);
    }, (error) => {
        response
            .status(400)
            .send(error)
        ;
    });
});

app.get('/todos', (request, response) => {
    Todo.find().then((todos) => {
        response.send({todos});
    }, (error) => {
        response.status(400).send(error);
    });
});

app.get('/todos/:id', (request, response) => {
    let id = request.params.id;

    // ID validation
    if (!ObjectId.isValid(id)) {
        return response.status(404).send();
    }

    // Find by ID
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return response.status(404).send();
        }

        response.send({todo});
    }).catch(() => response.status(400).send());
});

app.delete('/todos/:id', (request, response) => {
    let id = request.params.id;

    if (!ObjectId.isValid(id)) {
        return response.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return response.status(404).send();
        }
        response.send({todo});
    }).catch(() => response.status(400).send());
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {
    app
};