const {MongoClient, ObjectID} = require('mongodb')
// this basically requires mongodb, and simultaneously creates a mongodb const called MongoClient a  nd OnjectID

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server')
  const db = client.db('ToDoApp')
  // all of this just connects to the Mongo database

  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result)
  // }, (err) => {
  //   console.log('Unable to delete', err)
  // })
  // deletes all documents that match the query parameters

  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result)
  // }, (err) => {
  //   console.log('Unable to delete', err)
  // })
  // deletes the first document that matches the query parameters

  db.collection('Todos').findOneAndDelete({completed: true}).then((result) => {
    console.log(result)
  }, (err) => {
    console.log('Unable to delete', err)
  })
  // deleted the first document that matches the query parameters, and returns it

  //  db.close()
})
