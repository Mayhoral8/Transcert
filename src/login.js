import { React, useState, useEffect, useContext } from "react";
import { ConsumerContext } from "./context";
import { Link, useNavigate } from "react-router-dom";
import TranscertLogo from './img/TranscertLogo.png'
import { ContextCreate } from "./context";


const Login = () => {
  const[showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const passwordShowHandler = ()=>{
    setShowPassword(!showPassword)
  }

  const { setPassword,
    setEmail,
    setErrorMsg,
    loginHandler,
    errorMsg,
    isLoading,
    token,
    resetPword} = useContext(ContextCreate)

  useEffect(()=>{
    if(token){
      return navigate('/dashboard')
    }
  })
  
  const resetErrMsg = ()=>{
    setErrorMsg('')
  }
   
  return (
  
            <>
            <div className="mt-24 font-openSans">
                <img src={TranscertLogo} alt="" className="w-40 mt-5 mx-auto"/>
            </div>
            <h1 className="font-openSans text-center text-gray text-md mt-10 font-bold">Welcome Back!</h1>
              <div className="mt-8 h-screen">
              <h2 className="text-center text-red font-bold">{errorMsg}</h2>       
                    <form onSubmit={loginHandler}>
                <div className=" mx-auto w-72 mt-10 h-44 font-openSans">
                  <div className="grid grid-rows-2  gap-y-10 text-sm">

                    <input
                      className={`focus:outline-none border-b mx-auto h-10 text-gray w-72 ${errorMsg === 'Invalid Email'? 'border-red border-2': null}`}
                      type="email"
                      placeholder="Email"
                      disabled={isLoading? true:false}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                     <div className="grid grid-cols-2">

                    <input
                      className={`focus:outline-none border-b box h-8 w-72 text-gray ${errorMsg === 'Wrong Password'? 'border-red border-2': null}`}
                      type={!showPassword? 'password': 'text'}
                      placeholder="Password"
                      disabled={isLoading? true:false}
                      onChange ={(e)=> {setPassword(e.target.value); }}
                      />
                      <span className="w-4 text-end ml-auto mt-2">{showPassword? <i className="fa-solid fa-eye-slash cursor-pointer" onClick={passwordShowHandler}></i> : <i className="fa-solid fa-eye cursor-pointer" onClick={passwordShowHandler}></i>}</span>
                      </div>
                      
                  </div>
                </div>
                
                  <button type="submit" className="px-auto font-openSans flex items-center mx-auto mt-5 px-32 w-72 bg-orange-base rounded-md h-8 my-auto text-white" onClick={loginHandler} disabled={isLoading? true:false}>{isLoading ?<i className="fas fa-spinner animate-spin"/>  : 'Login'}</button>
                  </form>
                
              {errorMsg === 'Wrong Password'?  
              (<div className="grid grid-cols-2 gap-x-2 text-sm mt-4"><h2 className="text-right text-red-400  " >Forgot Password?</h2> <span className="cursor-pointer text-orange-base" onClick={()=> resetPword()}>Click here to reset it</span></div>): null }
              <div className=" flex font-openSans flex-row text-center justify-center w-64 mx-auto pb-2 mt-4 text-sm">
              <h6 className="w-40">Don't have an account?</h6> 
              <Link to ='/signup'>
                <p className="text-sm text-orange-base w-18 block mx-auto text-center" onClick={resetErrMsg}>
                  Sign Up
                </p>
              </Link>
            
              </div>
              <div>
              </div>
       
    </div>
   
            </>
          );
      
    
  
};
export default Login;
