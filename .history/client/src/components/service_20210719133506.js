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
  var ydayOfTheWeek= x.getDay();
  var ytimeOfDay = x.getHours();
  var yminutes = x.getMinutes();

  console.log(x,y)
}
hi();
