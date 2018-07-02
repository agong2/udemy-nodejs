const yargs = require('yargs')

const geocodeClass = require('./geocode/geocode.js')
const weatherClass = require('./weather/weather.js')

const argv = yargs
  .options({
    address: {
      demand: true,
      alias: 'a',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv

console.log(`You typed ${argv.a}`)
console.log('-----------------------------------------')

geocodeClass.geocode(argv.a, (errorMessage, geoResults) => {
  if (errorMessage) {
    console.log(errorMessage)
  } else {
    console.log(JSON.stringify(geoResults, undefined, 2))
    console.log('-----------------------------------------')
    console.log(`Formatted: ${geoResults.address}`)
    console.log('-----------------------------------------')
    weatherClass.getWeather(geoResults.latitude, geoResults.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage)
      } else {
        console.log(JSON.stringify(weatherResults, undefined, 2))
        console.log('-----------------------------------------')
        console.log(`It feels like ${weatherResults.apparentTemp} degrees outside. It's actually ${weatherResults.actualTemp} degrees. The humidity is ${weatherResults.humidity * 100}%.`)
      }
    })
  }
})
