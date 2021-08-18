import React from 'react'
import Aux from '../../hoc/Auxilary'
import Button from '../UI/Button/button';
const Order=(props)=>
{
    
    

    const ingredients = [];
    
    for ( let ingredientName in props.ingredient ) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredient[ingredientName]
            }
        );
    }

    const ingredientOut=ingredients.map(ig=>{
       return <span style={
            {
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }
        } key={ig.name}>
            {ig.name}:{ig.amount}
        </span>
    })


        return(
    
           
        <div>
             Ingrident:<div> {ingredientOut}</div>
            </div>)
    
}
export default Order