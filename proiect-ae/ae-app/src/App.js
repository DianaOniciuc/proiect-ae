import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Admin from './pages/admin/Admin';
import Products from './pages/products/Products';
import PrivateRoute from './components/PrivateRoute';
import {setCookie, checkCookie} from './components/utils'; 

class App extends Component {
  constructor(props) {
    super(props);
     this.state = {
     isLoggedIn: checkCookie()
    };
  }
  
  handleLogin = (isLoggedIn) => {
    isLoggedIn ? setCookie('isLoggedIn','true') : setCookie('isLoggedIn','false')
    this.setState({
      isLoggedIn: isLoggedIn
    })
  }


  render() {
    return (
      <Router>
        <Switch>
          <Route component={() => <Products  handleLogin={this.handleLogin} 
          isLoggedIn={this.state.isLoggedIn}/>} path="/" exact/>
          <PrivateRoute component={() => <Admin isLoggedIn={this.state.isLoggedIn}  handleLogin={this.handleLogin}/>} 
          path="/admin" exact isLoggedIn={this.state.isLoggedIn}/>
        </Switch>
      </Router>
    );
  }
}

export default App;