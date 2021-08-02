import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import React from "react";
import { MultiColumnComboBox } from "@progress/kendo-react-dropdowns";
import { Alerts } from "../data/models";
import { Grid, GridCellProps, GridColumn } from "@progress/kendo-react-grid";

const defaultIdentifier = {
    productName: "Select Metric ...",
  };
  const defaultWatch = {
    orderName: "Select Movment ...",
  };

  export default function AddAlert(){
      const [state,setState]= React.useState({ 
          identifier:null,
          movement:[],
      })

      const identifierChange=(event)=>{
          const identifier = event.target.value;
          if(identifier==='Price'){
            const movements= ['Above,Below']
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
  }