import React from "react";
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
  ChartTitle,
  ChartTooltip
} from "@progress/kendo-react-charts";
import { NumericTextBox } from "@progress/kendo-react-inputs";

import { DropDownList } from "@progress/kendo-react-dropdowns";
import { getFundAllocation } from "../services/dataService";
import { Allocation } from "../data/models";
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
// import { getFundInfo } from "../services/dataService";
// import { FundInfo } from "../data/models";

import {Button,DropdownMenu,Dropdown, Input} from "reactstrap/es";
import "hammerjs";
import "../CSS/GlobalCSS.css";
import UserAlerts from "../panels/UserAlert";
// import AddAlert from "../panels/AddAlert";
const defaultIdentifier = {
  productName: "Select Metric ...",
};
const defaultWatch = {
  orderName: "Select Movment ...",
};


export default function AllocationPanel(props:any) {
  function handleChange(event:any){
   var symbol = event.target.value;
   setState({
     ...state,
    symbol:symbol,

   })
  }
  function handleClick(event:any){
    setState({
      ...state,
      identifiers:['Price','Percent']
 
    })
  }
  function handleAlert(event:any){
    

    



/* The result can be observed in the DevTools(F12) console of the browser. */
// console.log(event);
//     console.log(state);
    var user = {
      email:email,
      symbol:state.symbol,
      identifier:state.identifier,
      movment:state.movement,
      change:event.target.form[0].defaultValue
  }
  console.log(user)
  var url="/api/creatAlert";
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
              setState({...state,ChangedAlerts:!state.ChangedAlerts})
          })
  }
  const email = props.email;
  console.log(email)
  const [state,setState]= React.useState({ 
    identifiers:[""],
    movements: [""],
    identifier:"",
    movement:"",
    symbol:"",
    change:0,
    ChangedAlerts:false
})
const movementChange = (event:any) => {
  setState({
    ...state,

    movement:event.target.value
  })
}
const identifierChange=(event: any)=>{
  const identifier = event.target.value;
  if(identifier==='Price'){
    const movements= ['Above','Below']
    setState({
        ...state,
       identifier:identifier,
        movements: movements
    })
  }
  else{
      const movements=['Up','Down']
      setState({
        ...state,
        identifier:identifier,
        movements: movements
    })
  }
  
  
}
  


  return (
    <PanelBar>
      <PanelBarItem expanded={false} title="Alerts">
          <PanelBarItem expanded={false} title="Your Alerts">
            <UserAlerts email={email} alertChange={state.ChangedAlerts}/>
          </PanelBarItem>
          <PanelBarItem expanded={false} title="Add Alerts">
          <form className= "FormFields">
      <div className="FormField">
      <input  className= "FormField_Input"  placeholder= "Symbol" onChange={handleChange} type="text" name="stock" />
      <Button  className= "ButtonNoRight" onClick={handleClick}>Choose </Button>
        <div className="row">
          <div className="m-3">
            <DropDownList 
            label = "$ %"
            data={state.identifiers}
          //   textfield={"Price or % Change"}
            onChange= {identifierChange}
            />
          </div>
          <div className= "m-3">
            <DropDownList 
            label = "Watch"
            data={state.movements}
            onChange= {movementChange}
          //   textfield="Price or % Change"
            /> 
          </div>
        
          <div className= "m-3">
            <form>
            <NumericTextBox defaultValue={0} step={.5} id={"box"} /><span><Button  className= "ButtonNoRight" onClick={handleAlert}>Save Alert </Button></span>
            </form>
          </div>
        </div>
      </div>
      {/* <Button  className= "ButtonNoRight" onClick={(e)=>handleNewAlert(e)}>Save Alert</Button> */}
    </form>
          </PanelBarItem>
        </PanelBarItem>
    </PanelBar>
    
    
  )
}
