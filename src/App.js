import React, { Component } from 'react';
import logo from './logo.svg';
import { Navbar, NavbarBrand } from 'reactstrap';
import List from './components/StaffList';
import './App.css';
import { STAFFS, DEPARTMENTS } from './shared/staffs.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS
    };
  }
  render(){
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
          </div>
        </Navbar>
        <List staffs={this.state.staffs} />
      </div>
    );
  }
}

export default App;
