const {MongoClient, ObjectID} = require('mongodb')
// this basically requires mongodb, and simultaneously creates a mongodb const called MongoClient and OnjectID

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server')
  const db = client.db('ToDoApp')
  // all of this just connects to the Mongo database

  //  db.collection('Todos').find().toArray().then((docs) => {
  // this pulls all documents from the 'Todos' database

  //  db.collection('Todos').find({_id: new ObjectID('5b431c36d4b80850eb78e078')
  //  }).toArray().then((docs) => {
  //    console.log('Todos')
  //    console.log(JSON.stringify(docs, undefined, 2))
  //  }, (err) => {
  //    console.log('Unable to fetch todos', err)
  // this does the same thing but only fetches a document with corresponding ID

  //  db.collection('Todos').find().count().then((count) => {
  //    console.log(`Todos count: ${count}`)
  //  }, (err) => {
  //    console.log('Unable to fetch todos', err)
  //  })
  // this counts all the documents in the 'Todos' database

  db.collection('Users').find({name: 'Al'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2))
  }, (err) => {
    console.log('Unable to fetch todos', err)
  })

//  db.close()
})
