import React from 'react'

import classes from './BackDrop.module.css'

const backDrop=(props)=>
{
    return props.show ?<div className={classes.BackDrop} onClick={props.disableIT}>
         </div>:null
}
export default backDrop