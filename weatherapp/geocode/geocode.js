const request = require('request')

var geocode = (userInputAddress, callback) => {
  request({ // a "request" package method
    url: `https://maps.googleapis.com/maps/api/geocode/json?address= ${encodeURIComponent(userInputAddress)}`,
    json: true
  }, // the first argument is the API URL
  (error, response, body) => { // the second argument it what it does in the callback
    if (error) {
      callback(new Error('Unable to connect to server')) // if you get an error, return this in the callback
    } else if (body.status === 'ZERO_RESULTS') {
      callback(new Error('Address not recognized'))
    } else if (body.status === 'OK') { // if you don't get an error, then you can  return the following in the callback
      callback(null, { // returns null as first argument because this is what goes into the next callback
        address: body.results[0].formatted_address,
        longitude: String(body.results[0].geometry.location.lng),
        latitude: String(body.results[0].geometry.location.lat)
      })
    } // the second argument is what the callback returns (depends on what happens in the callback
  })
}

module.exports = {
  geocode
}
