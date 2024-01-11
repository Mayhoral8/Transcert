export interface ContextTypes {
  auth: {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    forgotPwd: number;
    setForgotPwd: React.Dispatch<React.SetStateAction<number>>;
    token: string;
    sendEmailV: (par: string) => void;
    emailVerResendMsg: string;
    registerUser: (e: React.ChangeEvent<HTMLInputElement>) => void;
    logout: () => void;
    loginHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    resetPword: () => void;
    homeSignUpBtn: () => void;
    userId: string;
  };
  registration: {
    setCourseOfStudy: React.Dispatch<React.SetStateAction<string>>;
    courseOfStudy: string;
    setFullName: React.Dispatch<React.SetStateAction<string>>;
    modeOfStudy: string;
    setEmailAdd: React.Dispatch<React.SetStateAction<string>>;
    setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
    setFaculty: React.Dispatch<React.SetStateAction<string>>;
    setRegNumber: React.Dispatch<React.SetStateAction<string>>;
    setProgramme: React.Dispatch<React.SetStateAction<string>>;
    setDurationOfStudy: React.Dispatch<React.SetStateAction<string>>;
    setDepartment: React.Dispatch<React.SetStateAction<string>>;
    setRegPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
    durationOfStudy: string;
    setModeOfStudy: React.Dispatch<React.SetStateAction<string>>;
    fullName: string;
    emailAdd: string;
    phoneNumber: string;
    regNumber: string;
    department: string;
    programme: string;
    setSessionOfGraduation: React.Dispatch<React.SetStateAction<string>>;
    regFormValid: boolean;
    regStatus: string;
    setRegStatus: React.Dispatch<React.SetStateAction<string>>;
    sendToWhatsapp: () => void;
  };
  modal: {
    modalMsg: string;
    setModalMsg: React.Dispatch<React.SetStateAction<string>>;
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
    errorMsg: string;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  };
  ui: {
    isLoading: boolean;
    overlay: boolean;
    setOverlay: React.Dispatch<React.SetStateAction<boolean>>;
    topScroll: () => void;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  };
  profile: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    type: string;
    setType: React.Dispatch<React.SetStateAction<string>>;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
  };
  payment: {
    paymentStatus: string;
    setPaymentStatus: React.Dispatch<React.SetStateAction<string>>;
    paymentFunc: () => void;
  };
}
