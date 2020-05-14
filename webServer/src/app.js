const path = require('path');
const express = require('express');

const app = express();

console.log(__dirname);
const publicDir = path.join(__dirname,'../public');

app.use(express.static(publicDir));

app.get('/help',(req, res)=>{
    res.send([{
        name: 'Andrew',
        age: 27
    },{
        name: 'Milo',
        age: 27
    }
]);
})


app.get('/weather',(req, res)=>{
    res.send({
        location: 'Boston',
        forecast: 'It is Hazy'
    });
})

app.listen('3000',()=>{
    console.log('server is up on 3000');
});