const request = require('request')

var getWeather = (lat, long, callback) => {
  request({
    url: `https://api.darksky.net/forecast/d1e4a2c6804432bf2ef2ea9a3c3be46f/${lat},${long}`,
    json: true
  },
  (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(null, {
        apparentTemp: body.currently.apparentTemperature,
        actualTemp: body.currently.temperature,
        humidity: body.currently.humidity
      })
    } else {
      callback(new Error('Unable to fetch weather'))
    }
  })
}

module.exports.getWeather = getWeather
