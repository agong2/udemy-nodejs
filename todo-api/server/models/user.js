const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
  // tokens can be sent back and forth instead of asking for a username and password every time
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

UserSchema.methods.toJSON = function () { // .methods is for methods defined on the document
  var user = this // 'this' is an individual specific document (lower case' user')
  var userObject = user.toObject()

  return _.pick(userObject, ['_id', 'email'])
  // the user can only see their own ID and email -- everything else is hidden for security
}
// **no arrow functions because you cant use 'this' with arrow functions

UserSchema.methods.generateAuthToken = function () {
  var user = this // 'this' is an individual specific document (lower case 'user')
  var access = 'auth' // what is this?
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString()
  // this makes the token from the _id and the salt 'abc123'

  user.tokens.push({access, token}) // concatenate 2 arrays?

  return user.save().then(() => { // ?????
    return token
  })
}

UserSchema.methods.removeToken = function (token) {
  var user = this

  return user.update({
    $pull: {
      tokens: {token}
    } // removes a key value pair from an array
  })
}

UserSchema.statics.findByToken = function (token) { // '.statics' is for methods defined on the model
  var User = this // 'this' is for all documents, a.k.a. the model (upper case 'User')
  var decoded

  try {
    decoded = jwt.verify(token, 'abc123') // this makes sure the token _id and salt matches
  } catch (e) {
    return Promise.reject(new Error('Incorrect salt'))
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  }) // if it matches, then return the pieces in an object
}

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this

  return User.findOne({email}).then((user) => { // looks for a matching email username
    if (!user) {
      return Promise.reject(new Error('No user found'))
    }

    return new Promise((resolve, reject) => { // a promise with a callback on the inside
      bcrypt.compare(password, user.password, (err, res) => { // since bcrypt can't do promises
        if (err) {
          console.log('findByCredientials: Bcrypt error')
        }
        if (res) { // and then a matching password
          resolve(user) // returns the user object in a promise to be used
        } else {
          reject(new Error('Incorrect password'))
        }
      })
    })
  })
}

UserSchema.pre('save', function (next) { // this is middleware, .pre makes this run before save
  var user = this

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log('Bcrypt.genSalt error')
      }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          console.log('Bcrypt.hash error')
        }
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

var User = mongoose.model('User', UserSchema)

module.exports = {User}
