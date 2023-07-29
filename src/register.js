import { React, useRef } from "react";
import { ConsumerContext } from "./context";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TranscertLogo from './img/TranscertLogo.png'
import Footer from "./footer";

const Register = () => {
  return (
    <>
      <ConsumerContext>
        {(value) => {
          const {
            setPassword,
            setEmail,
            isLoading,
            setName,
            registerUser,
            createData,
            currUser,
            setErrorMsg,
            errorMsg,
            setRegPhoneNumber,
            form,
            sendEmail,
            token
          } = value;

          if(!token){
          return (
            <>
             <div className="mt-24">

<img src={TranscertLogo} alt="" className="w-40 mt-5 mx-auto"/>
</div>
              <div className="mt-12 h-screen">
                <h1 className="font-openSans font-bold text-center text-md">Create An Account</h1>
                <h4 className="text-center text-red-500 font-bold h-6">
                  {errorMsg}
                </h4>

                <span className="h-6 text-center mx-auto">
                  {isLoading ? (
                    <button type="button" className="mx-auto block" disabled>
                      <i className="fas fa-spinner animate-spin" />
                    </button>
                  ) : null}
                </span>
                <div className="">
                  <form  onSubmit={sendEmail}>
                    <div className=" font-openSans mx-auto w-72 mt-6 grid grid-cols-2 h-52 ">
                      <div className="grid grid-cols-1 text-sm text-gray-900">
                        <input
                          className="focus:outline-none border-b mx-auto h-10 text-gray-900 w-72 border-gray-300"
                          type="text"
                          placeholder="Name"
                          name="user_name"
                          onChange={(e) => {
                            setName(e.target.value);
                            setErrorMsg("");
                          }}
                        />

                        <input
                          className="focus:outline-none border-b mx-auto h-8 text-gray-900 w-72  border-gray-300"
                          type="email"
                          placeholder="Email"
                          name="user_email"
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setErrorMsg("");
                          }}
                        />

                        <input
                          className="focus:outline-none box border-b h-8 w-72 text-gray-900 border-gray-300"
                          type="password"
                          placeholder="Password"
                          name="pass_word"
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setErrorMsg("");
                          }}
                        />
                        <input
                          className="focus:outline-none box border-b h-8 text-gray-900 w-72 border-gray-300"
                          type="text"
                          placeholder="Phone Number"
                          name="phone_number"
                          onChange={(e) => {
                            setRegPhoneNumber(e.target.value);
                            setErrorMsg("");
                          }}
                        />
                      </div>
                    </div>

                    <div className=" font-openSans mx-auto flex flex-row justify-between w-72 bg-orange-base rounded-lg h-8 mt-8 text-white">
                      <button
                        className="box my-auto w-full mx-auto"
                        onClick={(e) => {
                          registerUser(e);
                        }}
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
                <div className=" font-openSans flex flex-row text-center justify-center w-64 mx-auto pb-2 mt-4 text-sm">
              <h6 className="w-44">Already have an account?</h6> 
              <Link to ='/login'>
                <p className="font-openSans text-sm text-orange-base ml-2 w-18 block mx-auto text-center">
                  Login
                </p>
              </Link>
            
              </div>
              </div>
              
              
              <Footer/>
            </>
          )
          } else {
            return  <Navigate to = '/main'  />
          }
        }}
      </ConsumerContext>
    </>
  );
};
export default Register;
