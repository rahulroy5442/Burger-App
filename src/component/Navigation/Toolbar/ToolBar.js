import React from 'react'
import classes from './ToolBar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItem from '../NavigationItems/NavigationItem'
import MenuButton from '../SideDrawer/MenuButton/MenuBotton'
import { connect } from 'react-redux'
const Toolbar=(props)=>
{
    return (<div className={classes.ToolBar}>
        <MenuButton clicked={props.clicked}></MenuButton>
        <div className={classes.Logo}>
            <Logo />
        </div>

        <nav className={classes.disableBar}>
        <NavigationItem isAuth={props.auth}/>
        </nav>
    </div>)
}

export default Toolbar