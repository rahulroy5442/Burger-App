import React, { Component } from 'react';

import Aux from '../Auxilary';
import classes from './Layout.module.css';
import Toolbar from '../../component/Navigation/Toolbar/ToolBar'
import SideDrawer from '../../component/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'
class Layout extends Component{
    state={
        showSideDrawer:false
    }
    sideDrawerhandler=()=>
    {
        this.setState(prevStates=>{
            return {showSideDrawer:!prevStates.showSideDrawer}
        })
    }
    render(){
    return(<Aux>
        <Toolbar auth={this.props.auth} clicked={this.sideDrawerhandler}/>
        <SideDrawer auth={this.props.auth} show={this.state.showSideDrawer} sideDrawerhandler={this.sideDrawerhandler}/>
        <main className={classes.Content}>
         {this.props.children}
        </main>
    </Aux>)
}
}
const states=(state)=>{
    return {
        auth:state.Auth.token
    }
}
export default connect(states,null)(Layout);