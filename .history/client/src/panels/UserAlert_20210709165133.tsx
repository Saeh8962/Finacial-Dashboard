
import React from "react";

function getAlertData(email:string){
    return 0
}
export default function AllocationPanel(props:any) {

    const [AlertData, setAlertData] = React.useState<(null)>();
    React.useEffect(() => {
      getAlertData(props.email).then((data: Allocation[]) => {
        setData(data);
      })
    }, []);
  
    return (

    )
}