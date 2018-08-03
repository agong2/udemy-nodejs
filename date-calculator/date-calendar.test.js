/* eslint-env jasmine */
// npm test to run

const methods = require('./methods')

var monthsKey = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

describe('closestDate', () => {
  it('should have case insensitive arguments', () => {
    var res = methods.closestDate(new Date('2018 7 27'), 'WEDNeSDaY', 'AFter')
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

describe('closestTo', () => {
  it('should return an object without timestamp', () => {
    var res = methods.closestTo({target: new Date('2018-07-27'), dayOfWeek: 'wednesday'})
    expect(res.getDate()).toBe(25)
    expect(res.getHours()).toBe(0)
    expect(res.getMinutes()).toBe(0)
    expect(res.getSeconds()).toBe(0)
    expect(res.getMilliseconds()).toBe(0)
  })
  it('should have case insensitive arguments', () => {
    var res = methods.closestTo({target: new Date('2018-07-27'), dayOfWeek: 'WEDNeSDaY'})
    expect(res).toEqual(new Date('2018 7 25'))
  })
  var dayToTest = 'wednesday'
  describe(`when given a ${dayToTest}`, () => {
    it('should return the closest date in the past', () => {
      var res = methods.closestTo({target: new Date('2018-07-27'), dayOfWeek: dayToTest})
      expect(res).toEqual(new Date('2018 7 25'))
    })
    it('should return the closest date in the future', () => {
      var res = methods.closestTo({target: new Date('2018-07-23'), dayOfWeek: dayToTest})
      expect(res).toEqual(new Date('2018 7 25'))
    })
  })
  it('should return the original date if the days of both arguments are the same', () => {
    var resBefore = methods.closestTo({target: new Date('2018-07-27'), dayOfWeek: 'friday'}) // 7/27/2018 is a Friday as well
    expect(resBefore).toEqual(new Date('2018 7 27'))
  })
  describe('if missing proper arguments', () => {
    it('should set the \'target\' to today if no \'target\' argument ', () => {
      var resNo = methods.closestTo({dayOfWeek: 'friday'})
      var today = new Date()
      today.setHours(0, 0, 0, 0)
      var resToday = methods.closestTo({today, dayOfWeek: 'friday'})
      expect(resNo).toEqual(resToday)
    })
    it('should throw an new Error if missing or invalid \'dayOfWeek\' argument', () => {
      function noDayOfWeek () {
        methods.closestTo({target: new Date('2018-07-27')})
      }
      function wrongDayOfWeek () {
        methods.closestTo({target: new Date('2018-07-27'), dayOfWeek: 'xxxxxxxxxxxxxxxxxxxxx'})
      }
      expect(noDayOfWeek).toThrowError('Error: Day of week not found')
      expect(wrongDayOfWeek).toThrowError('Error: Day of week not found')
    })
  })
})

describe('nthOfMonth', () => {
  it('should return an object without timestamp', () => {
    var res = methods.nthOfMonth({year: 2018, month: 'JULY', ordinal: 'seconD', dayOfWeek: 'mOnDaY'})
    expect(res.getDate()).toBe(9)
    expect(res.getHours()).toBe(0)
    expect(res.getMinutes()).toBe(0)
    expect(res.getSeconds()).toBe(0)
    expect(res.getMilliseconds()).toBe(0)
  })
  it('should have case insensitive arguments', () => {
    var res = methods.nthOfMonth({year: 2018, month: 'JULY', ordinal: 'seconD', dayOfWeek: 'mOnDaY'})
    expect(res).toEqual(new Date('2018 7 9'))
  })
  var yearToTest = 2018
  var monthToTest = 'july'
  var dayToTest = 'monday'
  describe(`given the year ${yearToTest}, the month ${monthToTest}, and the day of week ${dayToTest}`, () => {
    it(`should return the second ${dayToTest} of ${monthToTest}, ${yearToTest} if 'ordinal' is second`, () => {
      var res = methods.nthOfMonth({year: yearToTest, month: monthToTest, ordinal: 'second', dayOfWeek: dayToTest})
      expect(res).toEqual(new Date('2018 7 9'))
    })
    it(`should, for both fifth and last, return the same ${dayToTest} of ${monthToTest} ${yearToTest}`, () => {
      var resFifth = methods.nthOfMonth({year: yearToTest, month: monthToTest, ordinal: 'fifth', dayOfWeek: dayToTest})
      expect(resFifth).toEqual(new Date('2018 7 30'))

      var resLast = methods.nthOfMonth({year: yearToTest, month: monthToTest, ordinal: 'last', dayOfWeek: dayToTest})
      expect(resLast).toEqual(new Date('2018 7 30'))
    })
  })
  dayToTest = 'wednesday'
  describe(`given the year ${yearToTest}, the month ${monthToTest}, and the day of week ${dayToTest}`, () => {
    it('should return null if \'ordinal\' is set to fifth', () => {
      var res = methods.nthOfMonth({year: yearToTest, month: monthToTest, ordinal: 'fifth', dayOfWeek: dayToTest})
      expect(res).toEqual(null)
    })
  })
  describe('if missing proper arguments', () => {
    it('should throw a new Error if the given ordinal is not valid', () => {
      function noOrdinal () {
        methods.nthOfMonth({year: 2018, month: 'july', dayOfWeek: 'monday'})
      }
      function incorrectOrdinal () {
        methods.nthOfMonth({year: 2018, month: 'july', ordinal: 'tentieth', dayOfWeek: 'monday'})
      }
      expect(noOrdinal).toThrow('Error: Ordinal not found')
      expect(incorrectOrdinal).toThrow('Error: Ordinal not found')
    })
    it('should throw a new Error if the given dayOfWeek is not valid', () => {
      function noDayOfWeek () {
        methods.nthOfMonth({year: 2018, month: 'july', ordinal: 'second'})
      }
      function wrongDayOfWeek () {
        methods.nthOfMonth({year: 2018, month: 'july', ordinal: 'second', dayOfWeek: 'christmas!'})
      }
      expect(noDayOfWeek).toThrowError('Error: Day of week not found')
      expect(wrongDayOfWeek).toThrowError('Error: Day of week not found')
    })
    it('should default to the current year if the \'year\' argument is not specified', () => {
      var resNoYear = methods.nthOfMonth({month: 'july', ordinal: 'second', dayOfWeek: 'monday'})
      var res = methods.nthOfMonth({year: new Date().getFullYear(), month: 'july', ordinal: 'second', dayOfWeek: 'monday'})
      expect(resNoYear).toEqual(res)
    })
    it('should default to the current month if the \'month\' argument is not specified', () => {
      var resNoMonth = methods.nthOfMonth({year: 2018, ordinal: 'second', dayOfWeek: 'monday'})
      var res = methods.nthOfMonth({year: 2018, month: monthsKey[new Date().getMonth()], ordinal: 'second', dayOfWeek: 'monday'})
      expect(resNoMonth).toEqual(res)
    })
  })
})

describe('nthAdjacent Tests', () => {
  it.skip('should have case insensitive arguments', () => {

  })
  it.skip('should return the nth date before or after the target date, given a specific day of week', () => {

  })
  it.skip('should throw a new Error if the given direction is not valid', () => {

  })
  it.skip('should default to today if the \'target\' argument is not specified', () => {

  })
  it.skip('should default to the adjacent date if the \'distance\' argument is not specified, given a specific day of the week', () => {

  })
})
