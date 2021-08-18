import React ,{Component}from 'react'

import {Redirect, Route,Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import * as action from '../../../store/actions/actionType'
class LogO extends Component
{
    componentWillMount(){
        this.props.Logout()
    }

    render(){
        return (
            <Redirect to='/' />)
    }
}
const dispatchFun=(dispatch)=>{
    return {
        Logout:()=>dispatch(action.logOut())
    }
}
export default connect(null,dispatchFun)(LogO)