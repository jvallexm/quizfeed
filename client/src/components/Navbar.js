
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

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand img src="/client/public/images/Quizfeed-Logo-sm.png">QuizFeed</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>

                    <NavItem>
                      <NavLink href="/components/Login">Log In</NavLink>
                    </NavItem>

              <UncontrolledDropdown nav inNavbar>

                    <DropdownToggle nav caret>
                      More!
                    </DropdownToggle>

                <DropdownMenu right>
                    <DropdownItem>
                        About
                    </DropdownItem>

                    <DropdownItem>
                    GitHub
                    <NavLink href="https://github.com/jvallexm/quizfeed">GitHub</NavLink>
                    </DropdownItem>

                    <DropdownItem>
                        Placeholder
                    </DropdownItem>
                </DropdownMenu>

              </UncontrolledDropdown>

            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default Navbar;