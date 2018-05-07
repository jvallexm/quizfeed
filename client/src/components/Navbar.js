
import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import './css/Navbar.css';
import { Link } from 'react-router-dom';
import { GoogleLogin, GoogleLogout} from 'react-google-login';
import Logo from './images/Quizfeed-Logo-sm.png';
import API from '../utils/api';

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

      console.log(res.profileObj);
      let newUser = res.profileObj;
      newUser.stars = [];
      newUser._id = newUser.googleId;
      API.getUser(newUser._id,newUser)
         .then(user =>{
           console.log(user);
           this.props.setUser(user.data);
      });

    }


    render() {
      return (
          <Navbar color="light" light expand="md" className="sticky-top">
            <NavbarBrand href="/"> <img src={Logo} alt="Quizfeed"/> </NavbarBrand>
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
                    tag={NavLink}> Login <i className="fab fa-google"/></GoogleLogin>:""}
              </NavItem>
              {!this.props.user._id?
              <NavItem>
                <NavLink onClick={()=>window.open("http://github.com/jvallexm/quizfeed")}><i className="fab fa-github"/></NavLink>
              </NavItem>:""}

            {this.props.user._id?
             <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                <img className="nav-image" alt={this.props.user.givenName} src={this.props.user.imageUrl} />

                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/myquizzes">
                    <i className="fas fa-clipboard-list"/> My Quizzes 
                  </DropdownItem>
                  <DropdownItem>
                    <i className="fas fa-cog"/> Settings 
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

      );
    }
  }
  

export default QfNavbar;
