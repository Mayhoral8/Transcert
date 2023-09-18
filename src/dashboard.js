import React, { useContext, useEffect, useState, useReducer } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { db } from "./firebase-config";
import { ref, onValue } from "firebase/database";
import { ContextCreate } from "./context";
import Modal from "./modal";


import { getAuth } from "firebase/auth";

const Dashboard = () => {
  const {token, userId, setIsLoading, regStatus, setRegStatus, paymentStatus, setPaymentStatus} = useContext(ContextCreate)
  const auth = getAuth()
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('')
  const [greeting, setGreeting] = useState('')

  const [regInfo, setRegInfo] = useState(false)
  const [clrInfo, setClrInfo] = useState(false)
  const [payInfo, setPayInfo] = useState(false)


 
useEffect(()=>{
  console.log('pomm')
  if(token){
    setIsLoading(true)
    console.log('yayy')
    onValue(ref(db, `/users/${userId}`), 
    (snapshot) => 
    {
     
        const responseData = snapshot.val();
        setDisplayName(auth.currentUser.displayName)
        if(responseData){
          setRegStatus(responseData.regStatus === '' ? 'Not registered': 'Registered')
          setPaymentStatus(responseData.paymentStatus === '' ? 'Not Paid': 'Paid')
          setIsLoading(false)
      }else{
        setIsLoading(false)
      }
   
  }, (error)=>{
    setIsLoading(false)
    console.log(error)
  }

  )
  
  const date = new Date()
  
  if(date.getHours() >= 12 && date.getHours() <= 13){
    return setGreeting('afternoon')
  }else if(date.getHours() > 13 ){
    return setGreeting('evening')
  }else if(date.getHours() >= 0 && date.getHours() < 12){
    return setGreeting('morning')
  }
  
}

}, [regStatus, paymentStatus, token])


const regInfoHandler = ()=>{
setRegInfo(!regInfo)
}

// setIsLoading(true)
if(token){ 
  return (
  
                
            <div className="lg:ml-64  h-screen grid font-openSans block">
              <div className=" hidden lg:flex justify-between px-6  items-center flex-flow-row lg:block h-20 shadow-md ">
                <div>
              <h2 className="text-2xl text-blue-base font-bold ">Hi, {displayName} </h2>
              <h4 className="text-sm font-thin">Good {greeting}</h4>
                </div>
              <img alt="" src={auth.currentUser ? auth.currentUser.photoURL : ''} className="h-12 w-12 border-1 rounded-full"/>
              </div>
              <section className="h-screen md:h-screen bg-white-01 mt-1 mx-auto w-full">
                <h3 className="lg:hidden mt-20 text-blue-base text-center md:pt-40">Good {greeting}, {displayName}</h3>

              <div className="mt-16 lg:mt-12 mx-auto lg:h-28 md:mt-20  mx-auto md:px-2 ">
                <section className="h-40">

            <div className="mx-auto lg:py-2 grid grid-rows-2 h-28 lg:h-36 w-72  lg:w-64 shadow-md rounded-t bg-blue-base text-white">

              <h2 className="py-4  lg:py-0 px-4 lg:text-2xl  font-bold">
                Registration
              </h2>
              <div className="lg:mt-6 px-4">
              <h4 className="">
                Status <i className={`fa-solid fa-circle ${regStatus === 'Not registered' ? 'text-orange-base' : 'text-green'} text-xs`}></i>
              </h4>
              <h5 className="text-sm  font-thin">
              {regStatus} 
              </h5>
             
              </div>
              
 </div>
              <article className="w-72 border-blue-base flex flex-col border-2 lg:w-64  px-2 mx-auto rounded-b">

              <div className={`info ${regInfo ? 'visible': 'hidden'} border-t-0 text-center px-0  h-12 border-blue-base border-2 w-full overflow-hidden transition-all ease-in duration-400`}>
                <p className={`text-xs mt-3 font-bold`}>Submit your details to get registered</p>
              </div>
              <div onClick={regInfoHandler} className="text-center cursor-pointer w-4 mx-auto ">
               <i className={`ri-arrow-${regInfo ? 'up':'down'}-s-line text-lg text-blue-base font-bold`}/> 
              </div>
              </article>
 </section>
                 </div>
             <div className="mx-auto flex flex-col text-center mt-20 lg:mt-40 lg:mt-0">
             <i className="fa-regular fa-lightbulb text-xl text-orange-base"/>
              <p className="text-sm lg:text-base">Please note that you are required to register first,<br/> after which you will be cleared by a representative <br/> before making payments.</p>
             </div>
             
</section>
           
            </div>
            
          )

          ;
          
        } else{
          return <Navigate to='/login'/>
        }
      }
        export default Dashboard;

