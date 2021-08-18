import classes  from './Input.module.css';
import React from 'react'

const inputField=(props)=>
{
    let inputfield=null;
    const CSSClass=[classes.InputElement]
    const touched=props.istouched
    const valid=props.isValid

    if(touched && !valid)
    {
        CSSClass.push(classes.InvalidElement)
    }

   

    switch(props.typeOfField)
    {
        case('input'):
             inputfield=<input className={CSSClass.join(' ')} {...props.configureFile} value={props.value} onChange={props.changed}/>
            break;
            case('TextArea'):
            inputfield=<input className={CSSClass.join(' ')} {...props.configureFile} value={props.value}  onChange={props.changed}/>
            break;
           
            case('Select'):
            inputfield= (<select
                className={CSSClass.join(' ')}
            
            onChange={props.changed}>

            {props.configureFile.options.map(option => {
              
               return (<option key={option.name} value={option.name}>
                    {option.name}
                </option>)
                })}
                
        </select>)
            break;
        default:
            inputfield = <input
            className={CSSClass.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />;
    }

    return <div className={classes.InputElement}>{inputfield}</div>
}

export default inputField