/* eslint-env jasmine*/

const methods = require('./methods.js') // has multiply method
const tempmock = require('./tempmock') // has power method, calls multiply from ^ class

describe('multiply Tests', () => {
  it(('should multiply two numbers correctly'), () => {
    var res = methods.multiply(4, 3)
    expect(res).toBe(12)
  })
})

describe('powerOf Tests', () => {
  it(('should call methods.mutliplication n-1 times'), () => {
    const multiplySpy = jest.spyOn(methods, 'multiply') // spy on the mutiply method
    tempmock.powerOf(2, 5) // call powerOf method from seperate class
    expect(multiplySpy).toHaveBeenCalledTimes(4) // or else this statement won't work properly
  })
  it(('should properly take the power of an exponent'), () => {
    var res = tempmock.powerOf(3, 4)
    expect(res).toBe(81)
  })
  it(('should work properly with negative numbers'), () => {
    var res = tempmock.powerOf(-2, 5)
    expect(res).toBe(-32)
  })
})

describe('rpowerOf Tests', () => {
  it(('should call methods.multiplication n times'), () => {
    const rmultiplySpy = jest.spyOn(methods, 'multiply')
    tempmock.rpowerOf(2, 5)
    expect(rmultiplySpy).toHaveBeenCalledTimes(5)
  })
  it(('should properly take the power of an exponent recursively'), () => {
    var res = tempmock.rpowerOf(3, 4)
    expect(res).toBe(81)
  })
  it(('should work properly with engative numbers'), () => {
    var res = tempmock.rpowerOf(-2, 5)
    expect(res).toBe(-32)
  })
})
