import React, { Component } from 'react'

import Aux from '../../hoc/Auxilary'


import axios from '../../axios.js'

import Errorhandler from '../../hoc/withErrorHandler/ErrorHandlerWraper'
import CheckOutOrder from '../../component/CheckOut/CheckOutOrder/checkOutSummary'
import PersonalInfo from './Personalinfo/PersonalInfo'
import queryString from 'query-string';
import {Redirect, Route} from 'react-router-dom'
import Button from '../../component/UI/Button/button'
import {connect} from 'react-redux'
class CheckOut extends Component
{ 
    state = {
       ingredients:{},
       TotalPrice:0
    }
   
    continuePurchase=()=>{
        this.props.history.replace('/checkOut/contactDetails')
    }
    cancelPurchase=()=>{
        this.props.history.goBack();
    }
    render()
    {
    
        let checkOut=<Redirect to='/Home'/>
        console.log("Ragw")
        if(this.props.ingrs)
             {
                 const redirect=this.props.purchase?<Redirect to='/Home'/>:null
                 checkOut=  <div>    
                     {redirect}
            <CheckOutOrder ingredients={this.props.ingrs} continueOrder={this.continuePurchase} cancelOrder={this.cancelPurchase}/>
            <Route path={this.props.match.path+"/contactDetails"} component={PersonalInfo}/>
            </div>
            }
        return<Aux> {checkOut}</Aux>
    }
}
const states=(state)=>{
    return{
        ingrs:state.burgerBuilder.ingredients,
        purchase:state.order.purchase}
}
export default connect(states,null)(Errorhandler(CheckOut,axios))