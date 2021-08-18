import axios from '../../axios'
import * as action from './action'


export const LoadIngs=(Ings)=>{
    return {
        type:action.LoadBurger,
        Ingredient:Ings

    }
}
export const OnNewPurchase=()=>{
    return{
        type:action.newPurchase
    }
}
export const ErrorLoader=()=>{
    return{
        type:action.error
    }
}
export const checkStatus=()=>{
    return {
        type:action.CH_ING
    }
}
export const OnInitPurchase=()=>{
    return dispatch=>{
        
        axios.get( '/ingredients.json')
        .then( response => {
            dispatch(LoadIngs(response.data))   
          dispatch(checkStatus())         
        } )
        .catch( error => {
            dispatch(ErrorLoader())
        } ); 
    }
}

