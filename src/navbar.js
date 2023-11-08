import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import { ContextCreate } from "./context";
import TranscertLogo from './img/TranscertLogo.png'



const Navbar = ()=>{
    const {token, topScroll, logout, setOverlay, overlay} = useContext(ContextCreate)
    const [show, setShow] = useState(false)
    const showHandler = ()=>{
        setShow(!show)
        console.log(overlay)
        setOverlay(!overlay)
    }
return(
    <>
    <div className="lg:px-16  lg:grid grid-cols-2 z-30 w-full shadow-md lg:grid bg-white fixed h-16 py-auto">
    <div className="px-4 w-full grid grid-cols-2">
      <div className="w-28">
        <Link to='/'>
        <img src={TranscertLogo} className=" lg:mt-5  mt-4  box text-black  w-full h-6"/>
        </Link>
      </div>
    <i onClick={showHandler} className={`w-4 ml-auto lg:hidden fa-solid text-lg text-blue-base ${show? 'fa-xmark': 'fa-bars'} mt-4 cursor-pointer`}/>
    </div>
    <div
            className={`h-0 lg:mt-0 lg:bg-white mt-5 justify-between navbar-project lg:visible sticky transition-all ease-in-out delay-400 ${
                show ? "h-0" : "lg:h-0"
              } bg-orange-base w-full  top-0 z-40 absolute block`}
              >
                <div className={`${
                    show ? "h-64" : "h-0"} lg:h-2 lg:py-2 transition-all delay-400 ease-in-out lg:text-base text-2xl flex flex-col lg:pt-0 px-5 lg:px-0 lg:h-0 space-y-5 bg-orange-base lg:bg-white lg:grid lg:grid-cols-2 lg:justify-around align-center lg:items-center lg:space-x-10 lg:w-full  lg:text-end lg:text-blue-base  text-center text-white`}>
                  <div>
                    <Link to="/login">
                      <button
                        className={`lg:block pt-4 block text-base ${
                          show || token ? "visible" : "hidden"
                        } `}
                        onClick={() => {
                          setShow(!show);
                          setOverlay(!overlay)
                          topScroll();
                        }}
                      >
                        Login
                      </button>
                    </Link>
                  </div>
                  <div
                  >
                    <Link to="/signUp">{

                      <button
                      className={`lg:block block text-base ${
                        show || token ? "visible" : "hidden"
                      } lg:bg-orange-base lg:w-28 lg:h-8 lg:rounded-md text-white`}
                      onClick={() => {
                        logout("register");
                        topScroll();
                        setShow(!show);
                        setOverlay(!overlay)
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