const express = require('express')
const hbs = require('hbs')

const fs = require('fs')
const path = require('path')

var app = express()

hbs.registerPartials(path.join(__dirname, '/views/partials'))
app.set('view engine', 'hbs')

app.use((request, response, next) => {
  var now = new Date().toString
  var log = `${now}: ${request.method}, ${request.url}`

  console.log(log)
  fs.appendFile('logs.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server log')
    }
  })
  next()
})

app.use((request, response, next) => {
  response.render('maintenance.hbs')
})

app.use(express.static(path.join(__dirname, '/public')))

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('capitalizeText', (text) => {
  return text.toUpperCase()
})

app.get('/', (request, response) => {
  // response.send('Hello Express')
  // response.send({
  // name: 'Alan',
  // likes: ['Basketball', 'Reading']
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the website please enjoy click on my ads good content thanks'
  })
})

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page'
  })
})

app.get('/bad', (request, response) => {
  response.send({
    error: 'Bad request'
  })
})

app.listen(3000, () => {
  console.log('Server is up at port 3000')
})
