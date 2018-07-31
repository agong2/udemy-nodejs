const dateAndTime = require('date-and-time')

// var test = dateAndTime.parse('2018-07-30', 'YYYY MM DD')

// console.log(test.toLocaleDateString('en-US'))

// test = dateAndTime.addDays(test, 1)

// console.log(test.toLocaleDateString('en-US'))

var ex = new Date('2018 7 27')
var dateClone = JSON.parse(JSON.stringify(ex))

console.log(dateClone.getDay())
