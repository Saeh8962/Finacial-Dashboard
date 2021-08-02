

var request = require('request');





function getStockQoute(stockSymblol,callback){
    var url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+stockSymblol+'&apikey=2TXPYH4TGZ32RG8D';

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
          // data is successfully parsed as a JSON object:
          callback(data);
        }
    });
}
getStockQoute('AAPL',function(result){
    var eodData=[];
    Object.values(result).forEach(item =>{
        Object.values(item).forEach(i=>eodData.push(i))
        
    })
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
    if(EodD.last_traded_day==new Date()){
        console.log('EoD datat already up to Date');
    }
    console.log(new Date())
})

module.exports ={getStockQoute};