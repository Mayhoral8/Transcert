import React, {useContext} from "react";
import Login from "./login";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ContextCreate } from "./context";
import Register from "./signup";
import Dashboard from "./dashboard";
import RegistrationPage from "./registrationPage";
import Paystack from "./paystack";
import Profile from "./profile";
import Navbar from "./navbar";
import BottomNav from "./bottom-nav";


import Home from "./home";

import LoadingOverlay from "./spinner";
import Modal from "./modal";
import Error from "./error";



const App = () => {

  const {token} = useContext(ContextCreate)
  return(
<>
   
<LoadingOverlay/> 

{token && <Modal/>}
{token && <Navbar/>} 
{token && <BottomNav/>}
<Routes>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/registration" element={<RegistrationPage />} />
  <Route path="/payment" element={<Paystack/>}  />  
  <Route path = '/profile' element = {<Profile/>}/>
  <Route path="/login" element={<Login />} />
  <Route path="/signUp" element={<Register />} />
  <Route path='/' element = {<Home/>}/>
  <Route path="*" element={<Error/>} />
</Routes>
   
    
  
 
  
 
   
    
  
 
</>
    ) 
    
    
    
};
export default App;
