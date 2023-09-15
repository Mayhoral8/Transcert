import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import { ContextCreate } from "./context";
import TranscertLogo from './img/TranscertLogo.png'



const Navbar = ()=>{
    const {token, topScroll, logout} = useContext(ContextCreate)
    const [show, setShow] = useState(false)
    const showHandler = ()=>{
        setShow(!show)
    }
return(
    <>
    <div className="lg:px-16  lg:grid grid-cols-2 z-10 w-full shadow-md lg:grid bg-white fixed h-16 py-auto">
    <div className="px-4 grid grid-cols-2">
      <div className="w-28">
        <Link to='/'>
        <img src={TranscertLogo} className=" lg:mt-5  mt-4  box text-black  w-full h-6"/>
        </Link>
      </div>
    <i onClick={showHandler} className={`w-4 ml-auto lg:hidden fa-solid text-lg text-blue-base ${show? 'fa-xmark': 'fa-bars'} mt-4 cursor-pointer`}/>
    </div>
    <div
            className={`h-0 lg:mt-4 lg:bg-white mt-4  lg:grid navbar-project lg:visible sticky transition-all ease-in delay-400 ${
                true ? "h-0" : "lg:h-0"
              } bg-orange-base w-full  top-0 z-40 absolute block`}
              >
                <div className={`${
                    !show ? "hidden" : "block"} h-screen lg:h-2 py-60 lg:py-2 lg:text-base text-2xl grid grid-rows-2 lg:h-0 bg-orange-base lg:bg-white lg:grid lg:grid-cols-2  lg:text-end lg:text-blue-base  text-center text-white`}>
                  <div>
                    <Link to="/login">
                      <button
                        className={`block text-center my-auto items-end mx-auto ${
                          token ? "hidden" : "visible"
                        } `}
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
                    className={`${
                      token ? "hidden" : "visible"
                    } `}
                  >
                    <Link to="/signUp">{

                      <button
                      className={`${
                        token ? "hidden" : "visible"
                      } lg:bg-orange-base lg:w-28 lg:h-8 lg:rounded-md text-white text-center`}
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
                </div>
              </div>
    </div>

    </>
)
}
export default Navbar