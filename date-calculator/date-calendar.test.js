/* eslint-env jasmine */
// npm test to run

const methods = require('./methods')

describe('closestDate Tests', () => {
  it('should not have case sensitive arguments', () => {
    var res = methods.closestDate(new Date('2018 7 27'), 'WEDNeSDaY', 'AFter')
    expect(res).toEqual(new Date('2018 8 1'))
  })
  it.skip('should return a date object with no timestamp', () => {
    var res = methods.closestDate(new Date('2018 7 27'), 'wednesday', 'after')
    expect(res).toEqual(new Date('2018 8 1'))
  })
  it('should return the closest date after the target date, given a specific day', () => {
    var res = methods.closestDate(new Date('2018 7 27'), 'wednesday', 'after')
    expect(res).toEqual(new Date('2018 8 1'))
  })
  it('should return the closest date before the target date, given a specific day', () => {
    var res = methods.closestDate(new Date('2018 7 27'), 'wednesday', 'before')
    expect(res).toEqual(new Date('2018 7 25'))
  })
  it('should jump a week if the day of target date matches a given day', () => {
    var resBefore = methods.closestDate(new Date('2018 7 27'), 'friday', 'before')
    expect(resBefore).toEqual(new Date('2018 7 20'))

    var resAfter = methods.closestDate(new Date('2018 7 27'), 'friday', 'after')
    expect(resAfter).toEqual(new Date('2018 8 3'))
  })
})

describe('closestTo Tests', () => {
  it.skip('should not have case sensitive arguments', () => {
    var res = methods.closestDate({target: new Date('2018-07-27'), dayOfWeek: 'WEDNeSDaY'})
    var compareRes = new Date(2018, 7, 1).setHours(0, 0, 0, 0)
    expect(res).toEqual(compareRes)
  })
  it.skip('should return a date object with no timestamp', () => {
    var res = methods.closestDate({target: new Date('2018-07-27'), dayOfWeek: 'wednesday'})
    var compareRes = new Date(2018, 7, 1).setHours(0, 0, 0, 0)
    expect(res).toEqual(compareRes)
  })
  it.skip('should return the closest date to the target date, given a specific day', () => {
    var res = methods.closestDate({target: new Date('2018-07-27'), dayOfWeek: 'wednesday'})
    expect(res).toEqual(2018, 6, 25)
  })
  it.skip('should not return the alternative date, given a specific day', () => {
    var res = methods.closestDate({target: new Date('2018-07-27'), dayOfWeek: 'wednesday'})
    expect(res).not.toEqual(2018, 7, 1)
  })
  it.skip('should return the target date if the days match', () => {
    var resBefore = methods.closestDate({target: new Date('2018-07-27'), dayOfWeek: 'friday'})
    var resAfter = methods.closestDate({target: new Date('2018-07-27'), dayOfWeek: 'friday'})
    expect(resBefore).toEqual(2018, 6, 27)
    expect(resAfter).toEqual(2018, 6, 27)
  })
  it.skip('should set the target date to today by default', () => {
    var resNo = methods.closestDate('friday')
    var resToday = methods.closestTo(new Date().setHours(0, 0, 0, 0), 'friday')
    expect(resNo).toEqual(resToday)
  })
})

describe('nthOfMonth Tests', () => {
})
