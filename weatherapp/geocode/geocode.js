const request = require('request')

var geocode = (userInputAddress, callback) => {
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address= ${encodeURIComponent(userInputAddress)}`,
    json: true
  },
  (error, response, body) => {
    if (error) {
      callback(new Error('Unable to connect to server'))
    } else if (body.status === 'ZERO_RESULTS') {
      callback(new Error('Address not recognized'))
    } else if (body.status === 'OK') {
      callback(null, {
        address: body.results[0].formatted_address,
        longitude: String(body.results[0].geometry.location.lng),
        latitude: String(body.results[0].geometry.location.lat)
      })
    }
  })
}

module.exports = {
  geocode
}
