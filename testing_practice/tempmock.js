var methods = require('./methods')
  
var powerOf = (base, exponent) => {
  var res = methods.multiply(base, base) // uses methods.multiply from another class
  for (var step = 0; step < (exponent - 2); step++) {
    res = methods.multiply(res, base) // not both methods in the same class
  }
  return res
}

// this allows for a spy to be called on just the 'multiply' method

var rpowerOf = (base, exponent) => {
  if (exponent === 0) {
    return 1
  } else {
    return methods.multiply(base, rpowerOf(base, exponent - 1))
  }
}

module.exports = {
  powerOf,
  rpowerOf
}
