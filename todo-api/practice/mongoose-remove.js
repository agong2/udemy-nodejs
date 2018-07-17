const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

Todo.remove({}).then((result) => {
  console.log(result)
})

Todo.findOneAndRemove({_id: '5b4860a0c95b936d81abdc12'}).then((todo) => {
  console.log(todo)
})

Todo.findByIdAndRemove('5b4860a0c95b936d81abdc12').then((todo) => {
  console.log(todo)
})
