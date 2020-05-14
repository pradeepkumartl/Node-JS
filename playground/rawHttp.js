const http = require('http');

const url = 'http://api.weatherstack.com/current?access_key=bcf9cc373dfd03345c7c651236e27499&query=40,-75';

const req = http.request(url, (response)=>{
    let data = '';
    response.on('data',(chunk)=>{
        data = data+chunk;
    });

    response.on('end',()=>{
        console.log(JSON.parse(data));
    })

    response.on('error',(error)=>{
        console.log(error);
    })

})

req.end();
