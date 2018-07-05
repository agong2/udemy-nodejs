const expect = require('expect')
const rewire = require('rewire')

var app = rewire('./app')

describe('App', () => {
  var db = {
    saveUser: expect.createSpy()
  }
  app.__set__('db', db) // ?? this is rewire??

  it('should call the spy correctly', () => {
    var spy = expect.createSpy()
    spy('Alan')
    expect(spy).toHaveBeenCalledWith('Alan')
  })

  it('should call saveUser with user object', () => {
    var email = 'kek@notgmail.com'
    var password = 'password!'

    app.handleSignup(email, password) // ?? and the following line are strange
    expect(db.saveUser).toHaveBeenCalledWith({email, password})
  })
})
