import React, { Component } from 'react';
import { Button, Modal} from 'react-bootstrap';
import axios from 'axios';
import './style.css';

export default class ShoppingCart extends Component { 
	 constructor(props) {
    super(props);
//   this.state = { 
//       products: this.props.cart.length !==0 ? this.props.cart : []
//   }
  }
  
//   componentDidMount() {
//     axios.get('http://3.131.96.244:8081/cos')
//         .then(response => this.setState({products: response.data}));
// }

	finishShopping = () => {
	     axios.delete('http://3.131.96.244:8081/cos')
        .then((response) => {
	        this.props.emptyCart();
		 }).catch(error => {
		   console.log(error);}
		 );
	}
	
    render(){
        return (
    <Modal
      show={this.props.show}
      onHide={this.props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cosul tau de cumparaturi
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       
       {this.props.cart.length !== 0 ? 
       this.props.cart.map((product, index) => (
           <div className="basket-item" key={index}>
           <img className="img img-small" src={product.image}></img>
           <div>{product.denumire} - </div>
           <div>{product.numeBrand} - </div>
           <div>{product.co.cantitateComandata} buc. - </div>
           <div>{product.pret} RON</div>
           </div>
       ))
       : "Momentan nu exista produse in cos."}
 
      {this.props.cart.length !== 0 && <Button variant="primary" onClick={this.finishShopping}>Finalizeaza comanda</Button>}
      </Modal.Body>
    </Modal>
        	);
    }
}
