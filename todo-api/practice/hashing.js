const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')

var message = 'hashing test!'
var hash = SHA256(message).toString()

console.log(`Message: ${message}`)
console.log(`Hash: ${hash}`)

// ------------------------------------------------

var data = {
  id: 4
}
var token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'secret salt').toString()
}

// token.data.id = 10
// token.hash = SHA256(JSON.stringify(token.data)).toString()
// if you add these two lines, the data changes, to the hash is changed

// token.hash = SHA256(JSON.stringify(data) + 'secret salt').toString()
// if you add this line, the hash is unchanged (of course!)

// token.hash = SHA256(JSON.stringify(data) + 'different salt').toString()
// if you add this line, the salt changes, so the hash is changed

var resultHash = SHA256(JSON.stringify(token.data) + 'secret salt').toString()
if (resultHash === token.hash) {
  console.log('Data was not changed. Hash = hash')
} else {
  console.log('Data was changed. Do not trust')
}

// ---------------------------------------------------

console.log('---------------------------------------------------')

var jwtData = {
  id: 4
}

var jwtToken = jwt.sign(jwtData, 'secret salt')
console.log(jwtToken)

// var jwtDecoded = jwt.verify(jwtToken, 'secret salt')
// console.log('decoded', jwtDecoded)
// this returns without errors, because the salt matches, so the hash matches

var jwtDecoded = jwt.verify(jwtToken, 'notagoodsalt')
console.log('decoded', jwtDecoded)
// this returns an error, because the salt does does not match
