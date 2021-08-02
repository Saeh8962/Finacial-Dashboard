import React,{Component,ChildComponent} from "react";
import {ListGroup} from "react-bootstrap/esm";
import {Button,DropdownMenu,Dropdown,} from "reactstrap/es";
// import {Tooltip,OverlayTrigger} from "react-bootstrap"
import {withRouter} from "react-router-dom";
import { Grid, GridCellProps, GridColumn } from "@progress/kendo-react-grid";
import * as ReactDOM from "react-dom";
import { Tooltip } from "@progress/kendo-react-tooltip";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { MyCommandCell } from "./mycommand.jsx";
import "hammerjs";
import {sendEmail} from "./email.js"

const request = require('request');


//fuctions add $ sign to values in the watchlist girs
function add$sign(props){
  const Value = props.dataItem[props.field || ""];
  return (
    <td >
      {"$"+Value}
    </td>
  )
}

//function changes the color of the current price column depenging on its prrice 
function ChangeCurPriceColor(props){
  var curValue = props.dataItem[props.field || ""];
 
  const closeValue =props.dataItem["eodClose"||""]

  // console.log(curValue,closeValue)
  return (
    <td style={{ color: curValue > closeValue ? "green" : "red" }}>
      {"$"+curValue}
    </td>
  )
  
};

//changes the color of the current change column 
function ChangeCurChangeColor(props){
  const value = props.dataItem[props.field || ""]>0? "+"+props.dataItem[props.field]:props.dataItem[props.field || ""];
  
  // console.log(curValue,closeValue)
  return (
    <td style={{ color: value > 0 ? "green" : "red" }}>
      {value}
    </td>
  )
  
};
class viewChartOver extends React.Component {
  render() {
    return (
      <td title={"View chart"}>
        {"view the char"}
      </td>
    );
  }
}
export default withRouter( class WatchList extends React.Component {
 
    constructor(props) {
        super(props)
            this.CommandCell=this.CommandCell.bind(this)
            this.getEodData=this.getEodData.bind(this)
            this.symbolCell = this.symbolCell.bind(this);
            this.removeStock=this.removeStock.bind(this);
            this.renderStockChart=this.renderStockChart.bind(this);
            this.removeHelper=this.removeHelper.bind(this);
            
           this.result = [];
            this.state={
                email : this.props.email,
                stocks:this.props.stocks,
                AlertData:this.props.alertData,
                connectionError: false,
                dropdownOpen: false,
                value:"Your Watchlist",
                stockHasBeenRemoved:false,
                chartStock:"",
                // eodData:""
                
            }
            
        
        
    }

    //sets the inside of the symbol cell
    symbolCell(props){
      var symbol = props.dataItem[props.field || ""];
      
      return(
        
        
        <td >
        <button type="button" className="btn btn-danger btn-circle btn-sm" onClick={(e) =>
  
          this.removeStock(e,props.dataItem)
          }>X</button> {symbol}
        </td>
        
   
      );
     


    }
    //handles the function of the remove cells
    CommandCell(props){
      return(
        <MyCommandCell
          {...props}
          
          remove={this.removeStock}
          
        />
      );
    }
        
      
      componentDidUpdate(prevProps, prevState) {
        if (prevState.stockHasBeenRemoved !== this.state.stockHasBeenRemoved) {
          console.log('User has removed a stock.')
          if(this.props.history.push!== undefined) {
            this.setState({stockHasBeenRemoved:false},()=>this.props.history.push("/profile",[[{email:this.state.email,removeStocks:true},this.state.stocks]]));
          }
          else{
              this.setState({stocks:this.state.stocks})
          }
        }
          if (this.props.stocks.length != prevProps.stocks.length) {
            console.log('Update stocks')
            this.setState({stocks:this.props.stocks})
         
        }
        if(prevState.chartStock!==this.state.chartStock && this.state.chartStock!==""){
          var stock_chart= this.state.chartStock;
          console.log("render chart for ", stock_chart);
          
          this.setState({chartStock:""},()=>this.props.history.push("/profile",[[{email:this.state.email,chartStock:stock_chart},this.state.stocks]]))
        }
      }
      
      // componentDidMount(){
      //   // var data = getEodData("AAPL");
      //   // console.log(data);
        
      //   // this.setState({eodData:data})
        
      // }
     

     
      getEodData(symbols){
        if(symbols !== 'No stocks added'){
          var element = {
            symbol:"",
            eodClose:"",
            eodPrice:""
          }
          var watchlists = symbols;
          function fetchData(symbols){
            const urls = symbols.map(symbol => {
              var x = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+symbol.Symbol+'&apikey=2TXPYH4TGZ32RG8D';
              return x;
            })
          
            const allRequests = urls.map(url => 
              fetch(url).then(response => response.json())
            );
          
            return Promise.all(allRequests);
          };
        fetchData(symbols).then(result => {
         var newList = watchlists.map((element, index) =>{
          element= Object.entries(result[index]).map(entry => {return entry[1]});
          return element[0]
        })
        console.log(newList[0])
      this.setState({stocks:newList});
      })
     
        
      }
        else{
          console.log("No stocks added")
          return;
        }
      }

    componentWillMount(){
      console.log(this.state.stocks)
      this.connection = new WebSocket('wss://ws.finnhub.io?token=c34391qad3i8edlcgrgg');
        if(this.state.stock!=='No stocks added'){
          
          this.getEodData(this.state.stocks);
        }
        
        
    }
    componentWillUnmount(){
        if(this.state.stock!="No stocks added"){
          this.state.stocks.forEach(symbol=>{
            this.connection.send(JSON.stringify({'type':'unsubscribe', 'symbol': symbol.Symbol}));
            
          })
          
        }
        
        this.connection.close();
        
        
        // Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, 
        // or cleaning up any subscriptions that were created in componentDidMount().
    }
    
    saveNewStockTrade= (event) => {
        
        let result = JSON.parse(event.data)
        // console.log(result)
        let Alerts =this.state.user_alerts;
        let user_watchlist = this.state.stocks
        // console.log("InsidesaveNewStockTrade: ", user_watchlist)
        if(result.type==="trade"){
            user_watchlist.forEach(symbol => {
                var tradePrice= result.data.filter((i,n)=>i.s===symbol["01. symbol"]);
                if(tradePrice.length !==0){
                  
                    // symbol.eodClose= (symbol.eodClose*1).toFixed(2);
                    symbol["05. price"] = +tradePrice[tradePrice.length-1].p.toFixed(2); 
                    symbol.CurrentAmountChange= +(symbol.currentPrice-symbol.eodClose).toFixed(2);
                    symbol.CurrentPercentChange= +((symbol.CurrentAmountChange/symbol.eodClose)*100).toFixed(2);
                    <GridColumn title="Last Close" field="08. previous close" cell={add$sign}/>
                    <GridColumn title="Price" field="05. price" cell={ChangeCurPriceColor}/>
                    <GridColumn title="Change" field="09. change" cell={ChangeCurChangeColor} />
                    <GridColumn title="% Change" field="10. change percent" cell={ChangeCurChangeColor}/>
                    // console.log("Found Updated price for ",symbol.Symbol,"\n","Price: ",symbol.currentPrice)
                    // console.log("Found Updating Amount Change, updated Change: ",symbol.CurrentAmountChange)
                    // console.log("Found Updating Percent Change, updated Change: ",symbol.CurrentPercentChange)
                    // socket.send(JSON.stringify({'type':'unsubscribe', 'symbol': symbol.name}))
                }
                if(Alerts.uniqueSymbols.includes(symbol.Symbol)){
                  //check to see if the new price value triggered the alert
                  Alerts.alerts.forEach(alert=>{
                    if(alert.symbol===symbol){
                      switch(alert.Identifier){
                        case 'Price':
                            switch(alert.movement){
                                case 'Above':{
                                  if(symbol.currentPrice > alert.valuechange){
                                    alert("Your Price Alert watching for "+symbol.Symbol+" to go above: "+alert.valuechange+" has been triggered")
                                    sendEmail(this.state.email,alert);
                                    return ("Alert has been triggered");
                                  }
                                  return ("Above Alert not triggered");
                                }
                                    
                                case 'Below':{
                                  if(symbol.currentPrice < alert.valuechange){
                                    alert("Your Price Alert watching for "+symbol.Symbol+" to go below: "+alert.valuechange+" has been triggered")
                                    sendEmail(this.state.email,alert);
                                    return ("Alert has been triggered");
                                  }
                                  return ("Below Alert not triggered");
                                }
                                
                                default:
                                    return ("something went wrong");
                            }
                        case 'Percent':
                            switch(alert.movment){
                                case 'Up':{
                                  if(symbol.CurrentPercentChange > alert.valuechange){
                                    alert("Your Percentage Alert watching for "+symbol.Symbol+" to be moving up: "+alert.valuechange+"% has been triggered")
                                    sendEmail(this.state.email,alert);
                                    return ("Alert has been triggered");
                                  }
                                  return ("Up Alert not triggered");
                                }
                                    
                                case 'Down':{
                                  if(symbol.CurrentPercentChange < alert.valuechange){
                                    alert("Your Percentage Alert watching for "+symbol.Symbol+" to be moving down: "+alert.valuechange+"% has been triggered")
                                    sendEmail(this.state.email,alert);
                                    return ("Down Alert has been triggered");
                                  }
                                  return ("Down Up Alert not triggered");
                                }
                                default:
                                  return ("Down Alert not triggered");
                            }
                        default:
                          return ("something went wrong");
                    
                    }}
                  })
                  
            }
            
        })
        this.setState({stocks:user_watchlist});
      }
    }
     
    componentDidMount(){
        var x = new Date()
        var dayOfTheWeek= x.getDay();
        var timeOfDay = x.getHours();
        var minutes = x.getMinutes();
        console.log(timeOfDay)
        if(dayOfTheWeek <6){
          //week day find out if the market is open 
          if((timeOfDay === 9 && minutes >30) || (timeOfDay >9 && timeOfDay < 4)){
            this.connection.onopen = ()=> { 
              if (this.state.stocks!=="No stocks added"){
                  this.state.stocks.forEach(symbol=>{
                      this.connection.send(JSON.stringify({'type':'subscribe', 'symbol': symbol['01. symbol']}));
                      console.log("Inside OnOpen: Subscribed To: ", symbol['01. symbol'])
                  })
              }
              else{
                  console.log("no stocks added to subscribe to");
              }
              
             }
            this.connection.onmessage= this.saveNewStockTrade;
            this.connection.onclose = () => { this.setState({connectionError: true}) }
          }
      
        }
        
        
    }
    
    
   
    removeStock(htmlEvent,stock){
        //unsubsribe from listening to thsi stock
       console.log("Unsubscribing from: ",stock.Symbol)
        this.connection.send(JSON.stringify({'type':'unsubscribe', 'symbol': stock}))
        //first stop the htmlEvents default status
        htmlEvent.preventDefault();
        var user={
            email:this.props.email,
            stock_symbol: stock.Symbol,
    
        } 
        console.log(user)
        var url = '/api/removeUserStock';
        const req = new Request(url,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user),
        });
        fetch(req)
        .then((res)=>{
            console.log(res)
            if(res.status===500){
            res.json()
            .then((json)=>{
                const {message,stackTrace}=json;
              })
              .catch((error)=>{
                return Promise.reject(error);
              });
            }
            else{
                
              return res.json();
            }
          })
          .then((result)=> {
              
              console.log("1st remove stock rerender");
              this.setState({remove_status:result},()=>this.removeHelper())});
    
    }
    
    removeHelper(){
        console.log("p/179",this.state.remove_status);
        //removed but still showing on watch list
        if(this.state.remove_status.response==="Stock not on watch list"){
            alert("Stock Queued For Deletion, Please Login In Again");
        }
        //stock has been removed from watchlist
        else if(this.state.remove_status.Response==="Sucessfully removed stock"){
            console.log("2nd remove stock rerender");
            this.setState({stockHasBeenRemoved:true});
           
        }
    }
    
    renderStockChart(event){
      console.log(event.dataItem.Symbol)
      this.setState({chartStock:event.dataItem.Symbol})
    }
    render(){
     
        var useData;

        if(this.props.stocks !=="No stocks added"){
          useData=this.state.stocks
          console.log(useData);
          var grid = (
            <Tooltip openDelay={100} position="right" >
              <Grid data={useData} onRowClick= {this.renderStockChart} title="WatchList">
                {/* <GridColumn title="Name" field="name" /> */}
                <GridColumn title="Symbol" field="01. symbol"style={{ width: 100 }} locked={false} width={100} cell={this.symbolCell} />
                <GridColumn title="Last Close" field="08. previous close" cell={add$sign}/>
                <GridColumn title="Price" field="05. price" cell={ChangeCurPriceColor}/>
                <GridColumn title="Change" field="09. change" cell={ChangeCurChangeColor} />
                <GridColumn title="% Change" field="10. change percent" cell={ChangeCurChangeColor}/>
                {/* <GridColumn title="View Chart" id="Symbol" cell={tooltiprender} width="200px" /> */}
                <GridColumn title="Track" id="Symbol" cell={this.CommandCell} width="200px" />
              </Grid>
            </Tooltip>
         
          )
        }
        else{
          useData=[{
            eodClose:"Add stocks",
            Symbol:"Add stocks",
            currentPrice:"Add stocks",
            Change:"Add stocks",
            CurrentAmountChange:"Add stocks",
            CurrentPercentChange:"Add stocks",
            Track:"Add stocks"

          },]
          var grid = (
            <Tooltip openDelay={100} position="right" >
              <Grid data={useData} onRowClick= {this.renderStockChart} title="WatchList">
                <GridColumn title="Symbol" field="Symbol"style={{ width: 100 }} locked={false} width={100}  />
                <GridColumn title="Last Close" field="eodClose" />
                <GridColumn title="Price" field="currentPrice" />
                <GridColumn title="Change" field="CurrentAmountChange" />
                <GridColumn title="% Change" field="CurrentPercentChange" />
                <GridColumn title="Track" field="Track" width="200px" />
              </Grid>
            </Tooltip>
          )
        }
        // console.log(this.state.eodData)
        return (
          
          
          grid
          
          );
        }
})