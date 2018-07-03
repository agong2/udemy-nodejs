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

geocodeClass.geocode(argv.a, (errorMessage, geoResults) => { // a callback
// callbacks allow for asynchronous efficiency
  if (errorMessage) {
    console.log(errorMessage) 
    //if it messes up, then you  get an error message and that's it
  } else {
    console.log(JSON.stringify(geoResults, undefined, 2))
    console.log('-----------------------------------------')
    console.log(`Formatted: ${geoResults.address}`)
    console.log('-----------------------------------------')
    // if it doesn't mess up, then it does another callback
    weatherClass.getWeather(geoResults.latitude, geoResults.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage)
        // if it messes up, then you get an error message, and that's it
      } else {
        console.log(JSON.stringify(weatherResults, undefined, 2))
        console.log('-----------------------------------------')
        console.log(`It feels like ${weatherResults.apparentTemp} degrees outside. It's actually ${weatherResults.actualTemp} degrees. The humidity is ${weatherResults.humidity * 100}%.`)
        // if it doesn't, then it prints this
      }
    })
  }
})
