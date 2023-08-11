import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ConsumerContext } from "./context";
import Modal from "./modal";
import Footer from "./footer";
import Aos from "aos";
import "aos/dist/aos.css";
import whatsappIcon from "./img/whatsappIcon.png";
import { ContextCreate } from "./context";
import { getAuth } from "firebase/auth";

const RegistrationPage = () => {
const auth = getAuth()
  const {  isLoading,
    updateFunc,
    token,
    regStatus,
    setPhoneNumber,
    setRegNumber,
    setFullName,
    setProgramme,
    setDocType,
    setFaculty,
    form,
    openModal,
    setDurationOfStudy,
    setCourseOfStudy,
    setModeOfStudy,
    setEmailAdd,
    docType, regFormValid} = useContext(ContextCreate)
  useEffect(() => {
    Aos.init({ duration: 600 });
  }, []);

  





       
        if (token) {
          return (
            <section className="lg:ml-64">
              {openModal ? <Modal /> : null}
              <div className="hidden lg:flex items-center px-4 lg:block h-20 shadow-md ">
              <h2 className="text-2xl text-blue-base font-bold">Register </h2>
              </div>
              {regStatus === 'Not registered' ? (
                
                <div className="bg-white-01 mt-1   font-openSans px-10 lg:px-10 lg:w-full lg:px-56  lg:mx-auto block">
                  <h2 className=" text-center pt-10 font-bold ">
                    Please, carefully fill in your details.
                  </h2>
                  <form
                    ref={form}
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
                      maxLength="11"
                      minLength="11"
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
                      <label>Mode of study:</label>{" "}
                      <span className="text-red">*</span>
                    </div>
                    <select
                      name="mode_of_study"
                      className="border py-2 px-4 pb-2"
                      required
                      onChange={(e) => setModeOfStudy(e.target.value)}
                    >
                      <option value="">---Please select an option---</option>
                      <option value="Regular">Regular</option>
                      <option value="Special">Special</option>
                    </select>
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
                      <option value="Special">Special</option>
                    </select>

                    <div>
                      <label>Which document do you wish to get?</label>{" "}
                      <span className="text-red">*</span>
                    </div>
                    <select
                      name="doc_type"
                      id=""
                      className="border py-2 px-4 pb-2"
                      required
                      onChange={(e) => {setDocType(e.target.value); console.log(docType)}}
                    >
                      <option value="">---Please select an option---</option>
                      <option value="Transcript">Transcript-#5000</option>
                      <option value="Certificate">Certificate-#4000</option>
                      <option value="English Proficiency letter">
                        English Proficiency Letter-#6000
                      </option>
                    </select>

                    <button
                     
                      disabled={regStatus === 'Not registered' && regFormValid ? false : true}
                      type="submit"
                      className=" text-center   items-center mx-auto mt-5  w-72 bg-orange-base rounded-md h-8 text-white"
                      onClick={(e) => {
                        
                        updateFunc(e);
                      }}
                    >
                       Submit
                    </button>
                    <div className="lg:hidden mt-20"></div>
                  </form>
                </div>
              ) : (
                <>
                  <h2 className="mt-16 text-center font-sm px-10 lg:px-0 text-blue-base lg:font-medium ">
                    Please, click on the icon below
                    to get in touch with our representative and complete
                    your registration.
                  </h2>
                  <a href="https://chatwith.io/s/transcert" target= "_blank" className="mx-auto w-64 block">
                    <img
                      src={whatsappIcon}
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
