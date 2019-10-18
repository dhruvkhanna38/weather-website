const request = require("request");


const forecast = (latitude , longitude , callback)=>{
    const url = "https://api.darksky.net/forecast/2f1db2048381dc69c1560edb48cca11c/" + latitude + "," + longitude +  "?units=si";
    request({url : url , json : true} ,  function(error , response){
            if(error){
              callback("cannot connect ot darksky" ,  undefined);
            }
           else if(response.code === 400){
              callback("Invalid Coordinates" , undefined);
            }
            else{
              var data = {
                temp : response.body.currently.temperature,
                summary  : response.body.hourly.summary
              }
              callback(undefined, data);
            }
    });
  }

  module.exports =  forecast;