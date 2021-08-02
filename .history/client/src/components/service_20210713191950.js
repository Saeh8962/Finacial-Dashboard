const {StringStream} = require("scramjet");
const request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
request.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_EXTENDED&symbol=IBM&interval=15min&slice=year1month1&apikey=2TXPYH4TGZ32RG8D")
    .pipe(new StringStream())
    .CSVParse()                                   // parse CSV output into row objects
    .consume(object => console.log("Row:", object))
    .then(() => console.log("success"));