const {StringStream} = require("scramjet");
const request = require("request");
// require('./style.css') ;

// export default function hi(){
//   var x = JSON.parse("fill:none;stroke-width:3;stroke-linejoin:round;stroke-miterlimit:10")
//   var y = JSON.parse("fill:none;stroke:#CD4C10;stroke-width:3;stroke-linejoin:round;stroke-miterlimit:10")
//   var z = JSON.parse("fill:none;stroke:#CD4C10;stroke-width:3;stroke-linejoin:round;stroke-miterlimit:10")
//   var a = JSON.parse("fill:none;stroke:#557D25;stroke-width:3;stroke-linejoin:round;stroke-miterlimit:10")
//   return(
//   <html>
//                 <head>
//                  <link rel="stylesheet" href="style.css"></link>
//                 </head>
//                 <body>
//                 <div className="btn">
//                 <label htmlFor="checkbox1" className="cf">
//                 <input type="checkbox" id="checkbox1"/> 
//                 <span>active</span>
//                 <i className="indicator">
//                     <svg version="1.1" id="toggle" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"  viewBox="0 0 33 33" >
//                         <path className="circ path" style= {x} d="M6.2,6.2L6.2,6.2 c-5.7,5.7-5.7,14.8,0,20.5l0,0c5.7,5.7,14.8,5.7,20.5,0l0,0c5.7-5.7,5.7-14.8,0-20.5l0,0C21.1,0.6,11.9,0.6,6.2,6.2z"/>
//                         <polyline className="cross path" style={y} points=" 11.4,11.4 21.6,21.6 "/>
//                         <polyline className="cross path" style={z} points="21.6,11.4 11.4,21.6	"/>
//                         <polyline className="tick path" style={a} points="10,17.3 13.8,21.1 23,11.9 "/>
//                     </svg>
//                 </i> 
//                 <span>inactive</span>
//             </label>
//         </div>
//                 </body>
//             </html>)
// }

// function isMarketOpen(){
//   var x = new Date()
//   var dayOfTheWeek= x.getDay();
//   var timeOfDay = x.getHours();
//   var minutes = x.getMinutes();
//   console.log(dayOfTheWeek,timeOfDay,minutes);
//   if(dayOfTheWeek <6){
//     if((timeOfDay === 9 && minutes >30) || (timeOfDay >9 && timeOfDay < 16)){
//       return true;
//     }
//     else{
//       return false;
//     }

//   }
//   else{
//     return false;
//   }
//     //week day find out if the market is open 
    
// }

function filtersomething(){
  var listOfItem =[1,4,5,6,66,5,44,100,34,32,100]
  listOfItem =listOfItem.filter(item=>item<10)
  console.log(listOfItem)

}
filtersomething()
// module.exports = {hi};