
import React from "react";

function getAlertData(email:string,callback:any){
    callback(email)
}
export default function AllocationPanel(props:any) {

    const [AlertData, setAlertData] = React.useState<(null)>();
    React.useEffect(() => {
      getAlertData(props.email,setAlertData)
    }, []);
  
    return (
    <td>Working on it</td>
    )
}