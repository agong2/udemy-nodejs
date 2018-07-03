const yargs = require('yargs')
const axios = require('axios')

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
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find address')
  }

  var lat = response.data.results[0].geometry.location.lat
  var long = response.data.results[0].geometry.location.lng
  var weatherURL = `https://api.darksky.net/forecast/d1e4a2c6804432bf2ef2ea9a3c3be46f/${lat},${long}`
  console.log(response.data.results[0].formatted_address)
  return axios.get(weatherURL)
}).then((response) => {
  var actualTemp = response.data.currently.temperature
  var apparentTemp = response.data.currently.apparentTemperature
  var humidity = response.data.currently.humidity
  console.log(`It feels like ${apparentTemp} degrees outside. It's actually ${actualTemp} degrees. The humidity is ${humidity * 100}%.`)
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to servers.')
  } else {
    console.log(e.message)
  }
})
