const express = require('express');  
const bodyParser = require('body-parser');
const request = require('request');

const app = express();  

const apiKey = '';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index', {weather: null, error: null})
});

app.post('/', function(req, res){
    let city = req.body.city
    let url = 'api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}'
    console.log(req.body.city)
    request(url, function(err, response, body){
        if(err){
            res.render('index',{weather: null, error: 'Error, Please try again!'})
        }else{
            let weather = JSON.parse(body);
            if (weather.main == undefined){
                res.render('index',{
                    weather: null,
                    error: 'Error, Please try again!'
                })
            }else{
                let weatherText = "It's $(weather.main.temp) degress Celsius with ${weather.weather[0].main} sky in ${weather.name}!";
                res.render('index',{weatherText, error: null});
                console.log('body: ', body); 
            }
        }
    })
})

app.listen(3030, function(){
    console.log("My Weather is running on localhost:3030/" );
});