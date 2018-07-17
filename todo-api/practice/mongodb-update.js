const {MongoClient, ObjectID} = require('mongodb')
// this basically requires mongodb, and simultaneously creates a mongodb const called MongoClient a    nd OnjectID

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server')
  const db = client.db('ToDoApp')
  // all of this just connects to the Mongo database

  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5b431c36d4b80850eb78e078')
  }, {
    $set: {completed: true}
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result)
  }, (err) => {
    console.log('Unable to update', err)
  })
  // this finds the first object with corresponding 'ID' in the 'Todos' collection. It sets the 'completed' flag to true

  db.collection('Users').findOneAndUpdate({
    name: 'Al'
  }, {
    $inc: {age: 1}
  }, (err) => {
    console.log('Unable to update', err)
  })
  //  this finds the first  object with the corresponding 'name' in the 'Users' collection. It increments the 'age' flag by one

  //  db.close()
})
