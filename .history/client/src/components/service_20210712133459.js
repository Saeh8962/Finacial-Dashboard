

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
    Object.key(result).forEach(item =>{
        console.log(item)
    })
})

module.exports ={getStockQoute};