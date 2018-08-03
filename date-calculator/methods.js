const dateAndTime = require('date-and-time')

var daysOfWeekKey = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
var directionKey = ['before', 'after']
var ordinalKey = ['first', 'second', 'third', 'fourth', 'fifth', 'last']
var monthsKey = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

var closestDate = (targetDate, dayOfWeek, direction) => {
  var dateClone = new Date(targetDate)
  var dayLowerCase = dayOfWeek.toLowerCase()
  var directionLowerCase = direction.toLowerCase()

  if (directionLowerCase === directionKey[1]) {
    do {
      dateClone = dateAndTime.addDays(dateClone, 1)
    } while (dateClone.getDay() !== daysOfWeekKey.indexOf(dayLowerCase))
  }
  if (directionLowerCase === directionKey[0]) {
    do {
      dateClone = dateAndTime.addDays(dateClone, -1)
    } while (dateClone.getDay() !== daysOfWeekKey.indexOf(dayLowerCase))
  }
  return dateClone
}

var hasKey = (obj, keyName) => {
  return obj.hasOwnProperty(keyName)
}

var closestTo = (arg) => {
  if (hasKey(arg, 'dayOfWeek') === false) {
    throw new Error('Error: Day of week not found')
  }
  var dayLowerCase = arg.dayOfWeek.toLowerCase()
  if (daysOfWeekKey.includes(dayLowerCase) === false) {
    throw new Error('Error: Day of week not found')
  }

  if (hasKey(arg, 'target') === false) {
    arg.target = new Date()
  }

  var dateClone = new Date(arg.target)
  dateClone.setHours(0, 0, 0, 0)

  var closestAfter = closestDate(dateClone, dayLowerCase, directionKey[1])
  var closestBefore = closestDate(dateClone, dayLowerCase, directionKey[0])

  var differenceAfter = dateAndTime.subtract(closestAfter, dateClone).toDays()
  var differenceBefore = dateAndTime.subtract(dateClone, closestBefore).toDays()

  if (differenceAfter === 7 || differenceBefore === 7) {
    return dateClone
  }
  if (differenceAfter < differenceBefore) {
    return closestAfter
  } else {
    return closestBefore
  }
}

var nthOfMonth = (arg) => {
  if (hasKey(arg, 'ordinal') === false) {
    throw new Error('Error: Ordinal not found')
  }
  if (hasKey(arg, 'dayOfWeek') === false) {
    throw new Error('Error: Day of week not found')
  }
  var ordinalLowerCase = arg.ordinal.toLowerCase()
  var dayLowerCase = arg.dayOfWeek.toLowerCase()
  if (ordinalKey.includes(ordinalLowerCase) === false) {
    throw new Error('Error: Ordinal not found')
  }
  if (daysOfWeekKey.includes(dayLowerCase) === false) {
    throw new Error('Error: Day of week not found')
  }

  if (hasKey(arg, 'year') === false) {
    arg.year = new Date().getFullYear()
  }
  if (hasKey(arg, 'month') === false) {
    arg.month = monthsKey[new Date().getMonth()]
  }

  var date = new Date(arg.year + ' ' + arg.month)
  var ordinalCounter
  if (date.getDay() === daysOfWeekKey.indexOf(arg.dayOfWeek)) {
    ordinalCounter = 0
  } else {
    ordinalCounter = -1
  }

  if (ordinalLowerCase === 'last') {
  //  date = closestDate(date, dayLowerCase, directionKey[1])
  }
  while (ordinalCounter !== ordinalKey.indexOf(ordinalLowerCase)) {
    date = closestDate(date, dayLowerCase, directionKey[1])
    ordinalCounter = ordinalCounter + 1
  }
  return date
}

module.exports = {
  closestDate,
  closestTo,
  nthOfMonth
}
