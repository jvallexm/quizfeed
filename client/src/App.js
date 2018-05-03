import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home       from "./pages/Home";
import EditQuiz   from "./pages/EditQuiz";
import FourOhFour from "./pages/Error";


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

  render(){

    return(

      <Router>
        <div>
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
            <Route exact path="/quiz/:id"        render={ (props)=> <Home       {...props} /> } />
            {/* Error Page */}
            <Route exact path="/404/:code?"      render={ (props)=> <FourOhFour {...props} /> } />

          </Switch>
        </div>
      </Router>

    )

  }
  
};

export default App;
