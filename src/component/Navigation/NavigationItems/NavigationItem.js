import React from 'react'
import classes from './NavigationItem.module.css'
import NavigationItem from './NavigationComp/NavigationComp'
const NavG=(props)=>
{
    
    return (<ul className={classes.NavigationItems}>
        <NavigationItem link="/Home"  >Burger Builder</NavigationItem>
        {props.isAuth?<NavigationItem link="/order" >Order</NavigationItem>:null}
        {props.isAuth?<NavigationItem link="/logout" >LogOut</NavigationItem>:<NavigationItem link="/Auth" >Login/SignUp</NavigationItem>}
    </ul>)
}
export default NavG