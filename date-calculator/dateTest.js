const dateAndTime = require('date-and-time')
const methods = require('./methods.js')

// var test = dateAndTime.parse('2018-07-30', 'YYYY MM DD')

// console.log(test.toLocaleDateString('en-US'))

// test = dateAndTime.addDays(test, 1)

// console.log(test.toLocaleDateString('en-US'))

// var ex = new Date('2018 7 27')
// var dateClone = JSON.parse(JSON.stringify(ex))
// var day = dateClone.getDay()

var target = new Date(Date.UTC('2018 7 27'))
console.log(target)
var closestAfter = methods.closestDate(new Date('2018 7 27'), 'wednesday', 'after')
console.log(closestAfter)
var closestBefore = methods.closestDate(new Date('2018 7 27'), 'wednesday', 'before')
console.log(closestBefore)

var differenceAfter = dateAndTime.subtract(closestAfter, target).toDays()
console.log(differenceAfter)
var differenceBefore = dateAndTime.subtract(target, closestBefore).toDays()
console.log(differenceBefore)

if (differenceAfter < differenceBefore) {
  console.log(closestAfter)
} else {
  console.log(closestBefore)
}

console.log(new Date(Date.UTC(2018, 0, 1, 0, 0, 0)))
