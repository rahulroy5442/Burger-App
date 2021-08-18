import * as actionTypes from '../actions/action';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    Redirect:'/Home',
    shouldLoad:null
};

const authStart = ( state, action ) => {
    return {...state, 
        
        error: null, 
        loading: true 
     };
};

const authSuccess = (state, action) => {
    return  {...state, 
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    };
};

const Path_RE=(state,action)=>{
    return{
        ...state,
        Redirect:action.path
    }
}

const authFail = (state, action) => {
    return {...state, 
        error: action.error,
        loading: false}
    ;
};

const authLogout = (state) => {

    return {...state, token: null, userId: null };
};
const LoadAppFirst=(state)=>{
    return {...state,shouldLoad:true}
}
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.Auth_Start: return authStart(state, action);
        case actionTypes.Auth_Succ: return authSuccess(state, action);
        case actionTypes.Auth_Fail: return authFail(state, action);
        case actionTypes.AuthLogOut: return authLogout(state);
        case actionTypes.SET_PATH:return Path_RE(state,action);
        case actionTypes.LD_APP_BE_AUTH:return LoadAppFirst(state)
        default:
            return state;
    }
};

export default reducer;