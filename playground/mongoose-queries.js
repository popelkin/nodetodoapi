const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

let id = "5bf7db55209cc218b83411bd11";

/*if (!ObjectId.isValid(id)) {
    console.log('ID not valid');
}*/

/*Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
});*/

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('ID not found');
    }
    console.log('Todo by ID', todo);
}).catch((error) => console.log(error));

User.findById("5bf64655abae0f052c2b1f5c").then((user) => {
    if (!user) {
        return console.log('ID not found');
    }
    console.log('User by ID', user);
}).catch((error) => console.log(error));