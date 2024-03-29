import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContextCreate } from "./context";
import Navbar from "./navbar";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const passwordShowHandler = () => {
    setShowPassword(!showPassword);
  };
  const { auth, modal, ui } = useContext(ContextCreate);

  const { setPassword, setEmail, loginHandler, token, forgotPwd, resetPword } =
    auth;
  const { isLoading } = ui;

  const { setErrorMsg, errorMsg } = modal;

  useEffect(() => {
    if (token) {
      return navigate("/dashboard");
    }
  });

  const resetErrMsg = () => {
    setErrorMsg("");
  };

  let e: React.ChangeEvent<HTMLInputElement>;

  return (
    <section className="h-screen">
      <Navbar />
      <div className="pt-20 font-openSans">
        <Link to="/">
          <img
            src={require("./img/TranscertLogo.png")}
            alt=""
            className="w-40  mx-auto"
          />
        </Link>
      </div>
      <h1 className="font-openSans text-center text-gray text-md mt-10 font-bold">
        Welcome Back!
      </h1>
      <div className="mt-8">
        <p className="text-center text-red">{errorMsg}</p>
        <form>
          <div className=" mx-auto w-72 mt-10 h-44 font-openSans">
            <div className="grid grid-rows-2  gap-y-10 text-sm">
              <input
                className={`focus:outline-none border-b mx-auto h-10 text-gray w-72 ${
                  errorMsg === "Invalid Email" ? "border-red border-2" : null
                }`}
                type="email"
                placeholder="Email"
                disabled={isLoading ? true : false}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="grid grid-cols-2">
                <input
                  className={`focus:outline-none border-b box h-8 w-72 text-gray ${
                    errorMsg === "Wrong Password" ? "border-red border-2" : null
                  }`}
                  type={!showPassword ? "password" : "text"}
                  placeholder="Password"
                  disabled={isLoading ? true : false}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <span className="w-4 text-end ml-auto mt-2">
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

          <button
            onClick={() => loginHandler(e)}
            className="px-auto font-openSans flex items-center mx-auto mt-5 px-32 w-72 bg-orange-base rounded-md h-8 my-auto text-white"
            disabled={isLoading ? true : false}
          >
            {isLoading ? (
              <i className="fas fa-spinner animate-spin" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        {errorMsg === "Wrong Password" && forgotPwd === 0 ? (
          <div className="grid grid-cols-2 gap-x-2 text-sm mt-4">
            <h2 className="text-right text-red-400">Forgot Password?</h2>{" "}
            <span
              className="cursor-pointer text-orange-base"
              onClick={() => resetPword()}
            >
              Click here to reset it
            </span>
          </div>
        ) : null}
        <div className=" flex font-openSans flex-row text-center justify-center w-64 mx-auto pb-2 mt-4 text-sm">
          <h6 className="w-40">Don't have an account?</h6>
          <Link to="/signup">
            <p
              className="text-sm text-orange-base w-18 block mx-auto text-center"
              onClick={resetErrMsg}
            >
              Sign Up
            </p>
          </Link>
        </div>
        <div></div>
      </div>
    </section>
  );
};
export default Login;
