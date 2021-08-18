import React from 'react'
import classes from './SideDrawer.module.css'
import Logo from '../../Logo/Logo'
import NavigationItem from '../NavigationItems/NavigationItem';

import BackDrop from '../../UI/BackDrop/BackDrop'
import Aux from '../../../hoc/Auxilary'
import { connect } from 'react-redux';
const SideDrawer=(props)=>
{
    let CSSHandler=[classes.SideDrawer,classes.Close]
    if(props.show)
    {
        CSSHandler=[classes.SideDrawer,classes.open]
    }
    return (
    <Aux>
        <div className={classes.BackGroundTrasn}>
        <BackDrop show={props.show}  disableIT ={props.sideDrawerhandler} />
        </div>


        <div className={CSSHandler.join(" ")}>
        
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav>
                <NavigationItem isAuth={props.auth}/>
            </nav>
        </div>

    </Aux>)
}

export default SideDrawer