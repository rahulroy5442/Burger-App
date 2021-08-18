import React from 'react'
import Aux from '../../../hoc/Auxilary'
import BurgerComponent from '../../BurgerComponent/BurgerComponent'
import Button from '../../UI/Button/button'
import classes from './checkOutSummaryCSS.module.css'
const checkOutSumm=(props)=>
{
   
    return (
        <Aux>
        <div className={classes.container}>
            <h1>It's Look Cool</h1>
            
            <div className={classes.a} >
                <BurgerComponent ingredients={props.ingredients}/>
             </div>
            
            
            <div className={classes.b}>
    
            <Button clicked={props.continueOrder} btnType='Success'>continue</Button>
            <Button clicked={props.cancelOrder} btnType='Danger'>cancel</Button>

             </div>
    </div>
    
</Aux>
    );
};
export default checkOutSumm