import React, {useContext} from "react";

import { ContextCreate } from "./context";


const Graduation = (props)=>{
    console.log(props.value)
    const {setSessionOfGraduation} = useContext(ContextCreate)
return(<>

                      <option value={props.value}>{props.value}</option>
</>)

}

export default Graduation