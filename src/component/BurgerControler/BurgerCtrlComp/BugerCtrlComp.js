import React from 'react'
import classes from './BugerCtrlComp.module.css'
const ctrl=(props)=>
{
    return (<div className={classes.BuildControl}>
        <div className={classes.Label}> {props.label}</div>
        <button onClick={props.added}>Add</button>

        <button disabled={!props.status} onClick={props.remove}>remove</button>

        </div>)
}
export default ctrl