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
  const email = props.email;
  console.log(email)
  const [state,setState]= React.useState({ 
    identifier:[""],
    movement: [""],
})
const identifierChange=(event: any)=>{
  const identifier = event.target.value;
  if(identifier==='Price'){
    const movements= ['Above','Below']
    setState({
        ...state,
        identifier:identifier,
        movement: movements
    })
  }
  else{
      const movements=['Up','Down']
      setState({
        ...state,
        identifier:identifier,
        movement: movements
    })
  }
  
  
}
  


  return (
    <PanelBar>
      <PanelBarItem expanded={false} title="Alerts">
          <PanelBarItem expanded={false} title="Your Alerts">
            <UserAlerts email={email}/>
          </PanelBarItem>
          <PanelBarItem expanded={false} title="Add Alerts">
          <form className= "FormFields">
      <div className="FormField">
      <input  className= "FormField_Input"  placeholder= "Symbol" type="text" name="stock" />
        <div className="row">
          <div className="m-3">
            <DropDownList 
            label = "$ %"
            data={state.identifier}
          //   textfield={"Price or % Change"}
            onChange= {identifierChange}
            />
          </div>
          <div className= "m-3">
            <DropDownList 
            label = "Watch"
            data={state.movement}
          //   textfield="Price or % Change"
            />
          </div>
          <div className= "m-3">
            <NumericTextBox defaultValue={0} step={.5} />
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
