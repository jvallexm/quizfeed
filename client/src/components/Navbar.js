
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
            <NavbarBrand href="/"> <img src={Logo} alt="Quizfeed"/> </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
                <NavItem>
                { !this.props.user ?
                  <NavLink> Log Out</NavLink>
                  :
                  <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
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
