import React, { Component } from 'react';
import './style.css'
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

export default class AddProductModal extends Component { 
	 constructor(props) {
    super(props);
     this.state = {
        denumire: '',
        numeBrand: '',
        grupa: '',
        pret: '',
        cantitate: ''
    };
  }
	
	saveProduct = () => {
		 const product = { 
		    denumire: this.state.denumire,
            pret: this.state.pret,
            grupa: this.state.grupa,
            cantitate: this.state.cantitate,
            numeBrand: this.state.numeBrand,
            image: ""
		 }
		 axios.post('http://3.131.96.244:8081/adaugare-parfum', product).then((response) => (
		 this.props.refreshList()
		 )).catch(error => {
		   console.log(error);}
		 )
		this.props.onHide();
	}
	
 setDenumire = (e) => {
      this.setState({denumire:e.target.value})
  }
  
  setNumeBrand = (e) => {
      this.setState({numeBrand:e.target.value})
  }
  
  setGrupa = (e) => {
      this.setState({grupa:e.target.value})
  }
  
  setPret = (e) => {
      this.setState({pret:e.target.value})
  }
  
  setCantitate = (e) => {
      this.setState({cantitate:e.target.value})
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
          Adauga un produs nou
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <Form>
       
  <Form.Group controlId="formBasicProductName">
    <Form.Label>Denumire produs</Form.Label>
    <Form.Control type="text" placeholder="Exemplu: Tresor..." onChange={this.setDenumire}/>
  </Form.Group>

  <Form.Group controlId="formBasicBrand">
    <Form.Label>Brand parfum</Form.Label>
    <Form.Control type="text" placeholder="Exemplu: Paco Rabanne..." onChange={this.setNumeBrand}/>
  </Form.Group>
  
  <Form.Group controlId="formBasicGroup">
    <Form.Label>Grupa de aroma</Form.Label>
    <Form.Control type="text" placeholder="Exemplu: fructat..." onChange={this.setGrupa}/>
  </Form.Group>

  <Form.Group controlId="formBasicPrice">
    <Form.Label>Pret</Form.Label>
    <Form.Control type="number" onChange={this.setPret}/>
  </Form.Group>
  
  <Form.Group controlId="formBasicQty">
    <Form.Label>Cantitate</Form.Label>
    <Form.Control type="number" onChange={this.setCantitate}/>
  </Form.Group>
  
  <Button variant="primary" onClick={this.saveProduct}>Salveaza</Button>
</Form>
      </Modal.Body>
    </Modal>
        	);
    }
}
