import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ResetPassword = () => {
    const [password,setPassword]=useState("")
    const [confirmpassword,setConfirmPassword]=useState("")
    const token=useParams()
    const navigate=useNavigate()
//   console.log(token)
    function resetpassHandler(e){
        e.preventDefault()
        
        if(password!==confirmpassword){
        return console.log("Confirm password and password did not match")
        }else{
            // fetch(`/api/auth/passwordreset/${match.params.resetToken}`,{
            fetch(`/api/auth/resetpassword/${token.resetToken}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    'Accept': 'application/json'
                },
                body:JSON.stringify({
                    password
                })
            }).then((res)=>{
                return res.text()
            }).then((data)=>{
                console.log(data)
                if(data.success===true){
                    navigate("/login")
                }
            }).catch((error)=>{
                console.log(error)
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
</div>

  )
}

export default ResetPassword
