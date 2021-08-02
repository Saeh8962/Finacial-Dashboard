import React from "react";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartValueAxisItem,
  ChartValueAxis,
  ChartTitle,
  ChartSeriesLabels,
  ChartTooltip,
  ChartLegend,
  ChartSeriesItemTooltip,
} from "@progress/kendo-react-charts";
import "hammerjs";
import { getHistory } from "../services/dataService";
import { History } from "../data/models";
const url ="http://api.marketstack.com/v1/eod?access_key=5dd6fd84e5ba4e974843da4e6e23db23&symbols=AAP&date_from=2020-07-10&date_to=2021-07-02&limit=500";
const request = require('request');
const categories=['Jan`21','Feb','Mar','Apr','May','Jun','Jul']
//const categories=['Jun','Jul','Aug','Sept','Oct','Nov','Dec','Jan`21','Feb','Mar','Apr','May','Jun','Jul']

const history_date = new Date();
function clean_data(data:any):History[]{
  var Ndata = Object.entries(data["Time Series (Daily)"]);
  var Dates = Object.keys(Ndata).map(key =>key);
  // console.log(Dates,Ndata);
  var history= Ndata.map((entry:any)=>{
    var x=Object.keys(entry[1])
    var values = entry[1]
    
    
    var history ={
      date:entry[0],
      info:{
        open: values["1. open"],
        high: values["2. high"],
        low: values["3. low"],
        close: values["4. close"],
        adjusted_Close:values["5. adjusted close"],
        volume:values["6. volume"],
        dividend_amount:values["7. dividend amount"],
        spilt_coefficient:values["8. split coefficient"]
      }
    }
    return(history)
  })
  return Ndata;
}
function convertHistoryDate(date:string):string{
  var value = date 
    var newDates ={
      date:value.slice(0,10),
      month: value.slice(5,7),
      day: value.slice(8,10),
      year: value.slice(0,4)
    }
    var result= newDates.year+newDates.month+newDates.day;
    return result 
   
  
}
// const defaultTooltipRender = ({ data }) => (`Default Content ${data}`);
// const nestedTooltipRender = ({ data }) => (
// <span>
//   <p>Series 1 value: {data}</p>
  
//   <p>Series 1 value: {data}</p>
// </span>
// );
function getHistoryData(symbol:string,from:string,to:string,callback: (arg0: History[]) => void){
  var url ="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol="+symbol+"&compact=full&apikey=2TXPYH4TGZ32RG8D";
    

    // request.get({
    //     url: url,
    //     json: true,
    //     headers: {'User-Agent': 'request'}
    //   }, (err:any, res:any, data:any) => {
    //     if (err) {
    //       console.log('Error:', err);
    //     } else if (res.statusCode !== 200) {
    //       console.log('Status:', res.statusCode);
    //     } else {
    //       // data is successfully parsed as a JSON object:
    //       callback(data);
    //     }
    // });
  // var fullUrl= "http://api.marketstack.com/v1/eod?access_key=5dd6fd84e5ba4e974843da4e6e23db23&symbols="+symbol+"&date_from="+from+"&date_to="+to+"&limit=500";

  request(url, { json: true }, (err: any, res: any, body: any) => {
    if (err) { return console.log(err); }

    return clean_data(body).then((results: History[]) => {
      
      console.log(results)
      callback(results);
    });
    
  })
}
// function getDate(){
//   var dateOBJ =
 
//   var currentDate;
//   var test =  new Date().toISOString().split('T')[0];
  
//   if(month<10){
    
//     var Newmonth = "0"+month
//     console.log(Newmonth)
//     month = parseInt(Newmonth)
//     if(day <10){
//       var NewDay = "0"+day
//       day = parseInt(NewDay)
//       currentDate ={
//         curMonth:month,
//         curDay:day,
//         curYear:year
//       }
//       return currentDate
//     }
    
//   }
//   else if(day <10){
//     var NewDay = "0"+day
//     day = parseInt(NewDay)
//     currentDate ={
//       curMonth:month.toString,
//       curDay:day.toString,
//       curYear:year.toString
//     }
//     return currentDate
//   }
  
//   currentDate ={
//     curMonth:month,
//     curDay:day,
//     curYear:year
//   }
  
//   return currentDate;
// }
// getMinMax(data){ 
//   console.log()
// }
export default function PerformancePanel(props:any) {
  
  var DateOBJ= new Date();
  var year = DateOBJ.getUTCFullYear()
  var currentDate = DateOBJ.toISOString().split('T')[0]
  const [history, setHistory] = React.useState<History[]>();
  
  if(props.symbol===""||props.symbol===undefined) {
    
    props = {
      symbol:"TSLA",
      to: currentDate,
      from: year+"-01-01",
    }
    
  }
  
  else{ 
    console.log("chart property ", props)
    props = {
      symbol:props.symbol,
      to:currentDate,
      from:year+"-01-01",
    }
  }
  
  
  React.useEffect(() => {
    console.log("in useEffect ", props)
    getHistoryData(props.symbol,props.from,props.to,setHistory);
  }, [props.symbol]);
 
if(history){
  console.log(history)
  var history_OpenData = history.map(data=>({data:data.open,date:convertHistoryDate(data.date)}))
  var data = history_OpenData.map(data => data.data);
  var dates = history_OpenData.map(value =>{
    var newDate = value.date.slice(0,4)+"-"+value.date.slice(4,6)+"-"+value.date.slice(6,8)
    return new Date(newDate);
  })
  var title= "YTD "+props.symbol+" Stock Price";
  // var min,max= getMinMax(history_OpenData);
// console.log(history_OpenData);


  return (
    
          <Chart>
            <ChartTooltip shared={true}/>
            <ChartTitle text={title} />
            {/* <ChartTitle text="Line Chart" /> */}
            {/* <ChartLegend position="top" orientation="horizontal" display="false" /> */}
            <ChartValueAxis>
              <ChartValueAxisItem
                title={{
                  text: "Stock Price",
                }}
                min={Math.floor(Math.min(...data))}
                max={Math.ceil(Math.max(...data))+1}
              />
            </ChartValueAxis>
            <ChartCategoryAxis>
              <ChartCategoryAxisItem 
                title={{
                  text: "Day/Month",
                }}
                maxDivisions={14}
                categories={dates}/>
            </ChartCategoryAxis>
            <ChartSeries>
              <ChartSeriesItem type="line" data={data} markers={{ visible: false }} style={'normal'}>
              <ChartSeriesItemTooltip background="blue"/>
              </ChartSeriesItem>
              {/* <ChartSeriesLabels content={'june'} /> */}
            </ChartSeries>
          </Chart>
        
  );
  }
  else{ 
    console.log(history);
    return <h2>Performance</h2>
  }
}