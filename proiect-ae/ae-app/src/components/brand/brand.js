import React, { Component } from 'react';
import axios from 'axios';
import './style.css'

export default class Brand extends Component { 
     constructor(props) {
    super(props);
     this.state = {
     brands: [],
     brandNou: '',
    };
  }
     componentDidMount() {
    axios.get('http://3.131.96.244:8081/brands')
        .then(response => this.setState({brands: response.data}));
}

refreshList = () => {
     axios.get('http://3.131.96.244:8081/brands')
        .then(response => this.setState({brands: response.data}));
}

setBrand = (e) => {
    this.setState({brandNou: e.target.value})
}

addBrand = () => {
		 const brand = { 
		    nume: this.state.brandNou
		 }
		 if(this.state.brandNou!=='') {
		 axios.post('http://3.131.96.244:8081/adaugare-brand', brand).then((response) => {
		 this.setState({brandNou: ""}) 
		  this.refreshList();}
		 ).catch(error => {
		   console.log(error);}
		 );
		 this.refreshList();
		 }
	}


    render(){
        return (
      <div className="brand-list">
      <h5 className="mb-3">Lista branduri disponibile</h5>
      <div className="add-brand">
      <label>Adauga brand: </label>
      <input type="text" value={this.state.brandNou} onChange={this.setBrand}/>
      <button className="btn btn-primary" onClick={this.addBrand}>Adauga</button>
      </div>
       {this.state.brands.map((brand, index) => (
       <span key={index}>{brand.nume}</span>
        ))}
      </div>
    );
    }
}