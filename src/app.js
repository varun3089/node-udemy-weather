const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
const app = express()

//give port to heroku from environment variable or use deafult 3000 if app is run from local machine
const port = process.env.PORT || 3000

//define paths for express config
const dirpath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(dirpath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'weather app',
        name: 'varun'
    });
})

// app.get('', (req,res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req,res) => {
//     res.send([{
//         name: 'Varun',
//         age: 30 
//     }, {
//         name: 'Hari',
//         age: 30 
//     }])
// })

// app.get('/about', (req,res) => {
//     res.send('<h1>About page</h1>')
// })

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'weather app about',
        name: 'varun'
    });
})

app.get('/help', (req,res) => {
    res.render('help', {
        message: "help message",
        title: 'weather app help',
        name: 'varun'
    });
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'address must be provided'
        })
    }   
    geocode(req.query.address, (error, {lat, long, location} = {}) => { //will not crash if address provided is a special character or not legit object
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(lat, long, (error, forecastdata) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                location: location,
                forecast: forecastdata,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'search must be provided'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404page', {
        message: "help article not found"
    });
})
app.get('*', (req,res) => {
    res.render('404page', {
        message: "404 not found"
    });
})

app.listen(port, () => {
    console.log('listening on '+port)
});