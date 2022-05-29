const express=require("express");
const https=require("https");//it is in node module so we can directly use and is used to make get request to api
const bodyParser=require("body-parser");
const date= require(__dirname+("/date.js"));
const app=express();
const ejs = require("ejs");
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",(req,res)=>{
 
  res.sendFile(__dirname+"/index.html");
 
})

app.post("/",(req,res)=>{
  
      let quer=req.body.cityName;
    const apiKey="b6d5510764f4c6f41f29971b5b864719";
    const unit="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+quer+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){
        //console.log(response);//response.statusCode to go deep
        console.log(response.statusCode);
         ////////////////
       response.on("data",function(data){//it will get data from whole response
        const weatherData=JSON.parse(data);//we will recieve in hexadecimaal so use json.parse to convert it to javascript object
        //console.log(weatherData);
        let temp=weatherData.main.temp; //or can go to chrome and copy path of the variable you desire of
        let icon=weatherData.weather[0].icon;
        let pressure=weatherData.main.pressure;
        let humidity=weatherData.main.humidity;
        let feellike=weatherData.main.feels_like;
        let imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
         const wetherDescription=weatherData.weather[0].description;
        console.log(temp);
        // res.write("<h1>The temp is"+temp+"    BYE </h1>");
        // res.write("weather description in "+query+" is  "+wetherDescription);
        // res.write("<img src="+imageURL+">");
        let day= date();//date.getDate if you were exporting two function from date.js
   
        res.render("index2",{querr:quer ,temp:temp,image:imageURL,pressure:pressure,humidity:humidity,feel:feellike,description:wetherDescription,listTitle: day});
        //res.send();//can be written once in 1 app.get
    })
    })//we are making http get request over the internet to this url where we are fetching the data
    
})
app.listen(3001,function(){
    console.log("Server is running");
})