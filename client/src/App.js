import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


const App = () => (
  <Router>
    <div>
      <Switch>
        {/*
        <Route exact path="/" component={<h1>Hot Poppers</h1>} />
        <Route exact path="/page/:offset" component={<h1>Hot Poppers</h1>}/>
        <Route exact path="/newQuiz" component={<h1>Hot Poppers</h1>}/>
        <Route exact path="/editQuiz/:id" component={<h1>Hot Poppers</h1>}/>
        <Route exact path="/userQuizzes/:id" component={<h1>Hot Poppers</h1>}/>
        <Route component={<p>ff</p>}/>*/}
        <h1>Hot Poppers</h1>
      </Switch>
    </div>
  </Router>
);

export default App;
