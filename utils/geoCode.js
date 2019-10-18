var request = require("request");

const geoCode = (address, callback)=>{
    const gurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiZGhydXZraGFubmEzOCIsImEiOiJjanlnY3J2MWcwMW93M2htanByYnRhYWtlIn0.FbWwGiDUq-KSmbPBt7bvrA";
    request({url : gurl ,  json : true} , function (error, response) {
          if(error){
            callback("Unable to connect ot geocode" , undefined);
          }
          else if(response.body.features.length === 0){
            callback("Invalid Attributes" . undefined);
          }
          else{
            
            var data = {
              latitude : response.body.features[0].center[1] , 
              longitude : response.body.features[0].center[0],
              place : response.body.features[0].place_name
            }
              callback(undefined , data);
          }    
      });
  
  }

  module.exports = geoCode;