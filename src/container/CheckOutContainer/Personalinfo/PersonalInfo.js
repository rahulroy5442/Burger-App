import React, { Component } from 'react'
import Button from '../../../component/UI/Button/button'

import Aux from '../../../hoc/Auxilary'
import classes from './PersonalInfo.module.css'
import axios from '../../../axios'
import Spinner from '../../../component/BurgerComponent/Spinner/Spinner'
import Input from '../../../component/UI/Input/Input'
import {connect} from 'react-redux'
import * as action from '../../../store/actions/actionType'
class PersonalInfo extends Component
{
    state = {
       FormDetail:
       {
            Name:{
                typeOfField:'input',
                configureFile:{
                    type:'text',
                    placeholder:'Name'
                },
                value:'',
                validation:{
                    require:true
                },
                valid:false,
                touched:false
            },
            Email:{
                typeOfField:'input',
                configureFile:{
                    type:'text',
                    placeholder:'Email'
                },
                validation:{
                    require:true
                },
                value:'',
                valid:false,
                touched:false
            },
            PhoneNumber:{
                typeOfField:'input',
                configureFile:{
                    type:'text',
                    placeholder:'Phone Number'
                },
                validation:{
                    require:true,
                    minLength:5,
                    maxLength:10
                },

                value:'',
                valid:false,
                touched:false
            },
            Country:{
                typeOfField:'input',
                configureFile:{
                    type:'text',
                    placeholder:'Country'
                },
                validation:{
                    require:true
                },
                value:'',
                valid:false,
                touched:false
            },
            States:{
                typeOfField:'Select',
                configureFile:{
                   options:[
                       {name:"WB"},
                       {name:"Karnataka"},
                       {name:"J&K"}
                    ]
                },
                validation:{
                    require:true
                },
                value:'', 
                valid:false,
                touched:false
            },
            Street:{
                typeOfField:'input',
                configureFile:{
                    type:'text',
                    placeholder:'Street'
                },
                validation:{
                    require:true
                },
                value:'',
                valid:false,
                touched:false
            },
            Pin:{
                typeOfField:'input',
                configureFile:{
                    type:'text',
                    placeholder:'Pin'
                },
                validation:{
                    require:true
                },
                value:'',
                valid:false,
                touched:false
            }
       }
        ,
    
        isFormValid:false
    }
    submitDetail=(event)=>
    {
        event.preventDefault();

        const form={...this.state.FormDetail}
        const formData={}
        
        formData["Name"]=form.Name.value
        formData["Email"]=form.Email.value

        formData["Address"]={
            Street:form.Street.value,
            ZipCode:form.Pin.value,
            Country:form.Country.value,
            Phone:form.PhoneNumber.value,
            State:form.States.value
        }
      
        const order = {
            ingredients: this.props.ingrs,
            price: this.props.TotalPrice,
            customer: {...formData},
            userId:this.props.userId
        }

        this.props.OnorderConfirm(order)
      /*  */
    }
    OnchnageFunc=(event,id)=>{
        let formValid=true
        const OrderForm={
            ...this.state.FormDetail
        }
    
       const values=event.target.value
        const Field={...OrderForm[id]}

        
        Field.value=values;
        Field.touched=true
        Field.valid=this.checkValidity(Field.validation,values)
        OrderForm[id]=Field

        for(let a in OrderForm)
        {
            if(OrderForm[a].validation.require)
            {
                formValid=formValid && OrderForm[a].valid
        
            }
        }
      
        this.setState({FormDetail:OrderForm,isFormValid:formValid})
        
    }

    checkValidity=(validity,values)=>{
        let result=true;
        if(!validity)
        {
            return true;
        }

        if(validity.require)
        {
            result= values.trim()!=='' && result 
        }
      
        if(validity.minLength)
        {
            result=validity.minLength<values.length && result
        }
        if(validity.maxLength)
        {
            result=validity.maxLength>values.length && result
        }

        return result
    }

   
   
    render()
    {
        const Form=this.state.FormDetail
        let MainForm=[]
        
        for(let form in Form)
        {
          
            MainForm.push(<Input key={form}
                 typeOfField={Form[form].typeOfField}
                 value={Form[form].value}
                 configureFile={Form[form].configureFile} 
                 istouched={Form[form].touched}
                 isValid={Form[form].valid}
                 validation={Form[form].validation}
                changed={(event)=>{this.OnchnageFunc(event,form)}} />)

                
        }
     
        let formLoader=<div className={classes.PeronalContainer}>
        <form onSubmit={this.submitDetail}>
            <div>
         {MainForm}
         </div>
             <Button btnType="Success" disabled={!this.state.isFormValid}>
                    Order
                </Button> 
        </form>
            </div>


            if(this.props.loading)
            {
                formLoader=<Spinner/>
            }
        return(
                <Aux>
                
                        {formLoader}
                </Aux>
        )
    }
}
const stateHandler=(state)=>{
    return {
        ingrs:state.burgerBuilder.ingredients,
        TotalPrice:state.burgerBuilder.price,
        loading:state.order.loading,
        userId:state.Auth.userId
    }
}

const dispatchHandler=(dispatch)=>{
    return{
        OnorderConfirm:(order)=>dispatch(action.OrderForm(order))
    }
}
export default connect(stateHandler,dispatchHandler)(PersonalInfo)