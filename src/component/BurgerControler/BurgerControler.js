import React from 'react'
import classes from './BurgerControler.module.css'
import BurgerComponent from './BurgerCtrlComp/BugerCtrlComp'
import { connect } from 'react-redux'
const control =[
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]
const BurgerCtrl=(props)=>
{
    
   return( <div className={classes.BuildControls}>
            <p> Current Price {props.currentprice.toFixed(2)}</p>
            
            {control.map(ctrl=>{
                return (<BurgerComponent type={ctrl.type} 
                    label={ctrl.label} 
                    
                    added={()=>props.ingridentAdded(ctrl.type)} 
                remove={()=>props.ingridentremove(ctrl.type)}
                
                status={props.IngridentStatus[ctrl.type]}/>)
            })}
            
               <button 
            className={classes.OrderButton}
            disabled={!props.purchasableStatus}
            onClick={props.purch}>{props.isAuth?"ORDER NOW":"Login to Order"}</button>
        </div>)
}


export default BurgerCtrl