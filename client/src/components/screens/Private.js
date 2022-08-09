import React,{useEffect} from 'react'
// import axios from "axios"
import { useNavigate } from 'react-router-dom'
const Private = () => {
const navigate=useNavigate()
//     const [error,setError]=useState("")
//     const [privateData,setPrivateData]=useState("")

//  useEffect(()=>{
//     if(!localStorage.getItem("authToken")){
//         history.push("/login")
//     }

//     const fetchPrivateData=async ()=>{
//         const config={
//             header:{
//                 "Content-Type":"application/json",
//                 Authorization:`Bearer ${localStorage.getItem("authToken")}`
//             }
//         }

//         try {
//             const {data}=await axios.get("/api/private",config)
//             setPrivateData(data.data)
//         } catch (error) {
//             localStorage.removeItem("authToken")
//             setError("You are not authrized please login")
//         }
//     }
//   fetchPrivateData()
//  },[history])

useEffect(()=>{
  if(!localStorage.getItem("authToken")){
    navigate("/login")
  }
},[navigate])

 async function logoutHandler(){
    localStorage.removeItem("authToken")
    // history.push("/login")
    navigate("/login")
 }

  return (
    
    //   error ?<span>{error}</span>:
    //   <>
    //   <div style={{background:"green",color:"white"}}>{privateData}</div>
    //   <br /><br />
    //   <button onClick={()=>{
    //     logoutHandler
    //   }}>Logout</button>
    //    </> 
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
