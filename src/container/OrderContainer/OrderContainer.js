import React, { Component } from 'react'
import axios from '../../axios'
import Order from '../../component/Order/Order'
import Errorhandler from '../../hoc/withErrorHandler/ErrorHandlerWraper'
import classes from './OrderContainer.module.css'
import Spinner from '../../component/BurgerComponent/Spinner/Spinner'
import {connect} from 'react-redux'
import * as action from '../../store/actions/actionType'
class OrderContainer extends Component
{
    
    componentDidMount()
    {
     console.log(process.env.NODE_ENV)
        this.props.OrderFetch(this.props.token,this.props.userId)
    }
    render()

    {
        
        let TorderList=[]
        const Data=this.props.OrderArray
    
      if(!this.props.loader)
        {TorderList=Data.map(newData=>(
                
                   <div className={classes.containerblock}><Order ingredient={newData.ingredients}/></div>
                
                ))}

      let OrderLoader=<div className={classes.container}>  {TorderList}</div>

      if(this.props.loader)
      {
          OrderLoader=<Spinner/>
      }

        
        return(<div>
             {OrderLoader}
            </div>)
    }
}
const newstate=(state)=>{
    return{OrderArray:state.order.Order,
    loader:state.order.loader,
    token:state.Auth.token,
    userId:state.Auth.userId}
}
const dispatchFun=(dispatch)=>{
    return{
        OrderFetch:(token,userId)=>dispatch(action.FetchData(token,userId))
    }
}
export default connect(newstate,dispatchFun)(Errorhandler(OrderContainer,axios))