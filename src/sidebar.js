import React, {useReducer, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import TranscertLogo from "./img/TranscertLogo.png";
import dashboard from './img/dashboard.png'
import dashboardBlack from './img/dashboard-black.png'
import register from './img/register.png'
import registerBlack from './img/register-black.png'
import { MdDashboard } from "react-icons/md";

import { getAuth } from "firebase/auth";
import Modal from "./modal";
import { ContextCreate } from "./context";


const Sidebar = () => {

  const {
    location,
    show,
    setShow,
   setModalMsg,
    setOpenModal,
  } = useContext(ContextCreate)
  const auth = getAuth()
  const initialState = {
    paymentMode: false,
    dashboardMode: true,
    registerMode: false,
    profileMode: false
  }

const modalMsgHandler = ()=>{
  setModalMsg('Are you sure you want to sign out?')
}

  const reducerInputs  = (state, action)=>{
    if(action.type === 'dashboard'){
      return {...state, dashboardMode: true, paymentMode:false, registerMode: false, profileMode:false}
    }else if(action.type === 'register'){
     
      return {...state, registerMode: true, dashboardMode:false, paymentMode:false, profileMode:false}
    }else if(action.type === 'profile'){
      
      return {...state, profileMode: true, dashboardMode:false, paymentMode:false, registerMode:false}
    }

  }


  const [state, dispatch] = useReducer(reducerInputs, initialState)
  const dashboardHandler = ()=>{
    return dispatch({type: 'dashboard'})
  }

  
  const paymentHandler = ()=>{
    return dispatch({type: 'payment'})
  }

  
  const registerHandler = ()=>{
     dispatch({type: 'register'})
  }
const profileHandler = ()=>{
  dispatch({type: 'profile'})
}
useEffect(()=>{
  if(location.pathname === '/dashboard'){
      return dispatch({type: 'dashboard'})
  }else if(location.pathname === '/registration'){
       return dispatch({type: 'register'})
  }else if(location.pathname === '/payment'){
      return dispatch({type: 'payment'})
  }else if(location.pathname=== '/profile'){
      return dispatch({type: 'profile'})
  }
  }, [location.pathname])
  return (
    <>

            <section className="lg:h-screen md:h-32  fixed w-full h-14 font-openSans left-0 lg:fixed  bg-white lg:w-64 shadow-md">
              <div className="lg:mx-auto px-4 lg:px-0 text-center lg:w-44 lg:h-12 h-full lg:block grid grid-cols-2">
                
                <Link to="/">
                  <img
                    src={TranscertLogo}
                    alt=""
                   
                    className="lg:mt-5 lg:mx-auto mt-4  box text-black  w-28 h-6"
                  />
                </Link>
                <div className="flex flex-row">

                <img alt="" src={auth.currentUser ? auth.currentUser.photoURL : ''} className="lg:hidden ml-20 mt-1 h-8 w-8 mt-3 border-2 border-blue-base rounded-full"/>

                <div className={`lg:hidden flex flex-row  items-center ml-auto text-end`}>
                  <i  onClick={() => {
                    setOpenModal(true)
                        modalMsgHandler()
                  }} className="fa-solid text-lg fa-arrow-right-from-bracket w-6"></i>
                  
                  </div>
                  </div>
              
              </div>

                <div
                  className={` hidden lg:grid lg:grid-rows-4 gap-y-10 mt-10  sticky 
                  text-gray  text-start mx-auto lg:text-gray`}
                >
                  <Link to="/dashboard">
                  <div
                    className={`h-10 grid grid-cols-3 px-3 justify-between transition-all  w-36 mx-auto  items-center ease-in delay-400  ${state.dashboardMode ? "bg-orange-base rounded-lg  text-white" :  null}`}
                  >
                  <MdDashboard/>
                      
                      <button
                        type="button"
                        onClick={dashboardHandler}
                        className={`w-1/2 block col-span-2 ${state.dashboardMode ? 'text-white': 'text-gray-900'}`}
                      
                      >
                        Dashboard
                      </button>
                  </div>
                    </Link>
                  <Link to="/registration">
                  <div
                    className={`h-10 grid grid-cols-3 px-3 justify-between transition-all  w-36 mx-auto  items-center ease-in delay-400  ${state.registerMode ? "rounded-lg text-white  bg-orange-base" :  null}`}
                    onClick={registerHandler}
                  >
                  <img src={state.registerMode ? register: registerBlack} className="w-6"/>
                      <button
                        type="button"
                        className={` w-1/2 block col-span-2 `}
                       
                      >
                        Register
                      </button>
                  </div>
                    </Link>
                   

                    <Link to="/profile">
                  <div onClick={profileHandler} className={`h-10 grid grid-cols-3 px-3 justify-between transition-all  w-36 mx-auto  items-center ease-in delay-400  ${state.profileMode ? "rounded-lg text-white  bg-orange-base" :  null}`}>
                  {state.profileMode ? <i className="w-6 fa-regular fa-user"/>: <i className="w-6 text-black fa-regular fa-user"></i>}
                      <button
                      className={` `}
                      >
                        Profile
                      </button>
                  </div>

                    </Link>
                </div>
                  <div className={`hidden lg:block  mx-auto grid grid-cols-2 w-32 gap-x-6 mt-20`}>
                  <i className="fa-solid fa-arrow-right-from-bracket w-6 text-start"/>
                    <button
                    className=""
                      type="button"
                      
                      onClick={() => {
                        setOpenModal(true)
                        modalMsgHandler()
                        setShow(!show);
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                  </section>
              
              
        
      
    </>
  );
};
export default Sidebar;
