
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import {Button} from "reactstrap/es";
import React from "react";
import { MultiColumnComboBox } from "@progress/kendo-react-dropdowns";
import { Alerts } from "../data/models";
import { Grid, GridCellProps, GridColumn } from "@progress/kendo-react-grid";
import "./style.css"


const $ = require( "jquery" );

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
        // const activeValue = props.dataItem[props.field || ""];
        //  var x = JSON.parse("fill:none;stroke-width:3;stroke-linejoin:round;stroke-miterlimit:10").catch((error)=>{console.log(error)})
         var x = {
             "fill": "none",
             "stroke-width":3,
             "stroke-linejoin":"round",
             "stroke-miterlimit":10
         }
         var y ={
            "fill":"none",
            "stroke":"#CD4C10",
            "stroke-width":3,
            "stroke-linejoin":"round",
            "stroke-miterlimit":10
         }
         var a ={
            "fill":"none",
            "stroke":"#557D25",
            "stroke-width":3,
            "stroke-linejoin":"round",
            "stroke-miterlimit":10
         }
         var ss={
            "enable-background":"new 0 0 33 33"
         }
         if(document){ 
            var documentChekced= document.querySelector('input');
            console.log(documentChekced)

         }
        //  var deafult1 = activeValue === 'true'?"active":"Inactive"
        //  var deafult2 = activeValue === 'true'?"Inactive":"active"
        const activeValue = 'true';
         if(activeValue ==="true"){
            $('.btn span').css({
                'float': 'left',
                'color': '#fff',
                'font-family': 'Arial',
                'font-weight': 'bold',
                'text-align': 'center',
                'width': '66%',
                'height': '100%', 
                'background': '#0380b3',
                'display': 'block',
                'font-size': '14px',
                'line-height': '50px',
                '-webkit-transition': 'margin 0.2s linear',
                '-moz-transition': 'margin 0.2s linear',
                '-ms-transition': 'margin 0.2s linear',
                '-o-transition': 'margin 0.2s linear',
                'transition': 'margin 0.2s linear',
                'margin-left': 'margin',    
            });
            $('.circ').css({
                "stroke":"#557D25",
                "transition": "stroke 1s 0.2s"
            });
            $('.btn span ~ span').css({
                "margin-left":"0",
                "background": "none"
            });
            
            $('.btn input:checked ~ .indicator .circ').css({
                "stroke":"#CD4C10",
                "opacity": 1
            });
            $('.btn input:checked + span').css({
                'margin-left': '-66'
            })
            $('.tick').css({
                'opacity':'1',
                'stroke-dasharray': '20',
                'stroke-dashoffset': '20',
                'transition': 'stroke-dashoffset 0.3s',
                'transition-delay': '0s'
                
            })
            $('.btn input:checked ~ .indicator .tick').css({
                'opacity': '0',
                'stroke-dashoffset': '20',
                'transition-delay': '0s', 
            })
            $('.btn input:checked ~ .indicator .cross').css({
                'opacity': '1',
                'transition': 'stroke-dashoffset 0.25s ease-in',
                'transition-delay': '.5',
                'stroke-dashoffset': '0',
                'stroke-dasharray': '15',
            })
            $('.cross').css({
                'opacity': '0',
                'transition': 'stroke-dashoffset 0.5s ease, opacity 0.5s ease',
                'transition-delay': '0',
                'stroke-dashoffset': '15',
            })


            // .cross{
            //     /* opacity: 1; */
            //     stroke-dasharray: 15;
            //     stroke-dashoffset: 0;
            //     transition: stroke-dashoffset 0.25s ease-in;
            //     transition-delay: 0.5s;
            //   }
            //   .cross + .cross{
            //     transition-delay: 0.25s;
            //   }
            //   .btn input:checked ~ .indicator .cross{
            //     opacity: 0;
            //     transition: stroke-dashoffset 0.5s ease, opacity 0.5s ease;
            //     transition-delay: 0;
            //     stroke-dashoffset: 15;
            //   }
            
            // .btn input:checked + span{
                
            //   }
            //   .btn input:checked ~ .indicator .tick{
            //     opacity: 0;
            //     stroke-dashoffset: 20;
            //     transition-delay: 0s;  
            //   }
              
            
         }
         else if (activeValue ==="false"){

         }
         console.log(activeValue);
    //     var y = JSON.parse("fill:none;stroke:#CD4C10;stroke-width:3;stroke-linejoin:round;stroke-miterlimit:10")
    //     var z = JSON.parse("fill:none;stroke:#CD4C10;stroke-width:3;stroke-linejoin:round;stroke-miterlimit:10")
    //     var a = JSON.parse("fill:none;stroke:#557D25;stroke-width:3;stroke-linejoin:round;stroke-miterlimit:10")
    //     var toggle = (<svg version="1.1" id="toggle" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"  viewBox="0 0 33 33" >
    //     <path className="circ path" style= {x} d="M6.2,6.2L6.2,6.2 c-5.7,5.7-5.7,14.8,0,20.5l0,0c5.7,5.7,14.8,5.7,20.5,0l0,0c5.7-5.7,5.7-14.8,0-20.5l0,0C21.1,0.6,11.9,0.6,6.2,6.2z"/>
    //     <polyline className="cross path" style={y} points=" 11.4,11.4 21.6,21.6 "/>
    //     <polyline className="cross path" style={z} points="21.6,11.4 11.4,21.6	"/>
    //     <polyline className="tick path" style={a} points="10,17.3 13.8,21.1 23,11.9 "/>
    // </svg>);
    // var tButton = (<html><head><link rel="stylesheet" href="style.css"></link></head>
    //     <body><div className="btn">
    //         <label htmlFor="checkbox1" className="cf">
    //         <input type="checkbox" id="checkbox1"/> 
    //         <span>active</span>
    //         <i className="indicator">
    //             {toggle}
    //         </i> 
    //         <span>inactive</span>
    //         </label>
    //         </div>
    //         </body>
    // </html>)
    // console.log(toggle);
        return(
            <div>
               <Button  className= "ButtonNoRight" >

               
                <label htmlFor={props.id} className="cf">
                <input type="checkbox" id={props.id}/> 
                <span>active</span>
                <i className="indicator">
                <svg  xmlns="http://www.w3.org/2000/svg" width={20} viewBox="0 0 33 33">
            <switch>
                <g>
                <path className="circ path" style= {x} d="M6.2,6.2L6.2,6.2 c-5.7,5.7-5.7,14.8,0,20.5l0,0c5.7,5.7,14.8,5.7,20.5,0l0,0c5.7-5.7,5.7-14.8,0-20.5l0,0C21.1,0.6,11.9,0.6,6.2,6.2z"/>
                <polyline className="cross path" style={y} points=" 11.4,11.4 21.6,21.6 "/>
                <polyline className="cross path" style={y} points="21.6,11.4 11.4,21.6	"/> 
                <polyline className="tick path" style={a} points="10,17.3 13.8,21.1 23,11.9 "/>
                </g>
            </switch>
        </svg>
                </i> 
                <span>Inactive</span>
                </label>
                </Button>
                <button type="button" className="btn-danger btn-circle btn-sm" onClick={(e) =>removeAlert(e,props.dataItem)}>X</button>

                </div>

                
        
                  )
        
    }
    function changeprefix(props: any){
        const Value = props.dataItem[props.field || ""];
        const check=props.dataItem['Identifier']
        if(check == "Percent"){
            return (
                <td >
                  {"%"+Value}   
                </td>
              )
        }
        else{
            return (
                <td >
                  {"$"+Value}   
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