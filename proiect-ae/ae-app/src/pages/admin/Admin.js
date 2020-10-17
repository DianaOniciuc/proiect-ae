import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './style.css'
import ProductList from '../../components/product-list/product-list'
import Brand from '../../components/brand/brand'

export default class Admin extends Component { 
     constructor(props) {
    super(props);
     this.state = {
      showProduse: true,
      showComenzi: false,
      showBranduri: false,
    };
  }

handleMenuOptionClick = (option) => {
  if(option===1) {
                this.setState({
                    showProduse: true,
                    showBranduri: false,
                    showComenzi: false
                })
            };
    if(option===2)  {
                this.setState({
                    showProduse: false,
                    showBranduri: true,
                    showComenzi: false
                })
            };
    if(option===3) {
                this.setState({
                    showProduse: false,
                    showBranduri: false,
                    showComenzi: true
                })
            };
}
    
    render(){
        return (
            <div>
        <h3>Pagina administrator</h3>
         <Link to="/">Inapoi la pagina principala</Link>
         <Link to="/" onClick={() => this.props.handleLogin(false)} style={{marginLeft: '20px'}}>Delogare</Link>
         <div className="admin-content row">
         <div className="side-menu col-2">
         <h4>Meniu</h4>
         <ul>
         <li id='1' onClick={() => this.handleMenuOptionClick(1)} className={this.state.showProduse ? "selected" : ""}>Produse</li>
         <li id='2' onClick={() => this.handleMenuOptionClick(2)} className={this.state.showBranduri ? "selected" : ""}>Branduri</li>
         <li id='3' onClick={() => this.handleMenuOptionClick(3)} className={this.state.showComenzi ? "selected" : ""}>Comenzi</li>
         </ul>
         </div>
         <div className="page-content col-10">
         {this.state.showProduse && <ProductList />}
         {this.state.showBranduri && <Brand/>}
         {this.state.showComenzi&& "Comenzi"}
         </div>
         </div>
         </div>
        );
    }
}
