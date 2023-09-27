import {React, useEffect, useContext} from 'react'
import styled from "styled-components"
import Aos from "aos";
import "aos/dist/aos.css";
import { ContextCreate } from './context';

const Overlay = ()=> {
  useEffect(() => {
    Aos.init({ duration: 600 });
  }, []);

  const { overlay} = useContext(ContextCreate)


  if(overlay){

    return (
      <ModalStyle>
   <div></div>
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
z-index: 10;
align-items: center;
justify-content: center;
background: rgba(0, 0, 0, 0.5);
`;
export default Overlay 