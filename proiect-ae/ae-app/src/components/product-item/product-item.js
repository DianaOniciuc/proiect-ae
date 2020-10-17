import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';

export default class ProductListItem extends Component { 
     constructor(props) {
    super(props);
    this.state = {
        disabled: true,
        denumire: this.props.product.denumire,
        numeBrand: this.props.product.numeBrand,
        grupa: this.props.product.grupa,
        pret: this.props.product.pret,
        cantitate: this.props.product.cantitate
    }
  }
  
  handleEdit = () => {
      this.setState({disabled: false})
  }
  
  handleCancel = () => {
       this.setState({disabled: true})
  }
  
  handleUpdate = () => {
      const produsNou = {
        denumire: this.state.denumire,
        pret: this.state.pret,
        grupa: this.state.grupa,
        cantitate: this.state.cantitate,
        numeBrand: this.state.numeBrand,
      }
       axios.put('http://3.131.96.244:8081/actualizare-parfum/'+this.props.product.idParfum, produsNou)
       .then((response) => {
		 if(Object.keys(response.data).length !== 0) {
		     this.setState({
                denumire: response.data.denumire,
                numeBrand: response.data.numeBrand,
                grupa: response.data.grupa,
                pret: response.data.pret,
                cantitate: response.data.cantitate
		     })
		 }
		 }).catch(error => {
		   console.log(error);}
		 );
       this.setState({disabled: true})
  }
  
  handleDelete = () => {
      axios.delete('http://3.131.96.244:8081/stergere-parfum/'+this.props.product.idParfum)
       .then((response) => {
		this.props.refreshList();
		 }).catch(error => {
		   console.log(error);}
		 );
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
      <div className="product-list-item">
       <input className="li-denumire" type="text" value={this.state.denumire}
       disabled={this.state.disabled} onChange={this.setDenumire}/>
       <input type="text" value={this.state.numeBrand}
       disabled={this.state.disabled} onChange={this.setNumeBrand}/>
       <input type="text" value={this.state.grupa} 
       disabled={this.state.disabled} onChange={this.setGrupa}/>
       <input className="li-pret" type="text" value={this.state.pret}
       disabled={this.state.disabled} onChange={this.setPret}/>
       <input className="li-cantitate" type="text" value={this.state.cantitate} 
       disabled={this.state.disabled} onChange={this.setCantitate}/>
       {this.state.disabled ? <button className="btn btn-link" onClick={this.handleEdit}>Editeaza</button> :
       <div>
       <button className="btn btn-link" onClick={this.handleUpdate}>Salveaza</button>
       <button className="btn btn-link" onClick={this.handleCancel}>Renunta</button>
       </div>
       }
       <div className="delete-icon" role="button" onClick={this.handleDelete}><DeleteIcon/></div>
      </div>
    );
    }
}