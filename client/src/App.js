import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home       from "./pages/Home";
import EditQuiz   from "./pages/EditQuiz";
import FourOhFour from "./pages/Error";
import Quiz       from "./pages/Quiz";
import QfNavbar     from "./components/Navbar";
import GoogleLogin from 'react-google-login';


/* https://tylermcginnis.com/react-router-pass-props-to-components/ */

class App extends React.Component{

  constructor(props){

    super(props);
    this.state = {

      user: {
        name: "hot poppers",
        _id: "42069"
      }
    }
    this.setUser = this.setUser.bind(this);

  }
  

  setUser(user){

    this.setState({user: user});

  }

  responseGoogle(res){
    console.log(res);
  }

  render(){

    return(

      <Router>
        
        <div>
        
        <QfNavbar/>

        <div style={{margin: "20px"}}/>

          {/*
            <GoogleLogin
              clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
            />
          */}
          <Switch>
            
            {/* Home page */}
            <Route exact path="/"                render={ (props)=> <Home       {...props} user={this.state.user} /> } />
            {/* Quizzes by User */}
            <Route exact path="/userQuizzes/:id" render={ (props)=> <Home       {...props} /> } />
            {/* Overflow quiz pages */}
            <Route exact path="/page/:offset"    render={ (props)=> <Home       {...props} /> } />
            {/* Creating a new quiz */}
            <Route exact path="/newQuiz"         render={ (props)=> <EditQuiz   {...props} user={this.state.user} /> } />
            {/* Editing existing quiz */}
            <Route exact path="/editQuiz/:id"    render={ (props)=> <EditQuiz   {...props} user={this.state.user} /> } />
            {/* Taking a Quiz*/}
            <Route exact path="/quiz/:id"        render={ (props)=> <Quiz       {...props} user={this.state.user} /> } />
            {/* Error Page */}
            <Route exact path="/404/:code?"      render={ (props)=> <FourOhFour {...props} /> } />

          </Switch>
        </div>
      </Router>

    )

  }
  
};

export default App;
