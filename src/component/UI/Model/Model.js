import React, { Component } from 'react'
import Aux from '../../../hoc/Auxilary'
import classes from './Model.module.css'
import BackDrop from '../BackDrop/BackDrop'

class Model extends Component
{
    shouldComponentUpdate ( nextProps, nextState ) {
       // console.log(nextProps.purchasing !== this.props.purchasing )
        return nextProps.purchasing !== this.props.purchasing || this.props.children!==nextProps.children;
    }
    render(){
    return (
        <Aux>
        <BackDrop show={this.props.purchasing} disableIT={this.props.NotPur}></BackDrop>
        <div className={classes.Modal}
            style={{transform:this.props.purchasing?'translateY(0)':'translateY(-100vh)'}}>
                {this.props.children}
        </div>
        </Aux>
    )
    }
}
export default Model