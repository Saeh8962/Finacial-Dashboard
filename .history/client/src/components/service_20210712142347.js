

var request = require('request');





function getStockQoutes(stocks,callback){
    var StockEod=stocks.map(stock=>{
        var url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+stock+'&apikey=2TXPYH4TGZ32RG8D';
        request.get({
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
            var EodD={
                symbol: eodData[0],
                open: eodData[1],
                high: eodData[2],
                low: eodData[3],
                price: eodData[4],
                volume: eodData[5],
                last_traded_day: eodData[6],
                previous_close: eodData[7],
                change: eodData[8],
                change_percent: eodData[9],
        
            }
            console.log(Object.values(eodData));
              return EodD
            }
        });
    
    })

 var result = [];
 console.log(StockEod)
 callback(result);
    
}
getStockQoutes(["APPL","WISH","ETSY"],function(result){
    
    console.log(result)
})

module.exports ={getStockQoutes};