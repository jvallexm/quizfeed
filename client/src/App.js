import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home       from "./pages/Home";
import EditQuiz   from "./pages/EditQuiz";
import FourOhFour from "./pages/Error";


/* https://tylermcginnis.com/react-router-pass-props-to-components/ */

class App extends React.Component{

  state = {

    user: false
  }

  setUser(user){

    this.setState({user: user});

  }

  render(){

    return(

      <Router>
        <div>
          <Switch>
            
            <Route exact path="/"                render={ (props)=> <Home       {...props} /> } />
            <Route exact path="/userQuizzes/:id" render={ (props)=> <Home       {...props} /> } />
            <Route exact path="/page/:offset"    render={ (props)=> <Home       {...props} /> } />
            <Route exact path="/newQuiz"         render={ (props)=> <EditQuiz   {...props} /> } />
            <Route exact path="/editQuiz/:id"    render={ (props)=> <EditQuiz   {...props} /> } />
            <Route exact path="/quiz/:id"        render={ (props)=> <Home       {...props} /> } />
            <Route exact path="/404/:code?"      render={ (props)=> <FourOhFour {...props} /> } />

          </Switch>
        </div>
      </Router>

    )

  }
  
};

export default App;
