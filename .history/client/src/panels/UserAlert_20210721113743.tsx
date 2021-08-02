
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";

import React from "react";
import { MultiColumnComboBox } from "@progress/kendo-react-dropdowns";
import { Alerts } from "../data/models";
import { Grid, GridCellProps, GridColumn } from "@progress/kendo-react-grid";
import hi from "./service.js"
const columns = [
    {
      field: "Identifier",
      header: "ID",
      width: "100px",
    },
    {
      field: "movement",
      header: "Tracking",
      width: "300px",
    },
    {
      field: "valuechange",
      header: "Change",
      width: "300px",
    },
  ];

function getAlertData(email:string,callback:(arg0: Alerts) => void){
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
export default function Useralerts(props:any) {
    function toggleButton(props:any){
        const activeValue = props.dataItem[props.field || ""];
        
        return( 
        <div>
            {hi}
        </div>)
        
    }
    function changeprefix(props: any){
        const Value = props.dataItem[props.field || ""];
        const check=props.dataItem['Identifier']
        const removeButton = <button type="button" className="btn-danger btn-circle btn-sm" onClick={(e) =>removeAlert(e,props.dataItem)}>X</button>
        if(check == "Percent"){
            return (
                <td >
                  {"%"+Value}   {removeButton}
                </td>
              )
        }
        else{
            return (
                <td >
                  {"$"+Value}   {removeButton}
                </td>
              )
        }
        
    }
    function removeAlert(event:any,data:any){
        var user={
            email:props.email,
            symbol:data.symbol,
            identifier:data.Identifier,
            movement:data.movement
        }
        console.log(user,data)
        var url="/api/RemoveAlerts";
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
                
               setState({removedAlert:!state.removedAlert})
            }) 
    }
    const [state,setState]= React.useState({ 
        
        removedAlert:false
    })
    const [AlertData, setAlertData] = React.useState<(Alerts)>();
    React.useEffect(() => {
      getAlertData(props.email,setAlertData)
      props.callback(AlertData)
    }, [props.alertChange]);
    if(JSON.stringify(AlertData)!==JSON.stringify("No Alerts found")){ 
        //get the unique symbols, then get Alert type
      
       if(AlertData){ 
        var Stock_Alerts = AlertData.uniqueSymbols.map(symbol => {
            console.log((symbol.symbol))
            //alert data for the unique stock
            var uniqueAlertData={Symbol:symbol,alerts:AlertData.alerts.filter((i,n)=>i.symbol===(symbol).symbol)};
            
            return uniqueAlertData;
        })
        return (
            <PanelBar>
                {Stock_Alerts.map(Alert=>{
                    return(<PanelBarItem expanded={false} title={Alert.Symbol.symbol} >
                                <Grid
                                data={Alert.alerts}
                                style={{top: '0px'}}
                                 > 
                                    <GridColumn title="$ %" field="Identifier" />
                                    <GridColumn title="Watch" field="movement" />
                                    <GridColumn title="Value" field="valuechange" cell={changeprefix} />
                                    <GridColumn title="On/Off" field="active"cell={toggleButton}/>
                                </Grid>
                   </PanelBarItem>)
                    
                })}
            </PanelBar>)
       }else{
           return(
               <td>there was an error</td>
          )
       }
        
        
        // var rendItem = Stock_Alerts.forEach((Alert,n)=>{
        //     console.log(Alert);
        //     return(<PanelBarItem expanded={false} title={Alert.Symbol} >

        //          <MultiColumnComboBox
        //             data={Alert.alerts}
        //             columns={columns}
        //             />   
        //     </PanelBarItem>)
        // })
        // Object.values(Stock_Alerts).map((element: any) =>{
        //     console.log(element);
        // })
        
        //************Too DOO handle the uniqueAlertData to display it has a panel with the stock symbol and then a bulti combo box as the drop down  */
        
    }
    else {
        return (
            
                 <td>Add Some Alerts</td>
           
           
        )
    }


    
    
}