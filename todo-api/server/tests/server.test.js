const {ObjectID} = require('mongodb')

const expect = require('expect')
const request = require('supertest')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')
const {User} = require('./../models/user')
const {todos, populateTodos, users, populateUsers} = require('./seed/seed')

beforeEach(populateTodos)
beforeEach(populateUsers)

describe('Post /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text'

    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token) // gotta be authenticated to post a todo
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
      .set('x-auth', users[0].tokens[0].token)
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
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(1)
      })
      .end(done)
  })
})

describe('Get /todos/:id', () => {
  it('should return a todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done)
  })

  it('should not return a todo doc from another user', (done) => {
    request(app)
      .get(`/todos/${todos[1]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done)
  })

  it('should return 404 if todo not found', (done) => {
    var doesNotExistID = new ObjectID().toHexString

    request(app)
      .get(`/todos/${doesNotExistID}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done)
  })

  it('should return 400 for non-object IDs', (done) => {
    request(app)
      .get('/todos/xXx_360MLG-n0SC0P3_xXx')
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done)
  })
})

describe('Delete /todos/:id', () => {
  it('should remove a todo', (done) => {
    var deleteThisID = todos[0]._id.toHexString()

    request(app)
      .delete(`/todos/${deleteThisID}`)
      .set('x-auth', users[0].tokens[0].token)
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

  it('should not remove a todo from another user', (done) => {
    var deleteThisID = todos[0]._id.toHexString()

    request(app)
      .delete(`/todos/${deleteThisID}`)
      .set('x-auth', users[1].tokens[0].token)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.findById(deleteThisID).then((todo) => {
          expect(todo).toExist()
          done()
        }).catch((e) => done(e))
      })
  })

  it('should return 404 if todo not found', (done) => {
    var doesNotExistID = new ObjectID().toHexString()

    request(app)
      .delete(`/todos/${doesNotExistID}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done)
  })

  it('should return 400 for non-object IDs', (done) => {
    request(app)
      .delete('/todos/xXx_360MLG-n0SC0P3_xXx')
      .set('x-auth', users[1].tokens[0].token)
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
      .set('x-auth', users[0].tokens[0].token)
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

  it('should not update the todo if not the original user', (done) => {
    var changeThisID = todos[0]._id.toHexString()
    var newText = 'Update!'
    var newCompleted = true

    request(app)
      .patch(`/todos/${changeThisID}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({
        text: newText,
        completed: newCompleted
      })
      .expect(404)
      .end(done)
  })


  it('should clear completedAt when todo is not completed', (done) => {
    var changeThisID = todos[1]._id.toHexString()
    var newText = 're-Update!'
    var newCompleted = false

    request(app)
      .patch(`/todos/${changeThisID}`)
      .set('x-auth', users[1].tokens[0].token)
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

describe('Get /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString())
        expect(res.body.email).toBe(users[0].email)
      })
      .end(done)
  })
  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({})
      })
      .end(done)
  })
})

describe('Post /users', () => {
  it('should create a user', (done) => {
    var email = 'example@gmail.com'
    var password = 'notverycreative'

    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist()
        expect(res.body._id).toExist()
        expect(res.body.email).toBe(email)
      })
      .end((err) => {
        if (err) {
          return done(err)
        }

        User.findOne({email}).then((user) => {
          expect(user).toExist()
          expect(user.password).toNotBe(password)
          done()
        }).catch((e) => done(e))
      })
  })

  it('should return validation errors if the request is invalid', (done) => {
    request(app)
      .post('/users')
      .send({
        email: 'invalidEmail',
        password: '111'
      })
      .expect(400)
      .end(done)
  })

  it('should not create a user if the email already exists', (done) => {
    request(app)
      .post('/users')
      .send({
        email: users[0].email,
        password: 'doesnotmatter'
      })
      .expect(400)
      .end(done)
  })
})

describe ('Post /users/login', () => {
  it('should login user and return auth token', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist()
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens[1]).toInclude({
            access: 'auth',
            token: res.headers['x-auth']
          })
          done()
        }).catch((e) => done(e))
      })
  })

  it('should reject an invalid user login attempt', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: 'fake',
        password: 'news'
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toNotExist()
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        User.findById(users[1]._id).then((user) => {
          expect(user.tokens.length).toBe(1)
          done()
        }).catch((e) => done(e))
      })
  })
})

describe('Delete /users/me/token', () => {
  it('should remove auth token on logout', (done) => {
    request(app)
      .delete('/users/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        User.findById(users[0]._id).then((user) => {
          expect(user.tokens.length).toBe(0)
          done()
        }).catch((e) => done(e))
      })
  })
})
