const {StringStream} = require("scramjet");
const request = require("request");

// // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
// var url ="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&compact=full&apikey=2TXPYH4TGZ32RG8D";
    

//     request.get({
//         url: url,
//         json: true,
//         headers: {'User-Agent': 'request'}
//       }, (err, res, data) => {
//         if (err) {
//           console.log('Error:', err);
//         } else if (res.statusCode !== 200) {
//           console.log('Status:', res.statusCode);
//         } else {
//           // data is successfully parsed as a JSON object:
//           console.log(Object.parse(data));
//         }
//     });
function hi(){
  var x = new Date()
  var dayOfTheWeek= x.getDay();
  var timeOfDay = x.getHours();
  var minutes = x.getMinutes();

  var y = new Date('2021-07-16T04:00:00.000Z')
  var ydayOfTheWeek= y.getDay();
  var ytimeOfDay = y.getHours();
  var yminutes = y.getMinutes();

  if(dayOfTheWeek===1){
    //last traded day should 5 
    if(ydayOfTheWeek!==5){
      //update the Eod Data
    }
    else{
      //the eod data is fine
    }
  }
  else{
    if(ydayOfTheWeek!==ydayOfTheWeek-1){
      //update the eod data
    }
    else{
      //the eod datat is fine 
    }
  }

  console.log(x,"   ",y)
  console.log(dayOfTheWeek,"   ",ydayOfTheWeek)
}

function isMarketOpen(){
  var x = new Date()
  var dayOfTheWeek= x.getDay();
  var timeOfDay = x.getHours();
  var minutes = x.getMinutes();
  if(dayOfTheWeek <6){
    if((timeOfDay === 9 && minutes >30) || (timeOfDay >9 && timeOfDay < 4)){
      return true;
    }
    else{
      return false;
    }

  }
  else{
    return false;
  }
    //week day find out if the market is open 
    
}
console.log(isMarketOpen());
