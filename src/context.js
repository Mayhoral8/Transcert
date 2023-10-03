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
import emailjs from "@emailjs/browser";
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
  const [token, setToken] = useState('')
  const [tokenExpirationTime, setTokenExpirationTime] = useState(null)
  const [userId, setUserId] = useState()
  const [modalMsg, setModalMsg] = useState()
  const [message, setMessage] = useState()
  const [type, setType] = useState()
  const [customButtons, setCustomButtons] = useState()
  const [isOpen, setIsOpen] = useState(false);
  const [overlay, setOverlay] = useState(false)

  const form = useRef();

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

  const [sessionOfGraduation, setSessionOfGraduation] = useState("");
  const [docType, setDocType] = useState("");

  const callmebotPhone = process.env.REACT_APP_PHONE_NUMBER
  const callmebotApiKey = process.env.REACT_APP_CALLMEBOTAPI_API_KEY
  
  // EMAIL FUNCTION

  const sendEmail = (e) => {
    e.preventDefault();
  };


const sendEmailV = (funcType)=>{
  const auth = getAuth()
   console.log(auth)
sendEmailVerification(auth.currentUser)
if(funcType === 'login'){
  alert('Verification email sent')
}
}

const testReg = ()=>{
  set(ref(db, `users/${"55oYqZPPzHbpNXgb6U3f4GtiMpD3"}`), {
    email,
    regPhoneNumber,
    id: "55oYqZPPzHbpNXgb6U3f4GtiMpD3",
    regStatus: '',
    paymentStatus: ''
  })
}

  const registerUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
    .then((response) => {
      console.log(auth)
         set(ref(db, `users/${response.user.uid}`), {
          email,
          regPhoneNumber,
          id: response.user.uid,
          regStatus: '',
          paymentStatus: ''
        })
      sendEmailV();
      alert('Email verification link sent. Please check your email inbox or spam to verify and sign in.')
      // auth.signOut();
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


  
  
   
  
  const emailVerResendMsg = `Please verify your email first to sign in Check your mail inbox/spam`

  const loginHandler = (e) => {
    e.preventDefault()
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
    .then((response) => {
      if(response.user.emailVerified){
       login(response.user.accessToken, response.user.uid)
      }else{
        alert('please Verify email')
        setErrorMsg(emailVerResendMsg)
        signOut(auth)
        setIsLoading(()=>{
            console.log('be guided')
            return false
        })
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
 
  setToken(()=>{
   return accessToken
  })
  setUserId(uid)

  const tokenExpirationDate = tokenDuration || new Date().getTime() + (1000 * 60 * 60)
  setTokenExpirationTime(tokenExpirationDate)
  localStorage.setItem('userData',  JSON.stringify({token:accessToken, tokenExpirationDate, uid}));        
  navigate('/dashboard')
  setErrorMsg("");

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
       setOpenModal(false)
       setTokenExpirationTime(null)
      localStorage.removeItem("userData");
      setErrorMsg("");
      setIsLoading(false);
      navigate('/login')

    });
  let timeoutId;

    useEffect(()=>{
      if(tokenExpirationTime){
      const remainingTime = tokenExpirationTime - new Date().getTime()
        timeoutId = setTimeout(logout, remainingTime)
      }else{
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
    alert('Password reset link has been sent. Please check your email inbox/spam')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    
  });
  }

  const regFormValid = fullName !== "" &&
  emailAdd !== "" &&
  courseOfStudy !== "" &&
  phoneNumber !== "" &&
  regNumber !== "" &&
  faculty !== ""  &&
  durationOfStudy !== '' &&
  programme !== '' &&
  sessionOfGraduation !== ''

  const regDetails = `${fullName}%0A${emailAdd}%0A${courseOfStudy}%0A${phoneNumber}%0A${regNumber}%0A${faculty}%0A${durationOfStudy}%0A${sessionOfGraduation}%0A${programme}`
console.log(regDetails)
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
                  regStatus: true
                });
                 
              }).then(()=>{
                const response = fetch(`http://api.callmebot.com/whatsapp.php?phone=${callmebotPhone}&text=Mayhoral&text=${regDetails}&apikey=${callmebotApiKey}`,{
                  method: 'POST',
                  mode: 'no-cors'
                })

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
  const call_bot = async ()=>{
    console.log('works')
    try{
      const response = fetch('http://api.callmebot.com/whatsapp.php?phone=2349057119163&text=Mayhoral&text=POP%0Appop%0Anext%0Apop&apikey=7288408',{
        method: 'POST',
        mode: 'no-cors'
      })
    }catch(err){
      console.log(err)
    }
  }
  
        

    
  
  return (
    <ContextCreate.Provider
      value={{
        location,
        call_bot,
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
        setSessionOfGraduation,
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
        regFormValid,
        testReg,
        overlay,
        setOverlay
      
      }}
    >
     
      {props.children}
    </ContextCreate.Provider>
  );
};
const ConsumerContext = ContextCreate.Consumer;

export { ContextProvider, ConsumerContext };