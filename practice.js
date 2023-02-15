// we are going to use an npm module to make requests
// it is called request on npmjs.com


// that package has been depreacted. an alternative package to install is postman-request. It has the same api so you can install the latest version of it.

// first we need to initialize npm
// do npm init -y and that will say yes to all the questions if you wrote npm init without the -y. This automatically generates the package.json file.

// next, npm i request@2.88.0

const request = require('request');
const forecast = require('./src/utils/forecast');
// const forecast = require('forecast.js')
// const geocode = require('./utils/geocode')
// const forecast = require('./utils/forecast')

//Uuse the weatherstack url
const url = 'http://api.weatherstack.com/current?access_key=e3691a29e52ac669c0b83dc6977b03b6&query=37.8267,-122.4233&units=f'; // At the end of the url add &units=f to change from celcius to farenheit

// We are going to use request, which is a function
// The first argument is an options object which outlines what we'd like to do. That's where we provide the url and other info
// The second is a function to run and actually have that response
// url: is a property and then provide the variable name, in this case ours its the url variable we made
// now we make the call back function in the second argument. This function gets called with two arguments. If there was an error it owuld return undefined
// do node app.js to run this
// json: true atumocatically gets our data parsed for us, meaning it is true that our data is in json format






// request({url: url, json: true}, (error, response) => {
    // console.log(response)
    // const data = JSON.parse(response.body) // we want to parse everything in body: that shows in the terminal from when we did console.log(response)
    // console.log(data) print out to see the parsed data
    // console.log(data.current) // we are accessing the current property which is a property of the weatherstack.com JSON object that we are loading
    // we will see less output from this console.log

    // this provides the same output and parses the data
    // console.log(response.body.current)

    // console.log(`${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out.`)


    // if (error) {
    //     console.log('Unable to connect to weather services!')
    // } else if (response.body.error) {
    //     console.log('Unable to find location')
    // } else 
    //     console.log(response.body.daily.data[0].summary + 'It is currently ' + response.body.currently.precipProbability + '% chance of rain.')

// })





// We have accessed our first http api from node.js, allowing us to pull outside information into our applications

// Installed on chrome web store the JSON formatter extension

// Challenge: print a small forecast to the user, printing a template literal and accessing in the ${} the temperature property value
// Example:
// console.log(`It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out.`)

// Challenge
// Geocoding is the process of taking an address and converting that into a latitude and longitude coordinate pair (so we can get the weather)
const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiY3ZhbmciLCJhIjoiY2xlMXAxYWd2MW15azNvbGdldGRkdmw3aiJ9.kI1WaYQ89vhzF-j9hOw5Xw';


// const address = process.argv[2]

// if (!address) {
//     console.log('Please provide an address')
// } else {
//     geocode(address, (error, {latitude, longitude, location}) => {
//         if (error) {
//             return console.log(error)
//         }

//         forecast(latitude, longitude, (error, forecastData) => {
//             if (error) {
//                 return console.log(error)
//             }

//             console.log(location)
//             console.log(forecastData)
//         })
//     })
// }


// Testing geocode and forecast
// geocode('Philedalphia', (error, data) => {
//     // console.log('Error', error)
//     // console.log('Data', data) these are working
//     if (error) {
//         return console.log(error)
//     }


// forecast(-75.7000, 44.1545, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
// })