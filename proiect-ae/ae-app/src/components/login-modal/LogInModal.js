import React, { Component } from 'react';
import './style.css'
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

export default class LogInModal extends Component { 
	 constructor(props) {
    super(props);
     this.state = {
      user: '',
      password: '', 
      loginSuccessful: false
    };
  }
	
	login = () => {
		 const credentials = { user: this.state.user , parola: this.state.password }
		 console.log(credentials)
		 axios.post('http://3.131.96.244:8081/login', credentials).then((response) => (
		 Object.keys(response.data).length !== 0 ? this.props.handleLogin(true) : this.props.handleLogin(false))
		 ).catch(error => {
		   this.props.handleLogin(false);}
		 );
		  
		this.props.onHide();
	}
	
	onPassInputChange = (e) => {
		this.setState({password:e.target.value})
	}
	
	onUserInputChange = (e) => {
		this.setState({user:e.target.value})
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
          Autentificare admin
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <Form>
       
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Nume de utilizator</Form.Label>
    <Form.Control type="text" placeholder="Username" onChange={this.onUserInputChange}/>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Parola</Form.Label>
    <Form.Control type="password" placeholder="Parola" onChange={this.onPassInputChange}/>
  </Form.Group>
  <Button variant="primary" onClick={this.login}>Login</Button>
</Form>
      </Modal.Body>
    </Modal>
        	);
    }
}
