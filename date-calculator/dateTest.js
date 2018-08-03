const dateAndTime = require('date-and-time')
const methods = require('./methods.js')

// var test = dateAndTime.parse('2018-07-30', 'YYYY MM DD')

// console.log(test.toLocaleDateString('en-US'))

// test = dateAndTime.addDays(test, 1)

// console.log(test.toLocaleDateString('en-US'))

// var ex = new Date('2018 7 27')
// var dateClone = JSON.parse(JSON.stringify(ex))
// var day = dateClone.getDay()

// var target = new Date(Date.UTC('2018 7 27'))
// console.log(target)
// var closestAfter = methods.closestDate(new Date('2018 7 27'), 'wednesday', 'after')
// console.log(closestAfter)
// var closestBefore = methods.closestDate(new Date('2018 7 27'), 'wednesday', 'before')
// console.log(closestBefore)
// 
// var differenceAfter = dateAndTime.subtract(closestAfter, target).toDays()
// console.log(differenceAfter)
// var differenceBefore = dateAndTime.subtract(target, closestBefore).toDays()
// console.log(differenceBefore)
// 
// if (differenceAfter < differenceBefore) {
//   console.log(closestAfter)
// } else {
//   console.log(closestBefore)
// }
// 
// console.log(new Date(Date.UTC(2018, 0, 1, 0, 0, 0)))

var one = new Date('2018 7 27') //ideal
console.log('one' + one)
console.log(one)

var two = new Date('2018-07-27') //notideal
console.log('two' + two)
console.log(two)
console.log('timestamp' + two.getDate())

var three = new Date(two)
console.log('three' + three)
console.log(three)
three.setHours(0, 0, 0, 0) //make it ideal
console.log('three after sethours ' + three)
console.log(three)

console.log('---------x-x-x-x-x----------')

var four = new Date('2018 july') //ideal
console.log('four ' + four)
console.log(four)

var five = new Date(2018, 6) //works
console.log('five' + five)
console.log(five)

var six = new Date('2018 6')
console.log ('six' + six)
console.log(six)

var seven = new Date('2018, 6')
console.log('seven' + seven)
console.log(seven)

var eight = new Date('2018-6')
console.log('eight ' + eight)
console.log(eight)
