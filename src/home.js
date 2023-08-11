import React from "react";
import { useEffect, useContext } from "react";
import UNIZIK from "./img/UNIZIK2.png";
import Payment1 from "./img/Payment1.jpg";
import documentUpload from './img/documentUpload.png';
import Register1 from "./img/Register1.jpg";
import { ContextCreate } from "./context";
import Aos from "aos";
import "aos/dist/aos.css";
import TranscertLogo from './img/TranscertLogo.png'
import { Link, Navigate } from "react-router-dom";
import Typewriter from "typewriter-effect";



const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  
  
  const {topScroll, homeSignUpBtn, token } = useContext(ContextCreate)
   
if(!token){
  return (
          <>
            <section className="lg:grid lg:grid-cols-2 lg:px-24 lg:justify-between lg:mt-12 py-8 w-full lg:w-full lg:h-96 bg-blue-base text-gray mx-auto">
              <div
                className="lg:mt-6 mt-24 lg:order-last mx-auto lg:mx-64 lg:h-72 w-64 h-56"
                data-aos="fade-top"
                data-aos-easing="ease-out"
                data-aos-duration="1200"
              >
                <img src={UNIZIK} alt="" className="mt-4" />
              </div>

              <div
                className="lg:mt-4 lg:w-96  flex flex-col"
              >
                <div className=" lg:text-left text-white text-center font-openSans grid:grid-rows-3 capitalize lg:text-2xl text-2xl font-bold text-white mt-12  ">
                  <h3 className="mx-auto">Get your</h3>
                <div className="text-orange-base mx-auto  w-auto"> 
                <Typewriter
  options={{
    strings: ['Transcript', 'English Proficiency Letter', 'Certificate'],
    autoStart: true,
    loop: true,
  }}
/> </div>
                
                  <h3>From Unizik in</h3> 
                  <h3>7-14 days</h3>
                </div>
                
                  <button
                    className="block font-openSans bg-orange-base text-white w-48 mt-8 rounded-lg h-12 lg:h-12 mx-auto lg:mx-0"
                    onClick={() => {topScroll(); homeSignUpBtn()}}
                  >
                    Create A Free Account
                  </button>
                
              </div>
            </section>

              <h2 className="mt-16 text-center lg:text-2xl font-openSans font-bold">GET STARTED IN {true ? <span className="text-orange-base">3 EASY </span>: null} STEPS</h2>
            <section className="lg:px-10 mt-20 grid grid-rows-3">

              <article className="grid lg:grid-cols-2 lg:h-32">
                <div
                  className="mx-auto lg:order-last lg:align-center"
                  data-aos="fade-left"
                  data-aos-easing="ease-out"
                  data-aos-duration="1200"
                >
                  <img src={Register1} alt="" className="w-72 h-86 mx-auto" />
                </div>
                <div
                  className="text-center  max-w-xs mx-auto"
                  data-aos="fade-right"
                  data-aos-easing="ease-out"
                  data-aos-duration="1200 "
                >
                  <h2 className="text-center block font-bold font-openSans">REGISTER</h2>
                  <p className="mt-2 text-gray font-openSans font-thin text-sm ">
                    It's quick, easy, and secure. Rest assured that your details
                    are safe. Simply click the "Sign Up" button
                  </p>
                </div>
              </article>
              <article className="grid lg:grid-cols-2 mt-10 lg:mt-0">

                <div
                  className="mx-auto "
                  data-aos="fade-left"
                  data-aos-easing="ease-out"
                  data-aos-duration="1200"
                >
                  <img src={documentUpload} alt="" className="w-60 h-78" />
                </div>
                <div
                  className="lg:order-last text-center max-w-xs lg:mt-14 mx-auto"
                  data-aos="fade-right"
                  data-aos-easing="ease-out"
                  data-aos-duration="1200"
                >
                  <h2 className=" text-center block font-bold font-openSans">
                    UPLOAD DETAILS
                  </h2>
                  <p className="mt-2 text-gray text-center font-thin text-sm  font-openSans">
                    Next, supply your details and official documents from UNIZIK to
                    process your transcript and equivalents.
                  </p>
                </div>
              </article>
              <article className=" grid lg:grid-cols-2  mt-10 lg:mt-0">
                <div
                  className="mx-auto"
                  data-aos="fade-left"
                  data-aos-easing="ease-out"
                  data-aos-duration="1200"
                >
                  <img src={Payment1} alt="" className="w-60 h-78" />
                </div>
                <div
                  className=" lg:order-first text-center max-w-xs lg:mt-14 mx-auto pb-8"
                  data-aos="fade-right"
                  data-aos-easing="ease-out"
                  data-aos-duration="1200"
                >
                  <h2 className=" text-center font-bold block font-openSans">PAYMENT</h2>
                  <p className="mt-2 text-gray font-thin text-sm text-center font-openSans">
                    Finish by paying a token. We accept Paystack as a payment
                    method for all types of online transactions!
                  </p>
                </div>
              </article>
            </section>
            <Link to='/signup'>
            <button onClick={topScroll} className="mt-10 mx-auto bg-orange-base text-white rounded-lg h-10 w-32 block">Sign Up Now</button>
            </Link>
            <div className="shadow-md  border-gray grid grid-rows-3 gap-y-4 my-auto text-gray lg:h-64  right-0 mt-10">
              <div>

             <img src={TranscertLogo} alt="logo" className="w-40 mt-5 lg:mt-1 mx-auto"/>
             <div className=" text-center flex flex-row mx-auto justify-center gap-x-6 lg:mx-72 mt-10">
             <i className="fa-brands fa-twitter cursor-pointer text-end"/>
             <i className="fa-brands fa-instagram cursor-pointer"/>
             <i className="fa-brands fa-whatsapp cursor-pointer text-start"/> 
             </div>
              </div>
              <div className="align-bottom">
              <ul className="align-bottom flex flex-row justify-center gap-x-10 text-center mt-10">
                <li>
                  <span>Contact us</span>
                </li>
                <li>
                  <span>About Us</span>
                </li>
                <li>
                  <span>Terms Of Service</span>
                </li>
              </ul>

</div>
              <div className="align-bottom mt-10 text-center flex flex-row  mx-auto justify-center">
                <p className="font-light  text-sm"> Copyright</p>
                <i className="fas fa-copyright ml-1 mt-1" />
                <p className="ml-1 font-light text-sm ">2023 Transcert</p>
              </div>
            </div>
          </>
        );
  
  
} else{
  return <Navigate to='/dashboard' />
}
}
export default Home;
