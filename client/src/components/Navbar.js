
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
import GoogleLogin from 'react-google-login';

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

    responseGoogle(res){

      console.log(res);

    }

    render() {
      return (
          <Navbar color="light" light expand="md" className="sticky-top">
            <NavbarBrand href="/"> <img src="./images/Quizfeed-Logo-sm.png" alt="Quizfeed"/> </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
                <NavItem>
                <GoogleLogin
                  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  className="btn"> Login With Google <i className="fab fa-google"/></GoogleLogin>
              </NavItem>
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
