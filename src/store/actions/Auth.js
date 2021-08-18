import axios from "axios"
import * as action from './action'
export const AuthStart=()=>{
    return {
        type:action.Auth_Start
    }
}
export const AuthSucces=(token,UserId)=>{
    return{
        type:action.Auth_Succ,
        idToken:token,
        userId:UserId
    }
}
export const ErrorLoad=()=>{
    return{
        type:action.error
    }
}
export const LoadAppFirst=()=>{
    return{
        type:action.LD_APP_BE_AUTH
    }
}
export const logOut=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{
        type:action.AuthLogOut
    }
}
/* export const RedirectPathSaga=(RE_D_PATH)=>{
    return {
        type:action.SET_PATH,
        path:RE_D_PATH
    }
} */

export const RedirectPath=(RE_D_PATH)=>{
    return{
        type:action.onRedirect,
        path:RE_D_PATH
    }
}
export const TokenExpire=(expirationTime)=>{
   
    return dispatch=>{
        setTimeout(() => {
            dispatch(logOut())
        }, expirationTime*1000);
    }
}

export const  SubmitForm=(Email,password,typeOfInput)=>{
    
    return dispatch=>{
        dispatch(AuthStart())
        const UserDetail={
            email:Email,
            password:password,
            returnSecureToken:true
        }
    
        //login
        let AuthType="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+process.env.REACT_APP_SIGN_IN_UP
    
        if(!typeOfInput)
        {
            //SingUp
             AuthType= "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+process.env.REACT_APP_SIGN_IN_UP
                                                                                    
        }
    axios.post(AuthType,UserDetail).then(response=>{
        console.log("1")
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);

        dispatch(AuthSucces(response.data.idToken,response.data.localId))

        dispatch(TokenExpire(response.data.expiresIn))
    
    }).catch(error=>{
        dispatch(ErrorLoad())
    })
    console.log("2")
    }
  
}

export const LoginAFReload=()=>{
    return dispatch=>{
        const token=localStorage.getItem('token')
        const userId=localStorage.getItem('userId')
        const expirationDate=new Date(localStorage.getItem('expirationDate'))
        
        if(!token)
        {
            dispatch(logOut())
           
        }else if(expirationDate>new Date())
        {
           
            dispatch(AuthSucces(token,userId))
            dispatch(TokenExpire((expirationDate.getTime()-new Date().getTime())/1000))
        }
        else{
           
           dispatch(logOut())
        }
    }
}