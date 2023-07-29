import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "./firebase-config";
import { ref, onValue } from "firebase/database";
import { ContextCreate } from "./context";
import Modal from "./modal";

import Footer from "./footer";
import { getAuth } from "firebase/auth";

const Dashboard = () => {
  const {token, openModal, userId, setIsLoading, regStatus, setRegStatus, paymentStatus, setPaymentStatus} = useContext(ContextCreate)
  const auth = getAuth()
  const navigate = useNavigate();
const [displayName, setDisplayName] = useState('')
// setIsLoading(true)
useEffect(()=>{
  setIsLoading(true)
  if(userId){
    onValue(ref(db, `/users/${userId}`), (snapshot) => 
    {
      const responseData = snapshot.val();
      setDisplayName(auth.currentUser.displayName)
      setRegStatus(responseData.regStatus === '' ? 'Not Uploaded': 'Uploaded')
      setPaymentStatus(responseData.paymentStatus === '' ? 'Not Paid': 'Paid')
     
  }, (error)=>{
    setIsLoading(false)
    console.log(error)
  }

  )
  setIsLoading(false)
}else{
  navigate('/login')
}
}, [regStatus, paymentStatus, userId])

  if(userId){
  return (
    <>
                 { openModal ? <Modal/> : null}
            <div className=" h-screen font-openSans block">
              <div className="hidden lg:flex justify-between px-4 align-middle items-center flex-flow-row lg:block h-20 shadow-md ">
              <h2 className="text-2xl text-blue-base font-bold">Hi, {displayName} </h2>
              <img alt="" src="" className="h-12 w-12 border-1 rounded-full"/>
              </div>
              <div className="lg:grid lg:grid-cols-2 ">

              <h2 className=" lg:text-1xl  font-bold">
                Document Upload Status: {regStatus}
              </h2>
              {regStatus === 'undefined'?
              <Link to = '/registration'>
              <button
                    className="block font-openSans bg-orange-base text-white w-48 mt-2 rounded-lg h-12 lg:h-12 mx-auto"
                    
                    >
                    Upload Now
                  </button> </Link>:  null }
                      
              
              <h2 className=" text-center lg:text-1xl font-bold">
                Payment Status: {paymentStatus }
              </h2>
              {paymentStatus === 'undefined'?
              <Link to = '/payment'>
              <button
                    className="block font-openSans bg-orange-base text-white w-48 mt-2 rounded-lg h-12 lg:h-12 mx-auto"
                    
                    >
                    Pay Now
                  </button> </Link>:  null }
                      
                    </div>
             
            </div>
             
           
            </>
          )
        } 
else{
  return navigate('/login')
}
;
}
export default Dashboard;

