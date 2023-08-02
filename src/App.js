import React, {useContext} from "react";
import Login from "./login";
import { Routes, Route } from "react-router-dom";
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




const App = () => {
  const {userId, token} = useContext(ContextCreate)
  return(
<>
   
<LoadingOverlay/> 
 {token ? 
 
 <div className="lg:flex  lg:flex-flow-row ">
<Navbar/>  
      <div className="lg:ml-64 lg:w-screen">
        <Routes> <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/registration" element={<RegistrationPage />} />
  <Route path="/payment" element={<Paystack/>}  />  
  <Route path = '/profile' element = {<Profile/>}/>
   </Routes>
   </div>  
<BottomNav/>
   </div>
    
  :  
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signUp" element={<Register />} />
    <Route path='/' element = {<Home/>}/>
    </Routes>
}
  
 
   
    
  
 
</>
    ) 
    
    
    
};
export default App;
