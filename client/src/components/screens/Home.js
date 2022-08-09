import React, { useEffect } from 'react'
import {Link ,useNavigate} from "react-router-dom"

const Home = () => {
  let navigate=useNavigate()
  useEffect(()=>{
    if(localStorage.getItem("authToken")){
      navigate("/private")
    }
  },[navigate])
  return (
    <div >
      <h1 style={{color:"white"}}>Choose your choice</h1>
      <Link style={{"fontSize":"50px","textDecoration":"none",color:"red"}} to="/register">Register</Link>
      <br />
      <br />
      <Link style={{"fontSize":"50px","textDecoration":"none",color:"red"}}  to="/login">Login</Link>
    </div>
  )
}

export default Home
