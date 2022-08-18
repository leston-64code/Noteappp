import React, { useState, useEffect } from "react";
import "./css/register.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  let backlink="https://noteapp-leston.herokuapp.com"

  const toastoptions = {
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/private");
    }
  }, [navigate]);

  async function registerHandler(e) {
    e.preventDefault();
    if(!username||!password||!email){
       toast.error("Please add all fields",toastoptions)
       return
    }
    if(password!==confirmPassword){
       toast.error("Password and confirm password did not match",toastoptions)
       return
    }
       await fetch(`${backlink}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success === true) {
          localStorage.setItem("authToken", data.token);
          navigate("/private");
        } else {
          toast.error("Email already in use",toastoptions)
                 }
      })
      .catch((error) => {
        toast.error("Failed to send request",toastoptions)
          });
  }

  return (
    <div className="one-c">
      <div className="two-c">
        <div className="three-c">
          <div className="title">
            <p className="title-one"> Sign Up</p>
          </div>
          <div className="name">
            <div className="flexer">
              <div className="flexer-one">
                <p className="conner">Name :</p>
              </div>
              <div className="flexer-two newer">
                <input
                  type="text"
                  className="name-input input-control"
                  placeholder="Enter your name"
                  value={username}
                  tabIndex={"1"}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
            </div>
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
                  tabIndex={"2"}
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
          <div className="password">
            <div className="flexer">
              <div className="flexer-one">
                <p className="conner">Confirm Password :</p>
              </div>
              <div className="flexer-two">
                <input
                  type="text"
                  className="password-input input-control"
                  placeholder="Enter your password "
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="submit-section">
            <button
              type="submit"
              className="submit-button"
              onClick={registerHandler}
            >
              Register
            </button>
          </div>
          <span style={{ color: "white" }}>
            Already have an account ?{" "}
            <Link className="linkerman" to="/login">
              Login
            </Link>
          </span>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Register;
