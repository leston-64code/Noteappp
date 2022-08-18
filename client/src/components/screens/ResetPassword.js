import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
    const [password,setPassword]=useState("")
    const [confirmpassword,setConfirmPassword]=useState("")
    const token=useParams()
    const navigate=useNavigate()
    const toastoptions = {
        position: "top-center",
        autoClose: 1000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

      let backlink="https://noteapp-leston.herokuapp.com"

    
    function resetpassHandler(e){
        e.preventDefault()
        if(!password||!confirmpassword){
            toast.error("Please enter password or confirm password",toastoptions)
            return
        }
        if(password!==confirmpassword){
            toast.error("Password and ConfirmPassword did not match",toastoptions)
            return
        }else{
            // fetch(`/api/auth/passwordreset/${match.params.resetToken}`,{
            fetch(`${backlink}/api/auth/resetpassword/${token.resetToken}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    'Accept': 'application/json'
                },
                body:JSON.stringify({
                    password
                })
            }).then((res)=>{
                return res.json()
            }).then((data)=>{
                // console.log(data)
                if(data.success===true){
                    toast.success("Password reset successful",toastoptions)
                    navigate("https://noteapp-leston-64code.netlify.app/")
                }
            
                if(data.success===false){
                    console.log(data.error)
                    toast.error(data.error,toastoptions)
                }
             
            }).catch((error)=>{
                console.log(error)
                // toast.error(error)
            })
        }
    }
  return (
    <div className="one-c">
    <div className="two-c">
        <div className="three-c">
            <div className="title">
            
             
             <p className="title-one"> Reset Password</p>
            </div>
            
            <div className="password">
                <div className="flexer">
                    <div className="flexer-one">
                        <p className="conner">New Password:</p>
                    </div>
                    <div className="flexer-two">
                        <input type="text" className="password-input input-control" placeholder="Enter your password "
                        value={password}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                        />
                    </div>
                </div>
               
            </div>
            <div className="password">
                <div className="flexer">
                    <div className="flexer-one">
                        <p className="conner">Confirm password</p>
                    </div>
                    <div className="flexer-two">
                        <input type="text" className="password-input input-control" placeholder="Enter your password "
                        value={confirmpassword}
                        onChange={(e)=>{
                            setConfirmPassword(e.target.value)
                        }}
                        />
                    </div>
                </div>
               
            </div>
            
            <div className="submit-section">
                <button className="submit-button" onClick={resetpassHandler}>
                    Submit
                </button>
            </div>
            {/* <span style={{color:"white"}}>Don't have an account ?  <Link className='linkerman' to="/register"> Register</Link></span> */}
        </div>
    </div>
    <ToastContainer/>
</div>

  )
}

export default ResetPassword
