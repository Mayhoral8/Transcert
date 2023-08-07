import React, {useContext} from "react";
import Login from "./login";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ContextCreate } from "./context";
import Register from "./register";
import Dashboard from "./dashboard";
import RegistrationPage from "./registrationPage";
import Paystack from "./paystack";
import Profile from "./profile";
import Navbar from "./navbar";
import BottomNav from "./bottom-nav";


import Home from "./home";

import LoadingOverlay from "./spinner";
import Modal from "./modal";




const App = () => {
  const navigate = useNavigate()
  const {userId, token} = useContext(ContextCreate)
  return(
<>
   
<LoadingOverlay/> 

{token && <Navbar/>}
{token && <Modal/>}
     
        <Routes>
           <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/registration" element={<RegistrationPage />} />
  <Route path="/payment" element={<Paystack/>}  />  
  <Route path = '/profile' element = {<Profile/>}/>
<Route path="/login" element={<Login />} />
<Route path="/signUp" element={<Register />} />
<Route path='/' element = {<Home/>}/>
<Route path="*" element={<Login/>} />
   </Routes>
   {token && <BottomNav/>}
   
    
  :  
 
  
 
   
    
  
 
</>
    ) 
    
    
    
};
export default App;
