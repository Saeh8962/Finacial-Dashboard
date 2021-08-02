

const finnhub = require('finnhub');
var Request = require('request')
const WebSocket = require('ws');
var fetchUrl = require("fetch").fetchUrl;
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c34391qad3i8edlcgrgg" 
//const express = require("express")
//var app = express();

// import { queryResult } from "pg-promise";

const bcrypt = require('bcrypt-nodejs/bCrypt');




function getStockQoute(stockSymblol,callback){
    var finnhubClient = new finnhub.DefaultApi();
    finnhubClient.quote(stockSymblol,(error, data, response)=>{
        callback(data);
    });
}

function getEodData(symbol,callback){
    // if(symbols !== 'No stocks added'){
    //   var element = {
    //     symbol:"",
    //     eodClose:"",
    //     eodPrice:""
    //   }
    //   var watchlists = symbols;
      
        const url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+symbol+'&apikey=2TXPYH4TGZ32RG8D';
        const req = new Request(url);
        fetchUrl(url,function(err,meta,body){
         var y = body.toString()
          var x = JSON.parse(y)
          console.log(x['Global Quote'])
          callback(x['Global Quote']) 
    });
          
      
   
 
    
  
   
  }

function getZillowData(){
  const url = 'https://www.zillow.com/springfield-nj-07081/rentals/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22mapBounds%22%3A%7B%22west%22%3A-74.35130046313476%2C%22east%22%3A-74.29628299182129%2C%22south%22%3A40.67870265425068%2C%22north%22%3A40.71716092095872%7D%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A60590%2C%22regionType%22%3A7%7D%5D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22fsba%22%3A%7B%22value%22%3Afalse%7D%2C%22fsbo%22%3A%7B%22value%22%3Afalse%7D%2C%22nc%22%3A%7B%22value%22%3Afalse%7D%2C%22fore%22%3A%7B%22value%22%3Afalse%7D%2C%22cmsn%22%3A%7B%22value%22%3Afalse%7D%2C%22auc%22%3A%7B%22value%22%3Afalse%7D%2C%22pmf%22%3A%7B%22value%22%3Afalse%7D%2C%22pf%22%3A%7B%22value%22%3Afalse%7D%2C%22fr%22%3A%7B%22value%22%3Atrue%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A14%7D';
        // const req = new Request(url);
        fetchUrl(url,function(err,meta,body){
         console.log(body)
          
    });
          
}

getZillowData();
module.exports ={getEodData,getStockQoute};