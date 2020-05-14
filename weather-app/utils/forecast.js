const request = require('postman-request');

getForecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=bcf9cc373dfd03345c7c651236e27499&query=' + lat + ',' + long;

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to get the forecast", undefined);
        }
        else {
            const data = body.current;
            callback(undefined, data);
            //console.log("It is currently "+response.body.current.temperature+" degrees out. There is a "+response.body.current.cloudcover+"% change of rain");
        }
    })
}

module.exports ={
    getForecast: getForecast
} 