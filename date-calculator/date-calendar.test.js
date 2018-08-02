/* eslint-env jasmine */
// npm test to run

const methods = require('./methods')

describe('closestDate Tests', () => {
  it('should have case insensitive arguments', () => {
    var res = methods.closestDate(new Date('2018 7 27'), 'WEDNeSDaY', 'AFter')
    expect(res).toEqual(new Date('2018 8 1'))
  })
  it.skip('should return a date object with no timestamp', () => {
    var res = methods.closestDate(new Date('2018 7 27'), 'wednesday', 'after')
    expect(res).toEqual(new Date('2018 8 1'))
  })
  it('should return the closest date after the target date, given a specific day of week', () => {
    var res = methods.closestDate(new Date('2018 7 27'), 'wednesday', 'after')
    expect(res).toEqual(new Date('2018 8 1'))
  })
  it('should return the closest date before the target date, given a specific day of week', () => {
    var res = methods.closestDate(new Date('2018 7 27'), 'wednesday', 'before')
    expect(res).toEqual(new Date('2018 7 25'))
  })
  it('should jump a week if the day of target date matches a given day of week', () => {
    var resBefore = methods.closestDate(new Date('2018 7 27'), 'friday', 'before')
    expect(resBefore).toEqual(new Date('2018 7 20'))

    var resAfter = methods.closestDate(new Date('2018 7 27'), 'friday', 'after')
    expect(resAfter).toEqual(new Date('2018 8 3'))
  })
})

describe('closestTo Tests', () => {
  it('should have case insensitive arguments', () => {
    var res = methods.closestTo({target: new Date('2018 7 27'), dayOfWeek: 'WEDNeSDaY'})
    expect(res).toEqual(new Date('2018 7 25'))
  })
  it('should return a date object with no timestamp', () => {
    var res = methods.closestTo({target: new Date('2018 7 27'), dayOfWeek: 'wednesday'})
    var compare = new Date(new Date('2018 7 27').setHours(0, 0, 0, 0))
    expect(res).toEqual(compare)
  })
  it('should return the closest date to the target date, given a specific day of week', () => {
    var res = methods.closestTo({target: new Date('2018 7 27'), dayOfWeek: 'wednesday'})
    expect(res).toEqual(new Date('2018 7 25'))
  })
  it('should not return the alternative date, given a specific day of week', () => {
    var res = methods.closestTo({target: new Date('2018 7 27'), dayOfWeek: 'wednesday'})
    expect(res).not.toEqual(new Date('2018 8 1'))
  })
  it('should not only return the closest date before, but also the closest date after the target date if applicable', () => {
    var res = methods.closestTo({target: new Date('2018 7 27'), dayOfWeek: 'saturday'})
    expect(res).toEqual(new Date('2018 7 28'))
  })
  it('should return the target date if both days of week match', () => {
    var resBefore = methods.closestTo({target: new Date('2018 7 27'), dayOfWeek: 'friday'}) // 7/27/2018 is a Friday as well
    expect(resBefore).toEqual(new Date('2018 7 27'))

    var resAfter = methods.closestTo({target: new Date('2018 7 27'), dayOfWeek: 'friday'})
    expect(resAfter).toEqual(new Date('2018 7 27'))
  })
  it('should default to the today if the \'target\' argument is not specified', () => {
    var resNo = methods.closestTo('friday')
    var resToday = methods.closestTo(new Date().setHours(0, 0, 0, 0), 'friday')
    expect(resNo).toEqual(resToday)
  })
})

describe('nthOfMonth Tests', () => {
  it.skip('should have case insensitive arguments', () => {

  })
  it.skip('should return the nth date of a month for a given month of a given year, given a specific day of week', () => {

  })
  it.skip('should return null if the \'fifth\' argument is specified, if the 5th date does not exist in a given month', () => {

  })
  it.skip('should return the 4th or the 5th date if the \'last\' argument is specified, depending on which is the last date of a given month', () => {

  })
  it.skip('should return a new Error if the given month or the given ordinal is not valid', () => {

  })
  it.skip('should default to the current year if the \'year\' argument is not specified', () => {

  })
  it.skip('should default to the current month if the \'month\' argument is not specified', () => {

  })
})

describe('nthAdjacent Tests', () => {
  it.skip('should have case insensitive arguments', () => {

  })
  it.skip('should return the nth date before or after the target date, given a specific day of week', () => {

  })
  it.skip('should return a new Error if the given direction is not valid', () => {

  })
  it.skip('should default to today if the \'target\' argument is not specified', () => {

  })
  it.skip('should default to the adjacent date if the \'distance\' argument is not specified, given a specific day of the week', () => {

  })
})
