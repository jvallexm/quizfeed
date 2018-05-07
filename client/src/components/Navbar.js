
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
import GoogleLogin from 'react-google-login';
import Logo from './images/Quizfeed-Logo-sm.png';
import API from '../utils/api';

class QfNavbar extends React.Component {
    constructor(props) {
      super(props);
  
      this.toggleNavbar = this.toggleNavbar.bind(this);
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
         .then(user => this.props.setUser(user.data));

    }

    render() {
      return (
          <Navbar color="light" light expand="md" className="sticky-top">
            <NavbarBrand href="/"> <img src={Logo} alt="Quizfeed"/> </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
                <NavItem>
                { this.props.user ?
                  <NavLink>Log Out</NavLink>
                  :
                  <GoogleLogin
                    clientId="827588567531-e91v1ho0plbtqgcbd8am9cn5sj6rlvqh.apps.googleusercontent.com"
                    onSuccess={this.success}
                    onFailure={this.failure}
                    style={{}}
                    tag={NavLink}> Login <i className="fab fa-google"/></GoogleLogin>}
              </NavItem>
              { this.props.user ?
              <NavItem>
                <NavLink href="/myquizzes">My Quizzes</NavLink>
              </NavItem>
              : "" }
              <NavItem>
                <NavLink onClick={()=>window.open("http://github.com/jvallexm/quizfeed")}><i className="fab fa-github"/></NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>

      );
    }
  }
  

export default QfNavbar;
