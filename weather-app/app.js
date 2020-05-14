
var geoLocation = require('./utils/geolocation');
var forecast = require('./utils/forecast');

let lat = 0;
let long = 0;
geoLocation.getGeoLocation(process.argv[2], (error, data) => {
    if (data !== undefined) {
        lat = data[1];
        long = data[0];
        forecast.getForecast(lat, long, (error, data) =>{
            if(error){
                return console.log(error);
            }
            if(data !== undefined){
                console.log("Forecast", data);
            }
        })
    } else {
        console.log(error);
    }
})