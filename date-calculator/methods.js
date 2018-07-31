const dateAndTime = require('date-and-time')

var daysOfWeekKey = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

var closestDate = (targetDate, dayOfWeek, direction) => {
  var dateClone = new Date(targetDate)

  if (direction.toLowerCase() === 'after') {
    while (dateClone.getDay() !== daysOfWeekKey.indexOf(dayOfWeek.toLowerCase())) {
      dateClone = dateAndTime.addDays(dateClone, 1)
    }
  }
  if (direction.toLowerCase() === 'before') {
    while (dateClone.getDay() !== daysOfWeekKey.indexOf(dayOfWeek.toLowerCase())) {
      dateClone = dateAndTime.addDays(dateClone, -1)
    }
  }
  return dateClone
}

module.exports = {closestDate}
