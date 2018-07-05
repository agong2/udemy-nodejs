const express = require('express')

var app = express()

app.get('/', (req, res) => {
  res.status(404).send({
    error: 'Page not found.',
    name: 'Al\'s App v1.0'
  })
})

app.get('/users', (req, res) => {
  res.send([{
    name: 'Sam',
    age: 20
  }, {
    name: 'Seth',
    age: 21
  }, {
    name: 'Lucy',
    age: 21
  }])
})

app.listen(3000)
module.exports.app = app
