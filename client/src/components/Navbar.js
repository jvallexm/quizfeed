
import React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import './css/Navbar.css';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import Logo from './images/Quizfeed-Logo-sm.png';
import API from '../utils/api';

class QfNavbar extends React.Component {
    constructor(props) {
      super(props);
  
      this.success = this.success.bind(this);
      this.state = {
        collapsed: true
      };
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

            {/* Quizfeed Login */}

            <Link  to="/">

              <img src={Logo} className="quiz-logo" alt="Quizfeed"/> 
              
            </Link>

            <Nav className="ml-auto" navbar>

                {/* Shows login button if logged in */}
                
                { !this.props.user._id 
                  ?
                    <NavItem className="login-btn">

                      <GoogleLogin
                        clientId="827588567531-e91v1ho0plbtqgcbd8am9cn5sj6rlvqh.apps.googleusercontent.com"
                        onSuccess={this.success}
                        onFailure={this.failure}
                        style={{}}
                        tag="span"
                        type="span"> 
                          Login <i className="fab fa-google"/>
                      </GoogleLogin>

                    </NavItem>
                  :
                ""}
              
                {/* View project on github */}

                { !this.props.user._id
                  ?
                    <NavItem className="github-btn">
                      <span onClick={()=>window.open("http://github.com/jvallexm/quizfeed")}>
                        View On Github <i className="fab fa-github"/>
                      </span>
                    </NavItem>
                  :
                ""}

                {/* Logged in user dropdown menu */}

                { this.props.user._id
                  ?
                    <UncontrolledDropdown nav inNavbar>

                      {/* Dropdown header user image */}

                      <DropdownToggle nav caret>
                        <img className="nav-image" alt={this.props.user.givenName} src={this.props.user.imageUrl} />
                      </DropdownToggle>

                      {/* Dropdown links */}

                      <DropdownMenu right>

                        {/* My Quizzes */}

                        <DropdownItem>
                          <Link to="/myquizzes">
                            <i className="fas fa-clipboard-list"/> My Quizzes 
                          </Link>
                        </DropdownItem>

                        {/* Settings */}

                        <DropdownItem>
                          <Link to="/settings">  
                            <i className="fas fa-cog"/> Settings 
                          </Link>
                        </DropdownItem>

                        {/* Favorites */}

                        <DropdownItem>
                          <Link to="/favorites">
                            <i className="fas fa-star"/> Favorites 
                          </Link>
                        </DropdownItem>

                        <DropdownItem divider />

                        {/* Github */}

                        <DropdownItem onClick={()=>window.open("http://github.com/jvallexm/quizfeed")}>
                          <i className="fab fa-github"/> View on Github
                        </DropdownItem>

                        {/* Logout */}

                        <DropdownItem onClick={()=>this.props.setUser({})}>
                          <Link to="/">
                            <i className="fas fa-sign-out-alt"/> Logout
                          </Link>
                        </DropdownItem>

                      </DropdownMenu>

                  </UncontrolledDropdown> 
                :

              ""}
            </Nav>

        </Navbar>

      </header>

      );
    }
  }
  

export default QfNavbar;
