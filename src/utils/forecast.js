const request = require('request')

const forecast = (latitude, longitude, callback) => { 
    const url = 'https://api.darksky.net/forecast/2637dbdbbe073dc4c3b0d710e044b758/' + latitude + ',' + longitude

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location match.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. ' + ' The high is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '.')
        }
    }

)}
module.exports = forecast