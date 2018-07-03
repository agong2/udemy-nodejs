const yargs = require('yargs')
const axios = require('axios')
// this is a third party library for using APIs with "promises"

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

var geoURL = `https://maps.googleapis.com/maps/api/geocode/json?address= ${encodeURIComponent(argv.address)}`

axios.get(geoURL).then((response) => {
  // .get makes a promise, and .then is what to do when the promise is returned
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find address')
  }
  // if you get an error, you throw it and it goes down to catch (line 35)

  // if you don't get an error, do these things
  var lat = response.data.results[0].geometry.location.lat
  var long = response.data.results[0].geometry.location.lng
  var weatherURL = `https://api.darksky.net/forecast/d1e4a2c6804432bf2ef2ea9a3c3be46f/${lat},${long}`
  console.log(response.data.results[0].formatted_address)
  return axios.get(weatherURL)
  // returns another promise, which can be chained
}).then((response) => { // what to do when the new promise is returned. chained together!
  var actualTemp = response.data.currently.temperature
  var apparentTemp = response.data.currently.apparentTemperature
  var humidity = response.data.currently.humidity
  console.log(`It feels like ${apparentTemp} degrees outside. It's actually ${actualTemp} degrees. The humidity is ${humidity * 100}%.`)
}).catch((e) => {
  // if any errors are returned in the chain, they get sent here
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to servers.')
  } else {
    console.log(e.message)
  }
}) // promises allow for asynchronous stuff to happen
