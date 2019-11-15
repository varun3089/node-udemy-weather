const request = require('request');

const forecast = (lat, long, callback) => {
    const url = "https://api.darksky.net/forecast/3297e926c7527ef464a1132c5994eea5/"+lat+","+long
    request({url, json:true}, (error,{body}) => {
        if (error) {
            callback('unable to connect to location services',undefined)
        }
        else if (body.error) {
            callback('unable to find location forecast',undefined)
        }
        else {
            callback(undefined, body.daily.data[0].summary+'It is currently '+body.currently.temperature+' degrees out.')
        }
    })
}

module.exports = forecast;