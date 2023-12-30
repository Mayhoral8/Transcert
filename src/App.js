import  {useContext} from "react";
import Login from "./login";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ContextCreate } from "./context";
import Register from "./signup";
import Dashboard from "./dashboard.tsx";
import RegistrationPage from "./registrationPage";
import Paystack from "./paystack";
import Profile from "./profile.tsx";
import Sidebar from "./sidebar";
import BottomNav from "./bottom-nav";
import Toast from "toast.js";

import Home from "./home";
import Overlay from "./overlay";
import LoadingOverlay from "./spinner";
import Modal from "./modal";
import Error from "./error";



const App = () => {

  const {token} = useContext(ContextCreate).auth
  return(
<>
<Toast/>
<LoadingOverlay/> 
{token && <Modal/>}
{token && <Sidebar/>} 
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
