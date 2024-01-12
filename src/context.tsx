import React, { useState, useEffect, useCallback, createContext } from "react";
import { db } from "./firebase-config";
import { set, ref, update, onValue } from "firebase/database";
import {
  getAuth,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "aos/dist/aos.css";
import { ContextTypes } from "TSmodel/model.tsx";

export const ContextCreate = createContext({} as ContextTypes);

const ContextProvider = (props: any) => {
  const navigate = useNavigate();
  const [regStatus, setRegStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [regPhoneNumber, setRegPhoneNumber] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [token, setToken] = useState("");
  const [tokenExpirationTime, setTokenExpirationTime] = useState(0);
  const [userId, setUserId] = useState("");
  const [modalMsg, setModalMsg] = useState("");
  const [type, setType] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [message, setMessage] = useState("");

  // ----------------------------------------------------------

  // STATE FOR FORM DETAILS
  const [fullName, setFullName] = useState("");

  const [courseOfStudy, setCourseOfStudy] = useState("");

  const [durationOfStudy, setDurationOfStudy] = useState("");
  const [modeOfStudy, setModeOfStudy] = useState("");
  const [faculty, setFaculty] = useState("");
  const [emailAdd, setEmailAdd] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [department, setDepartment] = useState("");

  const [programme, setProgramme] = useState("");

  const [sessionOfGraduation, setSessionOfGraduation] = useState("");

  const callmebotPhone = process.env.REACT_APP_PHONE_NUMBER;
  const callmebotApiKey = process.env.REACT_APP_CALLMEBOTAPI_API_KEY;
console.log(callmebotApiKey, callmebotPhone);

  // EMAIL FUNCTION

  const [forgotPwd, setForgotPwd] = useState(3);

  const sendEmailV = (funcType: string) => {
    const auth = getAuth();
    auth.currentUser && sendEmailVerification(auth.currentUser);
    if (funcType === "login") {
      alert("Verification email sent");
    }
  };

  const registerUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(auth);
        set(ref(db, `users/${response.user.uid}`), {
          email,
          regPhoneNumber,
          id: response.user.uid,
          regStatus: "",
          paymentStatus: "",
        });
        sendEmailV("signup");
        alert(
          "Email verification link sent. Please check your email inbox or spam to verify and sign in."
        );
        // auth.signOut();
      })
      .then(() => {
        auth.currentUser &&
          updateProfile(auth.currentUser, {
            displayName: name,
          });
        setIsLoading(false);

        navigate("/login");
        setErrorMsg("");
        console.log("registered");
      })
      .catch((error) => {
        if (error) {
          setIsLoading(false);

          if (
            error.message === "Firebase: Error (auth/email-already-in-use)."
          ) {
            let string = "Firebase: Error (auth/email-already-in-use).";
            let string2 = string
              .split(" ")[2]
              .slice(6, 26)
              .replaceAll("-", " ")
              .replace("e", "E");
            setErrorMsg(string2);
          } else {
            const errorString1 = error.message
              .split(" ")
              .splice(1, error.message.length);
            errorString1.pop();

            let words: string[] = [];
            errorString1.map((word: string) => {
              words.push(word);
            });
            setErrorMsg(words.join(" "));
            console.log(error.message);
          }
        }
      });
  };

  const emailVerResendMsg = `Please verify your email first to sign in Check your mail inbox/spam`;

  const loginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        if (response.user.emailVerified) {
          console.log(response.user.getIdToken());
          response.user.getIdToken().then((result) => {
            login(
              result,
              response.user.uid,
              new Date().getTime() + 1000 * 60 * 60
            );
          });
        } else {
          alert("please Verify email");
          setErrorMsg(emailVerResendMsg);
          signOut(auth);
          setIsLoading(() => {
            console.log("be guided");
            return false;
          });
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
            .map((word: string) => {
              const word1 = word.replace(word[0], word[0].toUpperCase());
              return word1;
            });
          setErrorMsg(errorString2.join(" "));
        }
      });

    if (errorMsg === "Wrong Password") {
      setForgotPwd(forgotPwd - 1);
    }
  };

  const login = useCallback(
    (accessToken: string, uid: string, tokenDuration: number): void => {
      setToken(() => {
        return accessToken;
      });
      setUserId(uid);

      const tokenExpirationDate =
        tokenDuration || new Date().getTime() + 1000 * 60 * 60;
      setTokenExpirationTime(tokenExpirationDate);
      localStorage.setItem(
        "userData",
        JSON.stringify({ token: accessToken, tokenExpirationDate, uid })
      );
      navigate("/dashboard");
      setErrorMsg("");
    },
    []
  );
  useEffect(() => {
    const storageItem = localStorage.getItem("userData");
    const storedData = storageItem && JSON.parse(storageItem);
    if (
      storedData &&
      storedData.token &&
      storedData.tokenExpirationDate > new Date().getTime()
    ) {
      login(storedData.token, storedData.uid, storedData.tokenExpirationDate);
    }
  }, [token]);

  const logout = useCallback(() => {
    setIsLoading(true);
    signOut(auth);
    setToken("");
    setOpenModal(false);
    setTokenExpirationTime(0);
    localStorage.removeItem("userData");
    localStorage.removeItem("profilePhoto");
    setErrorMsg("");
    setIsLoading(false);
    navigate("/login");
  }, []);
  let timeoutId: any;

  useEffect(() => {
    if (tokenExpirationTime) {
      const remainingTime = tokenExpirationTime - new Date().getTime();
      timeoutId = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(timeoutId);
    }
  }, [token, userId]);

  const homeSignUpBtn = () => {
    if (!token) {
      navigate("/signUp");
    } else {
      navigate("/home");
    }
  };

  const resetPword = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert(
          "Password reset link has been sent. Please check your email inbox/spam"
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const regFormValid =
    fullName !== "" &&
    emailAdd !== "" &&
    courseOfStudy !== "" &&
    phoneNumber !== "" &&
    regNumber !== "" &&
    faculty !== "" &&
    durationOfStudy !== "" &&
    programme !== "" &&
    department !== "" &&
    sessionOfGraduation !== "";

  const regDetails = `${fullName}%0A${emailAdd}%0A${courseOfStudy}%0A${phoneNumber}%0A${regNumber}%0A${faculty}%0A${department}%0A${durationOfStudy}%0A${sessionOfGraduation}%0A${programme}`;

  const sendToWhatsapp = async () => {
    try {
      const response = await fetch(
        `https://api.callmebot.com/whatsapp.php?phone=${callmebotPhone}&text=${regDetails}&apikey=${callmebotApiKey}`,
        {
          method: "POST",
          mode: "no-cors",
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  
  const paymentFunc = () => {
    update(ref(db, `/${auth?.currentUser?.uid}`), {
      paymentStatus: true,
    });
  };
  const topScroll = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <ContextCreate.Provider
      value={{
        auth: {
          email,
          setEmail,
          password,
          setName,
          setPassword,
          forgotPwd,
          setForgotPwd,
          token,
          sendEmailV,
          emailVerResendMsg,
          registerUser,
          logout,
          loginHandler,
          resetPword,
          homeSignUpBtn,
          userId,
        },
        registration: {
          setCourseOfStudy,
          courseOfStudy,
          setFullName,
          modeOfStudy,
          setEmailAdd,
          setPhoneNumber,
          setFaculty,
          setRegNumber,
          setProgramme,
          setDurationOfStudy,
          setDepartment,
          setRegPhoneNumber,
          durationOfStudy,
          setModeOfStudy,
          fullName,
          emailAdd,
          phoneNumber,
          regNumber,
          department,
          programme,
          setSessionOfGraduation,
          regFormValid,
          regStatus,
          setRegStatus,
          sendToWhatsapp,
          
        },
        modal: {
          modalMsg,
          setModalMsg,
          setErrorMsg,
          errorMsg,
          show,
          setShow,
          openModal,
          setOpenModal,
        },

        ui: {
          isLoading,
          overlay,
          setOverlay,
          topScroll,
          setIsLoading,
        },
        profile: {
          isOpen,
          setIsOpen,
          type,
          setType,
          setMessage,
        },
        payment: {
          paymentStatus,
          setPaymentStatus,
          paymentFunc,
        },
      }}
    >
      {props.children}
    </ContextCreate.Provider>
  );
};
const ConsumerContext = ContextCreate.Consumer;

export { ContextProvider, ConsumerContext };
