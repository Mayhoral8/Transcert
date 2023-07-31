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

useEffect(()=>{
  setIsLoading(true)
  console.log(auth.currentUser)
  if(userId){
    onValue(ref(db, `/users/${userId}`), (snapshot) => 
    {
      const responseData = snapshot.val();
      setDisplayName(auth.currentUser.displayName)
      setRegStatus(responseData.regStatus === '' ? 'Not registered': 'Registered')
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
            <div className=" h-screen grid font-openSans block">
              <div className="hidden lg:flex justify-between px-4  items-center flex-flow-row lg:block h-20 shadow-md ">
              <h2 className="text-2xl text-blue-base font-bold">Hi, {displayName} </h2>
              <img alt="" src={auth.currentUser.photoURL} className="h-12 w-12 border-1 rounded-full"/>
              </div>
              <div className="lg:grid lg:grid-cols-2 px-10 mt-4 gap-x-10 lg:px-20 lg:mt-10">
            <div className=" h-56 w-72 lg:w-96 shadow-md rounded-md bg-blue-base text-white">

              <h2 className="mt-4 py-2 lg:py-0 px-4 lg:text-2xl  font-bold">
                Registration
              </h2>
              <div className="mt-6 px-4">
              <h4 className="">
                Status 
              </h4>
              <h5 className="text-sm font-thin">
              {regStatus}
              </h5>
              <h4 className="mt-4">
                Description
              </h4>
              <p className="text-sm font-thin">
                Register by supplying a number of details such as your full name, faculty, e.t.c
              </p>
              </div>
              {/* {regStatus === 'undefined'?
              <Link to = '/registration'>
              <button
                    className="block font-openSans bg-orange-base text-white w-48 mt-2 rounded-lg h-12 lg:h-12 mx-auto"
                    
                    >
                    Upload Now
                  </button> </Link>:  null } */}
                      </div>
                      
                      <div className="h-56 shadow-md rounded-md bg-blue-base text-white">

<h2 className="mt-4 px-4 lg:text-2xl  font-bold">
  Payment
</h2>
<div className="mt-6 px-4">
<h4 className="">
  Status 
</h4>
<h5 className="text-sm font-thin">
{paymentStatus}
</h5>
<h4 className="mt-4">
  Description
</h4>
<p className="text-sm font-thin">
  Register by supplying a number of details such as your full name, faculty, e.t.c
</p>
</div>
{paymentStatus === 'undefined'?
<Link to = '/registration'>
<button
      className="block font-openSans bg-orange-base text-white w-48 mt-2 rounded-lg h-12 lg:h-12 mx-auto"
      
      >
      Upload Now
    </button> </Link>:  null }
        </div>
                      </div>
             
             <div className="mx-auto flex flex-col text-center">
             <i className="fa-regular fa-lightbulb text-xl text-orange-base"/>
              <p>Please note that you are required to register first, after which you will be cleared by a representative before making payments.</p>
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

