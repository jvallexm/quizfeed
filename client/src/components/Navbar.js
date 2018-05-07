
import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import './css/Navbar.css';
import { Link } from 'react-router-dom';
import { GoogleLogin, GoogleLogout} from 'react-google-login';
import Logo from './images/Quizfeed-Logo-sm.png';
import API from '../utils/api';
import { BrowserRouter, NavLink } from "react-router-dom";

class QfNavbar extends React.Component {
    constructor(props) {
      super(props);
  
      this.toggleNavbar = this.toggleNavbar.bind(this);
      this.success = this.success.bind(this);
      this.state = {
        collapsed: true
      };
    }
  
    toggleNavbar() {
      this.setState({
        collapsed: !this.state.collapsed
      });
    }

    failure(res){

      console.log(res);

    }

    success(res){

      let newUser = res.profileObj;
      newUser.stars = [];
      newUser._id = newUser.googleId;
      API.getUser(newUser._id,newUser)
         .then(user =>{
           this.props.setUser(user.data);
      });

    }

    /* Block Out Below for Production */

    componentDidMount(){
      this.devSuccess();
    }

    devSuccess(){

      API.getUser("104210337055222011322",{})
         .then(user => this.props.setUser(user.data));

    } 

    /* Block Out Above For Production */

    render() {
      return (
        <header>
          <Navbar expand="md" className="sticky-top bg-blue">
              <Link  to="/">
                <img src={Logo} className="quiz-logo" alt="Quizfeed"/> 
              </Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
                <NavItem>
                { !this.props.user._id ?
                  <GoogleLogin
                    clientId="827588567531-e91v1ho0plbtqgcbd8am9cn5sj6rlvqh.apps.googleusercontent.com"
                    onSuccess={this.success}
                    onFailure={this.failure}
                    style={{}}
                    tag="span"
                    type="span"
                    > Login <i className="fab fa-google"/></GoogleLogin>:""}
              </NavItem>
              {!this.props.user._id?
              <NavItem>
                <span className="push-left" onClick={()=>window.open("http://github.com/jvallexm/quizfeed")}>View On Github <i className="fab fa-github"/></span>
              </NavItem>:""}

            {this.props.user._id?
             <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                <img className="nav-image" alt={this.props.user.givenName} src={this.props.user.imageUrl} />

                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to="/myquizzes">
                      <i className="fas fa-clipboard-list"/> My Quizzes 
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <i className="fas fa-cog"/> Settings 
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/favorites">
                      <i className="fas fa-star"/> Favorites 
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={()=>window.open("http://github.com/jvallexm/quizfeed")}>
                    <i className="fab fa-github"/> View on Github
                  </DropdownItem>
                  <DropdownItem onClick={()=>this.props.setUser({})}>
                    <i className="fas fa-sign-out-alt"/> Logout
                  </DropdownItem>
                </DropdownMenu>
             </UncontrolledDropdown> :""}
            </Nav>
          </Collapse>
        </Navbar>
 </header>

      );
    }
  }
  

export default QfNavbar;
