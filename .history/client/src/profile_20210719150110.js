import React,{Component,ChildComponent} from "react";
import {ListGroup} from "react-bootstrap/esm";
import {Button,DropdownMenu,Dropdown} from "reactstrap/es";
import {withRouter} from "react-router-dom";
import DrawerContainer from "./layout/DrawerContainer";

import "./CSS/GlobalCSS.css";
import "./CSS/App.css";
import './App.scss';
import SearchBar from './components/searchbar'
import WatchList from './components/WatchList'
import AllocationPanel from "./panels/AllocationPanel";
import PerformancePanel from "./panels/PerformancePanel";
// import 'react-dropdown/style.css';
// import "./CSS/legacyStyles.css";

// import { render } from "react-dom";

class Profile extends Component { 
    
    constructor(props){
        super(props);

        this.getEodData=this.getEodData.bind(this);
        this.getAlertData=this.getAlertData.bind(this);
        this.routeChange = this.routeChange.bind(this);
        
             
        if(this.props.location.state == null || this.props.location.state[0] == null || this.props.location.state[0][0] == null || this.props.location.state[1] == null){
            this.props.history.push("/error");
            }
        else{
            if(this.props.location.state[0][0].chartStock !== null)
            this.state={  
                email: this.props.location.state[0][0].email ,
                stocks: this.props.location.state[1],
                stock_to_watch:"",
                dropdownOpen: false,
                value:"Your Watchlist",
                Chart_stock:this.props.location.state[0][0].chartStock
                
            }
            else{
                this.state={  
                    email: this.props.location.state[0][0].email ,
                    stocks: this.props.location.state[1],
                    stock_to_watch:"",
                    dropdownOpen: false,
                    value:"Your Watchlist",
                    
                    
                } 
            }
        }
           
        
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.state[0][0].getStocks !==this.props.location.state[0][0].getStocks) {
          console.log('User has added a stock. Get new stocks')
          this.getUserStocks()
          
        }
        if (prevProps.location.state[0][0].removeStocks !== this.props.location.state[0][0].RemoveStocks) {
            console.log('User has Removed a stock. Get new stocks')
            //update this function to grab eod Data
            this.getUserStocks()
            
          }
          if (prevProps.location.state[0][0].chartStock !== this.props.location.state[0][0].chartStock) {
            console.log('User has chosen a chart to display',this.props.location.state[0][0].chartStock)
            this.setState({Chart_stock:this.props.location.state[0][0].Chart_stock},()=>this.forceUpdate)
        
            
          }
        
      }
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
        // console.log(newList[0])
      this.setState({stocks:newList},()=>this.forceUpdate);
      })
     
        
      }
        else{
          console.log("No stocks added")
          return;
        }
      }

      getUserStocks(){
  
        var user={ 
            email: this.state.email,
        }
        console.log(user);
        var url = "/api/getUserStocks";
        const req = new Request(url,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user),
        });
        fetch(req)
        .then((res)=>{
           
            return res.json();
        }).catch((error)=>{
            console.log("p/121");
            console.log(error);
            return Promise.reject(error);
            })
        .then(stock_results => {
            console.log("3rdt ADD/remove Stock Rerender");
            this.getEodData(stock_results);
            });
        
      }
      
    
 
    
    


routeChange(value){
    if (value.target.id=="Back"){
        this.props.history.push("/",this.props.history.location.state);
    }
    else if(value.target.id=="Home"){
        this.props.history.push("/",this.props.history.location.state);
    }
}
getAlertData(email,callback){
    var user = {
        email:email,
        request:"getData"
    }
    var url="/api/UserAlerts";
            const req = new Request(url,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(user),
            });
            
            fetch(req)
            .then((res)=>{
                //Catch server error
                    //no error
                    
                return res.json();
            }).catch((error)=>{
                console.log(error);
                return Promise.reject(error);
            })
            .then(query_result=>{
                console.log(query_result);
                callback(query_result)
            }) 
    
}
componentDidMount(){
    this.getAlertData(this.state.email,function(alertData){
        this.setState({alertData:alertData})
    })
}


render(){
    var chart_symbol="";
    console.log(this.state.alertData);
    if(this.props.location.state[0][0].chartStock){
        chart_symbol =this.props.location.state[0][0].chartStock;
    }
    // console.log(this.props.location.state[0][0].chartStock)

    // var loginButton = <Button onClick={this.routeChange} className= "Button" id = "Home" >Home </Button>;
    return(
       
        <DrawerContainer>
           
            <div className="App-header">
            <div className="panels">
            
                <div className="panel-info">
                <SearchBar stocks= {this.props.location.state[1]} email= {this.state.email} /> 
                
                </div>
                {/* <div className="panel-info">
                   
                </div> */}
                <div className="panel-info">
                    <PerformancePanel symbol={chart_symbol}/>
                  
                </div>
                <div className="panel-positions">
                <WatchList stocks={this.state.stocks} email= {this.state.email} alertData={this.state.alertData}/>
                <AllocationPanel email={this.state.email} callback={(alerts)=>this.setState({alertData: alerts})}/>
                </div>
        </div>
            </div>
            
   </DrawerContainer>
    )
    }


}
export default withRouter(Profile);