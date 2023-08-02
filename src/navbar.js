import React, {useReducer} from "react";
import { Link } from "react-router-dom";
import { ConsumerContext } from "./context";
import { useNavigate } from "react-router-dom";
import TranscertLogo from "./img/TranscertLogo.png";
import dashboard from './img/dashboard.png'
import dashboardBlack from './img/dashboard-black.png'
import register from './img/register.png'
import registerBlack from './img/register-black.png'
import payment from './img/payment2.png'
import paymentBlack from './img/payment-black.png'
import { getAuth } from "firebase/auth";



const Navbar = () => {
  const auth = getAuth()
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
  return (
    <>
      <ConsumerContext>
        {(value) => {
          const {
            logout,
            currUser,
            show,
            setShow,
          } = value;

          return (
            <section className="lg:h-screen h-10 font-openSans left-0 lg:fixed  bg-white lg:w-64 shadow-md">
              <div className="lg:mx-auto px-2 lg:px-0 text-center lg:w-44 lg:h-12 h-full lg:block grid grid-cols-3">
                
                <Link to="/">
                  <img
                    src={TranscertLogo}
                    alt=""
                   
                    className="lg:mt-5 mt-2.5  box text-black  w-28 h-6"
                  />
                </Link>
                <img alt="" src={auth.currentUser ? auth.currentUser.photoURL : ''} className="lg:hidden mx-auto mt-1 h-8 w-8 border-1 border-blue-base rounded-full"/>
                <div className={`lg:hidden flex flex-row text-sm items-center mx-auto text-center`}>
                  <i  onClick={() => {
                        logout();
                        setShow(!show);
                      }} className="fa-solid text-sm fa-arrow-right-from-bracket w-6"></i>
                    <button
                    className=" w-full"
                      type="button"
                      
                      onClick={() => {
                        logout();
                        setShow(!show);
                      }}
                    >
                      Sign Out
                    </button>
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
                  <img src={state.dashboardMode ? dashboard : dashboardBlack} className="w-6"/>
                      
                      <button
                        type="button"
                        onClick={dashboardHandler}
                        className={`w-1/2 block col-span-2 `}
                      
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
                    <Link to="/payment">
                  <div onClick={paymentHandler} className={`h-10 grid grid-cols-3 px-3 justify-between transition-all  w-36 mx-auto  items-center ease-in delay-400  ${state.paymentMode ? "rounded-lg text-white  bg-orange-base" :  null}`}>
                  <img src={state.paymentMode ? payment: paymentBlack} className="w-6"/>
                      <button
                      className={` `}
                      >
                        Payment
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
                  <div className={`hidden lg:block px-3 items-center mx-auto grid grid-cols-3 w-36 text-center mt-20`}>
                  <i className="fa-solid fa-arrow-right-from-bracket w-6"></i>
                    <button
                    className="col-span-2 w-full"
                      type="button"
                      
                      onClick={() => {
                        logout();
                        setShow(!show);
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                  </section>
              
              
          );
        }}
      </ConsumerContext>
    </>
  );
};
export default Navbar;
