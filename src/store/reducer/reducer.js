import * as actionTypes from '../actions/action';

const initial={
    ingredients:null,
    price:4,
    error:false,
    Typestatus:false
}
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};
const checkstates=(ings)=>{
    if(!ings)
    {
        return false
    }
    
    for(let q in ings)
    {
        if(ings[q]!==0)
        {
            return true
        }
    }
    return false
}
const reducer=(state=initial,action)=>
{

    switch(action.type)
    {
        case actionTypes.CH_ING:return{
            ...state,
            Typestatus:checkstates(state.ingredients)
        }
        case actionTypes.error:return{
            ...state,
            error:true
        }
        case actionTypes.Add_Ing:return {
            ...state,
            ingredients:
                    {
                        ...state.ingredients,
                        [action.IngredientName]:state.ingredients[action.IngredientName]+1
                    },
                    price:state.price+INGREDIENT_PRICES[action.IngredientName]
                

            }
            
            case actionTypes.remove_Ing:return {
                ...state,
                ingredients:
                        {
                            ...state.ingredients,
                            [action.IngredientName]:state.ingredients[action.IngredientName]-1
                        },
                        price:state.price-INGREDIENT_PRICES[action.IngredientName]
                
                    
    
                }

                case actionTypes.LoadBurger:return{
                    ...state,
                    ingredients:{...action.Ingredient},
                    price:4
                }
            
                default: return state
                
        }
}
export default reducer