const {ObjectID} = require('mongodb')
const jwt = require('jsonwebtoken')

const {Todo} = require('./../../models/todo')
const {User} = require('./../../models/user')

const userOneID = new ObjectID()
const userTwoID = new ObjectID()
const users = [{
  _id: userOneID,
  email: 'fake1@yahoo.com',
  password: 'who-uses-yahoo',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneID, acess: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoID,
  email: 'fake2@outlook.com',
  password: 'who-uses-outlook',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoID, acess: 'auth'}, 'abc123').toString()
  }]
}]

const todos = [{
  _id: new ObjectID(),
  text: 'First todo test',
  _creator: userOneID
}, {
  _id: new ObjectID(),
  text: 'Second todo test',
  completed: true,
  completedAt: 666,
  _creator: userTwoID
}]

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos)
  }).then(() => done())
}

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save()
    var userTwo = new User(users[1]).save()

    return Promise.all([userOne, userTwo])
  }).then(() => done())
}

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
}
