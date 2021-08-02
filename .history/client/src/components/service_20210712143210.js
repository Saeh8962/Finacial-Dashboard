

var request = require('request');





function getStockQoutes(stocks,callback){
    var StockEod=stocks.map(stock=>{
        var url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+stock+'&apikey=2TXPYH4TGZ32RG8D';
        return request.get({
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
                var result = Object.keys(eodData).map((key)=>[eodData[key]])
              // data is successfully parsed as a JSON object:
                Object.values(data).forEach(item =>{Object.values(item).forEach(i=>eodData.push(i))})
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
            
              return EodD
            }
        });
    
    })

 
 console.log(StockEod)
//  callback(result);
    
}
getStockQoutes(["APPL","WISH"],function(result){
    
    console.log(result)
})

module.exports ={getStockQoutes};