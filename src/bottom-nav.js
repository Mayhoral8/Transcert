import React, {useReducer, useContext} from "react";
import { Link } from "react-router-dom";
import dashboard from './img/dashboard.png'
import dashboardBlack from './img/dashboard-black.png'
import register from './img/register.png'
import registerBlack from './img/register-black.png'
import payment from './img/payment2.png'
import paymentBlack from './img/payment-black.png'
import { ContextCreate } from "./context";

const BottomNav = ()=>{
  const initialState = {
    paymentMode: false,
    dashboardMode: true,
    registerMode: false,
    profileMode: false
  }
  const reducerInputs  = (state, action)=>{
    if(action.type === 'dashboard'){
      return {...state, dashboardMode: true, paymentMode:false, registerMode: false, profileMode:false}
    }else if(action.type === 'payment'){
      return {...state, paymentMode: true, registerMode:false, dashboardMode:false, profileMode:false}
    }else if(action.type === 'register'){
      console.log('works')
      return {...state, registerMode: true, dashboardMode:false, paymentMode:false, profileMode:false}
    }else if(action.type === 'profile'){
      console.log('works')
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
const { topScroll }  = useContext(ContextCreate)

    return(
        <>
        <div
                  className={`lg:hidden transition-all ease-in delay-400  bottom-0 z-20 fixed items-center align-middle
                  text-white w-full h-16 block gap-x-2 bg-white shadow-md border grid grid-cols-4 px-2 text-center`}
                >
                  <div
                    onClick={dashboardHandler} className={`text-gray rounded-md ${state.dashboardMode ? 'bg-orange-base text-white': null }`}
                  >
                    <Link to="/dashboard">
                    <button
                        type="button"
                        className={`py-1`}
                       
                      >
                    <img src={state.dashboardMode ? dashboard : dashboardBlack} className="w-4 text-center mx-auto"/>
                    <h4 className="text-sm">Dashboard</h4>
                    </button>
                    </Link>
                  </div>
                  <div
                    onClick={registerHandler} className={`text-gray rounded-md ${state.registerMode ? 'bg-orange-base text-white': null } `}
                  >
                    <Link to="/registration">
                      <button
                        type="button"
                        className={`py-1`}
                       
                      >
           <img src={state.registerMode? register : registerBlack} className="w-4 mx-auto"/>
           <h4>Register</h4>

                      </button>
                    </Link>
                  </div>
                  <div onClick={paymentHandler} className={`text-gray rounded-md ${state.paymentMode ? 'bg-orange-base text-white': null }`}>
                    <Link to="/payment">
                      <button
                       className="py-1"
                      >
            <img src={state.paymentMode ? payment : paymentBlack} className="w-4 mx-auto"/>
            <h4>Payment</h4>

                      </button>
                    </Link>
                  </div>

                  <div onClick={profileHandler} className={`text-gray rounded-md ${state.profileMode ? 'bg-orange-base text-white': null }`}>
                    <Link to="/profile">
                      <button
                       className=""
                      >
            <i className="w-4 mx-auto fas fa-user"/>
            <h4 className="mb-2 ">Profile</h4>

                      </button>
                    </Link>
                    </div>
                  </div>
        </>
    )
}

export default BottomNav