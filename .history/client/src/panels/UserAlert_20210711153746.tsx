
import React from "react";

import { Alerts } from "../data/models";
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

    const [AlertData, setAlertData] = React.useState<(Alerts)>();
    React.useEffect(() => {
      getAlertData(props.email,setAlertData)
    }, []);
    if(AlertData){ 
        //get the unique symbols, then get Alert type
       
        var Stock_Alerts = AlertData.uniqueSymbols.map(symbol => {
            
            //alert data for the unique stock
            var uniqueAlertData={Symbol:symbol,alerts:AlertData.alerts.filter((i,n)=>i.symbol==symbol.symbol)};
            
            return uniqueAlertData;
        })
        console.log(Stock_Alerts)
        var rendItem = Stock_Alerts.forEach(Alert=>{
            console.log(Alert.alerts)
        })
        // Object.values(Stock_Alerts).map((element: any) =>{
        //     console.log(element);
        // })
        
        //************Too DOO handle the uniqueAlertData to display it has a panel with the stock symbol and then a bulti combo box as the drop down  */
    }
    
    return (
        // <panelBar>
            
        // </panelBar>
    <td>Working on it</td>
    )
}