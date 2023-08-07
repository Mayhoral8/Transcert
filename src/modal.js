import {React, useEffect, useContext} from 'react'
import styled from "styled-components"
import Aos from "aos";
import "aos/dist/aos.css";
import { ContextCreate } from './context';

const Modal = ()=> {
  useEffect(() => {
    Aos.init({ duration: 600 });
  }, []);

  const {setOpenModal, openModal, modalMsg, logout} = useContext(ContextCreate)


  if(openModal){

    return (
      <ModalStyle>
    <div className='py-4 bg-white grid grid-rows-3 w-full lg:w-96 mx-6 h-48 text-center rounded-md border-orange-base '   data-aos="fade-up"
                  data-aos-easing="ease-in"
                  data-aos-duration="600">
        <h1 className='text-start text-lg px-4 font-bold mt-4'>Sign out?</h1>
        <p className='text-sm  text-start px-4'>{modalMsg}</p>
        <div className='grid grid-flow-col ml-auto gap-x-2 px-4'>
        <button onClick={()=> setOpenModal(false)} className=' text-red border-2 border-red text-gray w-20 h-8  rounded-md  '>No</button>
        <button onClick={()=> logout()} className='bg-orange-base border-2 t border-orange-base w-20 h-8 text-white rounded-md '>Yes</button>
        </div>
        </div>
    </ModalStyle>
        )
        
      
    }else{
      return null
    }
     

}


const ModalStyle = styled.div`
position: fixed;
top: 0;
bottom: 0;
right: 0;
left: 0;
display: flex;
z-index: 20;
align-items: center;
justify-content: center;
background: rgba(0, 0, 0, 0.8);
`;
export default Modal 