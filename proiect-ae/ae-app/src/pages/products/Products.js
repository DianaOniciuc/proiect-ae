import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import './style.css'
import LogInModal from '../../components/login-modal/LogInModal';
import ShoppingCart from '../../components/shopping-cart/shopping-cart';
import ProductCard from '../../components/product-card/product-card';
// import ProductFilter from '../../components/filters/product-filter';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';


export default class Products extends Component { 
    constructor(props) {
    super(props);
     this.state = {
      showModal: false,
      showCart: false,
      products: [],
      filters: [],
      cart: []
    };
  }
  
  componentDidMount() {
    axios.get('http://3.131.96.244:8081/parfumuri')
        .then(response => this.setState({products: response.data, filters: this.createFiltersFromResponse(response.data)}));
    axios.get('http://3.131.96.244:8081/cos')
        .then(response => this.setState({cart: response.data}));
}
  
    handleClick = () => {
        this.setState({showModal: !this.state.showModal})
    }
    setModalShow = (show) => {
        this.setState({showModal: show})
    }
    
    createFiltersFromResponse = (res) => {
        
    }
    
    handleShowCartModal = () => {
        this.setState({showCart: !this.state.showCart})
    }
    setCartShow = (show) => {
        this.setState({showCart: show})
    }
    
    refreshCart = () => {
         axios.get('http://3.131.96.244:8081/cos')
        .then(response => this.setState({cart: response.data}));
    }
    
    emptyCart = () => {
        this.setState({cart: []})
    }
    
    render(){
        console.log(this.state.products)
        return (
            <div className='product-page container'>
            <div className='page-header'>
            <div className='page-title'><h3><Link to="/">Profum.ro</Link></h3></div>
            <div className='btn btn-cos-cumparaturi' onClick={this.handleShowCartModal}>
            <ShoppingBasketIcon/> Cos de cumparaturi
            </div>
            <ShoppingCart
            show={this.state.showCart}
            onHide={() => this.setCartShow(false)}
            cart={this.state.cart}
            emptyCart={this.emptyCart}
           />
            {this.props.isLoggedIn ? <Link to="/admin">Intra in cont admin</Link> : 
            <button className='btn btn-link btn-login' onClick={this.handleClick}>Logare admin</button>}
          </div>
          <LogInModal 
           show={this.state.showModal}
           onHide={() => this.setModalShow(false)}
           handleLogin={this.props.handleLogin}/>
         { /*  <div className="product-filters">
        //   {this.state.filters.map((filter, index) => (
        //   <ProductFilter
        //     key={index}
        //     filter={filter}
        //   />
        // ))}
        //   </div> */}
           <div className='product-grid'>
           {this.state.products.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            refreshCart={this.refreshCart}
          />
        ))}
        </div>
            </div>
            );
    }
}
