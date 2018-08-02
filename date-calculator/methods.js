const dateAndTime = require('date-and-time')

var daysOfWeekKey = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

var closestDate = (targetDate, dayOfWeek, direction) => {
  var dateClone = new Date(targetDate)
  var dayLowerCase = dayOfWeek.toLowerCase()
  var directionLowerCase = direction.toLowerCase()

  if (directionLowerCase === 'after') {
    do {
      dateClone = dateAndTime.addDays(dateClone, 1)
    } while (dateClone.getDay() !== daysOfWeekKey.indexOf(dayLowerCase))
  }
  if (directionLowerCase === 'before') {
    do {
      dateClone = dateAndTime.addDays(dateClone, -1)
    } while (dateClone.getDay() !== daysOfWeekKey.indexOf(dayLowerCase))
  }
  return dateClone
}

var closestTo = ({target, dayOfWeek}) => {
  if (target === undefined) {
    target = new Date()
    target.setHours(0)
    target.setMinutes(0)
    target.setSeconds(0)
    target.setMilliseconds(0)
  }
  var dayLowerCase = dayOfWeek.toLowerCase()

  var closestAfter = closestDate(target, dayLowerCase, 'after')
  var closestBefore = closestDate(target, dayLowerCase, 'before')

  var differenceAfter = dateAndTime.subtract(closestAfter, target).toDays()
  var differenceBefore = dateAndTime.subtract(target, closestBefore).toDays()

  if (differenceAfter === 7 || differenceBefore === 7) {
    return target
  }
  if (differenceAfter < differenceBefore) {
    return closestAfter
  } else {
    return closestBefore
  }
}

module.exports = {
  closestDate,
  closestTo
}
