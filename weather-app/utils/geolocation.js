var request = require('postman-request');

const getGeoLocation = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoicHJhZGVlcGt1bWFydGhvdGFrdXJhIiwiYSI6ImNrOXppendweDBjajIzZnBqYWYzbDlkMjYifQ.nL7kSQ45ORnyOPBRU7I8AA&limit=1";
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            console.log('Error to get Geo location', undefined);
        } else if(body.features.length === 0){
            callback("Not able to find the city", undefined);
        } 
        else {
        callback(undefined, body.features[0].center);
        }
    })
}

module.exports ={
    getGeoLocation: getGeoLocation
}
