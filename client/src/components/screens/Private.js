import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
const Private = () => {
const navigate=useNavigate()

useEffect(()=>{
  if(!localStorage.getItem("authToken")){
    navigate("/login")
  }

},[navigate])

let data= localStorage.getItem("authToken")

useEffect( ()=>{
    fetch("/api/auth/getuser",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "token":data
    }
  }).then((res)=>{
    return res.json()
  }
  ).then((data)=>{
    console.log(data)
  }).catch((error)=>{
    console.log(error)
  })
},[data])

 async function logoutHandler(){
    localStorage.removeItem("authToken")
       navigate("/login")
 }

  return (
    <div>
        <h1 style={{color:"red"}}>Hello this is private route  You are good boy</h1>
        <br /><br />
        <button onClick={()=>{
        logoutHandler()
      }} style={{"fontSize":"50px","borderRadius":"15px solid white"}}>Logout</button>
    </div>
    
  )
}

export default Private
