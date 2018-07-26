const _ = require('lodash')
const {ObjectID} = require('mongodb')

var express = require('express')
var bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')
var {authenticate} = require('./middleware/authenticate')

var app = express()

app.use(bodyParser.json())

app.post('/todos', authenticate, (req, res) => {
// adding 'authenticate' middleware to verify the user is logged in (has that token) before using
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user.id
  })

  todo.save().then((doc) => {
    res.send(doc)
  }, (e) => {
    res.status(400).send(e)
  })
})

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e)
  })
})

app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id

  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send()
    }
    res.send({todo})
  }).catch((e) => res.status(400).send())
})

app.delete('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id

  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send()
    }
    res.send({todo})
  }).catch((e) => res.status(400).send())
})

app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id
  var body = _.pick(req.body, ['text', 'completed'])

  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime()
  } else {
    body.completed = false
    body.completedAt = null
  }

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {
    $set: body
  }, {
    new: true
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send()
    }
    res.send({todo})
  }).catch((e) => {
    res.status(400).send()
  })
})

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']) // loadash makes an object from these
  var user = new User(body)

  user.save().then(() => {
    return user.generateAuthToken() // calls generateAuthToken method in user model file
  }).then((token) => {
    res.header('x-auth', token).send(user) // sends the token as a header
  }).catch((e) => {
    res.status(400).send(e)
  })
})

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)
})

app.post('/users/login', (req, res) => {
// without this, you would need a new username every time you access, which makes no sense
  var body = _.pick(req.body, ['email', 'password']) // lodash maskes an object from these

  User.findByCredentials(body.email, body.password).then((user) => { // calls findByCredentials
    return user.generateAuthToken().then((token) => { // makes a token for the new login
      res.header('x-auth', token).send(user) // slaps that token in the header
    })
  }).catch((e) => {
    res.status(400).send()
  })
})

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send()
  }, () => {
    res.status(400).send()
  })
})

app.listen(3000, () => {
  console.log('Started on P3000')
})

module.exports = {app}
