const {ObjectID} = require('mongodb')

const expect = require('expect')
const request = require('supertest')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')

const todos = [{
  _id: new ObjectID(),
  text: 'First todo test'
}, {
  _id: new ObjectID(),
  text: 'Second todo test',
  completed: true,
  completedAt: 666
}]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos)
  }).then(() => done())
})

describe('Post /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text'

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1)
          expect(todos[0].text).toBe(text)
          done()
        }).catch((e) => done(e))
      })
  })

  it('should fail when empty string is passed in as an argument', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2)
          done()
        }).catch((e) => done(e))
      })
  })
})

describe('Get /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done)
  })
})

describe('Get /todos/:id', () => {
  it('should return a todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done)
  })

  it('should return 404 if todo not found', (done) => {
    var doesNotExistID = new ObjectID().toHexString

    request(app)
      .get(`/todos/${doesNotExistID}`)
      .expect(404)
      .end(done)
  })

  it('should return 400 for non-object IDs', (done) => {
    request(app)
      .get('/todos/xXx_360MLG-n0SC0P3_xXx')
      .expect(404)
      .end(done)
  })
})

describe('Delete /todos/:id', () => {
  it('should remove a todo', (done) => {
    var deleteThisID = todos[0]._id.toHexString()

    request(app)
      .delete(`/todos/${deleteThisID}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(deleteThisID)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.findById(deleteThisID).then((todo) => {
          expect(todo).toNotExist()
          done()
        }).catch((e) => done(e))
      })
  })

  it('should return 404 if todo not found', (done) => {
    var doesNotExistID = new ObjectID().toHexString()

    request(app)
      .delete(`/todos/${doesNotExistID}`)
      .expect(404)
      .end(done)
  })

  it('should return 400 for non-object IDs', (done) => {
    request(app)
      .delete('/todos/xXx_360MLG-n0SC0P3_xXx')
      .expect(404)
      .end(done)
  })
})

describe('Patch /todos/:id', () => {
  it('should update the todo', (done) => {
    var changeThisID = todos[0]._id.toHexString()
    var newText = 'Update!'
    var newCompleted = true

    request(app)
      .patch(`/todos/${changeThisID}`)
      .send({
        text: newText,
        completed: newCompleted
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(newText)
        expect(res.body.todo.completed).toBe(newCompleted)
        expect(res.body.todo.completedAt).toBeA('number')
      })
      .end(done)
  })

  it('should clear completedAt then todo is not completed', (done) => {
    var changeThisID = todos[1]._id.toHexString()
    var newText = 're-Update!'
    var newCompleted = false

    request(app)
      .patch(`/todos/${changeThisID}`)
      .send({
        text: newText,
        completed: newCompleted
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(newText)
        expect(res.body.todo.completed).toBe(false)
        expect(res.body.todo.completedAt).toNotExist()
      })
      .end(done)
  })
})
