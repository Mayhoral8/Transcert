import  {useReducer, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";


const BottomNav = ()=>{

const location = useLocation()

type State = {
  paymentMode: boolean,
  dashboardMode: boolean,
  registerMode: boolean,
  profileMode: boolean
}
  const initialState = {
    paymentMode: false,
    dashboardMode: true,
    registerMode: false,
    profileMode: false
  }
  type Action = {
    type: string
  } 

  const reducerInputs  = (state:State, action:Action)=>{
    if(action.type === 'dashboard' ){
      return {...state, dashboardMode: true, paymentMode:false, registerMode: false, profileMode:false}
    }else if(action.type === 'payment' ){
      return {...state, paymentMode: true, registerMode:false, dashboardMode:false, profileMode:false}
    }else if(action.type === 'register' ){
      return {...state, registerMode: true, dashboardMode:false, paymentMode:false, profileMode:false}
    }else if(action.type === 'profile' ){
      return {...state, profileMode: true, dashboardMode:false, paymentMode:false, registerMode:false}
    }
    return state

  }


  const [state, dispatch] = useReducer(reducerInputs, initialState)
  const dashboardHandler = ()=>{
    return dispatch({type: 'dashboard'})
  }

  const paymentHandler = ()=>{
    return dispatch({type: 'payment'})
  }

  const registerHandler = ()=>{
     dispatch({type: 'register'})
  }
const profileHandler = ()=>{
  dispatch({type: 'profile'})
}

// update UI on browser navigation
useEffect(()=>{
if(location.pathname === '/dashboard'){
    return dispatch({type: 'dashboard'})
}else if(location.pathname === '/registration'){
     return dispatch({type: 'register'})
}else if(location.pathname === '/payment'){
    return dispatch({type: 'payment'})
}else if(location.pathname=== '/profile'){
    return dispatch({type: 'profile'})
}
}, [location.pathname])

    return(
        <>
        <div
                  className={`bottom-nav lg:hidden bottom-0  transition-all ease-in delay-400   z-10 fixed items-center align-middle
                  text-white md:h-32 w-full h-16  gap-x-2 bg-white border grid grid-cols-3 px-2 text-center`}
                >
                  <div
                    onClick={dashboardHandler} className={`text-gray rounded-md ${state.dashboardMode ? 'bg-orange-base text-white': null }`}
                  >
                    <Link to="/dashboard">
                    <button
                        type="button"
                        className={`py-1`}
                      >
                    <img src={state.dashboardMode ? require( './img/dashboard.png') : require('./img/dashboard-black.png')} className="w-4 text-center mx-auto"/>
                    <h4 className="text-xs">Dashboard</h4>
                    </button>
                    </Link>
                  </div>
                  <div
                    onClick={registerHandler} className={`text-gray rounded-md ${state.registerMode ? 'bg-orange-base text-white': null } `}
                  >
                    <Link to="/registration">
                      <button
                        type="button"
                        className={`py-1`}
                       
                      >
           <img src={state.registerMode? require('./img/register.png') : require('./img/register-black.png')} className="w-4 mx-auto"/>
           <h4 className="text-xs">Register</h4>
                      </button>
                    </Link>
                  </div>
                  <div onClick={profileHandler} className={` text-gray rounded-md ${state.profileMode ? 'bg-orange-base text-white ': null }`}>
                    <Link to="/profile">
                      <button
                       className="h-12"
                      >
            <i className="w-4  mx-auto fas fa-user"/>
            <h4 className="mb-3 text-xs">Profile</h4>

                      </button>
                    </Link>
                    </div>
                  </div>
        </>
    )
}

export default BottomNav




// {
//   "rules": {
//     "users": {
//       "$uid": {
//         ".read": "$uid === auth.uid",
//         ".write": "$uid === auth.uid"
//       }
//     }
//   }
// }
