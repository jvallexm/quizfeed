import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home       from "./pages/Home";
import EditQuiz   from "./pages/EditQuiz";
import FourOhFour from "./pages/Error";
import Quiz       from "./pages/Quiz";
import QfNavbar   from "./components/Navbar";



/* https://tylermcginnis.com/react-router-pass-props-to-components/ */

class App extends React.Component{

  constructor(props){

    super(props);
    this.state = {

      user: {}
    }
    this.setUser = this.setUser.bind(this);

  }
  

  setUser(user){

    console.log("Setting user: ");
    //console.log(user);
    this.setState({user: user});

  }

  responseGoogle(res){
    //console.log(res);
  }

  render(){

    return(

      <Router>
        
        <div className="App"> 
        
        <QfNavbar setUser={this.setUser} user={this.state.user}/>

        <div style={{margin: "20px"}}/>

          {/*
           
          */}
          <Switch>
            
            {/* Home page */}
            <Route exact path="/"                render={ (props)=> <Home       {...props} user={this.state.user} /> } />
            {/* Quizzes by User */}
            <Route exact path="/userQuizzes/:id" render={ (props)=> <Home       {...props} user={this.state.user} /> } />
            {/* Edit user quizzes */}
            <Route exact path="/myquizzes"       render={ (props)=> <Home       {...props} edit={true} user={this.state.user}/>}/>
            {/* Overflow quiz pages */}
            <Route exact path="/page/:offset"    render={ (props)=> <Home       {...props} /> } />
            {/* Creating a new quiz */}
            <Route exact path="/newQuiz"         render={ (props)=> <EditQuiz   {...props} user={this.state.user} /> } />
            {/* Editing existing quiz */}
            <Route exact path="/editQuiz/:id"    render={ (props)=> <EditQuiz   {...props} user={this.state.user} /> } />
            {/* Taking a Quiz*/}
            <Route exact path="/quiz/:id"        render={ (props)=> <Quiz       {...props} user={this.state.user} /> } />
            {/*  */}
            <Route exact path="/favorites"       render={ (props)=> <Home      {...props} user={this.state.user} faves={true} /> } />
            {/* Error Page */}
            <Route exact path="/404/:code?"      render={ (props)=> <FourOhFour {...props} /> } />
            {/* Default */}
            <Route component={FourOhFour} />

          </Switch>
        </div>
      </Router>

    )

  }
  
};

export default App;
