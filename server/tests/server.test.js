const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {ObjectId} = require('mongodb');

const todos = [{
    _id: new ObjectId(),
    text: "First test todo"
}, {
    _id: new ObjectId(),
    text: "Second test todo",
    completed: true,
    completedAt: 333
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new Todo', (done) => {
        let text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((error, response) => {
                if (error) {
                    return done(error);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((error) => done(error));
            })
        ;
    });

    it('should not create Todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((error, response) => {
                if (error) {
                    return done(error);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((error) => done(error));
            })
        ;
    });

    describe("GET /todos", () => {
        it('should get all Todos', (done) => {
            request(app)
                .get('/todos')
                .expect(200)
                .expect((result) => {
                   expect(result.body.todos.length).toBe(2);
                })
                .end(done)
            ;
        });
    });
});

describe("GET /todos", () => {
    it('should get all Todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((result) => {
               expect(result.body.todos.length).toBe(2);
            })
            .end(done)
        ;
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((result) => {
                expect(result.body.todo.text).toBe(todos[0].text)
            })
            .end(done)
        ;
    });

    it('should return status 404 if todo not found', (done) => {
        let hexID = new ObjectId().toHexString();
        request(app)
            .get(`/todos/${hexID}`)
            .expect(404)
            .end(done)
        ;
    });

    it('should return status 404 for non-object ids', (done) => {
        request(app)
            .get(`/todos/111`)
            .expect(404)
            .end(done)
        ;
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        let hexID = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${hexID}`)
            .expect((result) => {
                expect(result.body.todo._id).toBe(hexID);
            })
            .end((error, response) => {
                if (error) {
                    return done(error);
                }
                Todo.findById(hexID).then((todo) => {
                    expect(todo).toBeNull();
                    done();
                }).catch((error) => done(error));
            })
        ;
    });

    it('should return 404 if todo not found', (done) => {
        let hexID = new ObjectId().toHexString();
        request(app)
            .delete(`/todos/${hexID}`)
            .expect(404)
            .end(done)
        ;
    });

    it('should return 404 if object id is invalid', (done) => {
        request(app)
            .delete(`/todos/111`)
            .expect(404)
            .end(done)
        ;
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        let hexID = todos[1]._id.toHexString();
        let body = {
            text: 'Patched text',
            completed: true
        };
        request(app)
            .patch(`/todos/${hexID}`)
            .send(body)
            .expect(200)
            .expect((result) => {
                expect(result.body.todo.text).toBe(body.text);
                expect(result.body.todo.completed).toBe(true);
                expect(result.body.todo.completedAt).not.toBeNull();
            })
            .end(done)
        ;
    });

    it('should clear completedAt when todo is not completed', (done) => {
        let hexID = todos[1]._id.toHexString();
        let body = {
            text: 'Patched text',
            completed: false
        };
        request(app)
            .patch(`/todos/${hexID}`)
            .send(body)
            .expect(200)
            .expect((result) => {
                expect(result.body.todo.text).toBe(body.text);
                expect(result.body.todo.completed).toBe(false);
                expect(result.body.todo.completedAt).toBeNull();
            })
            .end(done)
        ;
    });

    /*it('should return 404 if object id is invalid', (done) => {

    });

    it('should return 404 if todo not found', (done) => {

    });*/
});