import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Modal from "./modal";
import Graduation from "./graduation";
import Aos from "aos";
import "aos/dist/aos.css";
import { ContextCreate } from "./context";
import { update, ref } from "firebase/database";
import { db } from "firebase-config";
import {toast} from 'sonner'
const RegistrationPage = () => {
const {registration, auth, modal, ui} = useContext(ContextCreate)
const {setIsLoading, topScroll} = ui

  const { 
    regStatus,
    setPhoneNumber,
    setRegNumber,
    setFullName,
    setProgramme,
    setSessionOfGraduation,
    setFaculty,
    setDurationOfStudy,
    setCourseOfStudy,
    setDepartment,
    setEmailAdd,
    regFormValid, sendToWhatsapp} = registration
    const {token, userId} = auth
    const{openModal} =  modal
  useEffect(() => {
    Aos.init({ duration: 600 });
  }, []);


let e: React.ChangeEvent<HTMLInputElement>;

  const updateFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
   
    console.log('i');
    
          if (
            regFormValid
          ) {
            setIsLoading(true)
    
                update(ref(db, `/users/${userId}`), {
                  regStatus: true
                }).then(()=>{
                sendToWhatsapp()
               toast.success('Registration successful!')

  
              }).then(()=>{
                setIsLoading(false);
                  topScroll();
              })
              .then(()=>{
                  setFullName('')
                  setEmailAdd('')
                  setPhoneNumber('')
                  setDepartment('')
                  setCourseOfStudy('')
                  setRegNumber('')
                })
                
              
          } else {
            alert("Please Fill Out All Fields");
          }
       
  
  };
 
const sessions = [] 
  const year = new Date().getFullYear()
  let earliestYear = 1990
       while (earliestYear < year){
          const session  = `${earliestYear}/${earliestYear + 1}`
          sessions.push(session)
          earliestYear+= 1
       }

        if (token) {
          return (
            <section className="lg:ml-64">
              {openModal ? <Modal /> : null}
              <div className="hidden  items-center px-4 lg:block h-20 shadow-md ">
              <h2 className="text-2xl text-blue-base font-bold">Register </h2>
              </div>
              {regStatus === 'Not registered' ? (
                
                <div className="bg-white-01 mt-1   font-openSans px-10 lg:w-full lg:px-56  lg:mx-auto block">
                  <h2 className=" text-center pt-20 font-bold ">
                    Please, carefully fill in your details.
                  </h2>
                  <section
                    className=" grid grid-flow-row mt-16 lg:py-24  gap-y-6 lg:mt-2  text-sm mx-auto"
                  >
                    <div>
                      <label>Full Name (As in official documents)</label>
                      <span className="text-red">*</span>
                    </div>
                    <input
                      name="user_name"
                      placeholder="name"
                      type="text"
                      className="border rounded-md border-gray focus:outline-none px-4 py-2 pb-2"
                      required
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <div>
                      <label>Email Address</label>
                      <span className="text-red">*</span>
                    </div>
                    <input
                      placeholder="example@gmail.com"
                      name="user_email"
                      type="email"
                      className="border rounded-md focus:outline-none py-2 px-4 "
                      required
                      onChange={(e) =>
                        setEmailAdd(() => {
                          return e.target.value;
                        })
                      }
                    />

                    <div>
                      <label>Phone Number</label>
                      <span className="text-red">*</span>
                    </div>
                    <input
                      placeholder="+234"
                      name="phone_number"
                      type="text"
                      maxLength={11}
                      minLength={11}
                      className="border rounded-md focus:outline-none py-2  px-4 pb-2"
                      required
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <div>
                      <div>
                        <label>Registration Number</label>
                        <span className="text-red">*</span>
                      </div>
                    </div>
                    <input
                      placeholder="Registration Number"
                      name="reg_num"
                      type="text"
                      className="border rounded-md focus:outline-none py-2  px-4 pb-2"
                      required
                      onChange={(e) => setRegNumber(e.target.value)}
                    />
                    <div>
                      <label>Course of study</label>
                      <span className="text-red">*</span>
                    </div>
                    <input
                      placeholder="Course of Study"
                      name="course"
                      type="text"
                      className="border rounded-md focus:outline-none py-2  px-4 pb-2"
                      required
                      onChange={(e) => setCourseOfStudy(e.target.value)}
                    />

                      <div>
                      <label>Department</label>
                      <span className="text-red">*</span>
                    </div>
                    <input
                      name="department"
                      placeholder="department"
                      type="text"
                      className="border rounded-md focus:outline-none py-2  px-4 pb-2"
                      required
                      onChange={(e) => setDepartment(e.target.value)}
                    />
                      
                    <div>
                      <label>Faculty</label>
                      <span className="text-red">*</span>
                    </div>
                    <input
                      name="faculty"
                      placeholder="Faculty"
                      type="text"
                      className="border rounded-md focus:outline-none py-2  px-4 pb-2"
                      required
                      onChange={(e) => setFaculty(e.target.value)}
                    />
                   
                    <div>
                      <label>Duration of study:</label>{" "}
                      <span className="text-red">*</span>
                    </div>
                    <select
                      name="duration_of_study"
                      className="border py-2 px-4 pb-2"
                      required
                      onChange={(e) => setDurationOfStudy(e.target.value)}
                    >
                      <option value="">---Please select an option---</option>
                      <option value="4 years">4 years</option>
                      <option value="5 years">5 years</option>
                      <option value="6 years">6 years</option>
                    </select>
                    <div>
                      <label>Session of Graduation:</label>{" "}
                      <span className="text-red">*</span>
                    </div>
                    <select
                      name="Session of Entry"
                      className="border py-2 px-4 pb-2"
                      required
                      onChange={(e) => setSessionOfGraduation(e.target.value)}
                    >
                      <option value="">---Please select an option---</option>
                      
                    {sessions.map((session, id)=>{
                      
                      return <Graduation value={session} key={id}/>
                    })}
                    </select>

                    <div>
                      <label>Programme:</label>{" "}
                      <span className="text-red">*</span>
                    </div>
                    <select
                      name="programme"
                      className="border py-2 px-4 pb-2"
                      required
                      onChange={(e) => setProgramme(e.target.value)}
                    >
                      <option value="">---Please select an option---</option>
                      <option value="Regular">Regular</option>
                      <option value="Part-time">Part-time</option>
                      <option value="CEP">CEP</option>

                    </select>

                    <button
                     
                      disabled={regStatus === 'Not registered' && regFormValid ? false : true}
                      onClick={()=> updateFunc(e)}
                      className=" text-center   items-center mx-auto mt-5  w-72 bg-orange-base rounded-md h-8 text-white"
                     >
                       Submit
                    </button>
                    <div className="lg:hidden mt-20"></div>
                  </section>
                </div>
              ) : (
                <>
                  <h2 className="mt-40 lg:mt-28 lg:text-base md:mt-64 md:text-2xl text-center font-sm px-10 lg:px-0 text-blue-base lg:font-medium ">
                    Please, click on the icon below
                    to get in touch with our representative and complete
                    your registration.
                  </h2>
                  <a href="https://chatwith.io/s/transcert-1" target= "_blank" className="mx-auto w-64 block">
                    <img
                      src={require( "./img/whatsappIcon.png")}
                      className="mx-auto mt-8 lg:w-64 lg:h-64 w-48 h-48 animate-pulse"
                    />
                  </a>
                </>
              )}
            </section>
          );
        } else {
          return <Navigate to="/login" />;
        }
};
export default RegistrationPage;
