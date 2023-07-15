import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ConsumerContext } from "./context";
import Modal from "./modal";
import Footer from "./footer";
import Aos from "aos";
import "aos/dist/aos.css";
import whatsappIcon from "./img/whatsappIcon.png";
import { ContextCreate } from "./context";

const RegistrationPage = () => {

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
    docType} = useContext(ContextCreate)
  useEffect(() => {
    Aos.init({ duration: 600 });
  }, []);

    
       
        if (token) {
          return (
            <>
              {openModal ? <Modal /> : null}
              <div className=" bg-blue-base h-72 font-openSans mx-auto lg:mt-20 block">
                <h2 className=" text-center mt-10 lg:mt-6 py-32  lg:text-3xl font-bold text-white">
                  Welcome To The Registration Page
                </h2>
              </div>

              {regStatus  ? (
                <div className="font-openSans lg:w-1/2 px-10 lg:mt-16 mx-auto block">
                  <h2 className="mt-16 text-center  font-bold ">
                    Please, carefully fill in your details.
                  </h2>
                  <form
                    ref={form}
                    className=" grid gap-y-6 mt-14  text-sm mx-auto"
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
                     
                      disabled={regStatus === "undefined" ? false : true}
                      type="submit"
                      className="px-auto flex items-center mx-auto mt-5 px-28 w-72 bg-orange-base rounded-md h-8 my-auto text-white"
                      onClick={(e) => {
                        
                        updateFunc(e);
                      }}
                    >
                      {isLoading ?<i className="fas mx-auto text-center fa-spinner animate-spin"/>  : 'Submit'}
                    </button>
                  </form>
                </div>
              ) : (
                <>
                  <h2 className="mt-16 text-center  font-bold ">
                    Please, click on the icon below <br />
                    to get in touch with our representative <br /> and complete
                    your registration before <br /> making payments
                  </h2>
                  <a href="https://chatwith.io/s/transcert" target= "_blank">
                    <img
                      src={whatsappIcon}
                      className="mx-auto lg:mt-20 mt-10 lg:w-64 lg:h-64 w-48 h-48 animate-pulse"
                    />
                  </a>
                </>
              )}
              <div className="mt-20">
                <Footer />
              </div>
            </>
          );
        } else {
          return <Navigate to="/login" />;
        }
};
export default RegistrationPage;
