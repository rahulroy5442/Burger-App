import * as actionTypes from '../actions/action';

const initial={
   Order:[],
    price:4,
    loading:false,
    purchase:false,
    error:false
}

const reducer=(state=initial,action)=>
{
    switch(action.type)
    {
        case actionTypes.error:return{
            ...state,
            error:true,
            loading:false
        }
        case actionTypes.FetchOrder:return{
            ...state,
            Order:action.OrderArray,
            loading:false
        }
        
            case actionTypes.Purchasesuccess:return{
                ...state,
                Order:state.Order.concat(action.OrderForm),
                loading:false,
                purchase:true
            }
            case actionTypes.PurchaseStart:
                return{
                    ...state,
                    loading:true
                }
                case actionTypes.newPurchase:
                    return{
                        ...state,
                        purchase:false
                    }
                default: return state
                
    }
}
export default reducer