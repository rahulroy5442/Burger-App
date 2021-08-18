import React, { Component } from 'react'
import Layout from '../../hoc/Layout/Layout'
import BurgerComponent from '../../component/BurgerComponent/BurgerComponent'
import Aux from '../../hoc/Auxilary'
import BurgerCtrl from '../../component/BurgerControler/BurgerControler'
import BackDrop from '../../component/UI/BackDrop/BackDrop'
import Model from '../../component/UI/Model/Model'
import CheckList from '../../component/BurgerComponent/CheckList/checklist'
import axios from '../../axios.js'
import Spinner from '../../component/BurgerComponent/Spinner/Spinner'
import Errorhandler from '../../hoc/withErrorHandler/ErrorHandlerWraper'
import classes from './BurgerContainer.module.css'
import * as actionType from '../../store/actions/action';
import {connect} from 'react-redux'
import * as action from '../../store/actions/actionType.js'
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerContainer extends Component
{ 
    state={
        purchasing:false
    }
    
      componentDidMount(){
        
        this.props.OnInitPur()
       // console.log(this.props.ingsStatus ,this.props.redirectP)
     /*   if(this.props.redirectP!='/' && !this.props.ingsStatus)
       {

           this.props.Redirect_Fun('/')
       } */
    }
    RedirectPTH=(value)=>{
      return new Promise((resolve,error)=>{
        this.props.Redirect_Fun(value)
        resolve(value)
      }) 
    }
  Purchasble=async ()=>
  {
    this.props.CheckStatus()
      if(this.props.Auth)
        {
            this.setState({purchasing:true})
        }
        else{
          //  this.props.Redirect_Fun('/checkOut')
          console.log(this.props.redirectP)
         await this.RedirectPTH('/checkOut').then(res=>{
            this.props.history.push('/auth')
         }).catch(res=>{
            console.log(res)
         })
         console.log(this.props.redirectP)
          console.log("checkOut After")
         
        }
  }
  NotPurchasble=()=>
  {
   this.setState({purchasing:false})
  }
  checkOutOrder=()=>
  {
   this.props.OnNewPurchase()
     this.props.history.push('/checkOut') 
  }
  

    OrderButtonChecker=(ingredients)=>{
        const sum=Object.keys(ingredients).map(igKeys=>{
            return ingredients[igKeys]
        }).reduce((a,b)=>{
            return a+b
        },0)

        return sum>0
    }
    render()
    {
      
        let OrderCheck=null;
        let IngridentSt=null;

       
        let BurgerComponentLoader=this.props.error?<div>Ingredient can't be loaded</div>:<Spinner/>
        
        if(this.props.ingrs)
        {
            IngridentSt={...this.props.ingrs}
            for(const a in IngridentSt)
            {
                IngridentSt[a]=IngridentSt[a]>0
              
            
           }
        
             BurgerComponentLoader= ( <Aux><div className={classes.container}><BurgerComponent 
            ingredients={this.props.ingrs}
           />
            <BurgerCtrl ingridentAdded={this.props.AddIngredientsFun}
                purchasableStatus={this.OrderButtonChecker(this.props.ingrs)} 
             ingridentremove={this.props.RemoveIngredientsFun}
              currentprice={this.props.TotalPrice}
              IngridentStatus={IngridentSt}
              purch={this.Purchasble}
              isAuth={this.props.Auth}
              />
              </div></Aux>)
        

       
        OrderCheck= <CheckList ingredients={this.props.ingrs}
        purchaseCancelled={this.NotPurchasble}
        purchaseContinued={this.checkOutOrder}
    
        />;
             }     
     
        
        
       
        return (
            

           

            <Aux>
                <Model purchasing={this.state.purchasing} NotPur={this.NotPurchasble}>
                {OrderCheck}
                    </Model>
              {BurgerComponentLoader}
                </Aux>            
            )
    }
}

const states=state=>{
   return(
       { ingrs:state.burgerBuilder.ingredients,
        TotalPrice:state.burgerBuilder.price,
        error:state.burgerBuilder.error,
        Auth:state.Auth.token,
        redirectP:state.Auth.Redirect,
    
        })
}

const dispatchFun=(dispatch)=>{
    return {
        AddIngredientsFun:(IngName)=>dispatch({type:actionType.Add_Ing,IngredientName:IngName}),
        RemoveIngredientsFun:(IngName)=>dispatch({type:actionType.remove_Ing,IngredientName:IngName}),
        OnInitPur:()=>dispatch(action.OnInitPurchase()),
        OnNewPurchase:()=>dispatch(action.OnNewPurchase()),
        Redirect_Fun:(path)=>dispatch(action.RedirectPath(path)),
        CheckStatus:()=>dispatch(action.checkStatus())
    }
}
export default connect(states,dispatchFun)(Errorhandler(BurgerContainer,axios))