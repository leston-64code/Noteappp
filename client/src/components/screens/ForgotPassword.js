import React, { useState} from "react";
import "./css/login.css";
import { Link} from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
 
    async function forgotHandler(){
       fetch("/api/auth/forgotpassword",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email
        })
       }).then((res)=>{
         return res.json()
       }).then((data)=>{
        console.log(data)
       
       })

    }
  
  return (
    <div className="one-c">
      <div className="two-c">
        <div className="three-c">
          <div className="title">
            <p className="title-one" style={{"marginTop":"2px"}}> Forgot Password</p>
            <p style={{"color":"white","fontSize":"18px"}}>Please enter the email you entered when signing up</p>
          </div>
          <div className="email">
            <div className="flexer">
              <div className="flexer-one">
                <p className="conner">Email :</p>
              
              </div>
              <div className="flexer-two">
                
                <input
                  type="text"
                  className="email-input input-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
         
          <div className="submit-section">
            <button className="submit-button" onClick={forgotHandler}>
              Submit
            </button>
          </div>
          <span style={{ color: "white" }}>
             Already have an account ?{" "}
            <Link className="linkerman" to="/login">
              {" "}
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
