import axios from '../../axios'
import * as action from './action'


export const PurchaseSucces=(id,order)=>{
    return {
        type:action.Purchasesuccess,
        OrderId:id,
        OrderForm:order

    }
}
export const PurchaseStart=()=>{
    return {
        type:action.PurchaseStart

    }
}
export const ErrorLoader=()=>{
    return{
        type:action.error
    }
}
export const FetchOrderArray=(order)=>{
    return{
        type:action.FetchOrder,
        OrderArray:order
    }
}

export const PurchaseEnd=()=>{
    return {
        type:action.newPurchase,
        
    }
}

export const OrderForm=(order)=>{
    return (dispatch,getState)=>{
        dispatch(PurchaseStart())
        axios.post( '/orders.json?auth='+getState().Auth.token, order )
        .then( response => {
            dispatch(PurchaseSucces(response.data.name,order))
            dispatch(PurchaseEnd())
            
        } )
        .catch( error => {
            dispatch(ErrorLoader() );
        } ); 
    }
}

export const FetchData=(token,userId)=>{
 
    const TorderListTemp=[]
    return (dispatch)=>{
        dispatch(PurchaseStart())
        const queryPram='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"'
        
axios.get('/orders.json'+queryPram).then(data1=>{
    
         const tempData=data1.data
    for(let key in tempData)
    {

        TorderListTemp.push({...tempData[key],
                             id:key
                            })
    }
    dispatch(FetchOrderArray(TorderListTemp))
 
}).catch((error)=>{
    dispatch(ErrorLoader())
})

    }
}
