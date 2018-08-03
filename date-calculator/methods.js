const dateAndTime = require('date-and-time')

var daysOfWeekKey = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
var directionKey = ['before', 'after']
var ordinalKey = ['first', 'second', 'third', 'fourth', 'fifth', 'last']
var monthsKey = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

var lowerCaseAllValues = (object) => {
  var keys = Object.keys(object)
  var i
  for (i = 0; i < keys.length; i++) {
    if (typeof object[keys[i]] === 'string') {
      object[keys[i]] = object[keys[i]].toLowerCase()
    }
  }
}

var requireKey = (object, key, errorMessage) => {
  if (hasKey(object, key) === false) {
    throw new Error(errorMessage)
  }
}

var requireValidArrayValue = (array, value, errorMessage) => {
  if (array.includes(value) === false) {
    throw new Error(errorMessage)
  }
}

var requireValidDayOfWeek = (dayOfWeek) => {
  requireValidArrayValue(daysOfWeekKey, dayOfWeek, 'Error: Day of week not found')
}

var requireValidOrdinal = (ordinal) => {
  requireValidArrayValue(ordinalKey, ordinal, 'Error: Ordinal not found')
}

var closestDate = (targetDate, dayOfWeek, direction) => {
  if (targetDate.toString() === 'Invalid Date') {
    throw new Error('Error: Invalid date given to closestDate')
  }
  var dateClone = new Date(targetDate)
  dayOfWeek = dayOfWeek.toLowerCase()
  direction = direction.toLowerCase()

  var daysToAdd = (direction === directionKey[1]) ? 1 : -1
  do {
    dateClone = dateAndTime.addDays(dateClone, daysToAdd)
  } while (dateClone.getDay() !== daysOfWeekKey.indexOf(dayOfWeek))

  return dateClone
}

var hasKey = (obj, keyName) => {
  return obj.hasOwnProperty(keyName)
}

var closestTo = (arg) => {
  lowerCaseAllValues(arg)
  requireKey(arg, 'dayOfWeek', 'Error: Day of week not found')
  requireValidDayOfWeek(arg.dayOfWeek)

  if (hasKey(arg, 'target') === false) {
    arg.target = new Date()
  }

  var dateClone = new Date(arg.target)
  dateClone.setHours(0, 0, 0, 0)

  var closestAfter = closestDate(dateClone, arg.dayOfWeek, directionKey[1])
  var closestBefore = closestDate(dateClone, arg.dayOfWeek, directionKey[0])

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
  lowerCaseAllValues(arg)
  requireKey(arg, 'ordinal', 'Error: Ordinal not found')
  requireValidOrdinal(arg.ordinal)
  requireKey(arg, 'dayOfWeek', 'Error: Day of week not found')
  requireValidDayOfWeek(arg.dayOfWeek)

  if (hasKey(arg, 'year') === false) {
    arg.year = new Date().getFullYear()
  }
  if (hasKey(arg, 'month') === false) {
    arg.month = monthsKey[new Date().getMonth()]
  } else if (monthsKey.indexOf(arg.month) === -1) {
    throw new Error('Error: Month not found')
  }

  var date = new Date(arg.year + ' ' + arg.month)
  var ordinalCounter
  if (date.getDay() === daysOfWeekKey.indexOf(arg.ordinal)) {
    ordinalCounter = 0
  } else {
    ordinalCounter = -1
  }

  if (arg.ordinal === 'last') {
    var firstOfNextMonth = dateAndTime.addMonths(date, 1)
    return closestDate(firstOfNextMonth, arg.dayOfWeek, 'before')
  }

  while (ordinalCounter !== ordinalKey.indexOf(arg.ordinal)) {
    date = closestDate(date, arg.dayOfWeek, directionKey[1])
    ordinalCounter = ordinalCounter + 1
  }
  if (date.getMonth() === monthsKey.indexOf(arg.month)) {
    return date
  }
  return null
}

module.exports = {
  closestDate,
  closestTo,
  nthOfMonth
}
