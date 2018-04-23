import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home       from "./pages/Home";
import EditQuiz   from "./pages/EditQuiz";
import FourOhFour from "./pages/Error";


const App = () => (
  <Router>
    <div>
      <Switch>
        
        <Route exact path="/"                component={Home} />
        <Route exact path="/userQuizzes/:id" component={Home}/>
        <Route exact path="/page/:offset"    component={Home}/>
        <Route exact path="/newQuiz"         component={EditQuiz}/>
        <Route exact path="/editQuiz/:id"    component={EditQuiz}/>
        <Route exact path="/quiz/:id"        component={Home}/>
        <Route exact path="/404/:code?"      component={FourOhFour}/>

      </Switch>
    </div>
  </Router>
);

export default App;
