import React from 'react'
import "./css/navbar.css"
import {useNavigate} from "react-router-dom"

const Navbar = () => {
    const navigate=useNavigate()
    function navloghandler(){
        localStorage.removeItem("authToken")
        localStorage.removeItem("userID")
        localStorage.removeItem("username")
        navigate("/login")
    }
  return (
    <div className="none">
        <div className="nflexer">
            <div className="nflex1 ncommon">
                <div className="nflex1-one">
                    <i className="fa-solid fa-book bigicon" onClick={()=>{
                        navigate("/")
                    }}></i>
                    <p className="nflex1-one-p">Urnotes</p>
                   </div>
                   <div className="nflex1-two">
                    <p className="commonp helloclass" onClick={()=>{
                        navigate("/")
                    }} >Home</p>
                   </div>
                   <div className="nflex1-three">
                    <p className="commonp helloclass">About us</p>
                   </div>
              
            </div>
            <div className="nflex2 ncommon">
                <div className="nflex2-one">
                    {
                        localStorage.getItem("authToken")?
                        <p className="commonp helloclass" onClick={()=>{
                            navloghandler()
                        }}>Logout</p>
                        : <p className="commonp helloclass" onClick={()=>{
                            navigate("/login")
                        }}>Login</p>
                    }
                   
                    
                </div>
                <div className="nflex2-two ">
                    <p className="commonp helloclass" onClick={()=>{
                        navigate("/register")
                    }}>Register</p>
                </div>
                <div className="nflex2-three">
                    <i className="fa-solid fa-user"></i><br />
                  {
                    localStorage.getItem("authToken")?
                    <p className="nflex2-three-p helloclass">{localStorage.getItem("username")}</p>
                    :null
                  }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
