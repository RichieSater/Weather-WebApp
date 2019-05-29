//Load Needed Modules
const express = require('express')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const hbs = require('hbs')
const path = require('path')

//Setup Express
const app = express() 

//Use Path to Set Up Public Dir OS Friendly (__dirname is the path to the folder that this file lives in)
const publicDirectoryPath = path.join(__dirname, '../public')

//Setup Views Path (only neccessary because named folder templates/views not views)
const viewsPath = path.join(__dirname, '../templates/views' )

//Setup Partials Path
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars
app.set('view engine', 'hbs') //Setting view engine to handlebars
app.set('views', viewsPath) //Setting views folder to templates
hbs.registerPartials(partialsPath)

//Setup Static Folder
app.use(express.static(publicDirectoryPath))


//Index Page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Richie Sater'
    })
})

//About Page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Richie Sater'
    })
})

//Help Page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!',
        name: 'Richie',
        message: 'For help with application, email rs@richiesater.com',

    })
})


//Weather App - Create HTTP Endpoint
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search'
        })
    }
    res.send({
        products: []
    })
})

//404 Page specific to people looking for a page within help
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Richie',
        errorMessage: 'Help article not found'
    })
})

//404 Page - express uses * as wildcard, matches in order
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Richie',
        errorMessage:'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server online on port 3000')
})