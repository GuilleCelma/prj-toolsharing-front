import React,{useState} from 'react';
import Signup from './signup';
import Login from './login'

function Popup(){

    const[isShowLogin, setIsShowLogin]=useState(true)

    function toggleShowLogin(){
      setIsShowLogin(!isShowLogin)
    }

   return( <div className="popup">
   {isShowLogin && <Login/>}
   {!isShowLogin && <Signup/>}

   <button onClick={toggleShowLogin}>{isShowLogin?'Aún no tienes cuenta? registrate':'Ya tienes cuenta? Inicia sessión'}</button>
    
    </div>)



}

export default Popup;