import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" {}/>
        <Route exact path="/page/:offset"/>
        <Route exact path="/newQuiz" />
        <Route exact path="/editQuiz/:id" />
        <Route exact path="/userQuizzes/:id"/>
        <Route component={NoMatch}/>
      </Switch>
    </div>
  </Router>
);

export default App;
