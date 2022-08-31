import React from 'react'
import {Link} from "react-router-dom"
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
      <div className="hmain">
        <div className="hone">
          <h1>Urnotes</h1>
          <h3>All your notes at one place !! . Sign up quickly for using this utility . </h3>
          <div className="hbuttons">
            <div className="hbutone hbtn"><Link className='linker' to="/login">Login</Link></div>
            <div className="hbutone hbtn"><Link className='linker' to="/register">Sign up</Link></div>
          </div>
        </div>
        
      </div>
      <div className="hdummy"></div>
       </div>
  )
}

export default Home
