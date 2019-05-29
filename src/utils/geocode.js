const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmljaGllc2F0ZXIiLCJhIjoiY2p2cGxiZm90MDF5YTQ4bW1jaDFrY210ayJ9.N0T1B2yhTx7KhLt9Kx7lRg'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location match.  Try another search.', undefined)
        } else {
            const longitude = body.features[0].center[0]
            const latitude = body.features[0].center[1]
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }  
    })
}

module.exports = geocode