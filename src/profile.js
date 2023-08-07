import React, {useState, useContext, useRef, useEffect} from "react";
import { ContextCreate } from "./context";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { storage } from './firebase-config'
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage'
import Toast from "./toast";
import { v4 as uuidv4 } from 'uuid';
import { Navigate, useNavigate } from "react-router-dom";



const Profile = ()=>{
    const {displayName, setIsLoading, token} = useContext(ContextCreate)

    
    const navigate = useNavigate()
    
    const auth = getAuth()
    const [tempImgId, setTempImgId] = useState(uuidv4())    
    
    
    const [nameEditMode, setnameEditMode] = useState(false)
    const [emailEditMode, setEmailEditMode] = useState(false)
    const [picEditMode, setPicEditMode] = useState(false)
     const [file, setFile] = useState()
     const [previewUrl, setPreviewUrl] = useState()
     const [isFileValid, setIsFileValid] = useState()

     const [name, setName] = useState(auth.currentUser ? auth.currentUser.displayName: null)
     const [userEmail, setUserEmail] =useState(auth.currentUser? auth.currentUser.email:null)

    useEffect(() => {
      
          if (!file) {
              return
          }
              const fileReader = new FileReader();
              fileReader.onload = () => {
                 
                  setPreviewUrl(fileReader.result)
                
              }
              fileReader.readAsDataURL(file);
              setIsFileValid(true)
              console.log(isFileValid)
         
      
      
          }, [token, file])
     


   

 
     const nameModeHandler = ()=>{
        setnameEditMode(true)
     }
     const emailModeHandler = ()=>{
        setEmailEditMode(true)
     }


const nameHandler = (e)=>{
    setName(e.target.value)
}

const emailHandler = (e)=>{
    setUserEmail(e.target.value)
}
console.log(name, userEmail)

     
    const pickedFile = useRef()
    const pickImageHandler = () => {
        setPicEditMode(true)
        pickedFile.current.click()
    }

    const pickFileHandler = (e) => {
        if (e.target.files && e.target.files.length === 1) {
            const pickedFile = e.target.files[0]
            console.log(e.target.files[0])
            setFile(pickedFile)


            return;
        }
    }

 

   
const profileImgUpdate = async()=>{
    if(file === null)return
    const imageRef = ref(storage, `${tempImgId}/${file.name}`);
    await uploadBytes(imageRef, file)
    const url = await getDownloadURL(ref(storage,  `${tempImgId}/${file.name}`));
  updateHandler('pic', url)
}


const updateHandler = (type, extra)=>{
    setIsLoading(true)
    if (type === 'pic'){

        updateProfile(auth.currentUser, {
            photoURL: extra
        }).then(() => {
           console.log('profile url updated')
           setPicEditMode(false)

        }).catch((error) => {
            // An error occurred
            // ...
        });
        setIsLoading(false)
    } else{
        updateProfile(auth.currentUser, {
            displayName: name
        }).then(() => {
            console.log('name updated')
            setnameEditMode(false)
            
        }).then(()=>{   
            new Toast({message: 'Name Updated', type: 'success'});
        }).catch((error) => {
            // An error occurred
            // ...
        });
        setIsLoading(false)
    }
}
const emailUpdateHandler = ()=>{
    setIsLoading(true)
    updateEmail(auth.currentUser, userEmail)
    setEmailEditMode(false)
    setIsLoading(false)
}
const updateProfileHandler = ()=>{
    picEditMode && profileImgUpdate()
    nameEditMode && updateHandler('name')
    emailEditMode && emailUpdateHandler()
    
}


const buttonIsValid = nameEditMode || emailEditMode || picEditMode
if(token){


    return(
        <section className="lg:ml-64">
             
        <div className="  hidden  lg:block h-20 shadow-md  lg:flex items-center px-4">
    <h2 className="text-2xl text-blue-base font-bold">Profile </h2>
    </div>

    <article className="mx-auto  lg:w-1/2 ">
        <div className="flex flex-row">

    <img alt="" src={picEditMode ? previewUrl: auth.currentUser.photoURL} className="w-1/2 mt-6 mx-auto h-20 w-20 border-1 rounded-full border-blue-base"/>
    <input type="file" accept=".png, .jpg, .jpeg" onChange={pickFileHandler} className="hidden" ref={pickedFile}/>
    <i onClick={pickImageHandler} className="fa-solid fa-camera text-blue-base my-auto  lg:mr-auto absolute lg:ml-72 ml-52 mt-20 cursor-pointer"/>
        </div>

        <div className=" mx-auto mt-10  grid grid-rows-3 gap-y-4">
            <div className="grid grid-rows-2 gap-y-2 ">

            <label className=" mx-auto w-1/2 text-blue-base" >Username</label>
            <div className="mx-auto w-1/2 flex flex-row justify-between">
            {!nameEditMode ? <button className=" text-sm lg:text-base h-8 rounded-md bg-blue-base text-white w-full border">{auth.currentUser.displayName}</button>:<input  type="text" onChange={nameHandler}  value={name} name="display name" className="text-center text-sm h-8 rounded-md mx-auto w-full  border"/>}<span onClick={nameModeHandler} className="ml-1 text-blue-base"><i className="fa-solid fa-pen"/></span>
            </div>
            </div>
            <div className="grid grid-rows-2 gap-y-2 ">

            <label className="mx-auto w-1/2 text-blue-base">Email</label>
            <div className="mx-auto w-1/2 flex flex-row justify-between">
            {!emailEditMode ? <button className="text-sm lg:text-base h-8 rounded-md bg-blue-base text-white w-full border">{auth.currentUser.email}</button>:<input type="text" onChange={emailHandler} value={userEmail}  name="email" className="text-center h-8 rounded-md mx-auto w-full  border"/>}<span onClick={emailModeHandler} className="ml-1 text-blue-base"><i className="fa-solid fa-pen"/></span>
            </div>
            </div>
            <div className="mt-6 mx-auto w-1/2">

            <button onClick={updateProfileHandler} disabled={!buttonIsValid} className={`${nameEditMode || emailEditMode || picEditMode ?  ' bg-orange-base  text-white  ': 'bg-white text-black'}mx-auto w-full  h-10 rounded-md`}>Save</button>
            </div>
        </div>
    </article>
    {/* <Toast message='welcome to profile'/> */}
        </section>
        )
    }
    else{
        return <Navigate to='/login'/>
    }
}

export default Profile