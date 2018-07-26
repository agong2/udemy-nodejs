var {User} = require('./../models/user')

var authenticate = (req, res, next) => { // middleware
  var token = req.header('x-auth') // grabs that token

  User.findByToken(token).then((user) => { // calls findByToken method in user model file
    if (!user) {
    return Promise.reject()
    }

    req.user = user
    req.token = token
    next() // after authentication, continue
  }).catch((e) => {
    res.status(401).send() // no authentication, no 'next()'
  })
}

module.exports = {authenticate}
