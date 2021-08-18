import React,{ Component } from 'react';
import Aux from '../../hoc/Auxilary'
import Input from '../../component/UI/Input/Input'
import Button from '../../component/UI/Button/button'
import classes from './Auth.module.css'
import {connect} from 'react-redux'
import Errorhandler from '../../hoc/withErrorHandler/ErrorHandlerWraper';
import * as action from '../../store/actions/actionType'
import Spinner from '../../component/BurgerComponent/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
class Auth extends Component
{
    state={
        FormDetail:{
        Email:{
            typeOfField:"input",
            value:'',
            configureFile:{
                type:'text',
                placeholder:'Email'
            },
            validation:
            {
                require:true
            ,isEmail:true},
            valid:false
            ,touched:false
        },
        Password:{
            typeOfField:"input",
            value:'',
            configureFile:{
                type:'text',
                placeholder:'Password'  
            },
            validation:
            {
                require:true,
                minLength:6},
            valid:false
            ,touched:false
        }
        },
        isFormValid:false,
        isSingIn:true
    }
  
    
  
     componentDidMount() {
        //this.props.CheckStatus()
    
       if (!this.props.IngStatus && this.props.Red_irect !== '/Home') {
        this.props.onSetAuthRedirectPath();
    } 
    //this.asyncCall()

    }

    checkValidity ( value, rules ) {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }
    FormValidity=(Form)=>{

        let isValid=true
        for(let q in Form)
        {
            isValid=isValid && Form[q].valid
        }
        return isValid
    }
    formSubmit=(event)=>
    {
        event.preventDefault()
        this.props.onAuth(this.state.FormDetail.Email.value,this.state.FormDetail.Password.value,this.state.isSingIn)
    }
    inputChange=(event,q)=>{
        
        const Form={...this.state.FormDetail}    
        const Value=event.target.value
        
        Form[q].value=Value

        const validation=this.checkValidity(Value,Form[q].validation)
        Form[q].valid=validation
        Form[q].touched=true
        const FormValidity=this.FormValidity(Form)
        this.setState({FormDetail:Form,isFormValid:FormValidity})
    }
    switchType=()=>{
        this.setState(prevState=>{
            return {isSingIn:!prevState.isSingIn}
        })
    }
    render(){

        console.log("Auth")
        let InputField=[]

        let Field={...this.state.FormDetail}

        for(let q in Field)
        {
        InputField.push(<Input 
            key={q}
        typeOfField={Field[q].typeOfField} 
        
        value={Field[q].value}
        
        istouched={Field[q].touched}
        
        isValid={Field[q].valid}
        
        validation={Field[q].validation}

        configureFile={Field[q].configureFile} changed={(event)=>{this.inputChange(event,q)}} />)
        }
   
        let AuthLoader=(<Aux>
            
             <div className={classes.Auth}>
        <form onSubmit={this.formSubmit}>
            {InputField}
                <Button btnType="Success" disabled={!this.state.isFormValid}>
                     Login
                </Button> 
            </form>
            <Button btnType="Success" clicked={this.switchType}>
                Switch To{ this.state.isSingIn?" SignUp":" SignIn" }
            </Button>
            </div>
            </Aux>)

        if(this.props.loading)
        {
            AuthLoader=<Spinner/>
        }
        return (<Aux>
                {AuthLoader}
                </Aux>)

    }


}
const states=(state)=>{
    return{loading:state.Auth.loading,
    error:state.Auth.error,
    tok:state.Auth.token,
    Red_irect:state.Auth.Redirect,
    IngStatus:state.burgerBuilder.Typestatus}
}
const dispatcher=(dispatch)=>{
    return{
        onAuth:(Email,password,typeOFLogin)=>dispatch(action.SubmitForm(Email,password,typeOFLogin)),
       onSetAuthRedirectPath:()=>dispatch(action.RedirectPath('/Home')),
       CheckStatus:()=>dispatch(action.checkStatus())
    }
}
export default connect(states,dispatcher)(Auth)