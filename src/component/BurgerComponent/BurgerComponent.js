import React from 'react'
import BurgerIngredient from './BurgerIngrident/BurgerIngredient'
import classes from './BurgerComponent.module.css'
const BurgerComponent=(props)=>
{
    let Ingrident=Object.keys(props.ingredients).map(keys=>{
        return [...Array(props.ingredients[keys])].map((_,i)=>{
            return <BurgerIngredient key={keys+i} type={keys} />
        })
    })
    
    const Integrate=Object.keys(props.ingredients).map(keys=>{
        
            return props.ingredients[keys]    
    }).reduce((e1,e2)=>
    {
        return e1+e2
    },0)
    if(Integrate===0)
    {
        Ingrident="Please insert"
    }
    return (
        <div className={classes.Burger}>
        <BurgerIngredient type="bread-top" />
        {Ingrident}
        <BurgerIngredient type="bread-bottom" />
    </div>

    );
};
export default BurgerComponent