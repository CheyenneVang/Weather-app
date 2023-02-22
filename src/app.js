const path = require('path')
const express = require('express') // npm install express
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
// Defining paths for Express configuration
const fileDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// Creating dynamic templates
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// app.use is configuring our express application to serve up
app.use(express.static(fileDirectoryPath))
// Route handlers
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        aName: 'Cheyenne Vang'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        aName: 'Cheyenne Vang'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'What can we help you with?',
        title: 'Help',
        aName: 'Cheyenne Vang'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
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
app.get('/hello', (req, res) => {
    return res.send('Hello')
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        }) 
    }
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        aName: 'Cheyenne Vang',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        aName: 'Cheyenne Vang',
        errorMessage: 'Page not found'
    })
})
app.listen(3000, () => console.log('Server listening on 3000'))