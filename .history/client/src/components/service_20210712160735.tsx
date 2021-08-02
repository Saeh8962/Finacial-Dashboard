
import React from "react";
var request = require('request');




interface EodData {
  data:[{
    symbol:string,
    open:string,
    high:string,
    low:string,
    price:string,
    volume:string,
    last_traded_day:string,
    previous_close:string,
    change:string,
    change_percent:string
  }]
}
export default function GetStockQoutes(stocks,callback){
      const [eodData,seteodData]=React.useState<EodData[]>()
      React.useEffect(()=>{
        geteodData(stocks,seteodData)
      })
      function geteodData(stocks,callback){
        stocks.forEach(stock => {
          var url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+stock+'&apikey=2TXPYH4TGZ32RG8D';
          ///just set the state in  and then append the state in the call backs
        })
      }
        return (request.get({
            url: url,
            json: true,
            headers: {'User-Agent': 'request'}
          }, (err, res, data) => {
            if (err) {
              console.log('Error:', err);
            } else if (res.statusCode !== 200) {
              console.log('Status:', res.statusCode);
            } else {

                var eodData=[];
                
              // data is successfully parsed as a JSON object:
                Object.values(data).forEach(item =>{Object.values(item).forEach(i=>eodData.push(i))})
                var result = Object.keys(eodData).map((key)=>[eodData[key]])
                
            var EodD={
                symbol: result[0],
                open: result[1],
                high: result[2],
                low: result[3],
                price: result[4],
                volume: result[5],
                last_traded_day: result[6],
                previous_close: result[7],
                change: result[8],
                change_percent: result[9],
        
            }
            callback(EodD);
            
          
           
            }
        }));
        
    
    

 
 
//  callback(result);
    
}
var stocks=["ETSY","WISH"];
var EOD = stocks.forEach(stock=>{
    return(getStockQoute(stock,function(result){
        return(result);
    }))
})

console.log(EOD)
module.exports ={getStockQoute};