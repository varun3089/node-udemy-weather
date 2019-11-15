const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoidmFydW4zMDg5IiwiYSI6ImNrMno1Ynl6ZTBmZTAzZnBlMjhlOWh1cGsifQ.oNpVwmt7HytG0JA2vEphSw"
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to location services')
        }
        else if (body.features.length === 0) {
            callback('unable to find location',undefined)
        }
        else {
            const lat = body.features[0].center[1]
            const long = body.features[0].center[0]
            callback(undefined, {
                lat: lat,
                long:long,
                location:body.features[0].place_name
            })
        }
    })
    
}

module.exports = geocode;