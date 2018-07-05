const expect = require('expect')

const utils = require('./utils')

// it('should add two numbers', () => {
//   var res = utils.add(33, 11)
//
//   if (res !== 44) {
//     throw new Error(`Expected 44, but got ${res}.`)
//   }
// }

describe('Util Tests', () => {
  it(('should add 2 numbers'), () => {
    var res = utils.add(33, 11)
    expect(res).toBe(44).toBeA('number')
  })

  it('should square a number', () => {
    var res = utils.square(5)
    expect(res).toBe(25).toBeA('number')
  })

  it('should set first and last name', () => {
    var user = {location: 'Arizona', age: '21'}
    var res = utils.setName(user, 'Al G')

    expect(res).toInclude({
      firstName: 'Al',
      lastName: 'G'
    })
  })
describe('#async util tests', () => {
    it(('should add 2 numbers asynchronously'), (done) => {
      utils.asyncAdd(33, 11, (sum) => {
        expect(sum).toBe(44).toBeA('number')
        done()
      })
    })
  })
})
