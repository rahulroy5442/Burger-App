import React from 'react'
import BurgerLogo from '../../asset/img/burger-logo.png' 
import classes from './Logo.module.css'
const Logo =(props)=>
{
    return (<div className={classes.Logo}>
        <img src={BurgerLogo} alt="Logo"></img>
    </div>)
}
export default Logo