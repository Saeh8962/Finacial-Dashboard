import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import React from "react";
import { MultiColumnComboBox } from "@progress/kendo-react-dropdowns";
import { Alerts } from "../data/models";
import { Grid, GridCellProps, GridColumn } from "@progress/kendo-react-grid";
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import {Button,DropdownMenu,Dropdown} from "reactstrap/es";
const defaultIdentifier = {
    productName: "Select Metric ...",
  };
  const defaultWatch = {
    orderName: "Select Movment ...",
  };

  export default function AddAlert(){
      const [state,setState]= React.useState({ 
          identifier:null,
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
      return(
        <form className= "FormFields">
        <div className="FormField">
          <div className="row">
            <div className="m-3">
              <DropDownList 
              label = "$ %"
              data={["Price","% Change"]}
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
      )
  }