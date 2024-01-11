import React, {useState, useContext, useRef, useEffect} from "react";
import { ContextCreate } from "./context";
import { getAuth, User } from "firebase/auth";
import { storage } from './firebase-config'
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid';
import { Navigate } from "react-router-dom";



const Profile = ()=>{
   type UpdateProfile = {
        displayName?: string | null,
        photoURL?: string | null
   }

  const {profile, auth, ui} =  useContext(ContextCreate)
  const {setMessage, setType, setIsOpen} = profile
  const {token} = auth
  const {setIsLoading} = ui


    // setIsLoading(true)

    
    const userAuth = getAuth()
    const currentUser: User| null = userAuth.currentUser
    const [tempImgId, setTempImgId] = useState(uuidv4())    
    
    
    const [nameEditMode, setnameEditMode] = useState(false)
    const [emailEditMode, setEmailEditMode] = useState(false)
    const [picEditMode, setPicEditMode] = useState(false)
     const [file, setFile] = useState<File>()
     const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>()
     const [isFileValid, setIsFileValid] = useState<boolean>(false)

     const [name, setName] = useState(currentUser?.displayName)
    const [userEmail, setUserEmail] = useState(currentUser?.email)

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


const nameHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setName(e.target.value)
}

const emailHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setUserEmail(e.target.value)
}


     
    const pickedFile = useRef<HTMLInputElement>(null)
    const pickImageHandler = () => {
        setPicEditMode(true)
        pickedFile.current?.click()
    }

    const pickFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length === 1) {
            const pickedFile = e.target.files[0]
            console.log(pickedFile)
            setFile(pickedFile)


            return;
        }
    }

 

   
const profileImgUpdate = async()=>{
    if(file === null)return
    const imageRef = ref(storage, `${tempImgId}/${file?.name}`);
    file && await uploadBytes(imageRef, file)
    const url = await getDownloadURL(ref(storage,  `${tempImgId}/${file?.name}`));
  updateHandler('pic', url)
  console.log('g');
}
const handleOpen = ()=>{
    setIsOpen(true)
}
// interface User {
//     url: string
//   }
function updateProfile(user:User| null, {}:UpdateProfile):void  {

}
function updateEmail(user:User | null, email:string | null | undefined){

}
const updateHandler =  (type: string, extra: string | undefined): void =>{
    setIsLoading(true)
    if (type === 'pic'){
        localStorage.setItem('profilePhoto', JSON.stringify({profilePhoto: extra}))
        updateProfile(currentUser, {
            photoURL: extra
        })
           console.log('profile url updated')
           setPicEditMode(false)
           setIsLoading(false)
    } else{
        updateProfile(userAuth.currentUser, {
            displayName: name
        })
            console.log('name updated')
            setnameEditMode(false)
            setMessage('Name Updated')
            setType('success')
            setIsOpen(true)
            setIsLoading(false)
        }  
    
}
const emailUpdateHandler = ()=>{
    setIsLoading(true)
    updateEmail(currentUser, userEmail)
    setEmailEditMode(false)
    setIsLoading(false)
}
const updateProfileHandler = ()=>{
    picEditMode && profileImgUpdate()
    nameEditMode && updateHandler('name', undefined)
    emailEditMode && emailUpdateHandler()
    
}


const buttonIsValid = nameEditMode || emailEditMode || picEditMode
const retrieveUser = (): string | undefined => {
    const userData = localStorage.getItem('profilePhoto');
    return userData ? JSON.parse(userData).profilePhoto : undefined;
  };
  
if(token){


    return(
        <section className="lg:ml-64">
             
        <div className="hidden  md:flex h-20 shadow-md  lg:flex items-center px-4">
    <h2 className="text-2xl text-blue-base font-bold">Profile </h2>
    </div>

    <article className=" bg-white-01 mt-1 lg:px-56  mx-auto  lg:w-full h-screen  ">
        <div className="flex flex-row">

    <img alt="" src={retrieveUser()} className=" mt-20 mx-auto h-20 w-20  rounded-full border-blue-base"/>
    <input type="file" accept=".png, .jpg, .jpeg" onChange={pickFileHandler} className="hidden" ref={pickedFile}/>
    <i onClick={pickImageHandler} className="fa-solid fa-camera text-blue-base my-auto absolute lg:ml-72 ml-52 mt-20 cursor-pointer"/>
        </div>

        <div className=" mx-auto mt-10  grid grid-rows-3 gap-y-4">
            <div className="grid grid-rows-2 gap-y-2 ">

            <label className=" mx-auto w-1/2 text-blue-base" >Username</label>
            <div className="mx-auto w-1/2 flex flex-row justify-between">
            {!nameEditMode ? <button onClick={handleOpen} className=" text-sm lg:text-base h-8 rounded-md bg-blue-base text-white w-full border">{userAuth.currentUser?.displayName}</button>:<input  type="text" onChange={nameHandler}  value='' name="display name" className="text-center text-sm h-8 rounded-md mx-auto w-full  border"/>}<span onClick={nameModeHandler} className="ml-1 text-blue-base"><i className="fa-solid fa-pen"/></span>
            </div>
            </div>
            <div className="grid grid-rows-2 gap-y-2 ">

            <label className="mx-auto w-1/2 text-blue-base">Email</label>
            <div className="mx-auto w-1/2 flex flex-row justify-between">
            {!emailEditMode ? <button className="text-sm lg:text-base h-8 rounded-md bg-blue-base text-white w-full border">{userAuth.currentUser?.email}</button>:<input type="text" onChange={emailHandler} value=''  name="email" className="text-center h-8 rounded-md mx-auto w-full  border"/>}<span onClick={emailModeHandler} className="ml-1 text-blue-base"><i className="fa-solid fa-pen"/></span>
            </div>
            </div>
            <div className="mt-6 mx-auto w-1/2">

            <button onClick={updateProfileHandler} disabled={!buttonIsValid} className={`${nameEditMode || emailEditMode || picEditMode ?  ' bg-orange-base  text-white  ': 'bg-white text-black'}mx-auto w-full  h-10 rounded-md`}>Save</button>
            </div>
        </div>
    </article>
        </section>
        )
    }
    else{
        return <Navigate to='/login'/>
    }
}

export default Profile