const path = require('path');
var express = require("express");
var app = express();
const hbs = require("hbs");
var geoCode = require("./utils/geoCode");
var forecast = require("./utils/forecast");


//setup static directory 
app.use(express.static(path.join(__dirname , "public")));

//Paths For Express Config
const viewsPath = path.join(__dirname , "./templates/views");
const partialsPath = path.join(__dirname ,  "./templates/partials");


//Setup Handlebars Engine
app.set("view engine", 'hbs');
app.set("views" , viewsPath);
hbs.registerPartials(partialsPath);

app.get("/" , function(req,res){
  res.render("index" , {title : "Dhruv" , 
                        location :"Delhi"});
});

app.get("/about" , function(req,res){
    res.render("about" ,  {title : "Harry" ,
                            location : "Surrey"});
});


app.get("/help", function(req,res){
        res.render("help" , {title : "Hermione" , 
                                location : "london"});
});


app.get("/weather" , function(req,res){
    if(!req.query.address){
        res.send({error : "No Address in Query String"})
    }
    else{ 
        geoCode(req.query.address , (error , {latitude , longitude , place} = {} )=>{
            if(error){
                    res.send({errorMessage : error});
            }
            else{
                forecast(latitude , longitude , (error , fdata)=>{
                        if(error){
                            res.send({errorMessage : error});
                        }
                        else{
                            res.send({
                                location : place , 
                                forecast : fdata.temp , 
                                address : place , 
                                summary : fdata.summary
                            });
                        }
                });
            }
        });
    }
});

app.get("/products" , function(req,res){
        if(!req.query.search){
            res.send({error : "Please Provide a search attribute in the query"});
        }
        else{
            console.log(req.query.search);
            res.send("Products Page");
        }
});

app.get("/help/*" , function(req, res){
        res.render("helpError" , {title : "Help Error" ,
                                                location :"Help Directory"});
});


app.get("*" , function(req , res){
    res.render("error" , {title : "Error" , 
                                        location : "Index Directory"});
});

app.listen(3000 , function(){
    console.log("Listening on port 3000");
});


