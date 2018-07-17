// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')
// requires mongodb, and creates two mongodb const called MongoClient and ObjectID

var obj = new ObjectID()
console.log(obj)

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server')
  const db = client.db('ToDoApp')
  // connects to the Mongo database

  db.collection('Todos').insertOne({
    text: 'Drink lunch',
    completed: true
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert todo', err)
    }
  })
  // adds a document to the 'Todo' database

  db.collection('Users').insertOne({name: 'Al', age: 20, location: 'China'},
    (err, result) => {
      if (err) {
        return console.log('Unable to insert user', err)
      }

      console.log(JSON.stringify(result.ops, undefined, 2))
    })
  // same, but to the 'Users' database

  client.close()
})
