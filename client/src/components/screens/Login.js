import React, { useState, useEffect } from "react";
import "./css/login.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/private");
    }
  }, [navigate]);

  const toastoptions = {
    position: "top-center",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  async function loginHandler(e) {
    e.preventDefault();
    if(!email||!password){
      toast.error("Please enter valid email or password",toastoptions)
      return
    }

    await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
           return res.json()
      })
      .then((data) => {
      
        if (data.success === true) {
          localStorage.setItem("authToken", data.token);
          navigate("/private");
        } else {
          setError(true)
          toast.error(data.error, toastoptions);
       navigate("/login");
        }
      })
      .catch((error) => {
        return toast.error("Request sending failed",toastoptions)
   
      });
  }

  return (
    <div className="one-c">
      <div className="two-c">
        <div className="three-c">
          <div className="title">
            <p className="title-one"> Login</p>
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
          <div className="password">
            <div className="flexer">
              <div className="flexer-one">
                <p className="conner">Password :</p>
              </div>
              <div className="flexer-two">
                <input
                  type="text"
                  className="password-input input-control"
                  placeholder="Enter your password "
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="submit-section">
            <button className="submit-button" onClick={loginHandler}>
              Submit
            </button>
          </div>
          <span style={{ color: "white" }}>
            Don't have an account ?{" "}
            <Link className="linkerman" to="/register">
              {" "}
              Register
            </Link>
          </span>
          <br /><br />
          
          {
            error?<span style={{"color":"white"}}>Don't remember you password ? <Link style={{"color":"red"}} to="/forgotpassword">Forgot Password</Link></span>:""
          }
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
