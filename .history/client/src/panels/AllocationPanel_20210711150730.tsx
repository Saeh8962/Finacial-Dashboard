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
    <td>Allocation</td>
    
  )
}
