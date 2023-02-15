const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// This is to test if it is working
// console.log(__dirname)
// console.log(path.join(__dirname))

const app = express()

// Made a folder called src
// Created a file in it called app.js
// Install express (npm install express) which is installed in the Weather-app directory and not the src folder directory so that it joins in with the other packages












// Defining paths for Express configuration
// Generating path to the public folder
// Use .. to go up a folder, this will take us out of our src folder directory and then to the public folder directory
const fileDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')










// Setup handlebars (hbs) engine and views location
// syntax: (the setting name, value)
// Setting the a view engine. View engines allow us to render web pages using template files. Templates are filled with data and served to the client
// it is important to write 'view engine' correctly with space and capitalization
// The value is the name of the module we installed, which we installed hbs in this case
// Now we can use this to create some dynamic templates
// We have our handlebars templates living in a specific folder
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// express.static is a function and we're passing the return values to .use
// static takes the path to the folder we want to serve up
// app.use is configuring our express application
app.use(express.static(fileDirectoryPath))


// These are our route handlers
// Setting up routes so that users can access the handlebar pages from our web server
// The empty string for this will stand for the home page
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
        helpText: 'This is some helpful text.',
        title: 'Help',
        aName: 'Cheyenne Vang'
    })
})


// sending JSON data back to the browser to return the geocode and forecast functions
// the request object has a query property on there
// query is also an object that contains query string information

app.get('/weather', (req, res) => {
    if (!req.query.address) { // the query string lives on request
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

app.get('/products', (req, res) => {
    // this will run if there is no search term
    if (!req.query.search) { // grabbing string value for search using/accessing req.query.search and this statement will run only when something has gone wrong/when there is no search term
        return res.send({ 
            error: 'You must provide a search term'
        })
    }
    res.send({ // if there is a search value provided then we'll see the products array coming back
        products: []
    })
})

app.get('/help/*', (req, res) => {
    // res.send('Help article not found')
    res.render('404', {
        title: '404',
        aName: 'Cheyenne Vang',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    // res.send('My 404 page')
    res.render('404', {
        title: '404',
        aName: 'Cheyenne Vang',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => console.log('Server listening on 3000'))



