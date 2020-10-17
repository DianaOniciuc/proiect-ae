import React, { Component } from 'react';
import './product-card.css';
import axios from 'axios';

export default class ProductCard extends Component { 
  
  handleAddToCart = () => {
    const product = {
      idParfum: this.props.product.idParfum,
      cantitateComandata: 1
    }
    	 axios.post('http://3.131.96.244:8081/adauga-cos', product).then((response) => (
		this.props.refreshCart()
		 )).catch(error => {
		   console.log(error);}
		 )
  }
  
    render(){
        return (
      <div className="el-wrapper">
        <div className="box-up">
          <img className="img" src={this.props.product.image} alt=""></img>
          <div className="img-info">
            <div className="info-inner">
              <span className="p-name">{this.props.product.denumire}</span>
              <span className="p-company">{this.props.product.numeBrand}</span>
            </div>
            <div className="a-size">Grupa de aroma: <span className="size">{this.props.product.grupa}</span></div>
          </div>
        </div>

        <div className="box-down">
          <div className="h-bg">
            <div className="h-bg-inner"></div>
          </div>

          <span role="button" className="cart" onClick={this.handleAddToCart}>
            <span className="price">{this.props.product.pret} RON</span>
            <span className="add-to-cart">
              <span className="txt">Adauga in cos</span>
            </span>
          </span>
        </div>
      </div>
    );
    }
}