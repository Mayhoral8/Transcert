import React, {useRef, useEffect}from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ConsumerContext } from "./context";
import Modal from "./modal";
import Footer from "./footer";
import Aos from "aos";
import "aos/dist/aos.css";
import documentUpload from './img/documentUpload.png';


const RegistrationPage = ()=>{
  useEffect(() => {
    Aos.init({ duration: 600 });
  }, []);
return (
    <ConsumerContext>
      {(value) => {
        const { isLoading, 
          updateFunc, 
          initialToken,  
          logout, 
          ref1, 
          setImagesetFullName, 
          setImage,
          image,
          regStatus,
          setEmailAdd1,
          setEmailAdd2,
          setPhoneNumber,
          setRegNumber,
          setDepartment,
          setFaculty,
          setFullName,
          setProgramme,
          setSessOfEntry,
          setSessOfGraduation,
          setDateOfBirth,
          loadData,
          fullName,
          emailAdd1,
          emailAdd2,
          phoneNumber,
          regNumber,
          department,
          faculty,
          programme,
          sessOfEntry,
          sessOfGraduation,
          dateOfBirth,
          setCloseModal, 
          setOpenModal, 
          closeModal, 
          openModal
           } =
          value;


          // const upload = (e)=>{
          //   e.preventDefault();
          //   if(image  === null)return;
          //   const imageRef = ref(storage, `${auth.currentUser.uid}/${image.name}`);
          //   uploadBytes(imageRef, image).then(()=>{
          //     alert('image uploaded');
          //   }).then(()=>{
          //     const dbImageRef = ref(storage, `${auth.currentUser.uid}`)
          //     listAll(dbImageRef).then((response)=>{
          //       console.log(response)
          //       const items = response.items
          //       console.log(items)
          //       let temp = []
          //       items.forEach((item, i)=>{            
          //             getDownloadURL(item).then((urlRaw)=>{
          //               console.log(urlRaw)
          //               updateFunc(e, urlRaw);
          //             })
                      
          //           })
                  
          //     }).then(()=>{
          //       alert('Registration Successful ✔')
          //     })
          //   })
          // }
          const string1 = []
              const username =  '@Mayhoral'
              const text = {
                Fullname: fullName,
                EmailAddress1: emailAdd1,
                EmailAddress2: emailAdd2,
                Phonenumber: phoneNumber,
                RegistrationNumber: regNumber,
                Department: department,
                Faculty: faculty,
                Programme: programme,
                Sessionofentry: sessOfEntry,
               Sessionofgraduation: sessOfGraduation,
                DateofBirth: dateOfBirth
              }
              const upload = (e)=>{
                e.preventDefault()
                if (fullName !== ''&& emailAdd1 !== '' && emailAdd2 !== '' && phoneNumber !== '' && regNumber !== '' && department !== '' && faculty !== '' && sessOfEntry !== '' && dateOfBirth !== ''){
              
                  const string3 = JSON.stringify(text).replaceAll(',',',').replaceAll('"','').replaceAll('}', '').replaceAll('{', '')
                  console.log(string3)
                  string3.split(',').map((stringloop)=>{
                    string1.push(' '+ stringloop)
                  })
                fetch( `https://api.callmebot.com/text.php?user=${username}&text=${string1.join(',').replaceAll(':', ': ')}`,{
                  method: 'POST',
                  mode: 'no-cors'
                }).then(()=>{
                  setOpenModal(()=>{
                    return true
                  }).then(()=>{
                    localStorage.setItem('regStatus', true)
                  }).then(()=>{
                   return <Navigate to = '/main'  />
                  })
                })
                }else{
                  alert('Please Fill Out All Fields')
                }
              
              

          }
        
          if(initialToken){

            return (
              <>
                { openModal ? <Modal/> : null}
            <div className=" bg-blue-base h-72 font-openSans mx-auto lg:mt-20 block">
            <h2 className=" text-center mt-10 lg:mt-6 py-32  lg:text-3xl font-bold text-white">
              Welcome To The Registration Page
              </h2>
             
            </div>
              
              { <div className="font-openSans lg:w-1/2 px-10 lg:mt-16 mx-auto block">
              <h2 className="mt-16 text-center  font-bold ">
             Please, carefully fill in your details.
              </h2>
                <form className=" grid gap-y-6 mt-14  text-sm mx-auto" name="myForm" action="/action_page.php" method="post">
                   <div>
                    <label>Full Name (As in official documents)</label>
                    <span className="text-red-400">*</span>
                  </div>
                  <input
                    name='fname'
                    placeholder="name"
                    type="text"
                    className="border rounded-md border-gray focus:outline-none px-4 py-2 pb-2"
                    required
                    onChange={(e)=> setFullName(e.target.value)}
                  />
                  <div>
                    <label>Email Address 1</label>
                    <span className="text-red-400">*</span>
                  </div>
                  <input
                    placeholder="example@gmail.com"
                 
                    type="email"
                    className="border rounded-md focus:outline-none py-2 px-4 "
                    required
                    onChange={(e)=> setEmailAdd1(()=>{
                      console.log(emailAdd1)
                      return(e.target.value)
                      
                    })
                    }
                  />
                  
                  <div>
                    <label>Phone Number</label>
                    <span className="text-red-500">*</span>
                  </div>
                  <input
                    placeholder="+234"
                    
                    type="text"
                    maxLength="11"
                    minLength="11"
                    className="border rounded-md focus:outline-none py-2  px-4 pb-2"
                    required
                    onChange={(e)=> setPhoneNumber(e.target.value)}
                  />
                  <div>
                    <div>
                      <label>Registration Number</label>
                      <span className="text-red-500">*</span>
                    </div>
                  </div>
                  <input
                    placeholder="Registration Number"
                   
                    type="text"
                    className="border rounded-md focus:outline-none py-2  px-4 pb-2"
                    required
                    onChange={(e)=> setRegNumber(e.target.value)}
                  />
                  <div>
                    <label>Faculty</label>
                    <span className="text-red-500">*</span>
                  </div>
                  <input
                    placeholder="Faculty Name"
                    type="text"
                    className="border rounded-md focus:outline-none py-2 px-4 pb-2"
                    required
                    onChange={(e)=> setFaculty(e.target.value)}
                  />
                  <div>
                    <label>Department</label>
                    <span className="text-red-500">*</span>
                  </div>
                  <input
                    placeholder="Department"
                    type="text"
                    className="border rounded-md focus:outline-none py-2  px-4 pb-2"
                    required
                    onChange={(e)=> setDepartment(e.target.value)}
                  />
                  <div>
                    <label>Programme:</label>{" "}
                    <span className="text-red-500">*</span>
                  </div>
                  <select name="" className="border py-2 px-4 pb-2" required 
                  
                    onChange={(e)=> setProgramme(e.target.value)}>
                    <option value="Regular">Regular</option>
                    <option value="Special">Special</option>
                  </select>
                 
                  <div>
                    <label>Session Of Graduation:</label>{" "}
                    <span className="text-red-500">*</span>
                  </div>
                  <select
                    name=""
                    id=""
                   
                    className="border py-2 px-4 pb-2"
                    required
                    onChange={(e)=> setSessOfGraduation(e.target.value)}
                  >
                    <option value="2002/2004">2002/2004</option>
                    <option value="2000/2001">2000/2001</option>
                    <option value="2000/2001">2000/2001</option>
                  </select>
                  <label>Date Of Birth:</label>
                  <input
                    placeholder="Phone Number"
                
                    type="date"
                    className="border-b-2 focus:outline-none px-4 pb-2"
                    required
                    onChange={(e)=> setDateOfBirth(e.target.value)}
                  />
                  {/* <label>NIN Slip:</label>
                  <input
                   
                    type="file"
                    className="border-b-2 focus:outline-none px-4 pb-2"
                    required
                    onChange={(e)=> setImage(e.target.files[0])}
                  /> */}
                  <button type="submit" disabled={regStatus === 'undefined'? false: true} value="submit" className="px-auto flex items-center mx-auto mt-5 px-28 w-72 bg-orange-base rounded-md h-8 my-auto text-white" onClick={(e)=> {upload(e); updateFunc(e)}}>SUBMIT</button>

                </form>
              </div> }
              <div className="mt-10">
              <Footer/>
              </div>
            </>

          );
          
        } else{
          return  <Navigate to = '/login'  />
        }
      }
    }
  
    </ConsumerContext>
    
    
  );
}
export default RegistrationPage