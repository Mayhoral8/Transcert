import React from "react";
import { Link } from "react-router-dom";
import dashboard from './img/dashboard.png'
import register from './img/register.png'
import payment from './img/payment2.png'

const BottomNav = ()=>{
    return(
        <>
        <div
                  className={`lg:hidden bottom-0 z-20 fixed
                  text-white w-full h-20 block pt-6 shadow-md grid grid-cols-4 text-center bg-orange-base`}
                >
                  <div
                    className={``}
                  >
                    <Link to="/dashboard">
                    <button
                        type="button"
                        className={` `}
                       
                      >
                    <img src={dashboard} className="w-8"/>
                    </button>
                    </Link>
                  </div>
                  <div
                    className={`lg:block`}
                  >
                    <Link to="/registration">
                      <button
                        type="button"
                        className={` `}
                       
                      >
           <img src={register} className="w-8"/>

                      </button>
                    </Link>
                  </div>
                  <div className={``}>
                    <Link to="/payment">
                      <button
                       
                      >
            <img src={payment} className="w-8"/>

                      </button>
                    </Link>
                  </div>
                  <Link to="/profile">
                  <div  className={`h-10  px-3  transition-all mx-auto  items-center ease-in delay-400`}>
                  <i className=" text-2xl fa-regular fa-user"/>
                  </div>

                    </Link>

                  {/* <div className={``}>
                    <button
                      type="button"
                      
                      onClick={() => {
                        logout();
                        setShow(!show);
                      }}
                    >
                      Sign Out
                    </button>
                  </div> */}
                </div>
        </>
    )
}

export default BottomNav