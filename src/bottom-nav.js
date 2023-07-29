import React from "react";
import { Link } from "react-router-dom";

const BottomNav = ()=>{
    return(
        <>
        <div
                  className={`lg:hidden bottom-0 z-20 fixed
                  text-white w-full h-20 block pt-6 shadow-md grid grid-cols-3 text-center bg-orange-base`}
                >
                  <div
                    className={`lg:block`}
                  >
                    <Link to="/dashboard">
                      <button
                        type="button"
                        className={` `}
                      
                      >
                        Dashboard
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
                        Register
                      </button>
                    </Link>
                  </div>
                  <div className={``}>
                    <Link to="/payment">
                      <button
                       
                      >
                        Payment
                      </button>
                    </Link>
                  </div>

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