

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


module.exports ={getEodData,getStockQoute};