import { useState, useContext } from "react";
import { ContextCreate } from "context";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "./navbar";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const passwordShowHandler = () => {
    setShowPassword(!showPassword);
  };
  const { registration, auth, modal } = useContext(ContextCreate);
  let e: React.ChangeEvent<HTMLInputElement>;

  const { setPassword, setEmail, setName, registerUser, token } = auth;
  const { setRegPhoneNumber } = registration;
  const { setErrorMsg, errorMsg } = modal;
  const errMsgHandler = () => {
    setErrorMsg("");
  };

  if (!token) {
    return (
      <>
        <section className="h-screen">
          <Navbar />

          <div className="">
            <Link to="/">
              <img
                src={require("./img/TranscertLogo.png")}
                alt=""
                className="w-40 pt-20 mx-auto"
              />
            </Link>

            <h1 className="font-openSans text-gray font-bold text-center text-md mt-10">
              Create An Account
            </h1>
            <h4 className="text-center text-red font-bold h-6">{errorMsg}</h4>
            <div className="">
              <div>
                <div className=" font-openSans mx-auto w-72 mt-4 grid grid-cols-2 h-52 ">
                  <div className="grid grid-cols-1 text-sm text-gray-900">
                    <input
                      className="focus:outline-none border-b mx-auto h-10  w-72 border-gray-300"
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
                      className="focus:outline-none box border-b h-8 text-gray-900 w-72 border-gray-300"
                      type="text"
                      placeholder="Phone Number"
                      name="phone_number"
                      onChange={(e) => {
                        setRegPhoneNumber(e.target.value);
                        setErrorMsg("");
                      }}
                    />
                    <div className="grid grid-cols-2 w-72">
                      <input
                        className="focus:outline-none box border-b h-8 w-72 text-gray-900 border-gray-300"
                        type={!showPassword ? "password" : "text"}
                        placeholder="Password"
                        name="pass_word"
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setErrorMsg("");
                        }}
                      />
                      <span className="w-6 text-end ml-auto mt-2">
                        {showPassword ? (
                          <i
                            className="fa-solid fa-eye-slash cursor-pointer"
                            onClick={passwordShowHandler}
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-eye cursor-pointer"
                            onClick={passwordShowHandler}
                          ></i>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className=" font-openSans mx-auto flex flex-row justify-between w-72 bg-orange-base rounded-lg h-8 mt-8 text-white">
                  <button
                    className="box my-auto w-full mx-auto"
                    onClick={() => registerUser(e)}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
            <div className=" font-openSans flex flex-row text-center justify-center w-64 mx-auto pb-2 mt-4 text-sm">
              <h6 className="w-44">Already have an account?</h6>
              <Link to="/login">
                <p
                  onClick={errMsgHandler}
                  className="font-openSans text-sm text-orange-base ml-2 w-18 block mx-auto text-center"
                >
                  Login
                </p>
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return <Navigate to="/main" />;
  }
};
export default Register;
