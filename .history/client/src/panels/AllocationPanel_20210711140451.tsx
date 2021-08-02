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
import { getFundAllocation } from "../services/dataService";
import { Allocation } from "../data/models";
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
// import { getFundInfo } from "../services/dataService";
// import { FundInfo } from "../data/models";
import {withRouter} from "react-router-dom";
import {Button,DropdownMenu,Dropdown} from "reactstrap/es";
import "hammerjs";
import "../CSS/GlobalCSS.css";
export default function AllocationPanel() {
  const [data, setData] = React.useState<Allocation[]>();
  React.useEffect(() => {
    getFundAllocation().then((data: Allocation[]) => {
      setData(data);
    })
  }, []);

  return (
    <PanelBar>
        <PanelBarItem expanded={true} title="Stock Alert" >
          <form className= "FormFields">
            <div className="FormField">
            
              <Button  className= "ButtonNoRight" onClick={this.addUserStock}>Add </Button>
              <input  className= "FormField_Input" onChange={this.handleChange} placeholder= "Symbol" type="text" name="stock" />
            </div>
          </form>
          <form className= "FormFields">
            <div className="FormField">
            
              <Button  className= "ButtonNoRight" onClick={this.addUserStock}>Show Chart </Button>
              <input  className= "FormField_Input" onChange={this.handleChange} placeholder= "Symbol" type="text" name="stock" />
            </div>
          </form>
      </PanelBarItem>
      {/* <PanelBarItem expanded={false} title="Trackers" >
        
      </PanelBarItem>
      </PanelBarItem> */}

      
    </PanelBar>
    
  )
}
