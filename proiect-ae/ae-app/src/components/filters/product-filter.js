import React, { Component } from 'react';
import './style.css'

export default class ProductFilter extends Component { 
     constructor(props) {
    super(props);
  }
    render(){
        return (
     <div>{this.props.filter}</div>
    );
    }
}

