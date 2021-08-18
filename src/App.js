import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import BurgerContainer from './container/BurgerCont/BurgerContainer'

import {Redirect, Route,Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
//import asd from './container/OrderContainer/OrderContainer'

import {connect} from 'react-redux'
import * as action from './store/actions/actionType'
import LazyLoading from './hoc/LazyLoading/LazyLoading'
class App extends Component
{
    componentDidMount(){
        console.log("dffdfdfd")
        this.props.ReNewApp()
    }
    render()
    {
        const LazyAuth=LazyLoading(()=>import ('./container/Auth/Auth'))

        const LazyCheckout=LazyLoading(()=>import ('./container/CheckOutContainer/CheckOut'))
        
        const LazyOrderContainer=LazyLoading(()=>import ('./container/OrderContainer/OrderContainer'))
        
        const LazyLogOut=LazyLoading(()=>import ('./container/Auth/Logout/Logout'))
        
        
        let RouteToPath=<Layout>
        <Switch>
            <Route path='/Home' exact component={BurgerContainer} />
            <Route path="/Auth" exact component={LazyAuth}/>
            <Redirect to='/Home'/> 
        
              
            </Switch>   

        </Layout>   

        if(this.props.Authenticated )
        {
            console.log(this.props.Redirect)
            RouteToPath=<Layout>
            <Switch>
           
                <Route path='/Home' exact component={BurgerContainer} />
                <Route path='/checkOut' component={LazyCheckout}/>
                <Route path='/order' component={LazyOrderContainer}/>
                <Route path="/logout" component={LazyLogOut}/>
            <Redirect to={this.props.Redirect}/>
            <Redirect to='/Home'/>
            </Switch>   
                </Layout> 

                
        }

        return (<div>
          {RouteToPath}         
                
            </div>)
    }
}

const states=(state)=>{
    return {
        Authenticated:state.Auth.token,
        Redirect:state.Auth.Redirect
    }
}
const dispatch=(dis)=>{
    return{
        loadAuthComp:()=>dis(action.LoginAFReload()),
        ReNewApp:()=>dis(action.LoginAFReload())
    }
}
export default connect(states,dispatch)(App)