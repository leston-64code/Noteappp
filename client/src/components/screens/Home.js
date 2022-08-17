import React, { useEffect } from 'react'
import {Link ,useNavigate} from "react-router-dom"
import "./css/home.css"
const Home = () => {
  // let navigate=useNavigate()
  // useEffect(()=>{
  //   if(localStorage.getItem("authToken")){
  //     navigate("/private")
  //   }
  // },[navigate])
  return (
    <div className='home-one' >
           <h1 style={{color:"white"}}>Choose your choice</h1>
      <Link style={{"fontSize":"50px","textDecoration":"none",color:"red"}} to="/register">Register</Link>
      <br />
      <br />
      <Link style={{"fontSize":"50px","textDecoration":"none",color:"red"}}  to="/login">Login</Link>
    </div>
  )
}

export default Home
