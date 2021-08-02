const {StringStream} = require("scramjet");
const request = require("request");


export default function hi(){
  return(
  <html>
                <head>
                 <link rel="stylesheet" href="style.css"></link>
                </head>
                <body>
                <div className="btn">
                <label htmlFor="checkbox1" className="cf">
                <input type="checkbox" id="checkbox1"/>
                <span>active</span>
                <i className="indicator">
                    <svg version="1.1" id="toggle" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"  viewBox="0 0 33 33" >
                        <path class="circ path" style="fill:none;stroke-width:3;stroke-linejoin:round;stroke-miterlimit:10;" d="M6.2,6.2L6.2,6.2 c-5.7,5.7-5.7,14.8,0,20.5l0,0c5.7,5.7,14.8,5.7,20.5,0l0,0c5.7-5.7,5.7-14.8,0-20.5l0,0C21.1,0.6,11.9,0.6,6.2,6.2z"/>
                        <polyline class="cross path" style="fill:none;stroke:#CD4C10;stroke-width:3;stroke-linejoin:round;stroke-miterlimit:10;" points=" 11.4,11.4 21.6,21.6 "/>
                        <polyline class="cross path" style="fill:none;stroke:#CD4C10;stroke-width:3;stroke-linejoin:round;stroke-miterlimit:10;" points="21.6,11.4 11.4,21.6	"/>
                        <polyline class="tick path" style="fill:none;stroke:#557D25;stroke-width:3;stroke-linejoin:round;stroke-miterlimit:10;" points="10,17.3 13.8,21.1 23,11.9 "/>
                    </svg>
                </i>
                <span>inactive</span>
            </label>
        </div>
                </body>
            </html>)
}

function isMarketOpen(){
  var x = new Date()
  var dayOfTheWeek= x.getDay();
  var timeOfDay = x.getHours();
  var minutes = x.getMinutes();
  console.log(dayOfTheWeek,timeOfDay,minutes);
  if(dayOfTheWeek <6){
    if((timeOfDay === 9 && minutes >30) || (timeOfDay >9 && timeOfDay < 16)){
      return true;
    }
    else{
      return false;
    }

  }
  else{
    return false;
  }
    //week day find out if the market is open 
    
}

module.exports = {hi};