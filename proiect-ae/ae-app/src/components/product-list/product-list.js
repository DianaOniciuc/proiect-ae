import React, { Component } from 'react';
import axios from 'axios';
import './style.css'
import ProductListItem from '../../components/product-item/product-item'
import AddProductModal from '../../components/add-product/add-product';
import AddIcon from '@material-ui/icons/Add';

export default class ProductList extends Component { 
     constructor(props) {
    super(props);
     this.state = {
      products: [],
      showModal: false
    };
  }
     componentDidMount() {
    axios.get('http://3.131.96.244:8081/parfumuri')
        .then(response => this.setState({products: response.data}));
    // axios.get('http://3.131.96.244:8081/cos')
    //     .then(response => this.setState({products: response.data}));
}

refreshList = () => {
     axios.get('http://3.131.96.244:8081/parfumuri')
        .then(response => this.setState({products: response.data}));
}

 handleClick = () => {
        this.setState({showModal: !this.state.showModal})
    }
setModalShow = (show) => {
        this.setState({showModal: show})
    }

    render(){
        return (
      <div className="product-list">
       <h5 className="mb-3">Lista produse</h5>
       <div role="button" className='add-product' onClick={this.handleClick}> 
       <AddIcon/> Adauga produs
       </div>
       <AddProductModal
       show={this.state.showModal}
       onHide={() => this.setModalShow(false)}
       refreshList={this.refreshList}
       />
       <div className="list-header"> 
       <h6>Denumire</h6>
       <h6>Brand</h6>
       <h6>Grupa</h6>
       <h6>Pret</h6>
       <h6>Cantitate</h6>
       <h6> </h6>
       <h6> </h6>
       </div>
       <div className="product-list-content">
       {this.state.products.map((product, index) => (
       <ProductListItem
            key={index}
            product={product}
            refreshList={this.refreshList}
          />
        ))}
        </div>
      </div>
    );
    }
}