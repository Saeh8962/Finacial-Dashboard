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
const request = require('request');

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
            this.getEodData=this.getEodData.bind(this)
            this.removeStock=this.removeStock.bind(this);
            this.renderStockChart=this.renderStockChart.bind(this);
            this.removeHelper=this.removeHelper.bind(this);
            // this.getButton=this.getButton.bind(this);
            this.state={
                email : this.props.email,
                stocks:this.props.stocks,
                connectionError: false,
                dropdownOpen: false,
                value:"Your Watchlist",
                stockHasBeenRemoved:false,
                chartStock:"",
                eodData:""
                
            }
            
        
        
    }
    CommandCell = (props) => (
        <MyCommandCell
          {...props}
          
          remove={this.removeStock}
          
        />
      );
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
      
      componentDidMount(){
        // var data = getEodData("AAPL");
        // console.log(data);
        this.getEodData("AAPL")
        // this.setState({eodData:data})
        
      }
      getEodData(symbol){
        
        var fullUrl= "http://api.marketstack.com/v1/eod/latest?access_key=5dd6fd84e5ba4e974843da4e6e23db23&symbols="+symbol;
      
        request(fullUrl, { json: true }, (err, res, body) => {
          if (err) { return console.log(err); }
          var eod={
            open: body.data[0].open,
            high: body.data[0].high,
            low: body.data[0].low,
            close: body.data[0].close,
            volume: body.data[0].volume,
            adj_high: body.data[0].adj_high,
            adj_low: body.data[0].adj_low,
            adj_close: body.data[0].adj_close,
            adj_open: body.data[0].adj_open,
            adj_volume: body.data[0].adj_volume,
            split_factor: body[0].data.split_factor,
            symbol: body.data[0].symbol,
            exchange: body.data[0].exchange,
            date: body.data[0].date

          }
          this.setState({eodData:eod});
          console.log(body.data[0].open)
          return (eod);
         
          
        })

      }
//     getButton(){
//         return(
// <button className="k-button k-grid-remove-command"onClick={(e) =>this.remove(e)}>Remove </button>
//         )
//     }
    // remove(e,stocks){
    //     console.log(stocks);
    // }
    // componentWillMount(){
    //     this.connection = new WebSocket('wss://ws.finnhub.io?token=c34391qad3i8edlcgrgg');
    //     this.getUserStocks();
        
    // }
    // componentWillUnmount(){
        
    //     this.state.stocks.forEach(symbol=>{
    //         this.connection.send(JSON.stringify({'type':'unsubscribe', 'symbol': symbol.Symbol}));
            
    //     })
    //     this.connection.close();
    //     // Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, 
    //     // or cleaning up any subscriptions that were created in componentDidMount().
    // }
    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.stocks !== this.props.stocks) {
    //       console.log('stocks state has changed.')
    //     //   this.props.history.push("/profile",[[{email:this.state.email}],this.state.stocks]);
    //         this.setState({stocks:this.props.stocks});
    //     }
    //   }
    // toggle(event) {
    //     this.setState({
    //       dropdownOpen: !this.state.dropdownOpen,
    //       value: event.currentTarget.textContent
    //     });
    //   }
    // saveNewStockTrade= (event) => {
        
    //     let result = JSON.parse(event.data)
    //     console.log(result)
    //     let user_watchlist = this.state.stocks
    //     console.log("InsidesaveNewStockTrade: ", user_watchlist)
    //     if(result.type==="trade"){
    //         user_watchlist.forEach(symbol => {
    //             var tradePrice= result.data.filter((i,n)=>i.s===symbol.Symbol);
    //             if(tradePrice.length !==0){
    //                 symbol.currentPrice = tradePrice[tradePrice.length-1].p; 
    //                 console.log("Found Updated price for ",symbol.Symbol)
    //                 // socket.send(JSON.stringify({'type':'unsubscribe', 'symbol': symbol.name}))
    //             }
    //         })
            
    //     }
    //     this.setState({stocks:user_watchlist});
    // }
     
    // componentDidMount(){
       
    //     this.connection.onopen = ()=> { 
    //         if (this.state.stocks!=="No stocks added"){
    //             this.state.stocks.forEach(symbol=>{
    //                 this.connection.send(JSON.stringify({'type':'subscribe', 'symbol': symbol.Symbol}));
    //                 console.log("Inside OnOpen: Subscribed To: ", symbol.Symbol)
    //             })
    //         }
    //         else{
    //             console.log("no stocks added to subscribe to");
    //         }
            
    //     }
    //     this.connection.onmessage= this.saveNewStockTrade;
    //     this.connection.onclose = () => { this.setState({connectionError: true}) }
    // }
    
    // updateDropdown(){
    //     var Message = "Your WatchList";
    //     if(this.state.stocks==="No stocks added"){
    //         Message ="Empty Watchlist"; 
    //     }
    //     var MessageArrowDir;
    //     if(this.state.dropdownOpen){
    //       MessageArrowDir = "\u25BC";
    //     }
    
    //     else{
    //       MessageArrowDir = "\u25B2";
    //     }
        
    //     var header =
    //         <> <div className = "dropDiv">
    //             <Button className = "FakeDropDown" onClick = {(e)=>{this.doNothing(e)}}><span style={{marginLeft:"55px"}}>{Message}</span></Button>
    
    //             <Button className = "realDropDown "onClick = {this.toggle} aria-expanded = {this.state.dropdownOpen}
    //                     data-toggle = "dropdown" aria-haspopup="true"><span style={{fontSize:"18px"}}>{MessageArrowDir}</span></Button>
    
    //         </div></>
        
    //     if(this.state.stocks!=="No stocks added"){
    //     var display = 
    //     <Dropdown style = {{marginBottom:"20px"}} isOpen={this.state.dropdownOpen}>
    //         {header}
    
    //         <DropdownMenu className = "DDM">
    //           <div className = "ArtistsDisplayWrapper">
    //             {this.state.stocks.map((stocks,index) =>
                
    //         <div className = "ArtistLine" style = {{marginBottom:"55px"}}>
                
    //             <button  onClick = {(e)=>{this.doNothing(e)}} className = "artistButton">{stocks.Symbol}</button>
    //             <button id = {stocks.symbol} onClick = {(e)=>{this.doNothing(e)}} className = "playArtistButton">${stocks.currentPrice}</button>
    //             <button onClick = {(e)=>{this.removeStock(e,stocks.Symbol)}} className = "removeButton">X</button> 
    //         </div>
    //             )}
    //           </div>
    //         </DropdownMenu>
    //     </Dropdown>
    //     this.setState({dropdownDisplay:display});
    //             }
    //             else{
    //                 this.setState({dropdownDisplay:header});
    //             }
        

    // }
   
    removeStock(htmlEvent,stock){
        //unsubsribe from listening to thsi stock
       console.log("Unsubscribing from: ",stock.Symbol)
        // this.connection.send(JSON.stringify({'type':'unsubscribe', 'symbol': stock}))
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
    // getUserStocks(){
    //     var user={ 
    //         email: this.state.email,
    //     }
    //     var url = "/api/getUserStocks";
    //     const req = new Request(url,{
    //         method:"POST",
    //         headers:{"Content-Type":"application/json"},
    //         body:JSON.stringify(user),
    //     });
    //     fetch(req)
    //     .then((res)=>{
           
    //         return res.json();
    //     }).catch((error)=>{
    //         console.log("p/121");
    //         console.log(error);
    //         return Promise.reject(error);
    //         })
    //     .then(stock_results => {
    //         console.log("3rdt ADD/remove Stock Rerender");
    //         this.setState({stocks:stock_results},()=>this.updatePage)});
        
    // }
    
    // updatePage(){
    //     console.log("In update page ",this.state.stocks);
        
    //     this.props.history.push("/profile",[[{email:this.state.email}],this.state.stocks])
        
        
        
    // }
    
    // UpdateStockOnPage(){
    //     if(this.state.stock_symbol_status === 'User had already added this stock'){
    //         alert("This stock is already on your watchlist");
    //     }
        
    //     else{
    //         console.log("2nd ADD Stock Rerender");
    //         this.setState({stock_symbol_status:"",Remove_Status:""},()=>this.getUserStocks());
    //     }
    // }

    // addUserStock(){
    //     if(this.state.stock_symbol_status !== "stock not found"){
    //         console.log("Subscribing to ",this.state.stock_to_watch)
    //         this.connection.send(JSON.stringify({'type':'subscribe', 'symbol': this.state.stock_to_watch}))
    //         var user={
    //             email:this.props.email,
    //             addStock: this.state.stock_to_watch
    //         } 
           
    //         var url="/api/AddUserStocks";
    //         const req = new Request(url,{
    //             method:"POST",
    //             headers:{"Content-Type":"application/json"},
    //             body:JSON.stringify(user),
    //         });
    //         fetch(req)
    //         .then((res)=>{
                
    //             return res.json();
    //         }).catch((error)=>{
    //             return Promise.reject(error);
    //           })
    //         .then(result => {
    //             console.log("1st ADD Stock Rerender");
    //             this.setState({stock_symbol_status: result},()=>this.UpdateStockOnPage())});
            
    //     }
    
    //     else{
    //         //put in this functionality 
    //         alert("stock not found");
    //     }
        
        
    // }
    // handleChange(event) {
         
    //     this.setState({stock_to_watch: event.target.value});
    //   }

    renderStockChart(event){
      console.log(event.dataItem.Symbol)
      this.setState({chartStock:event.dataItem.Symbol})
    }
    render(){
        
    
        // console.log("In render: ", this.state.stocks,this.props.stocks);
        // // console.log("In render: ", this.state.dropdownDisplay);
        // if (this.state == null){
        //     this.props.history.push("/error");
        //     }
        
        
        // var Message = "Your WatchList";
        // if(this.state.stocks==="No stocks added"){
        //     Message ="Empty Watchlist"; 
        // }
        // var MessageArrowDir;
        // if(this.state.dropdownOpen){
        //   MessageArrowDir = "\u25BC";
        // }
    
        // else{
        //   MessageArrowDir = "\u25B2";
        // }
        
        // var dropdownDisplay =
        //     <> <div className = "dropDiv">
        //         <Button className = "FakeDropDown" onClick = {(e)=>{this.doNothing(e)}}><span style={{marginLeft:"55px"}}>{Message}</span></Button>
    
        //         <Button className = "realDropDown "onClick = {this.toggle} aria-expanded = {this.state.dropdownOpen}
        //                 data-toggle = "dropdown" aria-haspopup="true"><span style={{fontSize:"18px"}}>{MessageArrowDir}</span></Button>
    
        //     </div></>
        // var dropdown;
        // if(this.state.stocks!=="No stocks added"){
    
        // dropdown = 
    
        // <Dropdown style = {{marginBottom:"20px"}} isOpen={this.state.dropdownOpen}>
        //     {dropdownDisplay}
    
        //     <DropdownMenu className = "DDM">
        //       <div className = "ArtistsDisplayWrapper">
        //         {this.state.stocks.map((stocks,index) =>
                
        //     <div className = "ArtistLine" style = {{marginBottom:"55px"}}>
                
        //         <button  onClick = {(e)=>{this.doNothing(e)}} className = "artistButton">{stocks.Symbol}</button>
        //         <button id = {stocks.symbol} onClick = {(e)=>{this.doNothing(e)}} className = "playArtistButton">${stocks.currentPrice}</button>
        //         <button onClick = {(e)=>{this.removeStock(e,stocks.Symbol)}} className = "removeButton">X</button> 
        //     </div>
        //         )}
        //       </div>
        //     </DropdownMenu>
        // </Dropdown>
        // }
        // else{
        //     dropdown = dropdownDisplay;
    
           
      
        // }
       
        // var trackButton = <Button onClick = {this.getStockInfo} className= "Button" id = "TrackButton" >Track </Button>;
        
        // this.props.history.push("/error",this.state)
        // onClick={this.props.onClick}
        var useData;

        if(this.props.stocks !=="No stocks added")useData=this.props.stocks
        else{
          useData=[{
            Symbol:"Add stocks",
            currenPrice:"Add stocks"
          },]
        }
        console.log(this.state.eodData)
        return (
          
          
          <Tooltip openDelay={100} position="right" >
            <Grid
            data={useData}
            // style={{ height: 700 }}
            onRowClick= {this.renderStockChart}
            title="WatchList"
             >
               
            
  
    <GridColumn title="Name" field="name" />
    <GridColumn title="Symbol" field="Symbol"style={{ width: 100 }} locked={false} width={100} />
    <GridColumn title="Current Price" field="currentPrice" />
    
    {/* <GridColumn title="View Chart" id="Symbol" cell={tooltiprender} width="200px" /> */}
    
    <GridColumn title="Change" field="day_change" />
    <GridColumn title="% Change" field="change_pct" />
    <GridColumn title="Volume" field="volume" />
    <GridColumn title="Market Cap" field="market_cap" /> 
    <GridColumn title="View Options" id="Symbol" cell={this.CommandCell} width="200px" />
    <GridColumn title="Tracker" id="Symbol" cell={this.CommandCell} width="200px" />
    <GridColumn title="Remove From WatchList" id="Symbol" cell={this.CommandCell} width="200px" />

    

          </Grid>
          </Tooltip>
         
          
          );
        }
})