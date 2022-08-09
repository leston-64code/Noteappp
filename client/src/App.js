import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

// Routing 
import Login from "./components/screens/Login"
import Register from "./components/screens/Register"
import Home from './components/screens/Home'
import ResetPassword from './components/screens/ResetPassword'
import ForgotPassword from './components/screens/ForgotPassword'
import Private from './components/screens/Private'
import Navbar from "./components/screens/Navbar"

const App = () => {
  return (
   <Router>
        <div className='App'>
        <Navbar/>
     <Routes>
   
    <Route path="/private" element={<Private/>}/>

     <Route path='/login' element={<Login/>}> </Route>
     <Route path='/register' element={<Register/>}> </Route>
     <Route path='/forgotpassword' element={<ForgotPassword/>}> </Route>
     <Route path='/resetpassword/:resetToken' element={<ResetPassword/>}> </Route>
     <Route path='/' exact={true} element={<Home/>}></Route>

     </Routes>
    </div>
   </Router>
  )
}

export default App
