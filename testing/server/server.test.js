const request = require('supertest')
const expect = require('expect')

var app = require('./server').app

describe('Server Tests', () => {
  it('should return hello world', (done) => {
    request(app)
      .get('/')
      .expect(404)
      .expect((res) => {
        expect(res.body).toInclude({
          error: 'Page not found.'
        })
      })
      .end(done)
  })
  
  it('should have an onject in the array with my buddy Sam', (done) => {
    request(app)
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(res.body).toInclude({
          name: 'Sam',
          age: 20
        })
      })
      .end(done)
  })
})
