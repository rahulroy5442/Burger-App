import React from 'react'
import Aux from '../../../hoc/Auxilary'
import Button from '../../UI/Button/button'
const CheckList=(props)=>
{
    const ingredientSummary = Object.keys( props.ingredients )
        .map( igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
                </li> );
        } );

    return (<Aux>
        <div >
            <h3>Your Order</h3>
            <p>What a Burger!</p>
            <ul>
                {ingredientSummary}
                </ul>

                <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button  btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
            
        </div>
    </Aux>)


}

export default CheckList