const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, function (){
    console.log("server is running on port 3000");
})

app.get("/",function (req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res){
const query = req.body.cityName;
const apiKey = "1d758cdfd90d87d992b41bf809845660";
const unit = "metric";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit
https.get(apiUrl, function (responce){
    responce.on("data", function (data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const weatherIcon = weatherData.weather[0].icon;
        const imageUrl = "http://openweathermap.org/img/wn/"+ weatherIcon +"@2x.png";
        res.write("<p>the weather is " + description + " </p>");
        res.write("<h1>the temp in "+ query +" is " + temp + "degree celcius</h1>");
        res.write("<img src="+ imageUrl +">");
        res.send();
    })
});
})


