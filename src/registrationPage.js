import React, {useRef}from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ConsumerContext } from "./context";
import { db } from "./firebase-config";
import { auth, fetchUrl } from "./firebase-config";
import {ref, uploadBytes, listAll, getDownloadURL, getBlob} from 'firebase/storage'
import { storage } from "./firebase-config";

const RegistrationPage = ()=>{

return (
    <ConsumerContext>
      {(value) => {
        const { isLoading, updateFunc, initialToken,  logout, ref1, setImagesetFullName, setImage,
          image,
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
                })
                }else{
                  alert('Please Fill Out All Fields')
                }
              
              

          }
          if(initialToken){

            return (
              <>
            <div className="mx-auto block">
             <h2 className="ml-10 mt-10 box mx-auto block text-center">
                Welcome Back, {initialToken}
              </h2>
              { <h3 className="text-center">{initialToken ? 'Registered' : 'Not Registered'}</h3> }
            </div>
              
              { <div className="w-1/2 mt-10 mx-auto block">
                <form className="grid gap-y-6 px-2 text-sm" name="myForm" action="/action_page.php" method="post">
                   <div>
                    <label>Full Name (As in official documents)</label>
                    <span className="text-red-400">*</span>
                  </div>
                  <input
                    name='fname'
                    type="text"
                    className="border focus:outline-none px-4 py-2 pb-2"
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
                    className="border focus:outline-none py-2 px-4 "
                    required
                    onChange={(e)=> setEmailAdd1(()=>{
                      console.log(emailAdd1)
                      return(e.target.value)
                      
                    })
                    }
                  />
                  <div>
                    <label>Email address 2</label>
                    <span className="text-red-400"></span>
                  </div>
                  <input
                    placeholder="example@gmail.com"
                 
                    type="email"
                    className="border focus:outline-none py-2  px-4 "
                    onChange={(e)=> setEmailAdd2(e.target.value)}
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
                    className="border focus:outline-none py-2  px-4 pb-2"
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
                    className="border focus:outline-none py-2  px-4 pb-2"
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
                    className="border focus:outline-none py-2 px-4 pb-2"
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
                    className="border focus:outline-none py-2  px-4 pb-2"
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
                    <label >Session of Entry:</label>{" "}
                    <span className="text-red-500">*</span>
                  </div>
                  <select
                    name=""
                    id=""
                    
                    className="border py-2 px-4 pb-2 "
                    required
                    onChange={(e)=> setSessOfEntry(e.target.value)}
                  >
                    <option disabled selected value='' className="font-italics">Choose A Year</option>
                    <option value="2010/2011">2010/2011</option>
                    <option value="2011/2012">2011/2012</option>
                    <option value="2012/2013">2012/2013</option>
                    <option value="2013/2014">2013/2014</option>
                    <option value="2000/2001">2014/2015</option>
                    <option value="2015/2016">2015/2016</option>
                    <option value="2016/2017">2016/2017</option>
                    <option value="2017/2018">2017/2018</option>
                    <option value="2018/2019">2018/2019</option>
                    <option value="2019/2020">2019/2020</option>
                    <option value="2020/2021">2020/2021</option>
                    <option value="2021/2022">2021/2022</option>
                    <option value="2022/2023">2022/2023</option>
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
                  <button type="submit" value="submit" className="border w-20 block mx-auto" onClick={(e)=> upload(e)}>SUBMIT</button>
                  

                </form>
              </div> }
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