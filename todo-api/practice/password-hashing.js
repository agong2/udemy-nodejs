const bcrypt = require('bcryptjs')

var password = '123abc'

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash)
  })
})

var hashed = '$2a$10$woPY8eLHfEFzwHV.7B0r.e.gl833XTZa4Kc.Zm.5ROLgVPF4SWBFK'
var alsoHashed = '$2a$10$E44xts53vXL83djZ6KWF1uY.NZxIxZ5CaAC7/t9d/ncX88kJVcA6i'

bcrypt.compare('123abc', hashed, (err, res) => {
  console.log(res)
})

bcrypt.compare('123abc', alsoHashed, (err, res) => {
  console.log(res)
})
