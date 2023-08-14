import React, { useState, useRef, useEffect, useCallback } from "react";
import { db } from "./firebase-config";
import { set, ref, update, onValue } from "firebase/database";
import { getAuth, sendPasswordResetEmail, sendEmailVerification, updateProfile } from "firebase/auth";
import Toast from "./toast";
import { useLocation } from "react-router-dom";

// import {uid} from 'uid';
import { auth } from "./firebase-config";
import { useNavigate } from "react-router";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { storage } from "./firebase-config";
import emailjs from "@emailjs/browser";
import Aos from "aos";
import "aos/dist/aos.css";

export const ContextCreate = React.createContext();

const ContextProvider = (props) => {
  const location = useLocation()
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [regStatus, setRegStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [currUser, setCurrUser] = useState();
  const ref1 = useRef();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [emailVBtn, setEmailVBtn] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currDbUser, setCurrDbUser] = useState();
  const [testUser, setTestUser] = useState();
  const [show, setShow] = useState(true);
  const [dbImage, setDbImage] = useState(true);
  const [imgUrl, setImgUrl] = useState("");
  const [regPhoneNumber, setRegPhoneNumber] = useState("");
  const [openModal, setOpenModal] = useState(false)
  const [token, setToken] = useState()
  const [tokenExpirationTime, setTokenExpirationTime] = useState(null)
  const [userId, setUserId] = useState()
  const [modalMsg, setModalMsg] = useState()
  const [message, setMessage] = useState()
  const [type, setType] = useState()
  const [customButtons, setCustomButtons] = useState()
  const [isOpen, setIsOpen] = useState(false);

  const form = useRef();
console.log(isLoading)
  // ----------------------------------------------------------

 
  
  // STATE FOR FORM DETAILS
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [courseOfStudy, setCourseOfStudy] = useState("");
    
  const [durationOfStudy, setDurationOfStudy] = useState("");
  const [modeOfStudy, setModeOfStudy] = useState("");
const [faculty, setFaculty] = useState('')
  const [emailAdd, setEmailAdd] = useState("");
  const [emailAdd2, setEmailAdd2] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [department, setDepartment] = useState("");
  
  const [programme, setProgramme] = useState("");

  const [sessOfGraduation, setSessOfGraduation] = useState("");
  const [docType, setDocType] = useState("");


  
  // EMAIL FUNCTION

  const sendEmail = (e) => {
    e.preventDefault();
  };


const sendEmailV = (funcType)=>{
  const auth = getAuth()
sendEmailVerification(auth.currentUser)
if(funcType === 'login'){
  alert('Verification email sent')
}
}


  const registerUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
    .then((response) => {
         set(ref(db, `users/${response.user.uid}`), {
          email,
          regPhoneNumber,
          id: response.user.uid,
          regStatus: '',
          paymentStatus: ''
        })
      sendEmailV();
      alert('Email verification link sent. Please check your email inbox or spam to verify and sign in.')
      auth.signOut();
      })
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name
        })
        setIsLoading(false);
      //  <Navigate to='/login'/>
       navigate('/login')
        console.log("registered");
      }).catch((error) => {
        if (error) {
          setIsLoading(false);
          const errorString1 = error.message
            .split(" ")
            .splice(1, error.message.length);
          errorString1.pop();

          let words = [];
          errorString1.map((word) => {
            console.log(word);
            words.push(word);
          });
          setErrorMsg(words.join(" "));
          console.log(error.message);
        }
      });
  };

  const obj = {
    name: 'tope',
    age: null

  };
 
 
  const emailVerResendMsg = "Please verify your email first to sign in. Check your mail inbox/spam"
   
  

  const loginHandler = (e) => {
    e.preventDefault()
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
    .then((response) => {
      if(response.user.emailVerified) {
        
       login(response.user.accessToken, response.user.uid)
      }else{
        alert('please Verify email')
        setErrorMsg(emailVerResendMsg)
        signOut(auth)
      }
    })
      .catch((error) => {
        if (error) {
          setIsLoading(false);
          console.log(error.message);
          const errorString1 = error.message
            .split(" ")
            .slice(2, 4)
            .join("")
            .split("/")
            .slice(1, 2)
            .join("")
            .split("-")
            .join(" ");
          const errorString2 = errorString1
            .slice(0, errorString1.length - 2)
            .split(" ")
            .map((word) => {
              const word1 = word.replace(word[0], word[0].toUpperCase());
              return word1;
            });
          setErrorMsg(errorString2.join(" "));
        }
      });
  };

const login = useCallback((accessToken, uid, tokenDuration)=>{
  // setIsLoading(true);
  setToken(()=>{
   return accessToken
  })
  setUserId(uid)
  // console.log(accessToken)
  const tokenExpirationDate = tokenDuration || new Date().getTime() + (1000 * 60 * 60)
  setTokenExpirationTime(tokenExpirationDate)
  localStorage.setItem('userData',  JSON.stringify({token:accessToken, tokenExpirationDate, uid}));        
  navigate('/dashboard')
  setErrorMsg("");
  // setIsLoading(false);
})
  useEffect(()=>{
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if(storedData && storedData.token && storedData.tokenExpirationDate > new Date().getTime()){
      login(storedData.token, storedData.uid, storedData.tokenExpirationDate)
    } 
    }, [token])
    
    const logout =  useCallback((pop) => {
    setIsLoading(true);
       signOut(auth);
       setToken(null)
       setTokenExpirationTime(null)
      localStorage.removeItem("userData");
      setErrorMsg("");
      setIsLoading(false);
      setOpenModal(true)
      navigate('/login')

    });
  let timeoutId;

    useEffect(()=>{
      if(tokenExpirationTime){
        console.log('z')
      const remainingTime = tokenExpirationTime - new Date().getTime()
        timeoutId = setTimeout(logout, remainingTime)
      }else{
        console.log('y')
        clearTimeout(timeoutId)
      }
    }, [token, userId])
 


  const homeSignUpBtn = ()=>{
      if(!token){  
        navigate('/signUp')
      }else{
    
        navigate('/home')
      }
  }

  
  const resetPword =()=>{
const auth = getAuth();
sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
    alert('Password reset link has been sent. Please check your email inbox/spam')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    // ..
  });
  }

  const regFormValid = fullName !== "" &&
  emailAdd !== "" &&
  courseOfStudy !== "" &&
  phoneNumber !== "" &&
  regNumber !== "" &&
  faculty !== ""  &&
  modeOfStudy !== '' &&
  durationOfStudy !== '' &&
  programme !== '' &&
  docType !== ''
  const updateFunc = (e) => {
    e.preventDefault();   
          if (
            regFormValid
          ) {
            setIsLoading(true)
            emailjs
              .sendForm(
                "service_1kf8q4r",
                "template_7haozug",
                form.current,
                "HoDMgnKrRm2WdK2E_"
              )
              .then(
                (result) => {
                  console.log(result.text);
                },
                (error) => {
                  console.log(error.text);
                }
              ).then(()=>{
                update(ref(db, `/users/${userId}`), {
                  regStatus: true,
                  documentType: docType
                });
                 
              }).then(()=>{
                setIsLoading(false);
                  new Toast({message: 'Registration Successful', type: 'success'})
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

  const paymentFunc= ()=>{
    update(ref(db, `/${auth.currentUser.uid}`), {
      paymentStatus: true
    });
    

    console.log('payment')
   
  }
  const topScroll = ()=>{
    window.scrollTo({
      top:0, left:0 , behavior: "smooth"
    });
  }
   const newString = []   
        const string1 = 'Fullname:tope,EmailAddress1:tope@gmail.com,EmailAddress2:tope@gmail.com,Phonenumber:55555555555,RegistrationNumber:555555555,Department:Physiology,Faculty:BMS,Programme:Special,Sessionofentry:2011/2012,Sessionofgraduation:,DateofBirth:2023-02-16'
        const string2 = string1.split(',').map((string1)=>{
              newString.push(' '+ string1)
        })
       
        

    
  
  return (
    <ContextCreate.Provider
      value={{
        location,
        regStatus,
        modalMsg,
        setModalMsg,
        setRegStatus,
        paymentStatus,
        setPaymentStatus,
        users,
        setUsers,
        email,
        setEmail,
        password,
        setName,
        setPassword,
        currUser,
        setCurrUser,
        image,
        setImage,
        registerUser,
        logout,
        loginHandler,
        setErrorMsg,
        errorMsg,
        isLoading,
        setTestUser,
        updateFunc,
        ref1,
        show,
        setShow,
        token,
        setFullName,
        setEmailAdd,
        setPhoneNumber,
        setRegNumber,
        setDepartment,
        setIsLoading,
        setProgramme,
        
        setSessOfGraduation,
        
        setImgUrl,
        setRegPhoneNumber,
        form,
        sendEmail,
        topScroll,
        homeSignUpBtn,
        fullName,
        emailAdd,
        phoneNumber,
        regNumber,
        department,
       
        programme,
       
        
        openModal,
        setOpenModal,
       
        
        resetPword,
        paymentFunc,
        emailVBtn,
        setEmailVBtn,
        sendEmailV,
        emailVerResendMsg,
        setDocType,
        setDurationOfStudy,
        setCourseOfStudy,
        setModeOfStudy,
        courseOfStudy,
        docType,
        modeOfStudy,
        durationOfStudy,
        navigate,
        setFaculty,
        userId,

        message,
        setMessage,
        type,
        setType,
        customButtons,
        setCustomButtons,
        isOpen,
        setIsOpen,
        regFormValid
      
      }}
    >
     
      {props.children}
    </ContextCreate.Provider>
  );
};
const ConsumerContext = ContextCreate.Consumer;

export { ContextProvider, ConsumerContext };