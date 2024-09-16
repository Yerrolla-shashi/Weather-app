var express=require("express");
const { appendFile } = require("fs");
const { request } = require("http");
var router=express.Router();
let url    = 'http://api.openweathermap.org/data/2.5/weather?q='
let appid  = 'appid=YOUR API KEY';
let units  = '&units=metric'; 
var request = require('request');

router.get('/',function(req,res,next){
    res.render('index',{'body':' ',forecast:''})
})
router.post('/weather',function(req,res,next){


let city=req.body.city;
url=url+city+"&"+appid;
request(url,function(error,response,body){
    console.log("error",error)
    console.log("Statuscode",response && response.statuscode)
    body=JSON.parse();
    console.log(body);
    if(error && response.statuscode!=200){
        throw error;
    }
    let country=(body.sys.country)?body.sys.country:'';
    let forecast="find city"+city+"country"+country;
    res.render('index',{body:body,forecast:forecast})
});
});
module.exports=router;