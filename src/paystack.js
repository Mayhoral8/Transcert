import {React, useState, useEffect, useContext} from 'react'
import { PaystackButton } from 'react-paystack'
import styled from 'styled-components'
import { ContextCreate } from './context';
import { ref, onValue } from "firebase/database";
import { db } from "./firebase-config";
import { useNavigate } from 'react-router-dom';


const Paystack =()=> {
const navigate = useNavigate()
    const publicKey = "pk_test_c77789432ebc6458f202f41e8e30e0971371909d"
  // const amount = 1000000 // Remember, set in kobo!
  const [email, setEmail] = useState()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [amount, setAmount] = useState("")



 
const {token, regStatus, userId, setIsLoading, paymentFunc, paymentStatus, setPaymentStatus} = useContext(ContextCreate)

useEffect(()=>{
  if(userId){

    onValue(ref(db, `/users/${userId}`), (snapshot) => 
    {
      const responseData = snapshot.val();
      setEmail(()=>{
        return (responseData.email)
      })
      setName(()=>{
        return (responseData.name)
      })
      setPhone(()=>{
        return (responseData.phone)
      })
      setAmount(()=>{
        
        return responseData.amount
        
      })
      
    }, (error)=>{
      setIsLoading(false)
      console.log(error)
    }
    
    )
  }

    }, [userId])

    
    const componentProps = {
      email,
      amount,
      metadata: {
        name,
        phone,
      },
      publicKey,
      text: "Pay Now",
      onSuccess: ()=>{
        alert("Thanks for doing business with us! Come back soon!!")
        paymentFunc();
      },
      onClose: () => alert("Are you sure you want to cancel?"),
      onerror: ()=> console.log('error')
  }


  if(token){
  return (
    <>
     <div className="hidden lg:block h-20 shadow-md  lg:flex items-center px-4">
              <h2 className="text-2xl text-blue-base font-bold">Payment </h2>
              </div>
    <div className="checkout-form h-screen w-1/2
    ">
 
      <h1 className="text-center font-medium font-openSans mt-20 lg:text-base font-bold">{regStatus === '' ? 'You are about to be redirected': 'Please register before making payment'} <br/> {regStatus === '' ? 'to our payment portal': null}</h1>
  {regStatus === '' ?<PaystackButton onSuccess={()=> console.log('yes')} onClose={console.log('no')}  className={`block font-openSans bg-orange-base text-white w-48 mt-8 rounded-lg h-12 lg:h-12 mx-auto`} {...componentProps} /> : null}
</div>
      
    </>
)
} else{
  return navigate('/login')
}
}





export default Paystack