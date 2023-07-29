import React, {useReducer} from "react";
import { Link } from "react-router-dom";
import { ConsumerContext } from "./context";
import { useNavigate } from "react-router-dom";
import TranscertLogo from "./img/TranscertLogo.png";


const Navbar = () => {
  const initialState = {
    paymentMode: false,
    dashboardMode: true,
    registerMode: false
  }

  const reducerInputs  = (state, action)=>{
    if(action.type === 'dashboard'){
      return {...state, dashboardMode: true, paymentMode:false, registerMode: false}
    }else if(action.type === 'payment'){
      return {...state, paymentMode: true, registerMode:false, dashboardMode:false}
    }else if(action.type === 'register'){
      console.log('works')
      return {...state, registerMode: true, dashboardMode:false, paymentMode:false}
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
// console.log(state.registerMode)
console.log(state.paymentMode)
  const navigate = useNavigate();

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
            <section className="lg:h-screen h-10 font-openSans lg:flex lg:flex-col left-0 lg:fixed  bg-white lg:w-64 shadow-md">
              <div className="mx-auto text-center w-44 h-12">
                
                <Link to="/">
                  <img
                    src={TranscertLogo}
                    alt=""
                   
                    className="lg:mt-5 mt-2.5 box text-black mx-auto text-center w-28 h-6"
                  />
                </Link>
              
              </div>
                <div
                  className={` hidden lg:grid lg:grid-rows-4 gap-y-10 mt-10  sticky 
                  text-gray  text-start mx-auto lg:text-gray`}
                >
                  <div
                    className={`lg:block   text-gray`}
                  >
                    <Link to="/dashboard">
                      <button
                        type="button "
                        onClick={dashboardHandler}
                        className={`h-10 transition-all ease-in delay-400 lg:px-12 ${state.dashboardMode ? " bg-orange-base rounded-lg text-white  h-10" :null}`}
                      
                      >
                        Dashboard
                      </button>
                    </Link>
                  </div>
                  <div
                    className={``}
                    onClick={registerHandler}
                  >
                    <Link to="/registration">
                      <button
                        type="button"
                        className={`h-10 transition-all ease-in delay-400 lg:px-12 ${state.registerMode ? "bg-orange-base rounded-lg  text-white" :  null} `}
                       
                      >
                        Register
                      </button>
                    </Link>
                  </div>
                  <div onClick={paymentHandler} className={` transition-all ease-in delay-400 ${state.paymentMode ? "bg-orange-base  text-white text-center rounded-lg " : null}`}>
                    
                    <Link to="/payment">
                      <button
                      className={` `}
                      >
                        Payment
                      </button>
                    </Link>
                  </div>

                  <div className={``}>
                    <button
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
                {/* <div className={` lg:grid lg:grid-cols-2  lg:text-end lg:text-blue-base text-md text-center text-white`}>
                  <div>
                    <Link to="/login">
                      <button
                        className={``}
                        onClick={() => {
                          setShow(!show);
                          topScroll();
                        }}
                      >
                        Login
                      </button>
                    </Link>
                  </div>
                  <div
                    className={` `}
                  >
                    <Link to="/signUp">{

                      <button
                      className={`lg:bg-orange-base lg:w-28 lg:h-8 lg:rounded-md text-white text-center`}
                      onClick={() => {
                        logout("register");
                        topScroll();
                        setShow(!show);
                      }}
                      >
                        Sign Up Free
                      </button>
                      }
                    </Link>
                  </div>
                </div> */}
              
            </section>
          );
        }}
      </ConsumerContext>
    </>
  );
};
export default Navbar;
