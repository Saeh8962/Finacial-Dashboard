import React,{Component} from "react";
import {Button} from "reactstrap/es";
import {withRouter} from "react-router-dom";
import "./CSS/GlobalCSS.css";
// import { queryResult } from "pg-promise";

const bcrypt = require('bcrypt-nodejs/bCrypt');

class Login extends Component{
 
    constructor(props){
        super(props);
        this.handlePassword=this.handlePassword.bind(this);
        this.handleEmail=this.handleEmail.bind(this);
        this.routeChange=this.routeChange.bind(this);
        this.test=this.test.bind(this);
        this.verify=this.verify.bind(this); 
        this.state={ 
            password:"",  
            email:"",
            login_toggle : false
        }
    }

    handleEmail(event){
    this.setState({email:event.target.value});
    }

    handlePassword(event){
        this.setState({password:event.target.value});
    }

    // Handle to new Brower path
    routeChange(value){
        if (value.target.id=="Back"){
            this.props.history.push("/",this.props.history.location.state);
      }
        else if(value.target.id=="Home"){
          this.props.history.push("/home",this.props.history.location.state);
        }
    }

    
    test(){
        //confirm the email exist
        if(this.state.email!=null){
           var user={
            email:this.state.email,
           } 
        
            var url="/api/loginVerification";
            const req = new Request(url,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(user),
            });
            
            fetch(req)
            .then((res)=>{
                if(res.status===500){
                    res.json()
                    .then((json)=>{
                        const {message,stackTrace}=json;
                      })
                      .catch((error)=>{
                        return Promise.reject(error);
                      });
                    }
                    else{
                      return res.json();
                    }
                  })
            .then(query_result=>{
                console.log(query_result);
                this.setState({query:query_result} )
                this.verify();
            });

        }
        else{
            alert("Invalid Email or Password");
        }
    }

    // Verify the email and password 
    verify(){
        console.log("Verify");
        
        if(this.state.query === "No User By That Email"){
            alert("Invalid Email");
        }
        //query error
        else if (this.state.query==null){
            console.log('err line 95');
        //invalid email
            return -1;
            // this.props.history.push("/error");
        }
        //verify password
        else{
            var email = this.state.query.email
            var secured = this.state.query.password
            console.log(email,secured);
            if(bcrypt.compareSync(this.state.password,secured)){
                
                var user={
                    email:email,
                
                } 
               
                var url="/api/getUserStocks";
                const req = new Request(url,{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(user),
                });
                fetch(req)
                .then((res)=>{
                    return res.json();
                })
                .then(query_result => this.setState({query:[[{email:this.state.email}],query_result],login_toggle:true},()=> console.log("login successful")))
                .catch((error)=>{
                    return Promise.reject(error);
                  });
            }
            else{
                alert("Invalid Password");
            }
               
            }
            
               
        }

    //render the login page
    render(){
        
        if(this.state.login_toggle){// you can login
            console.log(this.state.query)
            this.props.history.push("/profile",this.state.query);
        }
    
        var leftarrow = "\u2190"
        var backButton = <Button className="Button" id="Back" onClick={this.routeChange}>{leftarrow}</Button>;
        var loginButton = <Button onClick={this.test} className= "Button" id = "SignButton" >Login </Button>;
    return(
      <>
        <div className = "CenterWrapper">
          <div className= "HeaderInfo" id="TitleTextSignUp">
          Login!
          </div>

          <form className= "FormFields">

            <div className="FormField">
              <input onChange={this.handleEmail} className= "FormField_Input_LS" placeholder= "Email" type="text" name="Email" />
            </div>

            <div className="FormField">
              <input onChange={this.handlePassword} className= "FormField_InputFormField_Input_LS" placeholder= "Password" type="Password" name="Password" />
            </div>

            {backButton}
            {loginButton}
          

          </form>
        </div>

      </>
    );
  }
    

}
export default withRouter(Login);